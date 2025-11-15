'use client'

import React from 'react'

type HelloAssoWidgetProps = {
  id?: string
  src?: string
  className?: string
}

export default function HelloAssoWidget({
  id = 'haWidgetLight',
  src = 'https://www.helloasso.com/associations/sans-transition/formulaires/1/widget?view=form',
  className,
}: HelloAssoWidgetProps) {
  const iframeRef = React.useRef<HTMLIFrameElement | null>(null)
  const [height, setHeight] = React.useState<number>(900)

  React.useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      if (typeof e.data !== 'object' || e.origin !== 'https://www.helloasso.com') return
      const data = e.data as { height?: number }
      if (typeof data.height === 'number') {
        setHeight(Math.max(400, Math.min(2400, data.height)))
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [])

  return (
    <div className={className}>
      <iframe
        id={id}
        ref={iframeRef}
        title="Formulaire de don HelloAsso"
        allow="payment"
        scrolling="auto"
        src={src}
        style={{
          width: 'clamp(300px, 100%, 28rem)',
          margin: '0 auto',
          border: 'none',
          display: 'block',
          height,
        }}
      />
    </div>
  )
}
