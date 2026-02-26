import React from 'react'
import { ArrowLeft, ArrowRight, RotateCw, Home, Menu, Star, X } from 'lucide-react'

interface BrowserChromeProps {
  url: string
  onNavigate: (section: string) => void
  onBack: () => void
  onHome: () => void
}

const bookmarks = [
  { label: 'A propos', section: 'about' },
  { label: 'Videos', section: 'videos-youtube' },
  { label: 'TikTok', section: 'videos-tiktok' },
  { label: 'Liens', section: 'liens' },
  { label: 'Formats', section: 'formats' },
]

export default function BrowserChrome({ url, onNavigate, onBack, onHome }: BrowserChromeProps) {
  return (
    <div className="bg-[#B2B2B2] pb-1 border-b border-[#999]">
      {/* Tab Strip */}
      <div className="h-[28px] flex items-end px-2 pt-2 gap-[-5px]">
        {/* Active Tab */}
        <div className="relative group max-w-[200px] flex-1">
          <div className="h-[26px] bg-[#F2F2F2] rounded-t-[5px] flex items-center justify-between px-3 text-xs text-[#333] border-t border-l border-r border-[#999] shadow-[0px_1px_2px_rgba(0,0,0,0.1)] z-10 relative">
            <div className="flex items-center gap-2 truncate">
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/e/e2/Google_Chrome_icon_%282011%29.svg"
                className="w-3.5 h-3.5"
                alt=""
              />
              <span className="truncate">Sans Transition</span>
            </div>
            <X size={12} className="text-gray-400 hover:text-red-500 cursor-pointer ml-2" />
          </div>
        </div>

        {/* Inactive Tab Placeholder */}
        <div className="h-[24px] w-[30px] bg-[#D0D0D0] rounded-t-[5px] border-t border-r border-[#999] opacity-70 ml-[-5px] z-0 transform skew-x-12"></div>

        {/* New Tab Button */}
        <div className="w-[24px] h-[16px] bg-[#D0D0D0] hover:bg-[#E0E0E0] rounded-[2px] ml-1 flex items-center justify-center transform skew-x-12 border border-[#999] cursor-pointer"></div>
      </div>

      {/* Toolbar / Omnibox */}
      <div className="bg-[#F2F2F2] p-1.5 flex items-center gap-2 shadow-[0_1px_2px_rgba(0,0,0,0.1)] relative z-20">
        <div className="flex gap-1 text-[#5A5A5A]">
          <button
            onClick={onBack}
            className="p-1 hover:bg-[#Dcdcdc] rounded-full transition-colors disabled:opacity-30"
          >
            <ArrowLeft size={18} />
          </button>
          <button className="p-1 hover:bg-[#Dcdcdc] rounded-full transition-colors disabled:opacity-30 opacity-50 cursor-not-allowed">
            <ArrowRight size={18} />
          </button>
          <button onClick={onBack} className="p-1 hover:bg-[#Dcdcdc] rounded-full transition-colors" aria-label="Refresh">
            <RotateCw size={16} />
          </button>
          <button onClick={onHome} className="p-1 hover:bg-[#Dcdcdc] rounded-full transition-colors" title="Home">
            <Home size={16} />
          </button>
        </div>

        {/* Omnibox */}
        <div className="flex-1 flex max-w-[800px] h-[28px] bg-white border border-[#A0A0A0] rounded-[3px] items-center px-2 shadow-inner focus-within:border-[#4D90FE] focus-within:shadow-[0_0_0_1px_rgba(77,144,254,0.5)] transition-shadow">
          <div className="flex-1 text-sm text-gray-700 truncate selection:bg-[#3297FD] selection:text-white font-normal flex items-center font-mono">
            <span className="text-green-600 mr-0.5">https://</span>
            {url}
          </div>
          <Star size={14} className="text-gray-400 hover:text-yellow-400 cursor-pointer" />
        </div>

        {/* Menu */}
        <button className="p-1 hover:bg-[#Dcdcdc] rounded-[3px] text-[#5A5A5A]">
          <Menu size={18} />
        </button>
      </div>

      {/* Bookmarks Bar */}
      <div className="bg-[#F2F2F2] h-[26px] flex items-center px-2 gap-3 text-xs text-[#444] border-b border-[#B2B2B2]">
        <button
          onClick={() => onNavigate('home')}
          className="hover:bg-[#E0E0E0] px-2 py-0.5 rounded-full transition-colors flex items-center gap-1"
        >
          <img src="https://www.google.com/favicon.ico" className="w-3 h-3" alt="" />
          Home
        </button>

        <div className="w-[1px] h-[16px] bg-[#CCC]"></div>

        {bookmarks.map((bookmark) => (
          <button
            key={bookmark.section}
            onClick={() => onNavigate(bookmark.section)}
            className="hover:bg-[#E0E0E0] px-2 py-0.5 rounded-full transition-colors"
          >
            {bookmark.label}
          </button>
        ))}
      </div>
    </div>
  )
}
