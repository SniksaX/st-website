"use client"

import { useState } from "react"
import { Play } from "lucide-react"
import { cn } from "@/lib/utils"

interface VideoCardProps {
  title: string
  thumbnail: string
  views: string
  duration: string
  featured?: boolean
}

export function VideoCard({ title, thumbnail, views, duration, featured = false }: VideoCardProps) {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border transition-all duration-300 cursor-pointer",
        featured
          ? "aspect-video border-[#8B5CF6]/30 hover:border-[#8B5CF6]"
          : "aspect-[3/4] border-transparent hover:border-[#8B5CF6]",
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative w-full h-full">
        <img
          src={thumbnail || "/placeholder.svg"}
          alt={title}
          className={cn("w-full h-full object-cover transition-transform duration-300", isHovered && "scale-105")}
        />

        {/* Dark gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />

        {/* Play button overlay */}
        {isHovered && (
          <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
            <div className="w-16 h-16 bg-[#F97316] rounded-full flex items-center justify-center">
              <Play className="w-6 h-6 text-white ml-1" fill="currentColor" />
            </div>
          </div>
        )}

        {/* Content overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-4">
          <h3
            className={cn(
              "font-medium text-white mb-2 transition-all duration-300",
              featured ? "text-xl" : "text-base",
              isHovered && "text-[#F97316]",
            )}
          >
            {title}
          </h3>
          <div className="flex items-center gap-2 text-sm text-[#737373]">
            <span>{views}</span>
            <span>•</span>
            <span>{duration}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
