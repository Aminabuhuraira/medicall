import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Clock, ShieldCheck, Wallet } from 'lucide-react';
import Button from '../components/ui/Button.jsx';

const STEPS = [
  { n: '01', title: 'Complete a consultation', desc: 'Finish the home visit or video call. The patient pays upfront through MediCall.' },
  { n: '02', title: 'Earnings credited', desc: 'Your fee (minus the platform commission) is credited to your MediCall wallet instantly.' },
  { n: '03', title: 'Request a payout', desc: 'Request a payout to your bank account at any time — processed within 24 hours.' },
  { n: '04', title: 'Grow your earnings', desc: 'Maintain high ratings and availability to get featured and earn bonuses.' },
];

const STATS = [
  { n: '₦250k+', l: 'Average monthly earnings for top doctors' },
  { n: '24h', l: 'Maximum payout processing time' },
  { n: '10%', l: 'Platform commission — one of the lowest' },
  { n: '0', l: 'Hidden fees or deductions' },
];

export default function Payouts() {
  return (
    <div style={{ background: '#F4F8FF', minHeight: '100vh' }}>
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pt-20 pb-14 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          style={{ background: 'rgba(0,82,217,0.08)', color: '#0052D9', border: '1px solid rgba(0,82,217,0.18)' }}>
          <Wallet size={12} /> How payouts work
        </span>
        <h1 className="text-display text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0B1D35', letterSpacing: '-0.03em' }}>
          Earn more with <span style={{ color: '#0052D9' }}>MediCall</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: '#3D5A80' }}>
          Transparent earnings, fast payouts, no surprises. Set your own schedule and earn on your terms.
        </p>
        <Link to="/register/doctor">
          <Button size="lg" style={{ background: '#0052D9', color: '#fff', borderRadius: 12, fontWeight: 700, padding: '14px 32px' }}>
            Join as a doctor <ArrowRight size={16} />
          </Button>
        </Link>
      </section>

      {/* Stats */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pb-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {STATS.map(s => (
          <div key={s.l} className="glass p-6 text-center">
            <div className="text-display text-2xl font-bold mb-1" style={{ color: '#0052D9' }}>{s.n}</div>
            <div className="text-sm" style={{ color: '#3D5A80' }}>{s.l}</div>
          </div>
        ))}
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pb-24">
        <h2 className="text-display text-2xl font-bold text-center mb-10" style={{ color: '#0B1D35' }}>How it works</h2>
        <div className="grid sm:grid-cols-2 gap-6">
          {STEPS.map(s => (
            <div key={s.n} className="glass p-6 flex gap-4">
              <span className="text-display text-2xl font-bold shrink-0" style={{ color: 'rgba(0,82,217,0.2)' }}>{s.n}</span>
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
