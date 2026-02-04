import Link from 'next/link'
import LiensClient from '@/components/LiensClient'

export const metadata = {
  title: 'Sans Transition - Liens',
  description: 'Tous les liens utiles en mode linktree.',
}

export default function LiensPage() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[#07070b] text-white">
      <LiensClient />
    </main>
  )
}
