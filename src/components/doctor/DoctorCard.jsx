import { Star, MapPin, Clock, Home, Video } from 'lucide-react';
import Avatar from '../ui/Avatar.jsx';
import Badge from '../ui/Badge.jsx';
import Button from '../ui/Button.jsx';
import { formatNaira } from '../../data/mockDoctors.js';

export default function DoctorCard({ doctor, selected, onSelect, onBook }) {
  const available = doctor.status === 'available';
  return (
    <article
      onClick={() => onSelect && onSelect(doctor)}
      className={`group relative cursor-pointer rounded-card transition-all duration-400 ease-smooth p-4 border ${
        selected
          ? 'glass border-cyan/50 ring-glow'
          : 'glass border-slate-200/70 hover:border-cyan/30 hover:-translate-y-0.5 hover:shadow-bloom'
      }`}
    >
      <div className="flex items-start gap-3">
        <Avatar src={doctor.photo} name={doctor.name} size="lg" online={available} />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <h3 className="text-display text-base font-semibold truncate">{doctor.name}</h3>
              <p className="text-xs text-ink-muted truncate">{doctor.specialty} · {doctor.years}y exp</p>
              <p className="text-[11px] text-ink-dim truncate">{doctor.hospital}</p>
            </div>
            <div className="flex items-center gap-1 text-amber-500 text-sm font-medium">
              <Star size={14} className="fill-current" />
              <span className="text-mono">{doctor.rating.toFixed(1)}</span>
            </div>
          </div>

          <div className="mt-3 flex items-center gap-3 text-xs text-ink-muted">
            <span className="inline-flex items-center gap-1"><MapPin size={12} className="text-cyan" /> <span className="text-mono text-ink">{doctor.distanceKm.toFixed(1)}km</span></span>
            <span className="inline-flex items-center gap-1"><Clock size={12} className="text-cyan" /> <span className="text-mono text-ink">{doctor.etaMinutes} min</span></span>
            <span className="inline-flex items-center gap-1 text-mono text-ink ml-auto">{formatNaira(doctor.fee)}</span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2">
            {available ? (
              <Badge tone="green" dot breathing>Available now</Badge>
            ) : doctor.status === 'busy' ? (
              <Badge tone="amber" dot>In ~20 min</Badge>
            ) : (
              <Badge tone="ink" dot>Offline</Badge>
            )}
            <div className="flex items-center gap-1.5">
              <Button
                variant="ghost"
                size="sm"
                onClick={(e) => { e.stopPropagation(); onBook && onBook(doctor, 'home'); }}
                disabled={!available}
              >
                <Home size={14} /> Home
              </Button>
              <Button
                size="sm"
                onClick={(e) => { e.stopPropagation(); onBook && onBook(doctor, 'video'); }}
                disabled={!available}
              >
                <Video size={14} /> Video
              </Button>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
