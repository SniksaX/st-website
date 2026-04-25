'use client'

import React, { useState } from 'react'
import Desktop from '@/components/xp/Desktop'
import Taskbar from '@/components/xp/Taskbar'
import Window from '@/components/xp/Window'
import BrowserChrome from '@/components/xp/BrowserChrome'
import './xp-globals.css'

import XPContent from '@/components/xp/content/XPContent'

export default function XPPage() {
  const [currentSection, setCurrentSection] = useState('home')

  const navigate = (section: string) => {
    setCurrentSection(section)
  }

  const getUrl = () => {
    if (currentSection === 'home') return 'www.sanstransition.fr'
    return `www.sanstransition.fr/${currentSection}.html`
  }

  return (
    <Desktop>
      <Window
        title="Sans Transition - Google Chrome"
        icon="https://upload.wikimedia.org/wikipedia/commons/e/e2/Google_Chrome_icon_%282011%29.svg"
        onClose={() => alert('Are you sure you want to close the internet?')}
      >
        <BrowserChrome
          url={getUrl()}
          onNavigate={navigate}
          onBack={() => navigate('home')}
          onHome={() => navigate('home')}
        />

        <div className="flex-1 overflow-hidden bg-white border border-[#808080] shadow-inner relative min-h-0">
          <XPContent section={currentSection} onNavigate={navigate} />
        </div>
      </Window>

      <Taskbar />
    </Desktop>
  )
}
