const sizes = { sm: 'w-8 h-8', md: 'w-12 h-12', lg: 'w-16 h-16', xl: 'w-20 h-20' };

export default function Avatar({ src, name = '', size = 'md', online, className = '' }) {
  const initials = name
    .replace(/^Dr\.?\s*/i, '')
    .split(' ')
    .map((p) => p[0])
    .filter(Boolean)
    .slice(0, 2)
    .join('')
    .toUpperCase();

  return (
    <span className={`relative inline-flex shrink-0 ${sizes[size]} ${className}`}>
      <span className={`absolute inset-0 rounded-full overflow-hidden border border-slate-200 bg-surface flex items-center justify-center text-cyan font-semibold text-sm`}>
        {src ? (
          <img src={src} alt={name} loading="lazy" className="w-full h-full object-cover" onError={(e)=>{ e.currentTarget.style.display='none'; }} />
        ) : null}
        <span className="absolute text-mono">{initials}</span>
      </span>
      {online !== undefined && (
        <span
          className={`absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-base ${
            online ? 'bg-bio shadow-glowGreen animate-breathe' : 'bg-ink-dim'
          }`}
        />
      )}
    </span>
  );
}
