'use client';

export default function GradientBG() {
  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 select-none overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.4)_1px)] dark:bg-[radial-gradient(transparent_1px,rgba(0,0,0,0.4)_1px)] [background-size:16px_16px] opacity-[0.12]" />
      <div className="absolute top-[-10rem] left-[-10rem] h-[55rem] w-[55rem] rounded-full bg-fuchsia-500/15 blur-[140px]" />
      <div className="absolute bottom-[-10rem] right-[-10rem] h-[50rem] w-[50rem] rounded-full bg-orange-500/15 blur-[140px]" />
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-neutral-950 to-transparent" />
    </div>
  );
}

