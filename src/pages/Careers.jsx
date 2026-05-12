import { Link } from 'react-router-dom';
import { Briefcase, ArrowRight, MapPin, Zap } from 'lucide-react';
import Button from '../components/ui/Button.jsx';

const ROLES = [
  { dept: 'Engineering', title: 'Senior Frontend Engineer', loc: 'Abuja (Hybrid)', type: 'Full-time' },
  { dept: 'Engineering', title: 'Backend Engineer (Node.js)', loc: 'Remote', type: 'Full-time' },
  { dept: 'Product', title: 'Product Manager — Patient Experience', loc: 'Abuja', type: 'Full-time' },
  { dept: 'Clinical', title: 'Clinical Operations Lead', loc: 'Abuja', type: 'Full-time' },
  { dept: 'Design', title: 'Product Designer', loc: 'Remote', type: 'Full-time' },
  { dept: 'Growth', title: 'Doctor Partnerships Manager', loc: 'Lagos / Abuja', type: 'Full-time' },
];

const PERKS = [
  'Competitive salary + equity', 'Full remote flexibility', 'Health insurance for you & family',
  'Learning & development budget', '20 days annual leave', 'MacBook + home office setup',
];

export default function Careers() {
  return (
    <div style={{ background: '#F4F8FF', minHeight: '100vh' }}>
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pt-20 pb-14 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          style={{ background: 'rgba(0,82,217,0.08)', color: '#0052D9', border: '1px solid rgba(0,82,217,0.18)' }}>
          <Briefcase size={12} /> Careers
        </span>
        <h1 className="text-display text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0B1D35', letterSpacing: '-0.03em' }}>
          Build the future of<br /><span style={{ color: '#0052D9' }}>African healthcare</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: '#3D5A80' }}>
          We're a small, ambitious team on a mission to make quality healthcare accessible to every Nigerian. Come help us do it.
        </p>
      </section>

      {/* Perks */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pb-14 flex flex-wrap justify-center gap-3">
        {PERKS.map(p => (
          <span key={p} className="px-4 py-2 rounded-full text-sm font-medium"
            style={{ background: 'rgba(5,150,105,0.08)', color: '#059669', border: '1px solid rgba(5,150,105,0.18)' }}>
            {p}
          </span>
        ))}
      </section>

      {/* Open roles */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pb-24">
        <h2 className="text-display text-2xl font-bold mb-8" style={{ color: '#0B1D35' }}>Open roles</h2>
        <div className="space-y-4">
          {ROLES.map(r => (
            <div key={r.title} className="glass p-5 flex items-center justify-between gap-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-widest" style={{ color: '#7A9ABB' }}>{r.dept}</span>
                <div className="font-semibold mt-0.5" style={{ color: '#0B1D35' }}>{r.title}</div>
                <div className="flex items-center gap-3 mt-1 text-xs" style={{ color: '#7A9ABB' }}>
                  <span className="flex items-center gap-1"><MapPin size={11} />{r.loc}</span>
                  <span>{r.type}</span>
                </div>
              </div>
              <a href="mailto:careers@medicall.ng"
                className="shrink-0 flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-all"
                style={{ background: 'rgba(0,82,217,0.08)', color: '#0052D9', border: '1px solid rgba(0,82,217,0.18)' }}>
                Apply <ArrowRight size={14} />
              </a>
            </div>
          ))}
        </div>
        <p className="text-center text-sm mt-8" style={{ color: '#7A9ABB' }}>
          Don't see a role? Email us at{' '}
          <a href="mailto:careers@medicall.ng" style={{ color: '#0052D9' }}>careers@medicall.ng</a>
        </p>
      </section>
    </div>
  );
}
