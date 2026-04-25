export default function GlassCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-white/10 bg-white/[0.04] p-5 shadow-sm">
      <h3 className="m-0 text-white font-semibold">
        <span className="bg-gradient-to-r from-white to-white/60 bg-clip-text text-transparent">{title}</span>
      </h3>
      <div className="mt-2 text-white/90 leading-relaxed text-[15px]">{children}</div>
    </div>
  );
}
