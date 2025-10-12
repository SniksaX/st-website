export default function GlassMini({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-4">
      <h4 className="text-sm font-semibold text-white/90 m-0">
        <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">{title}</span>
      </h4>
      <div className="mt-2">{children}</div>
    </div>
  );
}
