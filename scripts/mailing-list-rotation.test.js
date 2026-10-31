/* eslint-disable @typescript-eslint/no-require-imports */
const { test } = require('node:test')
const assert = require('node:assert/strict')
const fs = require('node:fs')
const os = require('node:os')
const path = require('node:path')
const vm = require('node:vm')
const { stripTypeScriptTypes } = require('node:module')

// Run the actual TypeScript modules with isolated environment, storage and APIs.
// No Next server, real subscriber data, SMTP or Sanity writes are involved.
function load(file, overrides = {}, globals = {}) {
  let source = stripTypeScriptTypes(fs.readFileSync(path.join(__dirname, '..', file), 'utf8'))
  const names = [...source.matchAll(/export (?:async )?function (\w+)/g)].map((match) => match[1])
  source = source.replace(/import \{([^}]+)\} from '([^']+)'/g, (_, bindings, name) => `const {${bindings.replace(/\bas\b/g, ':')}} = require('${name}')`)
    .replace(/import (\w+) from '([^']+)'/g, 'const $1 = require(\'$2\')')
    .replace(/export (?=(?:async )?function|const)/g, '')
  const context = { Buffer, URL, URLSearchParams, AbortSignal, Date, console, process, ...globals,
    require: (name) => Object.hasOwn(overrides, name) ? overrides[name] : require(name), module: { exports: {} } }
  vm.runInNewContext(`${source}\nmodule.exports = {${names.join(',')}}`, context, { filename: file })
  return context.module.exports
}

const keys = load('lib/mailingListKeys.ts')
const previous = 'previous-key-for-testing-only-1234'
const active = 'active-key-for-testing-only-567890'
const hash = 'a'.repeat(64)

function store(env, remote = async () => null, folder = os.tmpdir()) {
  return load('lib/mailingListStore.ts', {
    '@/lib/mailingListKeys': { readMailingListSecrets: () => keys.readMailingListSecrets(env) },
    '@/lib/sanity': { findSanityMailingListSubscriber: remote },
  }, { process: { env, cwd: () => folder } })
}

test('old-only deployment and dual-key deployment both accept existing links', () => {
  const old = store({ MAILING_LIST_SECRET_KEY: previous })
  const dual = store({ MAILING_LIST_SECRET_KEY: previous, MAILING_LIST_ACTIVE_SECRET_KEY: active })
  assert.equal(dual.verifyUnsubscribeToken(old.createUnsubscribeToken(hash)), hash)
  assert.equal(dual.verifyInviteToken(old.createInviteToken('test@example.org')), 'test@example.org')
  assert.equal(old.verifyUnsubscribeToken(old.createUnsubscribeToken(hash)), hash)
  assert.equal(dual.verifyUnsubscribeToken(dual.createUnsubscribeToken(hash)), hash)
  assert.equal(old.verifyUnsubscribeToken(dual.createUnsubscribeToken(hash)), null)
})

test('tampered, malformed, expired and unrelated-key tokens are rejected', () => {
  const dual = store({ MAILING_LIST_SECRET_KEY: previous, MAILING_LIST_ACTIVE_SECRET_KEY: active })
  const foreign = store({ MAILING_LIST_SECRET_KEY: 'unrelated-secret-key-for-testing-123' })
  assert.equal(dual.verifyUnsubscribeToken(foreign.createUnsubscribeToken(hash)), null)
  assert.equal(dual.verifyUnsubscribeToken(`${hash}.${'0'.repeat(64)}`), null)
  assert.equal(dual.verifyUnsubscribeToken('bad'), null)
  assert.equal(dual.verifyInviteToken(dual.createInviteToken('test@example.org', 0)), null)
  assert.equal(dual.verifyInviteToken(`${dual.createInviteToken('test@example.org')}0`), null)
  assert.throws(() => keys.readMailingListSecrets({ MAILING_LIST_ACTIVE_SECRET_KEY: 'weak', MAILING_LIST_SECRET_KEY: previous }), /weak/)
})

test('existing Sanity identity survives rotation and new subscribers use the active key', async () => {
  const folder = fs.mkdtempSync(path.join(os.tmpdir(), 'newsletter-rotation-'))
  try {
    const env = { MAILING_LIST_SECRET_KEY: previous, MAILING_LIST_ACTIVE_SECRET_KEY: active }
    const existing = store(env, async () => ({ emailHash: hash }), folder)
    const input = { email: 'test@example.org', source: '/newsletter', ip: null, userAgent: null }
    const original = await existing.upsertMailingListSubscriber(input)
    assert.equal(original.emailHash, hash)
    assert.equal(original.status, 'existing')
    assert.equal((await existing.upsertMailingListSubscriber(input)).status, 'existing')
    const unsubscribed = store(env, async () => ({ emailHash: hash, unsubscribedAt: '2026-10-01' }), folder)
    assert.equal((await unsubscribed.upsertMailingListSubscriber(input)).status, 'reactivated')
    const current = store(env, async () => null, folder)
    const created = await current.upsertMailingListSubscriber({ ...input, email: 'new@example.org' })
    assert.notEqual(created.emailHash, hash)
    assert.equal(current.verifyUnsubscribeToken(current.createUnsubscribeToken(created.emailHash)), created.emailHash)
    const saved = fs.readFileSync(path.join(folder, 'data', 'mailing-list-subscribers.json'), 'utf8')
    assert.equal(saved.includes('new@example.org'), false)
    const unavailable = store(env, async () => { throw new Error('Sanity unavailable') }, folder)
    await assert.rejects(unavailable.upsertMailingListSubscriber(input), /unavailable/)
    assert.equal(fs.readFileSync(path.join(folder, 'data', 'mailing-list-subscribers.json'), 'utf8'), saved)
  } finally {
    fs.rmSync(folder, { recursive: true, force: true })
  }
})

test('unsubscribe only reports success after the Sanity write succeeds', async () => {
  let persisted = false
  const route = load('app/api/mailing-list/unsubscribe/route.ts', {
    'next/server': { NextResponse: class { constructor(body, options) { this.body = body; this.status = options.status } } },
    '@/lib/mailingListStore': { verifyUnsubscribeToken: () => hash, unsubscribeMailingListSubscriber: async () => { assert.equal(persisted, true); return 'not_found' } },
    '@/lib/sanity': { unsubscribeSanitySubscriber: async () => { await Promise.resolve(); persisted = true } },
  })
  assert.equal((await route.GET({ url: 'https://example.org/?token=test' })).status, 200)
  const failed = load('app/api/mailing-list/unsubscribe/route.ts', {
    'next/server': { NextResponse: class { constructor(body, options) { this.status = options.status } } },
    '@/lib/mailingListStore': { verifyUnsubscribeToken: () => hash },
    '@/lib/sanity': { unsubscribeSanitySubscriber: async () => { throw new Error('unavailable') } },
  })
  assert.equal((await failed.GET({ url: 'https://example.org/?token=test' })).status, 500)
})

test('Sanity lookup rejects duplicates and failures instead of inventing an identity', async () => {
  let response = { ok: true, json: async () => ({ result: [{ email: 'test@example.org', emailHash: hash }] }) }
  const sanity = load('lib/sanity.ts', {}, {
    process: { env: { SANITY_PROJECT_ID: 'test-project', SANITY_API_TOKEN: 'test-only' } },
    fetch: async (url, options) => {
      const query = new URL(url)
      assert.equal(query.searchParams.get('$email'), '"test@example.org"')
      assert.equal(options.cache, 'no-store')
      return response
    },
  })
  assert.equal((await sanity.findSanityMailingListSubscriber('TEST@example.org')).emailHash, hash)
  response = { ok: true, json: async () => ({ result: [] }) }
  assert.equal(await sanity.findSanityMailingListSubscriber('test@example.org'), null)
  response = { ok: true, json: async () => ({ result: [{ emailHash: hash }, { emailHash: hash }] }) }
  await assert.rejects(sanity.findSanityMailingListSubscriber('test@example.org'), /duplicate/)
  response = { ok: false, status: 503 }
  await assert.rejects(sanity.findSanityMailingListSubscriber('test@example.org'), /503/)
})

test('explicit resubscription keeps the original consent date and document ID', async () => {
  let body
  const sanity = load('lib/sanity.ts', {}, {
    process: { env: { SANITY_PROJECT_ID: 'test-project', SANITY_API_TOKEN: 'test-only' } },
    fetch: async (_, options) => { body = JSON.parse(options.body); return { ok: true } },
  })
  await sanity.upsertSanityMailingListSubscriber({ email: 'test@example.org', emailHash: hash, subscribedAt: '2026-10-31' })
  assert.equal(body.mutations[0].createIfNotExists._id, `mailingListSubscriber-${hash}`)
  const update = body.mutations[1].patch
  assert.equal(update.id, `mailingListSubscriber-${hash}`)
  assert.equal(Object.hasOwn(update.set, 'subscribedAt'), false)
  assert.equal(update.setIfMissing.subscribedAt, '2026-10-31')
  assert.equal(update.set.unsubscribedAt, null)
})
