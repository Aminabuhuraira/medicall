import { Heart, Users, Globe2, Stethoscope } from 'lucide-react';

const VALUES = [
  { icon: Heart, title: 'Patient-first', desc: 'Every decision we make starts with one question: is this better for the patient?' },
  { icon: ShieldCheck, title: 'Trust & safety', desc: 'Verified doctors, encrypted data, and transparent pricing — always.' },
  { icon: Globe2, title: 'Built for Africa', desc: 'Designed ground-up for Nigerian healthcare realities, with plans to expand continent-wide.' },
  { icon: Users, title: 'Community', desc: 'We partner with local health workers, clinics, and hospitals to strengthen the system.' },
];

import { ShieldCheck } from 'lucide-react';

const TEAM = [
  { name: 'Dr. Amina Bello', role: 'Co-founder & CEO', bg: '#0052D9' },
  { name: 'Chidi Okonkwo', role: 'Co-founder & CTO', bg: '#059669' },
  { name: 'Hauwa Sule', role: 'Chief Medical Officer', bg: '#7C3AED' },
  { name: 'Emeka Eze', role: 'Head of Operations', bg: '#D97706' },
];

export default function About() {
  return (
    <div style={{ background: '#F4F8FF', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pt-20 pb-16 text-center">
        <div className="w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-6"
          style={{ background: 'rgba(0,82,217,0.1)', border: '1px solid rgba(0,82,217,0.2)' }}>
          <Stethoscope size={28} style={{ color: '#0052D9' }} />
        </div>
        <h1 className="text-display text-4xl md:text-5xl font-bold mb-5" style={{ color: '#0B1D35', letterSpacing: '-0.03em' }}>
          Healthcare, on your terms
        </h1>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: '#3D5A80' }}>
          MediCall was founded in 2024 with a simple mission: make quality healthcare as easy to access as ordering food. We connect Nigerians with verified doctors — at home, on video, or in clinic — in minutes, not days.
        </p>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pb-14 grid grid-cols-2 md:grid-cols-4 gap-5">
        {[
          { n: '50,000+', l: 'Consultations completed' },
          { n: '200+', l: 'Verified doctors' },
          { n: '4.9★', l: 'Average rating' },
          { n: '6', l: 'Cities covered' },
        ].map(s => (
          <div key={s.l} className="glass p-6 text-center">
            <div className="text-display text-2xl font-bold mb-1" style={{ color: '#0052D9' }}>{s.n}</div>
            <div className="text-sm" style={{ color: '#3D5A80' }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* Values */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pb-14">
        <h2 className="text-display text-2xl font-bold text-center mb-8" style={{ color: '#0B1D35' }}>Our values</h2>
        <div className="grid sm:grid-cols-2 gap-5">
          {VALUES.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="glass p-6 flex gap-4">
              <span className="w-11 h-11 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(0,82,217,0.09)', color: '#0052D9' }}>
                <Icon size={20} />
              </span>
              <div>
                <div className="font-semibold mb-1" style={{ color: '#0B1D35' }}>{title}</div>
                <p className="text-sm" style={{ color: '#3D5A80' }}>{desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Team */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pb-24">
        <h2 className="text-display text-2xl font-bold text-center mb-8" style={{ color: '#0B1D35' }}>Meet the team</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
          {TEAM.map(m => (
            <div key={m.name} className="glass p-6 text-center flex flex-col items-center gap-3">
              <div className="w-14 h-14 rounded-full flex items-center justify-center text-white text-lg font-bold"
                style={{ background: m.bg }}>
                {m.name.split(' ').map(w => w[0]).join('')}
              </div>
              <div>
                <div className="font-semibold text-sm" style={{ color: '#0B1D35' }}>{m.name}</div>
                <div className="text-xs mt-0.5" style={{ color: '#7A9ABB' }}>{m.role}</div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
