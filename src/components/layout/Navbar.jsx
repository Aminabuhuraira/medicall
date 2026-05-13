import { useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Stethoscope, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext.jsx';
import Button from '../ui/Button.jsx';

const NAV_LINKS = [
  { to: '/', label: 'Home' },
  { to: '/dashboard/patient', label: 'For patients' },
  { to: '/dashboard/doctor', label: 'For doctors' },
];

export default function Navbar() {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);
  const isFullScreen = location.pathname.startsWith('/track');

  if (isFullScreen) return null;

  return (
    <header className="sticky top-0 z-40 backdrop-blur-2xl bg-white/80 border-b border-border shadow-[0_1px_12px_rgba(5,23,66,0.07)]">
      <div className="max-w-7xl mx-auto px-5 lg:px-8 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2.5 group" onClick={() => setMobileOpen(false)}>
          <span className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-cyan/30 to-bio/20 border border-cyan/30 flex items-center justify-center shadow-glow">
            <Stethoscope className="w-4.5 h-4.5 text-cyan" size={18} />
          </span>
          <span className="text-display text-lg font-semibold tracking-tight">
            Medi<span className="text-cyan">Call</span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {NAV_LINKS.map((l) => (
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
              <Link to="/signin" className="hidden md:inline-flex">
                <Button variant="ghost" size="sm">Sign in</Button>
              </Link>
              <Link to="/register/patient" className="hidden md:inline-flex">
                <Button size="sm">Get started</Button>
              </Link>
            </>
          )}

          {/* Hamburger — mobile only */}
          <button
            onClick={() => setMobileOpen((o) => !o)}
            className="md:hidden p-2 rounded-btn text-ink-muted hover:text-ink hover:bg-slate-100 transition-all"
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div className="md:hidden border-t border-border bg-white/97 backdrop-blur-xl px-5 py-4 space-y-1 animate-fadeUp">
          {NAV_LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end={l.to === '/'}
              onClick={() => setMobileOpen(false)}
              className={({ isActive }) =>
                `block px-3 py-2.5 text-sm rounded-btn transition-all ${
                  isActive ? 'text-electric bg-electric/8' : 'text-ink-muted hover:text-ink hover:bg-slate-50'
                }`
              }
            >
              {l.label}
            </NavLink>
          ))}
          {!user ? (
            <div className="flex gap-2 pt-2 border-t border-slate-100 mt-2">
              <Link to="/signin" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button variant="ghost" size="sm" className="w-full">Sign in</Button>
              </Link>
              <Link to="/register/patient" className="flex-1" onClick={() => setMobileOpen(false)}>
                <Button size="sm" className="w-full">Get started</Button>
              </Link>
            </div>
          ) : (
            <div className="pt-2 border-t border-slate-100 mt-2">
              <div className="text-xs text-ink-muted px-3 mb-2">Signed in as {user.name || user.role}</div>
              <button onClick={() => { signOut(); setMobileOpen(false); }}
                className="flex items-center gap-2 text-sm text-ink-muted px-3 py-2 rounded-btn hover:bg-slate-50 w-full">
                <LogOut size={14} /> Sign out
              </button>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
