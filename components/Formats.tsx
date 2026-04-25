'use client'

import React, { useCallback, useEffect, useRef, useState } from 'react'

/* ── Data ──────────────────────────────────────────────── */

const FORMATS = [
  { n: '01', title: 'Fokus',           desc: 'Zoom radical sur une figure ou une info toxique, avec structure chiadée.', tag: 'Analyse' },
  { n: '02', title: 'Hédito',          desc: 'Coup de gueule perso et politique, où on assume le feu et les larmes.', tag: 'Éditorial' },
  { n: '03', title: "L'Œil d'Amandine", desc: "Lecture féministe radicale de l'actu, précise et documentée.", tag: 'Féminisme' },
  { n: '04', title: "L'Œil de Lucho",  desc: 'Ancrage historique pour piger le présent calmement mais sûrement.', tag: 'Histoire' },
  { n: '05', title: 'Interviews',      desc: "Entretiens safe et profonds avec celles et ceux qu'on n'écoute jamais.", tag: 'Long format' },
  { n: '06', title: 'Mikro',           desc: 'Micro-trottoirs sensibles, au cœur des manifs et des luttes.', tag: 'Terrain' },
]

type NodeType = 'format' | 'value'
interface Node { id: string; x: number; y: number; label: string; description: string; type: NodeType; color: string }
interface Star { x: number; y: number; radius: number; opacity: number; phase: number }

const NODES: Node[] = [
  { id: 'fokus',    x: 0.22, y: 0.30, label: 'Fokus',             description: 'Zoom radical sur une figure ou une info toxique, avec structure chiadée.', type: 'format', color: '#fb923c' },
  { id: 'hedito',   x: 0.20, y: 0.48, label: 'Hédito',            description: "Coup de gueule perso et politique, où on assume le feu et les larmes.", type: 'format', color: '#f97316' },
  { id: 'itw',      x: 0.32, y: 0.60, label: 'Interviews',        description: "Entretiens safe et profonds avec celles et ceux qu'on n'écoute jamais.", type: 'format', color: '#fb7185' },
  { id: 'oda',      x: 0.36, y: 0.22, label: "L'Œil d'Amandine", description: "Lecture féministe radicale de l'actu, précise et documentée.", type: 'format', color: '#f97316' },
  { id: 'odl',      x: 0.40, y: 0.42, label: "L'Œil de Lucho",   description: 'Ancrage historique pour piger le présent calmement mais sûrement.', type: 'format', color: '#fb923c' },
  { id: 'mikro',    x: 0.26, y: 0.68, label: 'Mikro',             description: 'Micro-trottoirs sensibles, au cœur des manifs et des luttes.', type: 'format', color: '#f97316' },
  { id: 'indep',    x: 0.68, y: 0.38, label: 'Indépendance',      description: 'Aucune concession sur nos choix éditoriaux et nos sujets.', type: 'value', color: '#a855f7' },
  { id: 'clarte',   x: 0.78, y: 0.26, label: 'Clarté',            description: 'Vulgariser, couper dans le gras, zéro jargon inutile.', type: 'value', color: '#6366f1' },
  { id: 'humanite', x: 0.72, y: 0.56, label: 'Humanité',          description: 'Mettre les personnes au centre, écouter, respecter, amplifier.', type: 'value', color: '#ec4899' },
  { id: 'rigueur',  x: 0.84, y: 0.42, label: 'Rigueur',           description: 'Vérifier, sourcer, contextualiser : la base de tout le reste.', type: 'value', color: '#22d3ee' },
]

const CONNECTIONS: Array<[string, string]> = [
  ['fokus','hedito'], ['hedito','itw'], ['itw','mikro'], ['mikro','odl'], ['odl','oda'], ['oda','fokus'],
  ['indep','clarte'], ['indep','rigueur'], ['indep','humanite'], ['clarte','rigueur'], ['rigueur','humanite'],
  ['itw','indep'], ['fokus','indep'], ['odl','humanite'], ['oda','clarte'],
]

/* ── Galaxy view ────────────────────────────────────────── */

function GalaxyView() {
  const canvasRef    = useRef<HTMLCanvasElement | null>(null)
  const containerRef = useRef<HTMLDivElement | null>(null)
  const animRef      = useRef<number>(0)
  const hoveredRef   = useRef<Node | null>(null)

  const [hoveredNode,   setHoveredNode]   = useState<Node | null>(null)
  const [selectedNode,  setSelectedNode]  = useState<Node | null>(null)
  const [mousePos,      setMousePos]      = useState({ x: 0, y: 0 })
  const [isMobile,      setIsMobile]      = useState(false)

  useEffect(() => {
    const upd = () => setIsMobile(window.innerWidth < 768)
    upd()
    window.addEventListener('resize', upd)
    return () => window.removeEventListener('resize', upd)
  }, [])

  useEffect(() => {
    const canvas    = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let width = 0, height = 0, stars: Star[] = [], time = 0

    const generateStars = () => {
      stars = []
      for (let i = 0; i < 140; i++) {
        stars.push({ x: Math.random() * width, y: Math.random() * height, radius: Math.random() * 1.4, opacity: Math.random() * 0.7 + 0.3, phase: Math.random() * Math.PI * 2 })
      }
    }

    const resize = () => {
      const dpr = window.devicePixelRatio || 1
      width  = container.offsetWidth
      height = container.offsetHeight
      canvas.width  = width  * dpr
      canvas.height = height * dpr
      canvas.style.width  = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      generateStars()
    }
    resize()
    window.addEventListener('resize', resize)

    const animate = () => {
      time += 0.01
      ctx.clearRect(0, 0, width, height)

      // background
      const bg = ctx.createLinearGradient(0, 0, width, height)
      bg.addColorStop(0, 'rgba(13,13,24,0.95)')
      bg.addColorStop(1, 'rgba(8,8,14,0.98)')
      ctx.fillStyle = bg
      ctx.fillRect(0, 0, width, height)

      // stars
      stars.forEach((s) => {
        const t = Math.sin(time * 2 + s.phase) * 0.3 + 0.7
        ctx.fillStyle = `rgba(255,255,255,${s.opacity * t})`
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2)
        ctx.fill()
      })

      const hovered = hoveredRef.current

      // connections
      CONNECTIONS.forEach(([aId, bId]) => {
        const a = NODES.find((n) => n.id === aId)
        const b = NODES.find((n) => n.id === bId)
        if (!a || !b) return
        const ax = a.x * width, ay = a.y * height
        const bx = b.x * width, by = b.y * height
        const isActive = hovered && (hovered.id === a.id || hovered.id === b.id)
        const base = isActive ? 0.9 : 0.45
        const grad = ctx.createLinearGradient(ax, ay, bx, by)
        grad.addColorStop(0, `${a.color}${Math.floor(base * 255).toString(16).padStart(2, '0')}`)
        grad.addColorStop(1, `${b.color}${Math.floor(base * 255).toString(16).padStart(2, '0')}`)
        ctx.strokeStyle = grad
        ctx.lineWidth   = isActive ? 2 : 1
        ctx.globalAlpha = isActive ? 1 : 0.8
        ctx.beginPath()
        ctx.moveTo(ax, ay)
        ctx.lineTo(bx, by)
        ctx.stroke()
        ctx.globalAlpha = 1
      })

      // nodes
      NODES.forEach((node) => {
        const x  = node.x * width
        const y  = node.y * height
        const isH = hovered?.id === node.id
        const glowR = isH ? 40 : 24
        const glow  = ctx.createRadialGradient(x, y, 0, x, y, glowR)
        glow.addColorStop(0, `${node.color}80`)
        glow.addColorStop(1, `${node.color}00`)
        ctx.fillStyle = glow
        ctx.beginPath()
        ctx.arc(x, y, glowR, 0, Math.PI * 2)
        ctx.fill()
        const r = isH ? 9 : 6
        ctx.fillStyle = node.color
        ctx.beginPath()
        ctx.arc(x, y, r, 0, Math.PI * 2)
        ctx.fill()
        ctx.fillStyle = 'rgba(255,255,255,0.95)'
        ctx.beginPath()
        ctx.arc(x, y, r * 0.45, 0, Math.PI * 2)
        ctx.fill()
      })

      animRef.current = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      window.removeEventListener('resize', resize)
      cancelAnimationFrame(animRef.current)
    }
  }, [])

  const findNode = useCallback((cx: number, cy: number) => {
    const rect = containerRef.current?.getBoundingClientRect()
    if (!rect) return null
    const x = cx - rect.left, y = cy - rect.top
    for (const node of NODES) {
      const dist = Math.sqrt((x - node.x * rect.width) ** 2 + (y - node.y * rect.height) ** 2)
      if (dist < 40) return { node, x, y }
    }
    return { node: null, x, y }
  }, [])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const r = findNode(e.clientX, e.clientY)
    if (!r) return
    setMousePos({ x: r.x, y: r.y })
    setHoveredNode(r.node)
    hoveredRef.current = r.node
  }

  const handleMouseLeave = () => { setHoveredNode(null); hoveredRef.current = null }

  const handleSelect = useCallback((cx: number, cy: number) => {
    const r = findNode(cx, cy)
    if (!r) return
    setSelectedNode(r.node)
    if (isMobile) { setHoveredNode(r.node); hoveredRef.current = r.node }
  }, [findNode, isMobile])

  return (
    <div>
      <div
        ref={containerRef}
        style={{
          position: 'relative',
          width: '100%',
          height: 'clamp(360px, 46vw, 520px)',
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid var(--border)',
          cursor: 'crosshair',
        }}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={(e) => handleSelect(e.clientX, e.clientY)}
        onTouchStart={(e) => { const t = e.touches[0]; if (t) handleSelect(t.clientX, t.clientY) }}
      >
        <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />

        {/* Tooltip */}
        {!isMobile && hoveredNode && (
          <div
            style={{
              position: 'absolute',
              left: mousePos.x + 20,
              top: mousePos.y + 20,
              zIndex: 30,
              pointerEvents: 'none',
            }}
          >
            <div style={{
              background: 'rgba(8,8,14,0.97)',
              border: `1px solid ${hoveredNode.color}55`,
              borderRadius: 3,
              padding: '12px 14px',
              maxWidth: 240,
              boxShadow: `0 0 24px ${hoveredNode.color}33`,
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: '50%', background: hoveredNode.color, flexShrink: 0 }} />
                <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--fg)' }}>{hoveredNode.label}</span>
              </div>
              <p style={{ fontSize: 11, color: 'var(--fg2)', lineHeight: 1.55 }}>{hoveredNode.description}</p>
              <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--muted)', marginTop: 6 }}>
                {hoveredNode.type === 'format' ? 'Format' : 'Valeur'}
              </p>
            </div>
          </div>
        )}

        {/* Legend */}
        <div style={{
          position: 'absolute', bottom: 12, left: 12, zIndex: 20,
          background: 'rgba(8,8,14,0.85)',
          border: '1px solid var(--border)',
          borderRadius: 2,
          padding: '6px 12px',
          display: 'flex', gap: 16, alignItems: 'center',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#fb923c', boxShadow: '0 0 8px rgba(251,146,60,0.9)' }} />
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--fg2)' }}>Formats</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: '#a855f7', boxShadow: '0 0 8px rgba(168,85,247,0.9)' }} />
            <span style={{ fontSize: 10, textTransform: 'uppercase', letterSpacing: '0.18em', color: 'var(--fg2)' }}>Valeurs</span>
          </div>
        </div>
      </div>

      {/* Mobile selected node */}
      {isMobile && selectedNode && (
        <div style={{
          marginTop: 12,
          border: `1px solid ${selectedNode.color}55`,
          borderRadius: 3,
          padding: '14px 16px',
          background: 'var(--surface)',
          boxShadow: `0 8px 28px ${selectedNode.color}22`,
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 6 }}>
            <span style={{ width: 8, height: 8, borderRadius: '50%', background: selectedNode.color }} />
            <p style={{ fontSize: 9, textTransform: 'uppercase', letterSpacing: '0.2em', color: 'var(--muted)' }}>
              {selectedNode.type === 'format' ? 'Format' : 'Valeur'}
            </p>
          </div>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--fg)', marginBottom: 6 }}>{selectedNode.label}</p>
          <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.55 }}>{selectedNode.description}</p>
        </div>
      )}
    </div>
  )
}

/* ── List view ──────────────────────────────────────────── */

function ListView() {
  return (
    <div
      className="grid-mosaic"
      style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}
    >
      {FORMATS.map((f) => (
        <div key={f.n} className="grid-cell" style={{ padding: 'clamp(20px,3vw,32px)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 20 }}>
            <span style={{ fontSize: 9, letterSpacing: '0.2em', color: 'var(--border2)', fontVariantNumeric: 'tabular-nums' }}>{f.n}</span>
            <span className="tag-pill">{f.tag}</span>
          </div>
          <h3 style={{ fontSize: 'clamp(16px,1.5vw,20px)', fontWeight: 700, color: 'var(--fg)', letterSpacing: '-0.01em', marginBottom: 10 }}>
            {f.title}
          </h3>
          <p style={{ fontSize: 13, color: 'var(--fg2)', lineHeight: 1.65 }}>{f.desc}</p>
        </div>
      ))}
    </div>
  )
}

/* ── Toggle ─────────────────────────────────────────────── */

function IcoGalaxy() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden>
      <circle cx="12" cy="12" r="2" fill="currentColor" stroke="none" />
      <circle cx="5"  cy="6"  r="1.5" fill="currentColor" stroke="none" />
      <circle cx="19" cy="8"  r="1.5" fill="currentColor" stroke="none" />
      <circle cx="7"  cy="18" r="1.5" fill="currentColor" stroke="none" />
      <circle cx="17" cy="17" r="1.5" fill="currentColor" stroke="none" />
      <line x1="12" y1="12" x2="5"  y2="6"  stroke="currentColor" strokeOpacity="0.5" />
      <line x1="12" y1="12" x2="19" y2="8"  stroke="currentColor" strokeOpacity="0.5" />
      <line x1="12" y1="12" x2="7"  y2="18" stroke="currentColor" strokeOpacity="0.5" />
      <line x1="12" y1="12" x2="17" y2="17" stroke="currentColor" strokeOpacity="0.5" />
    </svg>
  )
}
function IcoList() {
  return (
    <svg width={14} height={14} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <line x1="3" y1="6"  x2="21" y2="6"  />
      <line x1="3" y1="12" x2="21" y2="12" />
      <line x1="3" y1="18" x2="21" y2="18" />
    </svg>
  )
}

/* ── Main export ────────────────────────────────────────── */

export default function Formats() {
  const [view, setView] = useState<'galaxy' | 'list'>('list')

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>

      {/* Top row: intro + toggle */}
      <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 24 }}>
        <p className="rv" style={{ fontSize: 'clamp(15px,1.6vw,19px)', color: 'var(--fg2)', fontWeight: 300, lineHeight: 1.6, maxWidth: 560 }}>
          Six formats, une ligne éditoriale. Radical, queer, féministe, accessible — chaque format a sa voix et son ancrage dans le réel.
        </p>

        {/* Switch */}
        <div style={{
          display: 'flex',
          gap: 1,
          background: 'var(--border)',
          borderRadius: 3,
          overflow: 'hidden',
          border: '1px solid var(--border)',
          flexShrink: 0,
          alignSelf: 'flex-start',
          marginTop: 4,
        }}>
          {([
            { key: 'galaxy', label: 'Galaxie', Icon: IcoGalaxy },
            { key: 'list',   label: 'Liste',   Icon: IcoList },
          ] as const).map(({ key, label, Icon }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 7,
                padding: '8px 16px',
                background: view === key ? 'var(--surface2)' : 'var(--bg)',
                border: 'none',
                cursor: 'pointer',
                fontSize: 11,
                fontFamily: 'var(--font-body)',
                textTransform: 'uppercase',
                letterSpacing: '0.16em',
                color: view === key ? 'var(--fg)' : 'var(--muted)',
                fontWeight: view === key ? 600 : 400,
                transition: 'color .15s, background .15s',
                position: 'relative',
              }}
            >
              <Icon />
              {label}
              {view === key && (
                <span style={{
                  position: 'absolute',
                  bottom: 0, left: 8, right: 8,
                  height: 1.5,
                  background: 'var(--grad)',
                }} />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* View */}
      {view === 'galaxy' ? <GalaxyView /> : <ListView />}

    </div>
  )
}
