export default function Toggle({ checked, onChange, labelOn = 'Online', labelOff = 'Offline' }) {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className={`relative inline-flex items-center gap-3 group select-none`}
      aria-pressed={checked}
    >
      <span
        className={`relative w-16 h-9 rounded-full transition-all duration-500 ease-smooth border ${
          checked
            ? 'bg-bio/20 border-bio/60 shadow-glowGreen'
            : 'bg-slate-100 border-slate-200'
        }`}
      >
        <span
          className={`absolute top-1 left-1 w-7 h-7 rounded-full transition-all duration-500 ease-smooth ${
            checked ? 'translate-x-7 bg-bio' : 'bg-ink-muted'
          }`}
        />
      </span>
      <span className={`text-sm font-semibold tracking-wide ${checked ? 'text-bio' : 'text-ink-muted'}`}>
        {checked ? labelOn : labelOff}
      </span>
    </button>
  );
}
