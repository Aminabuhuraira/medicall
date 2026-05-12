import { useState, useEffect } from 'react';
import { X, Home, Video, MapPin, AlertTriangle, Clock } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Input from '../ui/Input.jsx';
import Avatar from '../ui/Avatar.jsx';
import Badge from '../ui/Badge.jsx';
import { formatNaira } from '../../data/mockDoctors.js';

const URGENCIES = [
  { id: 'routine', label: 'Routine', tone: 'green', desc: 'Within hours' },
  { id: 'urgent', label: 'Urgent', tone: 'amber', desc: 'Within 30 min' },
  { id: 'emergency', label: 'Emergency', tone: 'red', desc: 'Immediate' },
];

export default function BookingModal({ open, onClose, doctor, mode = 'home', onConfirm, defaultAddress = '' }) {
  const [symptoms, setSymptoms] = useState('');
  const [urgency, setUrgency] = useState('routine');
  const [when, setWhen] = useState('now');
  const [address, setAddress] = useState(defaultAddress || '12 Aguiyi Ironsi St, Maitama, Abuja');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (open) {
      setSymptoms(''); setUrgency('routine'); setWhen('now'); setLoading(false); setError('');
    }
  }, [open, doctor?.id]);

  if (!open || !doctor) return null;

  const platformFee = Math.round(doctor.fee * 0.1);
  const total = doctor.fee + platformFee;

  const submit = async () => {
    if (symptoms.trim().length < 6) { setError('Please describe your symptoms (at least 6 characters).'); return; }
    setError('');
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onConfirm && onConfirm({ doctor, mode, symptoms, urgency, when, address, total });
    }, 1100);
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-end sm:items-center justify-center" role="dialog" aria-modal="true">
      <button
        aria-label="Close"
        className="absolute inset-0 bg-slate-900/30 backdrop-blur-md animate-fadeUp"
        onClick={onClose}
      />
      <div className="relative w-full sm:max-w-lg sm:mx-4 glass border-cyan/20 rounded-t-3xl sm:rounded-card overflow-hidden animate-slideUp shadow-bloom">
        <div className="absolute inset-x-0 -top-px h-px bg-gradient-to-r from-transparent via-cyan to-transparent" />

        <div className="p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Avatar src={doctor.photo} name={doctor.name} size="md" online />
            <div>
              <h3 className="text-display font-semibold leading-tight">{doctor.name}</h3>
              <p className="text-xs text-ink-muted">{doctor.specialty} · ★ {doctor.rating.toFixed(1)}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge tone={mode === 'home' ? 'cyan' : 'green'}>
              {mode === 'home' ? <><Home size={12} /> Home visit</> : <><Video size={12} /> Video call</>}
            </Badge>
            <button onClick={onClose} className="p-2 rounded-btn text-ink-muted hover:text-ink hover:bg-slate-100">
              <X size={16} />
            </button>
          </div>
        </div>

        <div className="p-5 space-y-4 max-h-[70vh] overflow-y-auto">
          <Input
            as="textarea"
            label="Describe your symptoms"
            placeholder="e.g. Chest tightness for 2 hours, mild dizziness…"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            error={error || undefined}
          />

          <div>
            <span className="block text-xs font-medium tracking-wide uppercase text-ink-muted mb-2">Urgency</span>
            <div className="grid grid-cols-3 gap-2">
              {URGENCIES.map((u) => (
                <button
                  key={u.id}
                  type="button"
                  onClick={() => setUrgency(u.id)}
                  className={`text-left p-3 rounded-btn border transition-all ${
                    urgency === u.id
                      ? u.tone === 'red'
                        ? 'border-danger/60 bg-danger/10 shadow-[0_0_16px_rgba(255,51,85,0.2)]'
                        : u.tone === 'amber'
                        ? 'border-amber-400/60 bg-amber-50'
                        : 'border-bio/60 bg-bio/10 shadow-glowGreen'
                      : 'border-slate-200 bg-slate-50 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center gap-1.5 text-xs font-semibold">
                    {u.id === 'emergency' && <AlertTriangle size={12} />}
                    {u.label}
                  </div>
                  <div className="text-[11px] text-ink-muted mt-0.5">{u.desc}</div>
                </button>
              ))}
            </div>
          </div>

          <div>
            <span className="block text-xs font-medium tracking-wide uppercase text-ink-muted mb-2">When</span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setWhen('now')}
                className={`px-4 py-2 rounded-btn border text-sm transition-all ${when === 'now' ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-slate-200 bg-slate-50 text-ink-muted hover:text-ink'}`}
              >
                Now <span className="text-mono text-[11px] ml-1 opacity-70">~{doctor.etaMinutes}min</span>
              </button>
              <input
                type="datetime-local"
                onChange={() => setWhen('scheduled')}
                className="input-focus flex-1 bg-white border border-slate-200 text-ink rounded-btn px-3 py-2 text-sm"
              />
            </div>
          </div>

          {mode === 'home' && (
            <Input
              label="Visit address"
              leftIcon={<MapPin size={14} />}
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Confirm your home address"
            />
          )}

          <div className="glass-soft p-4 space-y-2 text-sm">
            <div className="flex justify-between text-ink-muted"><span>Consultation fee</span><span className="text-mono text-ink">{formatNaira(doctor.fee)}</span></div>
            <div className="flex justify-between text-ink-muted"><span>Platform fee (10%)</span><span className="text-mono text-ink">{formatNaira(platformFee)}</span></div>
            <div className="divider my-2" />
            <div className="flex justify-between font-semibold"><span>Total</span><span className="text-mono text-cyan">{formatNaira(total)}</span></div>
            <p className="text-[11px] text-ink-dim flex items-center gap-1 pt-1"><Clock size={11} /> Estimated wait: {doctor.etaMinutes} minutes</p>
          </div>
        </div>

        <div className="p-5 pt-0 flex items-center gap-2">
          <Button variant="ghost" className="flex-1" onClick={onClose}>Cancel</Button>
          <Button className="flex-[2]" onClick={submit} loading={loading}>
            Confirm & Request
          </Button>
        </div>
      </div>
    </div>
  );
}
