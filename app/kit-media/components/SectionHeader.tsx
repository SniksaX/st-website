export default function SectionHeader({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between gap-4 flex-wrap">
        <h2 className="m-0 text-3xl font-bold tracking-tight relative">
          {/* Texte transparent + gradient clip */}
          <span
            className="bg-clip-text text-transparent"
            style={{
              backgroundImage: "var(--grad-1)",          // utilise ton gradient brand
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              filter: "brightness(1.25) contrast(1.05)",  // boost léger pour le rendre lisible
              // filet quasi invisible pour les bords sombres du gradient
              textShadow: "0 0 0.5px rgba(255,255,255,0.2)",
            }}
          >
            {title}
          </span>
        </h2>

        {subtitle && (
          <div className="shrink-0 inline-flex items-center rounded-full border border-white/10 bg-white/[0.06] px-3 py-[3px] text-[11px] text-white/70 uppercase tracking-wider">
            {subtitle}
          </div>
        )}
      </div>
    </div>
  );
}
