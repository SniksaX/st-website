import type { Metadata } from 'next'

import CombatClient from './CombatClient'

export const metadata: Metadata = {
  title: 'Combat',
  robots: {
    index: false,
    follow: false,
  },
}

export default function CombatPage() {
  return <CombatClient />
}
