import { BookOpen, FileText, Video, HelpCircle, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const CATEGORIES = [
  {
    icon: BookOpen,
    title: 'Getting started',
    desc: 'Everything you need to set up your MediCall doctor profile and start accepting patients.',
    links: ['Creating your profile', 'Setting availability', 'Your first consultation', 'Profile verification guide'],
  },
  {
    icon: Video,
    title: 'Video consultations',
    desc: 'Tips and best practices for running smooth, professional video calls with patients.',
    links: ['Video call setup', 'Lighting & audio tips', 'Handling technical issues', 'Recording & notes'],
  },
  {
    icon: FileText,
    title: 'Clinical guidelines',
    desc: 'MediCall clinical standards, prescription policies, and referral workflows.',
    links: ['Prescribing digitally', 'When to refer', 'Emergency protocols', 'Consent & documentation'],
  },
  {
    icon: HelpCircle,
    title: 'Support & FAQs',
    desc: 'Answers to the most common questions from MediCall doctors.',
    links: ['Payout FAQs', 'Account issues', 'Patient disputes', 'Contact doctor support'],
  },
];

export default function Resources() {
  return (
    <div style={{ background: '#F4F8FF', minHeight: '100vh' }}>
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pt-20 pb-14 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          style={{ background: 'rgba(0,82,217,0.08)', color: '#0052D9', border: '1px solid rgba(0,82,217,0.18)' }}>
          <BookOpen size={12} /> Doctor Resources
        </span>
        <h1 className="text-display text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0B1D35', letterSpacing: '-0.03em' }}>
          Everything you need to<br /><span style={{ color: '#0052D9' }}>succeed on MediCall</span>
        </h1>
        <p className="text-lg" style={{ color: '#3D5A80' }}>Guides, protocols, and tips for MediCall doctors.</p>
      </section>

      <section className="max-w-5xl mx-auto px-5 lg:px-8 pb-24 grid sm:grid-cols-2 gap-6">
        {CATEGORIES.map(({ icon: Icon, title, desc, links }) => (
          <div key={title} className="glass p-7 flex flex-col gap-4">
            <span className="w-11 h-11 rounded-xl flex items-center justify-center"
              style={{ background: 'rgba(0,82,217,0.09)', color: '#0052D9' }}>
              <Icon size={20} />
            </span>
            <div>
              <div className="font-bold text-base mb-1" style={{ color: '#0B1D35' }}>{title}</div>
              <p className="text-sm mb-4" style={{ color: '#3D5A80' }}>{desc}</p>
              <ul className="space-y-2">
                {links.map(l => (
                  <li key={l}>
                    <a href="#" className="flex items-center gap-2 text-sm font-medium transition-colors"
                      style={{ color: '#0052D9' }}>
                      <ArrowRight size={13} /> {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
