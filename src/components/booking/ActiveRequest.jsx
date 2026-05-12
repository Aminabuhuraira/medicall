import { useEffect, useState } from 'react';
import { Phone, Navigation, X } from 'lucide-react';
import { Link } from 'react-router-dom';
import Avatar from '../ui/Avatar.jsx';
import Button from '../ui/Button.jsx';
import Badge from '../ui/Badge.jsx';

export default function ActiveRequest({ request, onCancel }) {
  const [eta, setEta] = useState(request?.etaMinutes ?? 12);
  useEffect(() => {
    if (!request) return;
    setEta(request.etaMinutes ?? 12);
    const id = setInterval(() => setEta((v) => (v <= 1 ? 1 : v - 1)), 60000);
    return () => clearInterval(id);
  }, [request?.id]);

  if (!request) return null;
  const d = request.doctor;

  return (
    <div className="glass ring-glow p-4 animate-slideUp relative overflow-hidden">
      <div className="absolute -top-16 -left-16 w-48 h-48 rounded-full bg-bio/10 blur-3xl" />
      <div className="flex items-center gap-3 relative">
        <Avatar src={d.photo} name={d.name} size="lg" online />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <Badge tone="green" dot breathing>On the way</Badge>
            <span className="text-[11px] text-ink-muted uppercase tracking-wider">Active request</span>
          </div>
          <h3 className="text-display font-semibold mt-1 truncate">{d.name}</h3>
          <p className="text-xs text-ink-muted truncate">{d.specialty}</p>
        </div>
        <div className="text-right">
          <div className="text-[10px] uppercase tracking-widest text-ink-dim">ETA</div>
          <div className="text-display text-xl text-cyan text-mono">{eta}<span className="text-xs text-ink-muted ml-0.5">min</span></div>
        </div>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <Link to={`/track/${request.id}`} className="flex-1">
          <Button className="w-full"><Navigation size={14} /> Track live</Button>
        </Link>
        <Button variant="icon"><Phone size={14} /></Button>
        <Button variant="icon" onClick={onCancel}><X size={14} /></Button>
      </div>
    </div>
  );
}
