import { useEffect, useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Phone, X, ChevronLeft, MapPin, Star, MessageCircle } from 'lucide-react';
import LiveMap from '../components/map/LiveMap.jsx';
import RouteOverlay from '../components/map/RouteOverlay.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import { useRequest } from '../context/RequestContext.jsx';
import { mockDoctors, PATIENT_LOCATION } from '../data/mockDoctors.js';

const STEP = 0.00008; // degrees per tick (smooth motion)
const TICK = 200;    // ms between ticks — appears continuous with CSS transition

export default function TrackingPage() {
  const { requestId } = useParams();
  const { activeRequest, cancelRequest, updateRequest } = useRequest();
  const nav = useNavigate();

  // Fall back to a simulated request if none in context (e.g. direct visit)
  const fallback = useMemo(() => ({
    id: requestId || 'demo',
    doctor: mockDoctors[0],
    etaMinutes: 12,
    status: 'matched',
  }), [requestId]);

  const req = activeRequest || fallback;
  const patient = PATIENT_LOCATION;

  const [docPos, setDocPos] = useState(req.doctor.coords);
  const [eta, setEta] = useState(req.etaMinutes ?? 12);
  // Remember starting position to draw the completed-trail segment
  const startPosRef = useRef(req.doctor.coords);

  // Move doctor toward patient on every TICK – small steps render as smooth glide
  // because .moving-marker has CSS `transition: transform 0.22s linear`
  useEffect(() => {
    const id = setInterval(() => {
      setDocPos((p) => {
        const dLat = patient.lat - p.lat;
        const dLng = patient.lng - p.lng;
        const dist = Math.sqrt(dLat * dLat + dLng * dLng);
        if (dist < 0.0005) {
          clearInterval(id);
          setEta(0);
          return patient;
        }
        const ratio = STEP / dist;
        return { lat: p.lat + dLat * ratio, lng: p.lng + dLng * ratio };
      });
    }, TICK);
    return () => clearInterval(id);
  }, [patient.lat, patient.lng]);

  // Journey progress 0 → 1 (for the progress bar)
  const progress = useMemo(() => {
    const s = startPosRef.current;
    const totalD = Math.hypot(patient.lat - s.lat, patient.lng - s.lng);
    if (totalD === 0) return 1;
    const remD = Math.hypot(patient.lat - docPos.lat, patient.lng - docPos.lng);
    return Math.min(1, 1 - remD / totalD);
  }, [docPos, patient]);

  // ETA decrement every 30s
  useEffect(() => {
    if (eta <= 0) return;
    const id = setInterval(() => setEta((v) => Math.max(0, v - 1)), 30000);
    return () => clearInterval(id);
  }, [eta]);

  useEffect(() => {
    if (activeRequest) updateRequest({ etaMinutes: eta });
  }, [eta]);

  const center = {
    lat: (docPos.lat + patient.lat) / 2,
    lng: (docPos.lng + patient.lng) / 2,
  };

  const arrived = eta === 0;

  return (
    <div className="fixed inset-0 z-40 bg-base">
      <LiveMap
        center={center}
        zoom={15}
        user={patient}
        doctors={[{ ...req.doctor, coords: docPos, moving: !arrived }]}
      >
        <RouteOverlay start={startPosRef.current} current={docPos} destination={patient} />
      </LiveMap>

      {/* Top bar */}
      <div className="absolute top-0 inset-x-0 p-4 flex items-center justify-between gap-2 z-50">
        <button onClick={() => nav(-1)} className="glass px-3 py-2 rounded-btn text-sm flex items-center gap-1.5 hover:border-cyan/30 text-ink">
          <ChevronLeft size={14} /> Back
        </button>
        <div className="glass px-3 py-2 rounded-btn text-xs flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-bio animate-breathe" />
          <span className="text-mono text-cyan">LIVE TRACKING</span>
        </div>
      </div>

      {/* Bottom sheet */}
      <div className="absolute bottom-0 inset-x-0 p-4 z-50">
        <div className="glass ring-glow max-w-2xl mx-auto p-5 animate-slideUp relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-cyan/10 blur-3xl rounded-full" />
          <div className="flex items-start gap-4 relative">
            <Avatar src={req.doctor.photo} name={req.doctor.name} size="xl" online />
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <Badge tone={arrived ? 'green' : 'cyan'} dot breathing>
                  {arrived ? 'Doctor has arrived' : 'On the way'}
                </Badge>
                <span className="text-xs text-ink-muted hidden sm:inline">
                  Request <span className="text-mono">#{(req.id || '').slice(-6)}</span>
                </span>
              </div>
              <h2 className="text-display text-xl font-semibold tracking-tight mt-1">{req.doctor.name}</h2>
              <p className="text-xs text-ink-muted">{req.doctor.specialty} · ★ {req.doctor.rating.toFixed(1)} · {req.doctor.years}y exp</p>
              <p className="text-sm text-ink mt-3">
                {arrived ? (
                  <>Your doctor is at your location.</>
                ) : (
                  <>{req.doctor.name.split(' ')[1] || 'Your doctor'} is on the way · Arriving in <span className="text-mono text-cyan">{eta} min</span></>
                )}
              </p>
            </div>
            <div className="flex flex-col items-end shrink-0">
              <div className="text-[10px] uppercase tracking-widest text-ink-dim">ETA</div>
              <div className="text-display text-3xl text-mono text-cyan">{eta}</div>
              <div className="text-[10px] text-ink-muted">min</div>
            </div>
          </div>

          {/* Journey progress bar */}
          <div className="mt-3 h-1.5 bg-border rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-cyan to-bio transition-[width] duration-300"
              style={{ width: `${(progress * 100).toFixed(1)}%` }}
            />
          </div>

          <div className="mt-4 flex items-center gap-2">
            <Button variant="ghost" className="flex-1"><Phone size={14} /> Call</Button>
            <Button variant="ghost" className="flex-1 hidden sm:inline-flex"><MessageCircle size={14} /> Message</Button>
            <Button variant="danger" className="flex-1" onClick={() => { cancelRequest(); nav('/dashboard/patient'); }}>
              <X size={14} /> Cancel
            </Button>
          </div>

          <div className="mt-4 grid grid-cols-3 gap-2 text-[11px]">
            <div className="glass-soft p-2.5">
              <MapPin size={11} className="text-cyan mb-1" />
              <div className="text-mono text-ink">{req.doctor.distanceKm.toFixed(1)}km</div>
              <div className="text-ink-dim">distance</div>
            </div>
            <div className="glass-soft p-2.5">
              <Star size={11} className="text-amber-300 fill-amber-300 mb-1" />
              <div className="text-mono text-ink">{req.doctor.rating.toFixed(1)}</div>
              <div className="text-ink-dim">rating</div>
            </div>
            <div className="glass-soft p-2.5">
              <span className="block w-2.5 h-2.5 rounded-full bg-bio mb-1 animate-breathe" />
              <div className="text-mono text-ink">{req.doctor.specialty.split(' ')[0]}</div>
              <div className="text-ink-dim">specialty</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
