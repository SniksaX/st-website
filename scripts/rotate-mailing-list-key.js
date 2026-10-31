/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('node:fs')
const path = require('node:path')
const root = path.join(__dirname, '..')

async function main() {
  if (process.argv.includes('--apply')) throw new Error('Migration destructive abandonnee : les identifiants Sanity sont conserves. Voir data/campaigns/KEY-ROTATION.md.')
  for (const file of ['.env.local', '.env.newsletter.local']) {
    const location = path.join(root, file)
    if (fs.existsSync(location)) process.loadEnvFile(location)
  }
  const project = process.env.SANITY_PROJECT_ID?.trim()
  const dataset = process.env.SANITY_DATASET?.trim() || 'production'
  const token = process.env.SANITY_API_TOKEN?.trim()
  if (!project || !token) throw new Error('Configuration Sanity absente.')
  if (!/^[a-z0-9-]+$/.test(project) || !/^[a-z0-9_-]+$/.test(dataset)) throw new Error('Configuration Sanity invalide.')
  const query = '*[_type == "mailingListSubscriber"]'
  const response = await fetch(`https://${project}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodeURIComponent(query)}`, {
    headers: { Authorization: `Bearer ${token}` }, signal: AbortSignal.timeout(30000),
  })
  if (!response.ok) throw new Error(`Lecture Sanity refusee (${response.status}).`)
  const { result: documents } = await response.json()
  if (!Array.isArray(documents)) throw new Error('Reponse Sanity invalide.')
  const emails = new Set()
  for (const doc of documents) {
    const email = typeof doc.email === 'string' ? doc.email.trim().toLowerCase() : ''
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || !/^[a-f0-9]{64}$/.test(doc.emailHash) || doc._id !== `mailingListSubscriber-${doc.emailHash}`) {
      throw new Error('Donnee abonne invalide : verification manuelle necessaire.')
    }
    if (emails.has(email)) throw new Error('Adresses en double : reconciliation necessaire.')
    emails.add(email)
  }
  console.log(`${documents.length} abonnes, dont ${documents.filter((doc) => doc.unsubscribedAt != null).length} desinscrits. Identifiants conserves.`)
  if (process.argv.includes('--backup')) {
    const directory = path.join(root, 'data', 'private')
    fs.mkdirSync(directory, { recursive: true })
    fs.writeFileSync(path.join(directory, `newsletter-before-rotation-${Date.now()}.json`), JSON.stringify({ project, dataset, documents }, null, 2), { mode: 0o600, flag: 'wx' })
    console.log('Sauvegarde privee creee dans data/private.')
  }
  console.log('Lecture seule : aucune modification Sanity, aucun email envoye.')
}

main().catch((error) => {
  console.error(error.message)
  process.exitCode = 1
})
