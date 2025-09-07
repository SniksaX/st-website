"use client"

import { useState } from "react"
import { ExternalLink } from "lucide-react"

interface SocialCardProps {
  platform: string
  handle: string
  url: string
}

export function SocialCard({ platform, handle, url }: SocialCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="block p-6 rounded-lg border border-[#8B5CF6]/20 bg-black/20 backdrop-blur-sm transition-all duration-300 hover:border-[#8B5CF6] group relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-heading text-lg text-[#F97316]">{platform}</h3>
        <ExternalLink className="w-4 h-4 text-[#737373] group-hover:text-[#8B5CF6] transition-colors" />
      </div>
      <p className="text-[#E5E5E5] text-sm">{handle}</p>

      {isHovered && (
        <div
          className="absolute inset-0 rounded-lg opacity-20 pointer-events-none transition-opacity duration-300"
          style={{
            background: "radial-gradient(circle at center, rgba(139, 92, 246, 0.3) 0%, transparent 70%)",
          }}
        />
      )}
    </a>
  )
}
