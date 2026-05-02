'use client'

import { type ReactNode, useEffect } from 'react'

export type DossierNavItem = {
  id: string
  label: string
}

type GrowthChartOptions = {
  triggerId: string
  drawnClassName?: string
  lineId?: string
  areaId?: string
  dotSelector?: string
  dotDrawnClassName?: string
}

type DossierEffectsOptions = {
  enabled?: boolean
  progressId: string
  cursorId: string
  cursorRingId: string
  sectionDataAttr: string
  dotSelector: string
  activeDotClassName: string
  revealSelector: string
  revealOnClassName: string
  interactiveSelector: string
  hoveringBodyClassName: string
  customCursorBodyClassName?: string
  headerId?: string
  headerScrolledClassName?: string
  glowAId?: string
  glowBId?: string
  cursorMode?: 'always' | 'fine'
  setBodyCursorNone?: boolean
  counterSelector?: string
  counterMode?: 'standard' | 'mediapart'
  widthSelector?: string
  growthChart?: GrowthChartOptions
  erBarSelector?: string
  grainCanvasId?: string
  tiltSelector?: string
}

export function formatStatValue(value: number, suffix?: string) {
  if (suffix === 'EUR') return `${Math.round(value).toLocaleString('fr-FR')} EUR`
  if (suffix === '%') return `${value.toFixed(1)} %`
  return Math.round(value).toLocaleString('fr-FR')
}

export function AnimatedStatNumber({
  className,
  value,
  format,
  suffix,
  float,
  children = '0',
}: {
  className: string
  value: number
  format?: 'millions'
  suffix?: string
  float?: boolean
  children?: ReactNode
}) {
  return (
    <span
      className={className}
      data-count={value}
      data-format={format}
      data-suffix={suffix}
      data-float={float ? 'true' : undefined}
    >
      {children}
    </span>
  )
}

export function DataTable({ headers, rows, className }: { headers: string[]; rows: ReactNode[][]; className: string }) {
  return (
    <div className={className}>
      <table>
        <thead>
          <tr>{headers.map((header) => <th key={header}>{header}</th>)}</tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr key={`${headers[0]}-${rowIndex}`}>
              {row.map((cell, cellIndex) => <td key={`${headers[0]}-${rowIndex}-${cellIndex}`}>{cell}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export function BulletPanel({
  title,
  items,
  className,
  kickerClassName,
  listClassName,
}: {
  title: string
  items: string[]
  className: string
  kickerClassName: string
  listClassName: string
}) {
  return (
    <div className={className}>
      <div className={kickerClassName}>{title}</div>
      <ul className={listClassName}>{items.map((item) => <li key={item}>{item}</li>)}</ul>
    </div>
  )
}

export function ViralRateBoard<T extends { title: string; sr: number; views: string }>({
  items,
  maxShareRate,
  classNames,
}: {
  items: T[]
  maxShareRate: number
  classNames: {
    grid: string
    head: string
    row: string
    title: string
    barWrap: string
    bar: string
    sr: string
    views: string
  }
}) {
  return (
    <div className={classNames.grid}>
      <div className={classNames.head}>
        <span>Vidéo</span>
        <span>Share rate</span>
        <span style={{ textAlign: 'right' }}>SR</span>
        <span style={{ textAlign: 'right' }}>Vues</span>
      </div>
      {items.map((item) => (
        <div key={item.title} className={classNames.row}>
          <span className={classNames.title}>{item.title}</span>
          <div className={classNames.barWrap}>
            <div className={classNames.bar} data-width={(item.sr / maxShareRate) * 100} />
          </div>
          <span className={classNames.sr}>{item.sr.toFixed(1).replace('.', ',')} %</span>
          <span className={classNames.views}>{item.views}</span>
        </div>
      ))}
    </div>
  )
}

function animateStandardCounter(el: Element) {
  const dataset = (el as HTMLElement).dataset
  const target = parseFloat(dataset.count ?? '0')
  if (Number.isNaN(target)) return

  const duration = 1400
  const start = performance.now()
  const format = dataset.format
  const suffix = dataset.suffix ?? ''
  const isFloat = dataset.float === 'true'

  const step = (now: number) => {
    const ratio = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - ratio, 3)
    const value = target * eased

    if (format === 'millions') el.textContent = `${(value / 1000000).toFixed(1)}M`
    else if (suffix === 'EUR') el.textContent = `${Math.round(value).toLocaleString('fr-FR')} EUR`
    else if (suffix === '%') el.textContent = `${value.toFixed(1)} %`
    else if (isFloat) el.textContent = value.toFixed(1)
    else el.textContent = Math.round(value).toLocaleString('fr-FR')

    if (ratio < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

function animateMediapartCounter(el: Element) {
  const dataset = (el as HTMLElement).dataset
  const target = parseFloat(dataset.target ?? dataset.count ?? '0')
  if (Number.isNaN(target)) return

  const isPct = dataset.count !== undefined
  const isFloat = target % 1 !== 0
  const prefix = dataset.prefix ?? ''
  const suffix = dataset.suffix ?? ''
  const duration = 1400
  const start = performance.now()

  const step = (now: number) => {
    const ratio = Math.min((now - start) / duration, 1)
    const eased = 1 - Math.pow(1 - ratio, 3)
    const value = target * eased
    const formatted = isFloat ? value.toFixed(1) : String(Math.round(value))
    el.textContent = `${prefix}${formatted}${suffix}${isPct ? (isFloat ? ' %' : '%') : ''}`
    if (ratio < 1) requestAnimationFrame(step)
  }

  requestAnimationFrame(step)
}

export function useProtectedDossierEffects({
  enabled = true,
  progressId,
  cursorId,
  cursorRingId,
  sectionDataAttr,
  dotSelector,
  activeDotClassName,
  revealSelector,
  revealOnClassName,
  interactiveSelector,
  hoveringBodyClassName,
  customCursorBodyClassName,
  headerId,
  headerScrolledClassName,
  glowAId,
  glowBId,
  cursorMode = 'fine',
  setBodyCursorNone = false,
  counterSelector = '[data-count]',
  counterMode = 'standard',
  widthSelector = '[data-width]',
  growthChart,
  erBarSelector,
  grainCanvasId,
  tiltSelector,
}: DossierEffectsOptions) {
  useEffect(() => {
    if (!enabled) return

    const cursor = document.getElementById(cursorId)
    const ring = document.getElementById(cursorRingId)
    const progress = document.getElementById(progressId)
    const header = headerId ? document.getElementById(headerId) : null
    const glowA = glowAId ? document.getElementById(glowAId) : null
    const glowB = glowBId ? document.getElementById(glowBId) : null
    const prefersFinePointer = cursorMode === 'always' || window.matchMedia('(pointer: fine)').matches

    let mx = window.innerWidth / 2
    let my = window.innerHeight / 2
    let rx = mx
    let ry = my
    let rafId = 0

    const onMove = (event: MouseEvent) => {
      mx = event.clientX
      my = event.clientY
      if (cursor) {
        cursor.style.left = `${mx}px`
        cursor.style.top = `${my}px`
      }
      if (glowA && glowB) {
        const nx = (event.clientX / window.innerWidth - 0.5) * 2
        const ny = (event.clientY / window.innerHeight - 0.5) * 2
        glowA.style.transform = `translate(${nx * 24}px, ${ny * 16}px)`
        glowB.style.transform = `translate(${-nx * 20}px, ${-ny * 14}px) scale(1.05)`
      }
    }

    const animateRing = () => {
      rx += (mx - rx) * 0.12
      ry += (my - ry) * 0.12
      if (ring) {
        ring.style.left = `${rx}px`
        ring.style.top = `${ry}px`
      }
      rafId = requestAnimationFrame(animateRing)
    }

    const onScroll = () => {
      const height = document.documentElement.scrollHeight - window.innerHeight
      if (progress) progress.style.width = height > 0 ? `${(window.scrollY / height) * 100}%` : '0%'
      if (header && headerScrolledClassName) header.classList.toggle(headerScrolledClassName, window.scrollY > 20)
    }

    const addHover = () => document.body.classList.add(hoveringBodyClassName)
    const removeHover = () => document.body.classList.remove(hoveringBodyClassName)
    const interactiveEls = document.querySelectorAll(interactiveSelector)
    interactiveEls.forEach((el) => {
      el.addEventListener('mouseenter', addHover)
      el.addEventListener('mouseleave', removeHover)
    })

    const revealEls = document.querySelectorAll(revealSelector)
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add(revealOnClassName)
      })
    }, { threshold: 0.1 })
    revealEls.forEach((el) => revealObserver.observe(el))
    window.setTimeout(() => {
      revealEls.forEach((el) => {
        if (el.getBoundingClientRect().top < window.innerHeight) el.classList.add(revealOnClassName)
      })
    }, 60)

    const dots = document.querySelectorAll(dotSelector)
    const sections = document.querySelectorAll(`[${sectionDataAttr}]`)
    const dotObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        dots.forEach((dot) => dot.classList.remove(activeDotClassName))
        const id = entry.target.getAttribute(sectionDataAttr)
        document.querySelector(`${dotSelector}[data-section="${id}"]`)?.classList.add(activeDotClassName)
      })
    }, { threshold: 0.35 })
    sections.forEach((section) => dotObserver.observe(section))

    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        if (counterMode === 'mediapart') animateMediapartCounter(entry.target)
        else animateStandardCounter(entry.target)
        counterObserver.unobserve(entry.target)
      })
    }, { threshold: counterMode === 'mediapart' ? 0.5 : 0.4 })
    document.querySelectorAll(counterSelector).forEach((el) => counterObserver.observe(el))

    const widthObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return
        const target = entry.target as HTMLElement
        const width = target.dataset.width
        if (width) target.style.width = `${width}%`
        widthObserver.unobserve(target)
      })
    }, { threshold: 0.2 })
    document.querySelectorAll(widthSelector).forEach((el) => widthObserver.observe(el))

    let erObserver: IntersectionObserver | null = null
    if (erBarSelector) {
      erObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return
          const target = entry.target as HTMLElement
          const pct = parseFloat(target.dataset.erPct ?? '0')
          target.style.setProperty('--er-w', `${pct}%`)
          target.classList.add('mp-er-on')
          observer.unobserve(target)
        })
      }, { threshold: 0.3 })
    }
    if (erObserver && erBarSelector) document.querySelectorAll(erBarSelector).forEach((el) => erObserver.observe(el))

    let chartObserver: IntersectionObserver | null = null
    if (growthChart) {
      const trigger = document.getElementById(growthChart.triggerId)
      chartObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return

          if (growthChart.drawnClassName) {
            trigger?.classList.add(growthChart.drawnClassName)
          }
          if (growthChart.lineId) document.getElementById(growthChart.lineId)?.classList.add(growthChart.dotDrawnClassName ?? growthChart.drawnClassName ?? '')
          if (growthChart.areaId) document.getElementById(growthChart.areaId)?.classList.add(growthChart.dotDrawnClassName ?? growthChart.drawnClassName ?? '')
          if (growthChart.dotSelector && growthChart.dotDrawnClassName) {
            document.querySelectorAll(growthChart.dotSelector).forEach((dot, index) => {
              window.setTimeout(() => dot.classList.add(growthChart.dotDrawnClassName!), 600 + index * 200)
            })
          }
          chartObserver?.disconnect()
        })
      }, { threshold: 0.3 })
      if (trigger) chartObserver.observe(trigger)
    }

    const grainCanvas = grainCanvasId ? document.getElementById(grainCanvasId) as HTMLCanvasElement | null : null
    let grainInterval = 0
    if (grainCanvas) {
      const context = grainCanvas.getContext('2d')
      if (context) {
        grainCanvas.width = 256
        grainCanvas.height = 256
        const redrawGrain = () => {
          const data = context.createImageData(256, 256)
          for (let i = 0; i < data.data.length; i += 4) {
            const value = (Math.random() * 255) | 0
            data.data[i] = value
            data.data[i + 1] = value
            data.data[i + 2] = value
            data.data[i + 3] = 22
          }
          context.putImageData(data, 0, 0)
        }
        redrawGrain()
        grainInterval = window.setInterval(redrawGrain, 80)
      }
    }

    const tiltCards = tiltSelector ? document.querySelectorAll(tiltSelector) : []
    const onTiltMove = (event: MouseEvent) => {
      const card = event.currentTarget as HTMLElement
      const rect = card.getBoundingClientRect()
      const dx = ((event.clientX - rect.left) / rect.width - 0.5) * 2
      const dy = ((event.clientY - rect.top) / rect.height - 0.5) * 2
      card.style.transition = 'transform .06s ease, background .25s'
      card.style.transform = `perspective(700px) rotateY(${dx * 9}deg) rotateX(${-dy * 7}deg) scale(1.03)`
    }
    const onTiltLeave = (event: MouseEvent) => {
      const card = event.currentTarget as HTMLElement
      card.style.transition = 'transform .5s cubic-bezier(0.2,1,0.2,1), background .25s'
      card.style.transform = 'perspective(700px) rotateY(0deg) rotateX(0deg) scale(1)'
    }
    tiltCards.forEach((card) => {
      card.addEventListener('mousemove', onTiltMove as EventListener)
      card.addEventListener('mouseleave', onTiltLeave as EventListener)
    })

    window.addEventListener('scroll', onScroll)
    onScroll()
    if (prefersFinePointer) {
      document.addEventListener('mousemove', onMove)
      animateRing()
      if (customCursorBodyClassName) document.body.classList.add(customCursorBodyClassName)
      if (setBodyCursorNone) document.body.style.cursor = 'none'
    }

    return () => {
      if (prefersFinePointer) {
        document.removeEventListener('mousemove', onMove)
        cancelAnimationFrame(rafId)
        if (customCursorBodyClassName) document.body.classList.remove(customCursorBodyClassName)
        if (setBodyCursorNone) document.body.style.cursor = ''
      }
      window.removeEventListener('scroll', onScroll)
      revealObserver.disconnect()
      dotObserver.disconnect()
      counterObserver.disconnect()
      widthObserver.disconnect()
      erObserver?.disconnect()
      chartObserver?.disconnect()
      clearInterval(grainInterval)
      interactiveEls.forEach((el) => {
        el.removeEventListener('mouseenter', addHover)
        el.removeEventListener('mouseleave', removeHover)
      })
      tiltCards.forEach((card) => {
        card.removeEventListener('mousemove', onTiltMove as EventListener)
        card.removeEventListener('mouseleave', onTiltLeave as EventListener)
      })
      document.body.classList.remove(hoveringBodyClassName)
    }
  }, [
    activeDotClassName,
    counterMode,
    counterSelector,
    cursorId,
    cursorMode,
    cursorRingId,
    customCursorBodyClassName,
    dotSelector,
    enabled,
    erBarSelector,
    glowAId,
    glowBId,
    grainCanvasId,
    growthChart,
    headerId,
    headerScrolledClassName,
    hoveringBodyClassName,
    interactiveSelector,
    progressId,
    revealOnClassName,
    revealSelector,
    sectionDataAttr,
    setBodyCursorNone,
    tiltSelector,
    widthSelector,
  ])
}
