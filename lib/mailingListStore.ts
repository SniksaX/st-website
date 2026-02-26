import { createCipheriv, createHmac, hkdfSync, randomBytes, timingSafeEqual } from 'crypto'
import { promises as fs } from 'fs'
import path from 'path'

const STORE_FILE = path.join(process.cwd(), 'data', 'mailing-list-subscribers.json')
const STORE_VERSION = 1
const DERIVE_SALT = Buffer.from('sans-transition-mailing-list', 'utf8')

type StoredSubscriber = {
  emailHash: string
  emailEncrypted: string
  source: string
  consentAt: string
  lastSubmittedAt: string
  unsubscribedAt: string | null
  ipHash: string | null
  userAgent: string | null
}

type MailingListStore = {
  version: number
  subscribers: StoredSubscriber[]
}

type UpsertInput = {
  email: string
  source: string
  ip: string | null
  userAgent: string | null
}

export type UpsertResult = {
  status: 'created' | 'existing' | 'reactivated'
  emailHash: string
}

export type UnsubscribeResult = 'updated' | 'already_unsubscribed' | 'not_found'

function normalizeEmail(email: string) {
  return email.trim().toLowerCase()
}

function readSecret() {
  const secret = process.env.MAILING_LIST_SECRET_KEY?.trim()
  if (!secret || secret.length < 24) {
    throw new Error('Missing or weak MAILING_LIST_SECRET_KEY.')
  }
  return secret
}

function deriveKey(secret: string, context: string): Buffer {
  const key = hkdfSync(
    'sha256',
    Buffer.from(secret, 'utf8'),
    DERIVE_SALT,
    Buffer.from(context, 'utf8'),
    32
  )
  return Buffer.isBuffer(key) ? key : Buffer.from(key)
}

function deriveHashKey(secret: string) {
  return deriveKey(secret, 'hash:v1')
}

function deriveEncryptionKey(secret: string) {
  return deriveKey(secret, 'encryption:v1')
}

function deriveUnsubscribeKey(secret: string) {
  return deriveKey(secret, 'unsubscribe:v1')
}

function hashValue(value: string, key: Buffer) {
  return createHmac('sha256', key).update(value).digest('hex')
}

function encryptValue(value: string, key: Buffer) {
  const iv = randomBytes(12)
  const cipher = createCipheriv('aes-256-gcm', key, iv)
  const encrypted = Buffer.concat([cipher.update(value, 'utf8'), cipher.final()])
  const tag = cipher.getAuthTag()

  return `${iv.toString('base64')}:${tag.toString('base64')}:${encrypted.toString('base64')}`
}

function normalizeIp(ip: string | null) {
  if (!ip) return null
  return ip.trim().toLowerCase() || null
}

async function readStore() {
  try {
    const raw = await fs.readFile(STORE_FILE, 'utf8')
    const parsed = JSON.parse(raw) as Partial<MailingListStore>
    if (!parsed || !Array.isArray(parsed.subscribers)) {
      return { version: STORE_VERSION, subscribers: [] } satisfies MailingListStore
    }
    return {
      version: typeof parsed.version === 'number' ? parsed.version : STORE_VERSION,
      subscribers: parsed.subscribers,
    } satisfies MailingListStore
  } catch (error) {
    const code = (error as NodeJS.ErrnoException).code
    if (code === 'ENOENT') {
      return { version: STORE_VERSION, subscribers: [] } satisfies MailingListStore
    }
    throw error
  }
}

async function writeStore(store: MailingListStore) {
  await fs.mkdir(path.dirname(STORE_FILE), { recursive: true })
  const tempFile = `${STORE_FILE}.tmp`
  await fs.writeFile(tempFile, `${JSON.stringify(store, null, 2)}\n`, { encoding: 'utf8', mode: 0o600 })
  await fs.rename(tempFile, STORE_FILE)
}

export async function upsertMailingListSubscriber(input: UpsertInput): Promise<UpsertResult> {
  const email = normalizeEmail(input.email)
  const ip = normalizeIp(input.ip)
  const userAgent = input.userAgent?.slice(0, 500) ?? null
  const secret = readSecret()

  const encryptionKey = deriveEncryptionKey(secret)
  const hashKey = deriveHashKey(secret)
  const emailHash = hashValue(email, hashKey)
  const encryptedEmail = encryptValue(email, encryptionKey)
  const ipHash = ip ? hashValue(ip, hashKey) : null

  const now = new Date().toISOString()
  const store = await readStore()
  const existing = store.subscribers.find((item) => item.emailHash === emailHash)

  if (existing) {
    const wasUnsubscribed = Boolean(existing.unsubscribedAt)
    existing.lastSubmittedAt = now
    existing.source = input.source
    if (wasUnsubscribed) {
      existing.unsubscribedAt = null
    }
    existing.ipHash = ipHash
    existing.userAgent = userAgent
    existing.emailEncrypted = encryptedEmail
    await writeStore(store)
    return { status: wasUnsubscribed ? 'reactivated' : 'existing', emailHash }
  }

  store.subscribers.push({
    emailHash,
    emailEncrypted: encryptedEmail,
    source: input.source,
    consentAt: now,
    lastSubmittedAt: now,
    unsubscribedAt: null,
    ipHash,
    userAgent,
  })

  await writeStore(store)
  return { status: 'created', emailHash }
}

export function createUnsubscribeToken(emailHash: string) {
  if (!/^[a-f0-9]{64}$/i.test(emailHash)) {
    throw new Error('Invalid email hash.')
  }

  const secret = readSecret()
  const key = deriveUnsubscribeKey(secret)
  const normalizedHash = emailHash.toLowerCase()
  const signature = hashValue(normalizedHash, key)
  return `${normalizedHash}.${signature}`
}

export function verifyUnsubscribeToken(token: string) {
  const match = token.trim().toLowerCase().match(/^([a-f0-9]{64})\.([a-f0-9]{64})$/)
  if (!match) return null

  const [, emailHash, signature] = match
  const secret = readSecret()
  const key = deriveUnsubscribeKey(secret)
  const expected = hashValue(emailHash, key)

  const providedBuffer = Buffer.from(signature, 'hex')
  const expectedBuffer = Buffer.from(expected, 'hex')

  if (providedBuffer.length !== expectedBuffer.length) return null
  if (!timingSafeEqual(providedBuffer, expectedBuffer)) return null
  return emailHash
}

export async function unsubscribeMailingListSubscriber(emailHash: string): Promise<UnsubscribeResult> {
  if (!/^[a-f0-9]{64}$/i.test(emailHash)) {
    return 'not_found'
  }

  const store = await readStore()
  const normalizedHash = emailHash.toLowerCase()
  const existing = store.subscribers.find((item) => item.emailHash === normalizedHash)
  if (!existing) return 'not_found'
  if (existing.unsubscribedAt) return 'already_unsubscribed'

  existing.unsubscribedAt = new Date().toISOString()
  await writeStore(store)
  return 'updated'
}
