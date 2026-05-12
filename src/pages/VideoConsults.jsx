import { Link } from 'react-router-dom';
import { Video, Clock, ShieldCheck, Wifi, ArrowRight, Mic, Monitor } from 'lucide-react';
import Button from '../components/ui/Button.jsx';

const FEATURES = [
  { icon: Clock, title: 'Available 24/7', desc: 'Book a video call any time of day or night — doctors are always on.' },
  { icon: ShieldCheck, title: 'Secure & private', desc: 'All calls are end-to-end encrypted. Your health data stays yours.' },
  { icon: Wifi, title: 'Works on any device', desc: 'Join from your phone, tablet, or laptop — no downloads needed.' },
  { icon: Mic, title: 'Prescriptions issued', desc: 'Doctors can issue digital prescriptions and referral letters.' },
];

const SUITED = [
  'Follow-up consultations', 'Mental health sessions', 'Skin & dermatology review',
  'Medication reviews', 'Second opinions', 'Lab result discussions', 'Nutrition & wellness',
];

export default function VideoConsults() {
  return (
    <div style={{ background: '#F4F8FF', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pt-20 pb-16 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          style={{ background: 'rgba(0,82,217,0.08)', color: '#0052D9', border: '1px solid rgba(0,82,217,0.18)' }}>
          <Video size={12} /> Video Consults
        </span>
        <h1 className="text-display text-4xl md:text-5xl font-bold mb-5" style={{ color: '#0B1D35', letterSpacing: '-0.03em' }}>
          See a doctor without<br />
          <span style={{ color: '#0052D9' }}>leaving home.</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: '#3D5A80' }}>
          HD video consultations with licensed doctors. Get the care you need in minutes — no commute, no waiting room, no stress.
        </p>
        <Link to="/dashboard/patient">
          <Button size="lg" style={{ background: '#0052D9', color: '#fff', borderRadius: 12, fontWeight: 700, padding: '14px 32px' }}>
            Start a video consult <ArrowRight size={16} />
          </Button>
        </Link>
      </section>

      {/* Features */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pb-16 grid sm:grid-cols-2 gap-5">
        {FEATURES.map(({ icon: Icon, title, desc }) => (
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
      </section>

      {/* Best suited for */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pb-24">
        <h2 className="text-display text-2xl font-bold text-center mb-8" style={{ color: '#0B1D35' }}>
          Best suited for
        </h2>
        <div className="flex flex-wrap justify-center gap-3">
          {SUITED.map(s => (
            <span key={s} className="px-4 py-2 rounded-full text-sm font-medium"
              style={{ background: 'rgba(0,82,217,0.07)', color: '#0052D9', border: '1px solid rgba(0,82,217,0.15)' }}>
              {s}
            </span>
          ))}
        </div>
      </section>
    </div>
  );
}
