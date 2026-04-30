'use client'

import { type CSSProperties, type MouseEventHandler, type ReactNode } from 'react'

type ActionButtonProps = {
  children: ReactNode
  href?: string
  onClick?: MouseEventHandler<HTMLButtonElement | HTMLAnchorElement>
  variant?: 'solid' | 'outline'
  className?: string
  style?: CSSProperties
  showArrow?: boolean
}

const baseStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: 8,
  fontFamily: 'var(--font-body)',
  fontWeight: 600,
  fontSize: 11,
  textTransform: 'uppercase',
  letterSpacing: '0.2em',
  padding: '11px 22px',
  borderRadius: 2,
  textDecoration: 'none',
}

const variantStyles: Record<'solid' | 'outline', CSSProperties> = {
  solid: {
    background:
      'linear-gradient(90deg, oklch(0.72 0.27 290) 0%, oklch(0.78 0.22 330) 48%, oklch(0.85 0.25 40) 100%)',
    color: '#fff',
    border: 'none',
  },
  outline: {
    background: 'none',
    color: '#f0ede8',
    border: '1px solid #282840',
    fontWeight: 500,
    letterSpacing: '0.18em',
  },
}

export default function ActionButton({
  children,
  href,
  onClick,
  variant = 'solid',
  className,
  style,
  showArrow = true,
}: ActionButtonProps) {
  const content = (
    <>
      {children}
      {showArrow ? (
        <svg width="11" height="11" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.8">
          <path d="M3 8h10M9 4l4 4-4 4" />
        </svg>
      ) : null}
    </>
  )

  const mergedStyle = { ...baseStyle, ...variantStyles[variant], ...style }

  if (href) {
    return (
      <a href={href} onClick={onClick} className={className} style={mergedStyle}>
        {content}
      </a>
    )
  }

  return (
    <button type="button" onClick={onClick} className={className} style={mergedStyle}>
      {content}
    </button>
  )
}
