import { useEffect, useState } from 'react';
import { MapPin, Clock, Wallet } from 'lucide-react';
import Avatar from '../ui/Avatar.jsx';
import Button from '../ui/Button.jsx';
import { formatNaira } from '../../data/mockDoctors.js';

const TOTAL = 15;

export default function IncomingRequest({ request, onAccept, onDecline }) {
  const [t, setT] = useState(TOTAL);

  useEffect(() => {
    setT(TOTAL);
    const id = setInterval(() => {
      setT((v) => {
        if (v <= 1) { clearInterval(id); onDecline && onDecline(); return 0; }
        return v - 1;
      });
    }, 1000);
    return () => clearInterval(id);
  }, [request?.id, onDecline]);

  if (!request) return null;

  const radius = 22;
  const C = 2 * Math.PI * radius;
  const offset = C * (1 - t / TOTAL);

  return (
    <div className="glass ring-glow p-5 animate-slideRight relative overflow-hidden">
      <div className="absolute -top-12 -right-12 w-48 h-48 rounded-full bg-cyan/10 blur-3xl" />
      <div className="flex items-center justify-between gap-3 relative">
        <div className="flex items-center gap-3">
          <Avatar name={request.patientName} size="lg" online />
          <div>
            <p className="text-[10px] uppercase tracking-widest text-cyan font-semibold">Incoming request</p>
            <h3 className="text-display text-lg font-semibold">{request.patientName}, {request.age}</h3>
            <p className="text-xs text-ink-muted line-clamp-1 max-w-[260px]">{request.symptoms}</p>
          </div>
        </div>
        <div className="relative w-14 h-14">
          <svg viewBox="0 0 56 56" className="w-14 h-14 -rotate-90">
            <circle cx="28" cy="28" r={radius} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="4" />
            <circle
              cx="28" cy="28" r={radius}
              fill="none"
              stroke="#00E5FF"
              strokeWidth="4"
              strokeLinecap="round"
              strokeDasharray={C}
              strokeDashoffset={offset}
              style={{ transition: 'stroke-dashoffset 1s linear', filter: 'drop-shadow(0 0 6px rgba(0,229,255,0.6))' }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center text-mono text-sm font-semibold">{t}s</span>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-2 text-xs">
        <div className="glass-soft p-3"><MapPin size={14} className="text-cyan mb-1" /><div className="text-mono text-ink">{request.distanceKm}km</div><div className="text-ink-dim">distance</div></div>
        <div className="glass-soft p-3"><Clock size={14} className="text-cyan mb-1" /><div className="text-mono text-ink">{request.etaMinutes}min</div><div className="text-ink-dim">to arrive</div></div>
        <div className="glass-soft p-3"><Wallet size={14} className="text-bio mb-1" /><div className="text-mono text-ink">{formatNaira(request.fee)}</div><div className="text-ink-dim">earnings</div></div>
      </div>

      <div className="mt-4 flex items-center gap-2">
        <Button variant="ghost" className="flex-1" onClick={onDecline}>Decline</Button>
        <Button variant="success" className="flex-1" onClick={onAccept}>Accept request</Button>
      </div>
    </div>
  );
}
