// Keep the previous secret in Netlify while signing new links with the active key.
export function readMailingListSecrets(env: Record<string, string | undefined> = process.env) {
  const active = env.MAILING_LIST_ACTIVE_SECRET_KEY?.trim()
  const previous = env.MAILING_LIST_SECRET_KEY?.trim()
  const signingSecret = active || previous
  if (!signingSecret || signingSecret.length < 24) {
    throw new Error('Missing or weak mailing list signing key.')
  }
  const verificationSecrets = [...new Set([signingSecret, previous].filter(
    (value): value is string => Boolean(value && value.length >= 24)
  ))]
  return { signingSecret, verificationSecrets }
}
