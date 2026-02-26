import React from 'react'
import RetroHome from './RetroHome'
import RetroAbout from './RetroAbout'
import RetroLinks from './RetroLinks'
import RetroVideos from './RetroVideos'
import RetroFormats from './RetroFormats'
import RetroCampaign from './RetroCampaign'
import RetroCalendar from './RetroCalendar'
import RetroComploteurs from './RetroComploteurs'

interface XPContentProps {
  section: string
  onNavigate: (section: string) => void
}

const sectionAliases: Record<string, string> = {
  about: 'home',
  founders: 'about',
  stream: 'stream',
  agenda: 'stream',
  'videos-youtube': 'videos-youtube',
  'videos-tiktok': 'videos-tiktok',
  videos: 'videos-youtube',
  liens: 'liens',
  links: 'liens',
  campaign: 'campaign',
  'les-comploteurs': 'comploteurs',
  comploteurs: 'comploteurs',
  home: 'home',
  formats: 'formats',
}

function resolveSection(section: string) {
  return sectionAliases[section] ?? section
}

export default function XPContent({ section, onNavigate }: XPContentProps) {
  const resolvedSection = resolveSection(section)

  return (
    <div className="flex h-full font-serif bg-white text-black">
      {/* Sidebar / Frameset Left */}
      <div className="w-[140px] bg-[#C0C0C0] border-r-2 border-white border-r-gray-600 p-2 flex flex-col gap-1 shrink-0 overflow-y-auto">
        <div className="text-center font-bold text-sm mb-2 border-b border-gray-500 pb-1">Menu</div>

        <button
          onClick={() => onNavigate('home')}
          className="text-left text-blue-800 hover:text-red-600 underline text-sm font-sans"
        >
          [ Home ]
        </button>
        <button
          onClick={() => onNavigate('campaign')}
          className="text-left text-red-600 hover:text-red-800 font-bold underline text-sm font-sans blink"
        >
          [ DONATE! ]
        </button>
        <div className="h-2"></div>
        <button
          onClick={() => onNavigate('about')}
          className="text-left text-blue-800 hover:text-red-600 underline text-sm font-sans"
        >
          [ A propos ]
        </button>
        <button
          onClick={() => onNavigate('founders')}
          className="text-left text-blue-800 hover:text-red-600 underline text-sm font-sans"
        >
          [ The Team ]
        </button>
        <button
          onClick={() => onNavigate('formats')}
          className="text-left text-blue-800 hover:text-red-600 underline text-sm font-sans"
        >
          [ Formats ]
        </button>
        <button
          onClick={() => onNavigate('stream')}
          className="text-left text-blue-800 hover:text-red-600 underline text-sm font-sans"
        >
          [ Agenda TV ]
        </button>
        <button
          onClick={() => onNavigate('les-comploteurs')}
          className="text-left text-blue-800 hover:text-red-600 underline text-sm font-sans"
        >
          [ Book: Comploteurs ]
        </button>
        <div className="h-2"></div>
        <button
          onClick={() => onNavigate('videos-youtube')}
          className="text-left text-blue-800 hover:text-red-600 underline text-sm font-sans"
        >
          [ Videos ]
        </button>
        <button
          onClick={() => onNavigate('videos-tiktok')}
          className="text-left text-blue-800 hover:text-red-600 underline text-sm font-sans"
        >
          [ TikTok ]
        </button>
        <button
          onClick={() => onNavigate('liens')}
          className="text-left text-blue-800 hover:text-red-600 underline text-sm font-sans"
        >
          [ Links ]
        </button>

        <div className="mt-8 text-center">
          <img
            src="https://web.archive.org/web/20091026192323/http://geocities.com/SunsetStrip/Club/3716/ie_logo.gif"
            alt="IE Logo"
            width="50"
          />
          <br />
        </div>
      </div>

      {/* Main Content / Frameset Right */}
      <div className="flex-1 bg-white relative overflow-hidden flex flex-col min-h-0">
        <div className="flex-1 overflow-y-auto scrollbar-xp p-1">
          {resolvedSection === 'home' && <RetroHome />}
          {resolvedSection === 'about' && <RetroAbout />}
          {resolvedSection === 'liens' && <RetroLinks />}
          {resolvedSection === 'videos-youtube' && <RetroVideos mode="youtube" />}
          {resolvedSection === 'videos-tiktok' && <RetroVideos mode="tiktok" />}
          {resolvedSection === 'formats' && <RetroFormats />}
          {resolvedSection === 'campaign' && <RetroCampaign />}
          {resolvedSection === 'stream' && <RetroCalendar />}
          {resolvedSection === 'comploteurs' && <RetroComploteurs />}

          {!Object.values(sectionAliases).includes(resolvedSection) && (
            <div className="p-8 text-center text-red-600 font-bold">PAGE MOVED... PLEASE USE MENU</div>
          )}
        </div>
      </div>
    </div>
  )
}
