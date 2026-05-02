import type { Metadata } from 'next'

import MediapartClient from './MediapartClient'

export const metadata: Metadata = {
  title: 'Sans Transition - Mediapart',
  robots: {
    index: false,
    follow: false,
  },
}

export default function MediapartPage() {
  return <MediapartClient />
}
