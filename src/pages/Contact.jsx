import { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare, CheckCircle2 } from 'lucide-react';
import Button from '../components/ui/Button.jsx';

const CHANNELS = [
  { icon: Mail, label: 'Email', value: 'hello@medicall.ng', href: 'mailto:hello@medicall.ng' },
  { icon: Phone, label: 'Phone', value: '+234 800 MEDICALL', href: 'tel:+2348001234225' },
  { icon: MapPin, label: 'Office', value: '14 Aguiyi Ironsi St, Maitama, Abuja', href: '#' },
];

export default function Contact() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div style={{ background: '#F4F8FF', minHeight: '100vh' }}>
      <section className="max-w-4xl mx-auto px-5 lg:px-8 pt-20 pb-14 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-widest mb-6"
          style={{ background: 'rgba(0,82,217,0.08)', color: '#0052D9', border: '1px solid rgba(0,82,217,0.18)' }}>
          <MessageSquare size={12} /> Contact
        </span>
        <h1 className="text-display text-4xl md:text-5xl font-bold mb-4" style={{ color: '#0B1D35', letterSpacing: '-0.03em' }}>
          Get in touch
        </h1>
        <p className="text-lg" style={{ color: '#3D5A80' }}>We usually respond within a few hours on business days.</p>
      </section>

      <section className="max-w-5xl mx-auto px-5 lg:px-8 pb-24 grid md:grid-cols-3 gap-6 items-start">
        {/* Contact channels */}
        <div className="space-y-4">
          {CHANNELS.map(({ icon: Icon, label, value, href }) => (
            <a key={label} href={href} className="glass p-5 flex gap-4 items-start block transition-all"
              style={{ textDecoration: 'none' }}>
              <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                style={{ background: 'rgba(0,82,217,0.09)', color: '#0052D9' }}>
                <Icon size={18} />
              </span>
              <div>
                <div className="text-xs font-bold uppercase tracking-widest mb-0.5" style={{ color: '#7A9ABB' }}>{label}</div>
                <div className="text-sm font-medium" style={{ color: '#0B1D35' }}>{value}</div>
              </div>
            </a>
          ))}
        </div>

        {/* Form */}
        <div className="md:col-span-2 glass p-8">
          {sent ? (
            <div className="text-center py-8">
              <CheckCircle2 size={48} className="mx-auto mb-4" style={{ color: '#059669' }} />
              <div className="text-xl font-bold mb-2" style={{ color: '#0B1D35' }}>Message sent!</div>
              <p style={{ color: '#3D5A80' }}>We'll get back to you within 24 hours.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid sm:grid-cols-2 gap-4">
                {['name', 'email'].map(field => (
                  <div key={field}>
                    <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#3D5A80' }}>
                      {field === 'name' ? 'Your name' : 'Email address'}
                    </label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      required
                      value={form[field]}
                      onChange={e => setForm(f => ({ ...f, [field]: e.target.value }))}
                      className="w-full px-4 py-3 rounded-xl text-sm input-focus"
                      style={{ border: '1px solid rgba(14,40,90,0.13)', background: '#fff', color: '#0B1D35', outline: 'none' }}
                      placeholder={field === 'name' ? 'Amina Bello' : 'amina@example.com'}
                    />
                  </div>
                ))}
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#3D5A80' }}>Subject</label>
                <input
                  type="text"
                  required
                  value={form.subject}
                  onChange={e => setForm(f => ({ ...f, subject: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm input-focus"
                  style={{ border: '1px solid rgba(14,40,90,0.13)', background: '#fff', color: '#0B1D35', outline: 'none' }}
                  placeholder="How can we help?"
                />
              </div>
              <div>
                <label className="block text-xs font-semibold uppercase tracking-widest mb-1.5" style={{ color: '#3D5A80' }}>Message</label>
                <textarea
                  required
                  rows={5}
                  value={form.message}
                  onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                  className="w-full px-4 py-3 rounded-xl text-sm input-focus resize-none"
                  style={{ border: '1px solid rgba(14,40,90,0.13)', background: '#fff', color: '#0B1D35', outline: 'none' }}
                  placeholder="Tell us what's on your mind..."
                />
              </div>
              <Button type="submit" style={{ background: '#0052D9', color: '#fff', borderRadius: 10, fontWeight: 700, padding: '12px 28px' }}>
                Send message
              </Button>
            </form>
          )}
        </div>
      </section>
    </div>
  );
}
