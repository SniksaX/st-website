"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

interface Format {
  title: string
  description: string
}

interface FormatsSliderProps {
  formats: Format[]
}

export function FormatsSlider({ formats }: FormatsSliderProps) {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % formats.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + formats.length) % formats.length)
  }

  const goToSlide = (index: number) => {
    setCurrentIndex(index)
  }

  return (
    <div className="relative">
      {/* Slider container */}
      <div className="relative overflow-hidden rounded-lg border border-[#F97316] bg-black/20 backdrop-blur-sm">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {formats.map((format, index) => (
            <div key={index} className="w-full flex-shrink-0 p-8">
              <h3 className="font-heading text-2xl text-[#F97316] mb-4">{format.title}</h3>
              <p className="text-[#E5E5E5] leading-relaxed">{format.description}</p>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/40 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronLeft className="w-5 h-5 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 bg-[#8B5CF6]/20 hover:bg-[#8B5CF6]/40 rounded-full flex items-center justify-center transition-colors"
        >
          <ChevronRight className="w-5 h-5 text-white" />
        </button>
      </div>

      {/* Pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {formats.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={cn(
              "transition-all duration-300",
              index === currentIndex
                ? "w-8 h-3 bg-[#F97316] rounded-full"
                : "w-3 h-3 bg-[#8B5CF6] rounded-full hover:bg-[#8B5CF6]/80",
            )}
          />
        ))}
      </div>
    </div>
  )
}
