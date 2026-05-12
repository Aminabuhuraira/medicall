import { Link, NavLink, useLocation } from 'react-router-dom';
import { Stethoscope, LogOut } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../ui/Button.jsx';

export default function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const isFullScreen = location.pathname.startsWith('/track');

  if (isFullScreen) return null;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-white/80 border-b border-border shadow-[0_1px_12px_rgba(5,23,66,0.07)]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group">
          <span className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan/30 to-bio/20 border border-cyan/30 flex items-center justify-center shadow-glow">
            <Stethoscope className="w-4.5 h-4.5 text-cyan" size={18} />
          </span>
          <span className="text-display text-lg font-semibold tracking-tight">
            Medi<span className="text-cyan">Call</span>
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-1">
          {[
            { to: '/', label: 'Home' },
            { to: '/dashboard/patient', label: 'For patients' },
            { to: '/dashboard/doctor', label: 'For doctors' },
          ].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              className={({ isActive }) =>
                `px-3 py-1.5 text-sm rounded-btn transition-all ${
                isActive ? 'text-electric bg-electric/8' : 'text-ink-muted hover:text-ink hover:bg-slate-50'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {user ? (
            <>
              <span className="hidden sm:inline text-xs text-ink-muted">
                Signed in as <span className="text-ink">{user.name || user.role}</span>
              </span>
              <Button variant="ghost" size="sm" onClick={signOut}>
                <LogOut size={14} /> Sign out
              </Button>
            </>
          ) : (
            <>
              <Link to="/signin">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link to="/register/patient" className="hidden sm:inline-flex">
                <Button size="sm">Get started</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}
