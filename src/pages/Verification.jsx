import { Link } from 'react-router-dom';
import { ShieldCheck, FileText, Clock, CheckCircle2, ArrowRight } from 'lucide-react';
import Button from '../components/ui/Button.jsx';

const STEPS = [
  {
    icon: FileText,
    title: 'Submit your documents',
    desc: 'Upload your MDCN licence, board certifications, valid ID, and a recent passport photo through the app.',
  },
  {
    icon: ShieldCheck,
    title: 'Background screening',
    desc: 'Our team runs a criminal background check and verifies your credentials with the Medical and Dental Council of Nigeria.',
  },
  {
    icon: Clock,
    title: 'Review (24–72 hours)',
    desc: 'Our credentialing team reviews your submission. Most applications are approved within three business days.',
  },
  {
    icon: CheckCircle2,
    title: 'Go live',
    desc: 'Once approved, your profile is published and patients can start booking you immediately.',
  },
];

const REQUIRED = [
  'MDCN full registration licence (current)',
  'Specialist certificate (if applicable)',
  'Government-issued photo ID (NIN or passport)',
  'Recent passport photograph',
  'Proof of professional indemnity insurance',
  'Bank account details for payouts',
];

export default function Verification() {
  return (
    <div style={{ background: '#F4F8FF', minHeight: '100vh' }}>
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pt-20 pb-14 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          style={{ background: 'rgba(0,82,217,0.08)', color: '#0052D9', border: '1px solid rgba(0,82,217,0.18)' }}>
          <ShieldCheck size={12} /> Doctor Verification
        </span>
        <h1 className="text-display text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0B1D35', letterSpacing: '-0.03em' }}>
          Trust starts with <span style={{ color: '#0052D9' }}>verification</span>
        </h1>
        <p className="text-lg max-w-2xl mx-auto mb-8" style={{ color: '#3D5A80' }}>
          Every MediCall doctor is rigorously verified before going live — so patients always know they're in safe hands.
        </p>
        <Link to="/register/doctor">
          <Button size="lg" style={{ background: '#0052D9', color: '#fff', borderRadius: 12, fontWeight: 700, padding: '14px 32px' }}>
            Start your application <ArrowRight size={16} />
          </Button>
        </Link>
      </section>

      {/* Steps */}
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pb-14 grid sm:grid-cols-2 gap-6">
        {STEPS.map(({ icon: Icon, title, desc }) => (
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

      {/* Required docs */}
      <section className="max-w-3xl mx-auto px-5 lg:px-8 pb-24">
        <div className="glass p-8">
          <h2 className="text-display text-xl font-bold mb-6" style={{ color: '#0B1D35' }}>Documents required</h2>
          <ul className="space-y-3">
            {REQUIRED.map(doc => (
              <li key={doc} className="flex items-center gap-3 text-sm" style={{ color: '#0B1D35' }}>
                <CheckCircle2 size={16} className="shrink-0" style={{ color: '#059669' }} /> {doc}
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  );
}
