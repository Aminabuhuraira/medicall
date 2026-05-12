import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, ArrowRight } from 'lucide-react';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import { useAuth } from '../context/AuthContext.jsx';

export default function SignIn() {
  const [role, setRole] = useState('patient');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const nav = useNavigate();

  const submit = (e) => {
    e.preventDefault();
    const errs = {};
    if (!/^\S+@\S+\.\S+$/.test(email)) errs.email = 'Enter a valid email';
    if (password.length < 6) errs.password = 'At least 6 characters';
    setErrors(errs);
    if (Object.keys(errs).length) return;
    setLoading(true);
    setTimeout(() => {
      signIn(role, { email, name: email.split('@')[0] });
      nav(role === 'patient' ? '/dashboard/patient' : '/dashboard/doctor');
    }, 800);
  };

  return (
    <div className="relative flex-1 flex items-center justify-center p-5 lg:p-10 overflow-hidden">
      <div className="absolute inset-0 dots-bg opacity-60" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-cyan/10 blur-3xl rounded-full" />
      <div className="absolute -bottom-40 -right-40 w-[600px] h-[600px] bg-bio/5 blur-3xl rounded-full" />

      <Card glow className="relative w-full max-w-md p-8 animate-fadeUp">
        <h1 className="text-display text-3xl font-semibold tracking-tight">Welcome back</h1>
        <p className="text-sm text-ink-muted mt-1">Sign in to continue your care journey.</p>

        {/* Role pill toggle */}
        <div className="mt-6 relative grid grid-cols-2 p-1 rounded-btn bg-slate-100 border border-slate-200">
          <span
            className={`absolute top-1 bottom-1 w-1/2 rounded-[8px] bg-cyan/15 border border-cyan/40 transition-all duration-400 ease-smooth ${role === 'doctor' ? 'left-1/2' : 'left-1'}`}
            style={{ width: 'calc(50% - 4px)' }}
          />
          {['patient', 'doctor'].map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`relative z-10 py-2 text-sm font-medium capitalize transition-colors ${role === r ? 'text-cyan' : 'text-ink-muted hover:text-ink'}`}
            >
              {r}
            </button>
          ))}
        </div>

        <form onSubmit={submit} className="mt-6 space-y-4">
          <Input
            label="Email"
            type="email"
            leftIcon={<Mail size={14} />}
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            error={errors.email}
            autoComplete="email"
          />
          <Input
            label="Password"
            type="password"
            leftIcon={<Lock size={14} />}
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={errors.password}
            autoComplete="current-password"
          />
          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-ink-muted">
              <input type="checkbox" className="accent-cyan" /> Remember me
            </label>
            <a href="#" className="text-cyan hover:underline">Forgot password?</a>
          </div>
          <Button type="submit" className="w-full" loading={loading}>
            Sign in <ArrowRight size={14} />
          </Button>
        </form>

        <div className="my-5 flex items-center gap-3 text-[11px] text-ink-dim uppercase tracking-widest">
          <div className="flex-1 h-px bg-slate-200" /> or <div className="flex-1 h-px bg-slate-200" />
        </div>

        <Button variant="ghost" className="w-full">
          <svg width="14" height="14" viewBox="0 0 48 48" className="-ml-1"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.5 29.3 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3 0 5.7 1.1 7.8 3l5.7-5.7C33.6 6.1 29 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.2-.1-2.3-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 16.1 19 13 24 13c3 0 5.7 1.1 7.8 3l5.7-5.7C33.6 6.1 29 4 24 4 16.4 4 9.8 8.4 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5 0 9.5-1.9 12.9-5l-6-4.9c-2 1.4-4.5 2.3-7 2.3-5.3 0-9.7-3.4-11.3-8.1l-6.5 5C8.6 39.6 15.7 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4-4.1 5.1l6 4.9c-.4.4 6.8-5 6.8-14 0-1.2-.1-2.3-.4-3.5z"/></svg>
          Continue with Google
        </Button>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Don't have an account?{' '}
          <Link to={role === 'patient' ? '/register/patient' : '/register/doctor'} className="text-cyan hover:underline">
            Create one
          </Link>
        </p>
      </Card>
    </div>
  );
}
