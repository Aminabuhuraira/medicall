import { Link } from 'react-router-dom';
import { MapPin, Clock, ShieldCheck, Star, ArrowRight, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button.jsx';

const STEPS = [
  { n: '01', title: 'Open the app', desc: 'Log in and tap "Book a home visit" from your dashboard.' },
  { n: '02', title: 'Choose a doctor', desc: 'Browse verified doctors nearby, filter by specialty, rating, or fee.' },
  { n: '03', title: 'Confirm your address', desc: 'We confirm your location so the doctor navigates straight to you.' },
  { n: '04', title: 'Doctor arrives', desc: 'Track your doctor live on the map — right to your doorstep.' },
];

const PERKS = [
  { icon: Clock, text: 'Doctors at your door in as little as 15 minutes' },
  { icon: ShieldCheck, text: 'Every doctor is verified, licensed, and background-checked' },
  { icon: Star, text: 'Rated 4.9/5 by thousands of patients across Abuja' },
  { icon: MapPin, text: 'Real-time GPS tracking from dispatch to arrival' },
];

export default function HomeVisits() {
  return (
    <div style={{ background: '#F4F8FF', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pt-20 pb-16 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          style={{ background: 'rgba(0,82,217,0.08)', color: '#0052D9', border: '1px solid rgba(0,82,217,0.18)' }}>
          <MapPin size={12} /> Home Visits
        </span>
        <h1 className="text-display text-4xl md:text-5xl font-bold mb-5" style={{ color: '#0B1D35', letterSpacing: '-0.03em' }}>
          A doctor at your door.<br />
          <span style={{ color: '#0052D9' }}>No waiting rooms.</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: '#3D5A80' }}>
          MediCall brings certified doctors to your home, office, or wherever you are — typically within 15–30 minutes.
        </p>
        <Link to="/dashboard/patient">
          <Button size="lg" style={{ background: '#0052D9', color: '#fff', borderRadius: 12, fontWeight: 700, padding: '14px 32px' }}>
            Book a home visit <ArrowRight size={16} />
          </Button>
        </Link>
      </section>

      {/* Perks */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pb-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {PERKS.map(({ icon: Icon, text }) => (
          <div key={text} className="glass p-5 flex flex-col gap-3">
            <span className="w-10 h-10 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,82,217,0.09)', color: '#0052D9' }}>
              <Icon size={18} />
            </span>
            <p className="text-sm font-medium" style={{ color: '#0B1D35' }}>{text}</p>
          </div>
        ))}
      </section>

      {/* How it works */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pb-24">
        <h2 className="text-display text-2xl font-bold text-center mb-10" style={{ color: '#0B1D35' }}>How it works</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {STEPS.map(s => (
            <div key={s.n} className="glass p-6 flex gap-4">
              <span className="text-display text-2xl font-bold shrink-0" style={{ color: 'rgba(0,82,217,0.18)' }}>{s.n}</span>
              <div>
                <div className="font-semibold mb-1" style={{ color: '#0B1D35' }}>{s.title}</div>
                <p className="text-sm" style={{ color: '#3D5A80' }}>{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
