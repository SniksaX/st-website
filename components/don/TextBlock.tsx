'use client';
import type React from 'react';
import { MotionDiv } from '@/components/ClientMotion';

type TextBlockProps = {
  children: React.ReactNode;
  delay?: number;
};

export default function TextBlock({ children, delay = 0 }: TextBlockProps) {
  return (
    <MotionDiv
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="prose max-w-none text-muted-foreground leading-relaxed">{children}</div>
    </MotionDiv>
  );
}

