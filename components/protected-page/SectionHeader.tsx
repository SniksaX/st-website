'use client'

import { type CSSProperties, type ReactNode } from 'react'

type SectionHeaderProps = {
  eyebrow?: ReactNode
  title: ReactNode
  body?: ReactNode
  className?: string
  style?: CSSProperties
  eyebrowStyle?: CSSProperties
  titleStyle?: CSSProperties
  bodyStyle?: CSSProperties
  centered?: boolean
  showLine?: boolean
}

const lineStyle: CSSProperties = {
  display: 'inline-block',
  width: 24,
  height: 2,
  background:
    'linear-gradient(90deg, oklch(0.72 0.27 290) 0%, oklch(0.78 0.22 330) 48%, oklch(0.85 0.25 40) 100%)',
  flexShrink: 0,
}

export default function SectionHeader({
  eyebrow,
  title,
  body,
  className,
  style,
  eyebrowStyle,
  titleStyle,
  bodyStyle,
  centered = false,
  showLine = false,
}: SectionHeaderProps) {
  return (
    <div
      className={className}
      style={{
        paddingBottom: 20,
        marginBottom: 52,
        borderBottom: '1px solid #1c1c2c',
        textAlign: centered ? 'center' : undefined,
        ...style,
      }}
    >
      {eyebrow ? (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: centered ? 'center' : undefined,
            gap: 14,
            fontSize: 11,
            textTransform: 'uppercase',
            letterSpacing: '0.28em',
            color: 'var(--fg2)',
            marginBottom: 12,
            ...eyebrowStyle,
          }}
        >
          {showLine ? <span style={lineStyle} /> : null}
          {eyebrow}
        </div>
      ) : null}

      <h2
        style={{
          fontSize: 'clamp(30px,4vw,58px)',
          fontWeight: 700,
          letterSpacing: '-0.03em',
          lineHeight: 1.06,
          marginBottom: 12,
          ...titleStyle,
        }}
      >
        {title}
      </h2>

      {body ? (
        <p
          style={{
            fontSize: 15,
            color: 'var(--fg2)',
            lineHeight: 1.72,
            maxWidth: centered ? 720 : 620,
            margin: centered ? '0 auto' : undefined,
            ...bodyStyle,
          }}
        >
          {body}
        </p>
      ) : null}
    </div>
  )
}
