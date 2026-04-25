'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Section from '@/components/Section';
import SectionHeading from '@/components/SectionHeading';

type NodeType = 'format' | 'value';

interface Node {
  id: string;
  x: number; // 0–1 (ratio width)
  y: number; // 0–1 (ratio height)
  label: string;
  description: string;
  type: NodeType;
  color: string;
}

interface Star {
  x: number;
  y: number;
  radius: number;
  opacity: number;
  phase: number;
}

// --- NODES : formats à gauche, valeurs à droite, couleurs ST ---
const NODES: Node[] = [
  // Formats cluster (gauche)
  {
    id: 'fokus',
    x: 0.22,
    y: 0.30,
    label: 'Fokus',
    description: 'Zoom radical sur une figure ou une info toxique, avec structure chiadée.',
    type: 'format',
    color: '#fb923c', // orange chaud
  },
  {
    id: 'hedito',
    x: 0.20,
    y: 0.48,
    label: 'Hédito',
    description: 'Coup de gueule perso et politique, où on assume le feu et les larmes.',
    type: 'format',
    color: '#f97316',
  },
  {
    id: 'itw',
    x: 0.32,
    y: 0.60,
    label: 'Interviews',
    description: 'Entretiens safe et profonds avec celles et ceux qu’on n’écoute jamais.',
    type: 'format',
    color: '#fb7185',
  },
  {
    id: 'oda',
    x: 0.36,
    y: 0.22,
    label: "L'Œil d’Amandine",
    description: 'Lecture féministe radicale de l’actu, précise et documentée.',
    type: 'format',
    color: '#f97316',
  },
  {
    id: 'odl',
    x: 0.40,
    y: 0.42,
    label: "L'Œil de Lucho",
    description: 'Ancrage historique pour piger le présent calmement mais sûrement.',
    type: 'format',
    color: '#fb923c',
  },
  {
    id: 'mikro',
    x: 0.26,
    y: 0.68,
    label: 'Mikro',
    description: 'Micro-trottoirs sensibles, au cœur des manifs et des luttes.',
    type: 'format',
    color: '#f97316',
  },

  // Values cluster (droite)
  {
    id: 'indep',
    x: 0.68,
    y: 0.38,
    label: 'Indépendance',
    description: 'Aucune concession sur nos choix éditoriaux et nos sujets.',
    type: 'value',
    color: '#a855f7', // violet
  },
  {
    id: 'clarte',
    x: 0.78,
    y: 0.26,
    label: 'Clarté',
    description: 'Vulgariser, couper dans le gras, zéro jargon inutile.',
    type: 'value',
    color: '#6366f1', // bleu-violet
  },
  {
    id: 'humanite',
    x: 0.72,
    y: 0.56,
    label: 'Humanité',
    description: 'Mettre les personnes au centre, écouter, respecter, amplifier.',
    type: 'value',
    color: '#ec4899', // rose
  },
  {
    id: 'rigueur',
    x: 0.84,
    y: 0.42,
    label: 'Rigueur',
    description: 'Vérifier, sourcer, contextualiser : la base de tout le reste.',
    type: 'value',
    color: '#22d3ee', // cyan
  },
];

// Connexions entre les nœuds (formats <-> formats, valeurs <-> valeurs, ponts)
const CONNECTIONS: Array<[string, string]> = [
  // formats
  ['fokus', 'hedito'],
  ['hedito', 'itw'],
  ['itw', 'mikro'],
  ['mikro', 'odl'],
  ['odl', 'oda'],
  ['oda', 'fokus'],

  // valeurs
  ['indep', 'clarte'],
  ['indep', 'rigueur'],
  ['indep', 'humanite'],
  ['clarte', 'rigueur'],
  ['rigueur', 'humanite'],

  // ponts entre galaxie formats et galaxie valeurs
  ['itw', 'indep'],
  ['fokus', 'indep'],
  ['odl', 'humanite'],
  ['oda', 'clarte'],
];

export default function ConstellationFormats() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [hoveredNode, setHoveredNode] = useState<Node | null>(null);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number>(0);
  const hoveredNodeRef = useRef<Node | null>(null);
  const [isMobileViewport, setIsMobileViewport] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = container.offsetWidth;
    let height = container.offsetHeight;
    let stars: Star[] = [];
    let time = 0;

    const generateStars = () => {
      stars = [];
      for (let i = 0; i < 140; i++) {
        stars.push({
          x: Math.random() * width,
          y: Math.random() * height,
          radius: Math.random() * 1.4,
          opacity: Math.random() * 0.7 + 0.3,
          phase: Math.random() * Math.PI * 2,
        });
      }
    };

    const updateSize = () => {
      const dpr = window.devicePixelRatio || 1;
      width = container.offsetWidth;
      height = container.offsetHeight;

      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      generateStars();
    };

    updateSize();
    window.addEventListener('resize', updateSize);

    const animate = () => {
      time += 0.01;
      ctx.clearRect(0, 0, width, height);

      // fond léger (un peu plus sombre que la div tailwind, pour les lignes)
      const bgGradient = ctx.createLinearGradient(0, 0, width, height);
      bgGradient.addColorStop(0, 'rgba(15,10,25,0.8)');
      bgGradient.addColorStop(1, 'rgba(5,5,10,0.95)');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, width, height);

      // étoiles de fond
      stars.forEach((star) => {
        const twinkle = Math.sin(time * 2 + star.phase) * 0.3 + 0.7;
        ctx.fillStyle = `rgba(255,255,255,${star.opacity * twinkle})`;
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
      });

      const hovered = hoveredNodeRef.current;

      // lignes entre nœuds
      CONNECTIONS.forEach(([aId, bId]) => {
        const a = NODES.find((n) => n.id === aId);
        const b = NODES.find((n) => n.id === bId);
        if (!a || !b) return;

        const ax = a.x * width;
        const ay = a.y * height;
        const bx = b.x * width;
        const by = b.y * height;

        const isActive = hovered && (hovered.id === a.id || hovered.id === b.id);

        const gradient = ctx.createLinearGradient(ax, ay, bx, by);
        const baseOpacity = isActive ? 0.9 : 0.45;

        gradient.addColorStop(0, `${a.color}${Math.floor(baseOpacity * 255).toString(16).padStart(2, '0')}`);
        gradient.addColorStop(1, `${b.color}${Math.floor(baseOpacity * 255).toString(16).padStart(2, '0')}`);

        ctx.strokeStyle = gradient;
        ctx.lineWidth = isActive ? 2 : 1;
        ctx.globalAlpha = isActive ? 1 : 0.8;
        ctx.beginPath();
        ctx.moveTo(ax, ay);
        ctx.lineTo(bx, by);
        ctx.stroke();
        ctx.globalAlpha = 1;
      });

      // nodes
      NODES.forEach((node) => {
        const x = node.x * width;
        const y = node.y * height;
        const isHovered = hovered?.id === node.id;

        const glowSize = isHovered ? 40 : 24;
        const glowGradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
        glowGradient.addColorStop(0, `${node.color}80`);
        glowGradient.addColorStop(1, `${node.color}00`);
        ctx.fillStyle = glowGradient;
        ctx.beginPath();
        ctx.arc(x, y, glowSize, 0, Math.PI * 2);
        ctx.fill();

        const nodeRadius = isHovered ? 9 : 6;
        ctx.fillStyle = node.color;
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius, 0, Math.PI * 2);
        ctx.fill();

        ctx.fillStyle = 'rgba(255,255,255,0.95)';
        ctx.beginPath();
        ctx.arc(x, y, nodeRadius * 0.45, 0, Math.PI * 2);
        ctx.fill();
      });

      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', updateSize);
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const updateViewport = () => setIsMobileViewport(window.innerWidth < 768);
    updateViewport();
    window.addEventListener('resize', updateViewport);
    return () => window.removeEventListener('resize', updateViewport);
  }, []);

  const findNodeAtPosition = useCallback((clientX: number, clientY: number) => {
    const container = containerRef.current;
    if (!container) return null;

    const rect = container.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    let found: Node | null = null;
    for (const node of NODES) {
      const nx = node.x * rect.width;
      const ny = node.y * rect.height;
      const distance = Math.sqrt((x - nx) ** 2 + (y - ny) ** 2);

      if (distance < 40) {
        found = node;
        break;
      }
    }

    return { node: found, x, y };
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const result = findNodeAtPosition(e.clientX, e.clientY);
    if (!result) return;

    setMousePos({ x: result.x, y: result.y });
    setHoveredNode(result.node);
    hoveredNodeRef.current = result.node;
  };

  const handleNodeSelect = useCallback(
    (clientX: number, clientY: number) => {
      const result = findNodeAtPosition(clientX, clientY);
      const node = result?.node ?? null;
      setSelectedNode(node);

      if (isMobileViewport) {
        setHoveredNode(node);
        hoveredNodeRef.current = node;
      }
    },
    [findNodeAtPosition, isMobileViewport]
  );

  const handleClick = (e: React.MouseEvent<HTMLDivElement>) => {
    handleNodeSelect(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    if (!touch) return;
    handleNodeSelect(touch.clientX, touch.clientY);
  };

  const handleMouseLeave = () => {
    setHoveredNode(null);
    hoveredNodeRef.current = null;
  };

  const showTooltip = Boolean(hoveredNode) && !isMobileViewport;

  return (
    <Section id="formats" className="py-16 md:py-20">
      <SectionHeading
        kicker="Galaxie éditoriale"
        title="Formats & valeurs"
        description="Formats à gauche, valeurs à droite, tout relié dans la même constellation."
        align="center"
        className="mb-8"
      />

      <div
        ref={containerRef}
        className="relative w-full h-[420px] md:h-[480px] rounded-[2rem] border border-border/60 bg-[radial-gradient(circle_at_15%_0%,rgba(249,115,22,0.12),transparent_60%),radial-gradient(circle_at_85%_100%,rgba(168,85,247,0.16),transparent_60%),radial-gradient(circle_at_50%_50%,rgba(236,72,153,0.08),transparent_65%)] overflow-hidden"
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
        onTouchStart={handleTouchStart}
      >
        <canvas ref={canvasRef} className="w-full h-full" />

        {/* Tooltip */}
        {showTooltip && hoveredNode && (
          <div
            className="absolute z-30 pointer-events-none"
            style={{
              left: mousePos.x + 20,
              top: mousePos.y + 20,
            }}
          >
            <div
              className="rounded-xl border bg-background/95 backdrop-blur-xl px-3.5 py-3 shadow-2xl max-w-xs"
              style={{
                borderColor: `${hoveredNode.color}66`,
                boxShadow: `0 0 30px ${hoveredNode.color}44`,
              }}
            >
              <div className="flex items-center gap-2 mb-1.5">
                <div
                  className="w-3 h-3 rounded-full"
                  style={{
                    backgroundColor: hoveredNode.color,
                    boxShadow: `0 0 12px ${hoveredNode.color}`,
                  }}
                />
                <h3 className="text-sm font-semibold text-foreground">
                  {hoveredNode.label}
                </h3>
              </div>
              <p className="text-[11px] text-muted-foreground leading-relaxed">
                {hoveredNode.description}
              </p>
              <div className="mt-2 text-[9px] uppercase tracking-[0.18em] text-muted-foreground/80">
                {hoveredNode.type === 'format' ? 'Format' : 'Valeur'}
              </div>
            </div>
          </div>
        )}

        {/* Légende */}
        <div className="absolute bottom-4 left-4 z-20">
          <div className="rounded-full bg-background/80 backdrop-blur-xl border border-border/70 px-4 py-2 text-[11px] flex items-center gap-4">
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: '#fb923c', boxShadow: '0 0 10px rgba(251,146,60,0.9)' }}
              />
              <span className="text-muted-foreground">Formats</span>
            </div>
            <div className="flex items-center gap-2">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: '#a855f7', boxShadow: '0 0 10px rgba(168,85,247,0.9)' }}
              />
              <span className="text-muted-foreground">Valeurs</span>
            </div>
          </div>
        </div>
      </div>

      {selectedNode && (
        <div className="mt-5 md:hidden">
          <div
            className="rounded-2xl border px-4 py-4 bg-background/95 backdrop-blur-xl shadow-2xl"
            style={{
              borderColor: `${selectedNode.color}66`,
              boxShadow: `0 10px 35px ${selectedNode.color}33`,
            }}
          >
            <div className="flex items-center gap-3 mb-2">
              <span
                className="inline-flex h-3 w-3 rounded-full"
                style={{
                  backgroundColor: selectedNode.color,
                  boxShadow: `0 0 12px ${selectedNode.color}`,
                }}
              />
              <div>
                <p className="text-xs uppercase tracking-[0.2em] text-muted-foreground/70">
                  {selectedNode.type === 'format' ? 'Format' : 'Valeur'}
                </p>
                <h3 className="text-base font-semibold text-foreground">{selectedNode.label}</h3>
              </div>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">{selectedNode.description}</p>
          </div>
        </div>
      )}
    </Section>
  );
}
