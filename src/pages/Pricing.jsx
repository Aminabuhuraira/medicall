import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, Zap } from 'lucide-react';
import Button from '../components/ui/Button.jsx';

const PLANS = [
  {
    name: 'Basic',
    tag: null,
    price: '₦5,000',
    period: 'per visit',
    desc: 'For occasional, on-demand care.',
    features: ['Home visit by GP', 'Digital prescription', 'Visit summary report', 'In-app messaging (24h)'],
    cta: 'Book now',
    highlight: false,
  },
  {
    name: 'Standard',
    tag: 'Most popular',
    price: '₦18,000',
    period: 'per month',
    desc: 'Unlimited access for individuals.',
    features: [
      'Unlimited GP home visits', 'Unlimited video consults', '1 specialist referral/month',
      'Digital prescriptions', 'Priority support', 'Family add-on available',
    ],
    cta: 'Get started',
    highlight: true,
  },
  {
    name: 'Family',
    tag: null,
    price: '₦45,000',
    period: 'per month',
    desc: 'Full coverage for up to 5 members.',
    features: [
      'All Standard features', 'Coverage for up to 5 people', '3 specialist referrals/month',
      'Child & elderly care visits', 'Dedicated family health manager',
    ],
    cta: 'Get the family plan',
    highlight: false,
  },
];

export default function Pricing() {
  return (
    <div style={{ background: '#F4F8FF', minHeight: '100vh' }}>
      {/* Hero */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pt-20 pb-14 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          style={{ background: 'rgba(0,82,217,0.08)', color: '#0052D9', border: '1px solid rgba(0,82,217,0.18)' }}>
          <Zap size={12} /> Pricing
        </span>
        <h1 className="text-display text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0B1D35', letterSpacing: '-0.03em' }}>
          Simple, transparent pricing
        </h1>
        <p className="text-lg" style={{ color: '#3D5A80' }}>No hidden fees. Pay only for what you use, or save with a monthly plan.</p>
      </section>

      {/* Plans */}
      <section className="max-w-5xl mx-auto px-5 lg:px-8 pb-20 grid md:grid-cols-3 gap-6 items-start">
        {PLANS.map(plan => (
          <div key={plan.name} className="glass p-7 flex flex-col gap-5 relative"
            style={plan.highlight ? { border: '2px solid rgba(0,82,217,0.5)', boxShadow: '0 0 40px rgba(0,82,217,0.12)' } : {}}>
            {plan.tag && (
              <span className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold uppercase tracking-widest"
                style={{ background: '#0052D9', color: '#fff' }}>{plan.tag}</span>
            )}
            <div>
              <div className="font-bold text-lg mb-1" style={{ color: '#0B1D35' }}>{plan.name}</div>
              <div className="flex items-end gap-1.5">
                <span className="text-display text-3xl font-bold" style={{ color: plan.highlight ? '#0052D9' : '#0B1D35' }}>{plan.price}</span>
                <span className="text-sm pb-1" style={{ color: '#7A9ABB' }}>{plan.period}</span>
              </div>
              <p className="text-sm mt-1.5" style={{ color: '#3D5A80' }}>{plan.desc}</p>
            </div>
            <ul className="space-y-2.5 flex-1">
              {plan.features.map(f => (
                <li key={f} className="flex items-start gap-2.5 text-sm" style={{ color: '#0B1D35' }}>
                  <CheckCircle2 size={15} className="shrink-0 mt-0.5" style={{ color: '#059669' }} /> {f}
                </li>
              ))}
            </ul>
            <Link to="/register/patient">
              <Button className="w-full" style={plan.highlight
                ? { background: '#0052D9', color: '#fff', borderRadius: 10, fontWeight: 700, padding: '12px 0' }
                : { borderRadius: 10, fontWeight: 600, padding: '12px 0' }}>
                {plan.cta} <ArrowRight size={14} />
              </Button>
            </Link>
          </div>
        ))}
      </section>

      {/* Note */}
      <p className="text-center text-sm pb-16" style={{ color: '#7A9ABB' }}>
        All prices in Naira (₦). Specialist fees may vary. Cancel anytime.
      </p>
    </div>
  );
}
