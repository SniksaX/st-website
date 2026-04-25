'use client';
import { MotionDiv } from '@/components/ClientMotion';
import { ShieldCheck, Euro, HeartHandshake, Target } from 'lucide-react';
import type { ComponentType } from 'react';

type IconName = 'shield' | 'euro' | 'heartHandshake' | 'target';

type TrustBadgeProps = {
  icon: IconName;
  text: string;
};

const ICONS: Record<IconName, ComponentType<{ className?: string }>> = {
  shield: (props) => <ShieldCheck {...props} />,
  euro: (props) => <Euro {...props} />,
  heartHandshake: (props) => <HeartHandshake {...props} />,
  target: (props) => <Target {...props} />,
};

export default function TrustBadge({ icon, text }: TrustBadgeProps) {
  const IconComp = ICONS[icon];
  return (
    <MotionDiv
      whileHover={{ y: -2, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: 'spring', stiffness: 500, damping: 28, mass: 0.6 }}
      className="group"
    >
      <div className="relative flex items-center gap-3 p-3 rounded-2xl bg-card/60 border border-border overflow-hidden">
        <div className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-gradient-to-r from-fuchsia-500/10 via-transparent to-orange-500/10" />

        <div className="relative p-2 bg-card rounded-xl border border-border group-hover:border-border transition-colors">
          <IconComp className="h-5 w-5 text-fuchsia-300" />
        </div>
        <span className="relative text-sm text-muted-foreground">{text}</span>
      </div>
    </MotionDiv>
  );
}
