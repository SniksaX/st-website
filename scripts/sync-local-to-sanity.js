#!/usr/bin/env node
/**
 * Sync subscribers from local mailing-list-subscribers.json → Sanity.
 * Run once to recover subscribers whose Sanity upsert silently failed.
 *
 *   node scripts/sync-local-to-sanity.js
 *   node scripts/sync-local-to-sanity.js --dry-run
 */
/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs')
const path = require('path')
const crypto = require('crypto')

const ROOT = path.join(__dirname, '..')
const STORE_FILE = path.join(ROOT, 'data', 'mailing-list-subscribers.json')
const DERIVE_SALT = Buffer.from('sans-transition-mailing-list', 'utf8')
const SANITY_API_VERSION = '2024-01-01'

// ── env ──────────────────────────────────────────────────────────────────────

function loadEnvLocal() {
  const envFile = path.join(ROOT, '.env.local')
  if (!fs.existsSync(envFile)) return
  for (const rawLine of fs.readFileSync(envFile, 'utf8').split(/\r?\n/)) {
    const line = rawLine.trim()
    if (!line || line.startsWith('#')) continue
    const eq = line.indexOf('=')
    if (eq < 1) continue
    const key = line.slice(0, eq).trim()
    let value = line.slice(eq + 1).trim()
    if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
      value = value.slice(1, -1)
    }
    if (process.env[key] === undefined) process.env[key] = value
  }
}

function requireEnv(key) {
  const v = process.env[key]?.trim()
  if (!v) throw new Error(`Missing env: ${key}`)
  return v
}

// ── crypto ───────────────────────────────────────────────────────────────────

function deriveKey(secret, context) {
  return Buffer.from(
    crypto.hkdfSync('sha256', Buffer.from(secret, 'utf8'), DERIVE_SALT, Buffer.from(context, 'utf8'), 32)
  )
}

function decryptValue(encrypted, key) {
  const parts = encrypted.split(':')
  if (parts.length !== 3) throw new Error(`Unexpected encrypted format: ${encrypted}`)
  const [ivB64, tagB64, dataB64] = parts
  const iv = Buffer.from(ivB64, 'base64')
  const tag = Buffer.from(tagB64, 'base64')
  const data = Buffer.from(dataB64, 'base64')
  const decipher = crypto.createDecipheriv('aes-256-gcm', key, iv)
  decipher.setAuthTag(tag)
  return Buffer.concat([decipher.update(data), decipher.final()]).toString('utf8')
}

// ── sanity ───────────────────────────────────────────────────────────────────

async function upsertToSanity({ email, emailHash, source, subscribedAt }) {
  const projectId = requireEnv('SANITY_PROJECT_ID')
  const dataset = process.env.SANITY_DATASET?.trim() || 'production'
  const token = requireEnv('SANITY_API_TOKEN')

  const docId = `mailingListSubscriber-${emailHash}`
  const url = `https://${projectId}.api.sanity.io/v${SANITY_API_VERSION}/data/mutate/${dataset}`

  const body = {
    mutations: [
      {
        createIfNotExists: {
          _id: docId,
          _type: 'mailingListSubscriber',
          email: email.toLowerCase().trim(),
          emailHash,
          source: source ?? '/00',
          subscribedAt: subscribedAt ?? new Date().toISOString(),
          unsubscribedAt: null,
        },
      },
    ],
  }

  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  })

  if (!res.ok) {
    const text = await res.text().catch(() => res.statusText)
    throw new Error(`Sanity mutation failed (${res.status}): ${text}`)
  }

  return res.json()
}

// ── main ─────────────────────────────────────────────────────────────────────

async function main() {
  loadEnvLocal()

  const dryRun = process.argv.includes('--dry-run')

  const secret = requireEnv('MAILING_LIST_SECRET_KEY')
  const encKey = deriveKey(secret, 'encryption:v1')

  const raw = fs.readFileSync(STORE_FILE, 'utf8')
  const store = JSON.parse(raw)
  const subscribers = Array.isArray(store.subscribers) ? store.subscribers : []

  const active = subscribers.filter((s) => !s.unsubscribedAt)
  console.log(`Local subscribers: ${subscribers.length} total, ${active.length} active`)

  let synced = 0
  let failed = 0

  for (const sub of active) {
    let email
    try {
      email = decryptValue(sub.emailEncrypted, encKey)
    } catch (err) {
      console.error(`  ✗ Could not decrypt subscriber ${sub.emailHash.slice(0, 8)}…: ${err.message}`)
      failed++
      continue
    }

    if (dryRun) {
      const masked = email.replace(/^(.{2}).*(@.*)$/, '$1***$2')
      console.log(`  [dry-run] Would sync: ${masked}`)
      synced++
      continue
    }

    try {
      await upsertToSanity({
        email,
        emailHash: sub.emailHash,
        source: sub.source,
        subscribedAt: sub.consentAt,
      })
      const masked = email.replace(/^(.{2}).*(@.*)$/, '$1***$2')
      console.log(`  ✓ Synced: ${masked}`)
      synced++
    } catch (err) {
      console.error(`  ✗ Sanity error for ${sub.emailHash.slice(0, 8)}…: ${err.message}`)
      failed++
    }
  }

  console.log(`\nDone. Synced: ${synced}. Failed: ${failed}.`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
