'use client';
import { MotionDiv } from '@/components/ClientMotion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Target } from 'lucide-react';

type ImpactCardProps = {
  amount: string;
  desc: string;
  delay: number;
};

export default function ImpactCard({ amount, desc, delay }: ImpactCardProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <Card className="group h-full rounded-3xl border border-border bg-card/70 hover:border-fuchsia-500/30 hover:shadow-[0_12px_36px_rgba(168,85,247,0.15)] transition-all duration-300">
        <CardHeader className="pb-4">
          <div className="p-3 bg-fuchsia-500/15 rounded-2xl w-fit mb-3 group-hover:bg-fuchsia-500/25 transition-colors">
            <Target className="h-6 w-6 text-fuchsia-300" />
          </div>
          <CardTitle className="text-xl font-bold text-foreground">{amount}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground leading-relaxed">{desc}</p>
        </CardContent>
      </Card>
    </MotionDiv>
  );
}

