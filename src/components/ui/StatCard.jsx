export function StatCard({ label, children, tone, icon }) {
  return (
    <div
      className={`rounded-xl border p-3 ${
        tone === "brand"
          ? "border-brand-teal/30 bg-brand-teal/[0.06]"
          : "border-white/10 bg-white/[0.03]"
      }`}
    >
      <div className="mb-1 flex items-center gap-1.5">
        {icon && <span className="text-cyan-100/50">{icon}</span>}
        <p className="text-[10px] font-semibold text-cyan-100/50">{label}</p>
      </div>
      <p className="text-sm font-bold text-cyan-50">{children}</p>
    </div>
  );
}

export function SectionTitle({ children, icon }) {
  return (
    <h4 className="mb-2 flex items-center gap-2 text-xs font-bold uppercase tracking-wide text-cyan-100/50">
      {icon}
      {children}
    </h4>
  );
}
