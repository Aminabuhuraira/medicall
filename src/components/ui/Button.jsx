import { forwardRef } from 'react';

const variants = {
  primary:
    'bg-electric text-white hover:bg-electric-light hover:shadow-bloom disabled:opacity-50 shadow-[0_2px_12px_rgba(0,82,217,0.3)]',
  ghost:
    'bg-white text-ink hover:bg-slate-50 border border-border shadow-card',
  outline:
    'bg-transparent text-electric border border-electric/40 hover:bg-electric/8',
  danger:
    'bg-danger text-white hover:brightness-110 shadow-[0_2px_12px_rgba(255,45,85,0.3)]',
  success:
    'bg-emerald text-white hover:brightness-110 shadow-glowGreen',
  icon:
    'bg-white text-ink hover:bg-slate-50 border border-border shadow-card p-2',
};

const sizes = {
  sm: 'px-3 py-1.5 text-sm',
  md: 'px-5 py-2.5 text-sm',
  lg: 'px-6 py-3.5 text-base',
};

const Button = forwardRef(function Button(
  { variant = 'primary', size = 'md', className = '', children, onClick, type = 'button', disabled, loading, ...rest },
  ref
) {
  const handleClick = (e) => {
    const target = e.currentTarget;
    const r = target.getBoundingClientRect();
    target.style.setProperty('--rx', `${e.clientX - r.left}px`);
    target.style.setProperty('--ry', `${e.clientY - r.top}px`);
    onClick && onClick(e);
  };

  return (
    <button
      ref={ref}
      type={type}
      disabled={disabled || loading}
      onClick={handleClick}
      className={`btn-ripple btn-press inline-flex items-center justify-center gap-2 font-medium rounded-btn transition-all duration-300 ease-smooth ${variants[variant]} ${variant !== 'icon' ? sizes[size] : ''} ${className}`}
      {...rest}
    >
      {loading ? (
        <span className="inline-flex items-center gap-2">
          <span className="w-4 h-4 rounded-full border-2 border-current border-t-transparent animate-spin" />
          <span>Working…</span>
        </span>
      ) : children}
    </button>
  );
});

export default Button;
