import { Newspaper, ArrowRight, ExternalLink } from 'lucide-react';

const COVERAGE = [
  { outlet: 'TechCabal', date: 'March 2026', title: 'MediCall is bringing the Uber model to Nigerian healthcare — and it\'s working', href: '#' },
  { outlet: 'Nairametrics', date: 'February 2026', title: 'Nigerian healthtech startup MediCall raises $2.1M pre-seed round', href: '#' },
  { outlet: 'Ventures Africa', date: 'January 2026', title: 'How MediCall is solving the last-mile problem in African primary care', href: '#' },
  { outlet: 'The Guardian Nigeria', date: 'December 2025', title: 'A doctor to your doorstep in 15 minutes: inside MediCall\'s Abuja pilot', href: '#' },
];

const DOWNLOADS = [
  { label: 'MediCall brand kit (logos, colours, guidelines)', file: '#' },
  { label: 'Company fact sheet (PDF)', file: '#' },
  { label: 'Founder headshots', file: '#' },
  { label: 'Product screenshots (hi-res)', file: '#' },
];

export default function Press() {
  return (
    <div style={{ background: '#F4F8FF', minHeight: '100vh' }}>
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pt-20 pb-14 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          style={{ background: 'rgba(0,82,217,0.08)', color: '#0052D9', border: '1px solid rgba(0,82,217,0.18)' }}>
          <Newspaper size={12} /> Press
        </span>
        <h1 className="text-display text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0B1D35', letterSpacing: '-0.03em' }}>
          MediCall in the news
        </h1>
        <p className="text-lg max-w-xl mx-auto" style={{ color: '#3D5A80' }}>
          For press enquiries, contact{' '}
          <a href="mailto:press@medicall.ng" style={{ color: '#0052D9', fontWeight: 600 }}>press@medicall.ng</a>
        </p>
      </section>

      {/* Coverage */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pb-14 space-y-4">
        {COVERAGE.map(c => (
          <a key={c.title} href={c.href}
            className="glass p-6 flex items-start justify-between gap-4 group block transition-all"
            style={{ textDecoration: 'none' }}>
            <div>
              <div className="flex items-center gap-3 mb-1.5">
                <span className="text-xs font-bold uppercase tracking-widest" style={{ color: '#0052D9' }}>{c.outlet}</span>
                <span className="text-xs" style={{ color: '#7A9ABB' }}>{c.date}</span>
              </div>
              <div className="font-semibold" style={{ color: '#0B1D35' }}>{c.title}</div>
            </div>
            <ExternalLink size={16} className="shrink-0 mt-1" style={{ color: '#7A9ABB' }} />
          </a>
        ))}
      </section>

      {/* Downloads */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pb-24">
        <div className="glass p-8">
          <h2 className="text-display text-xl font-bold mb-6" style={{ color: '#0B1D35' }}>Media downloads</h2>
          <ul className="space-y-3">
            {DOWNLOADS.map(d => (
              <li key={d.label}>
                <a href={d.file} className="flex items-center gap-3 text-sm font-medium transition-colors"
                  style={{ color: '#0052D9' }}>
                  <ArrowRight size={14} /> {d.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
