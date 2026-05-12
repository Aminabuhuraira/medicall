const tones = {
  cyan: 'bg-cyan/10 text-cyan border-cyan/30',
  green: 'bg-bio/10 text-bio border-bio/30 shadow-glowGreen',
  amber: 'bg-amber-50 text-amber-600 border-amber-200',
  red: 'bg-danger/10 text-danger border-danger/30',
  ink: 'bg-slate-100 text-ink-muted border-slate-200',
};

export default function Badge({ tone = 'cyan', dot = false, breathing = false, className = '', children }) {
  return (
    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full border text-[11px] font-medium tracking-wide uppercase ${tones[tone]} ${className}`}>
      {dot && <span className={`w-1.5 h-1.5 rounded-full bg-current ${breathing ? 'animate-breathe' : ''}`} />}
      {children}
    </span>
  );
}
