import { forwardRef } from 'react';

const Input = forwardRef(function Input(
  { label, error, hint, leftIcon, rightIcon, className = '', wrapperClassName = '', as = 'input', ...rest },
  ref
) {
  const Comp = as;
  return (
    <label className={`block ${wrapperClassName}`}>
      {label && (
        <span className="block text-xs font-medium tracking-wide uppercase text-ink-muted mb-1.5">{label}</span>
      )}
      <span className={`relative flex items-center`}>
        {leftIcon && <span className="absolute left-3 text-ink-muted">{leftIcon}</span>}
        <Comp
          ref={ref}
          className={`input-focus w-full bg-white border border-slate-200 text-ink rounded-btn px-4 py-3 text-sm placeholder:text-ink-dim transition-all ${leftIcon ? 'pl-10' : ''} ${rightIcon ? 'pr-10' : ''} ${error ? 'input-error' : ''} ${as === 'textarea' ? 'min-h-[110px] resize-y' : ''} ${className}`}
          {...rest}
        />
        {rightIcon && <span className="absolute right-3 text-ink-muted">{rightIcon}</span>}
      </span>
      {error ? (
        <span className="block mt-1.5 text-xs text-danger">{error}</span>
      ) : hint ? (
        <span className="block mt-1.5 text-xs text-ink-muted">{hint}</span>
      ) : null}
    </label>
  );
});

export default Input;
