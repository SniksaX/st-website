"use client";
import * as React from "react";

export default React.memo(function BackgroundBlobs() {
  return (
    // fixé au viewport, sous le contenu, au-dessus du fond de <body>
    <div aria-hidden className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {/* motif léger */}
      <div className="absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.03)_1px)] [background-size:16px_16px]" />
      {/* blobs – opacité un peu plus forte pour qu’on les voie bien */}
      <div className="absolute -top-[15%] -left-[10%] w-[520px] h-[520px] rounded-full blur-3xl bg-gradient-to-r from-pink-500/40 to-purple-500/40 animate-none" />
      <div className="absolute -bottom-[15%] -right-[12%] w-[580px] h-[580px] rounded-full blur-3xl bg-gradient-to-r from-cyan-500/35 to-blue-500/35 animate-spin-slow" />
      <div className="absolute top-[18%] right-[8%] w-[420px] h-[420px] rounded-full blur-3xl bg-gradient-to-r from-yellow-400/30 to-orange-500/30 animate-none" />
    </div>
  );
});
