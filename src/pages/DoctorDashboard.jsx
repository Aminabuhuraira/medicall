import { useEffect, useMemo, useState } from 'react';
import { Wallet, Activity, Star, Percent, Clock, MapPin } from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell } from 'recharts';
import Toggle from '../components/ui/Toggle.jsx';
import Card from '../components/ui/Card.jsx';
import Badge from '../components/ui/Badge.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import LiveMap from '../components/map/LiveMap.jsx';
import IncomingRequest from '../components/doctor/IncomingRequest.jsx';
import { mockDoctors, PATIENT_LOCATION, formatNaira } from '../data/mockDoctors.js';

const EARNINGS = [
  { d: 'Mon', v: 42000 }, { d: 'Tue', v: 56000 }, { d: 'Wed', v: 38000 },
  { d: 'Thu', v: 71000 }, { d: 'Fri', v: 89000 }, { d: 'Sat', v: 64000 }, { d: 'Sun', v: 51000 },
];

const RECENT = [
  { id: 1, patient: 'Tolu A.', symptoms: 'Persistent migraine', time: '2h ago', fee: 8000, rating: 5 },
  { id: 2, patient: 'Ifeoma N.', symptoms: 'Pediatric checkup', time: '5h ago', fee: 12000, rating: 5 },
  { id: 3, patient: 'Ahmed B.', symptoms: 'Skin rash, mild', time: 'Yesterday', fee: 15000, rating: 4 },
  { id: 4, patient: 'Chiamaka E.', symptoms: 'Anxiety follow-up', time: 'Yesterday', fee: 18000, rating: 5 },
];

const SAMPLE_REQUESTS = [
  { patientName: 'Adaobi M.', age: 32, symptoms: 'Sudden chest tightness, shortness of breath', distanceKm: 1.4, etaMinutes: 9, fee: 14000 },
  { patientName: 'Femi K.', age: 45, symptoms: 'High fever for 2 days, body aches', distanceKm: 2.1, etaMinutes: 12, fee: 12000 },
  { patientName: 'Halima A.', age: 6, symptoms: 'Persistent cough and mild fever (pediatric)', distanceKm: 0.9, etaMinutes: 6, fee: 11000 },
];

export default function DoctorDashboard() {
  const [online, setOnline] = useState(true);
  const [incoming, setIncoming] = useState(null);
  const [active, setActive] = useState(null);

  // Simulate incoming request when online
  useEffect(() => {
    if (!online || incoming || active) return;
    const t = setTimeout(() => {
      const r = SAMPLE_REQUESTS[Math.floor(Math.random() * SAMPLE_REQUESTS.length)];
      setIncoming({ ...r, id: 'inc_' + Date.now() });
    }, 5000);
    return () => clearTimeout(t);
  }, [online, incoming, active]);

  const accept = () => { setActive(incoming); setIncoming(null); };
  const decline = () => setIncoming(null);

  const me = mockDoctors[0];
  const otherDocs = useMemo(() => mockDoctors.slice(1, 6), []);

  return (
    <div className="flex-1 grid grid-rows-[auto_minmax(0,1fr)]">
      {/* Header */}
      <div className="px-5 lg:px-8 py-5 border-b border-slate-200/70 flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar src={me.photo} name={me.name} size="lg" online={online} />
          <div>
            <p className="text-xs uppercase tracking-widest text-ink-muted">Driver mode</p>
            <h1 className="text-display text-xl font-semibold tracking-tight">{me.name}</h1>
            <p className="text-xs text-ink-muted">{me.specialty} · {me.hospital}</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <Badge tone={online ? 'green' : 'ink'} dot breathing={online}>{online ? 'Accepting requests' : 'Paused'}</Badge>
          <Toggle checked={online} onChange={setOnline} />
        </div>
      </div>

      {/* Stats */}
      <div className="px-5 lg:px-8 py-5 grid lg:grid-cols-[1.1fr_0.9fr] gap-5 min-h-0">
        {/* LEFT */}
        <div className="space-y-5 min-w-0">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 stagger">
            {[
              { l: "Today's earnings", v: formatNaira(89000), icon: Wallet, tone: 'text-bio' },
              { l: 'Consultations', v: '7', icon: Activity, tone: 'text-cyan' },
              { l: 'Rating', v: '4.9★', icon: Star, tone: 'text-amber-500' },
              { l: 'Acceptance', v: '94%', icon: Percent, tone: 'text-cyan' },
            ].map((s) => (
              <Card key={s.l} className="p-4">
                <s.icon size={16} className={s.tone} />
                <div className="text-display text-xl text-mono mt-2">{s.v}</div>
                <div className="text-[11px] uppercase tracking-widest text-ink-muted mt-0.5">{s.l}</div>
              </Card>
            ))}
          </div>

          {incoming && (
            <IncomingRequest request={incoming} onAccept={accept} onDecline={decline} />
          )}

          {active && (
            <Card glow className="p-5 animate-fadeUp">
              <div className="flex items-center gap-2">
                <Badge tone="green" dot breathing>Active consultation</Badge>
                <span className="text-xs text-ink-muted">In progress</span>
              </div>
              <div className="mt-3 flex items-center gap-3">
                <Avatar name={active.patientName} size="md" online />
                <div className="flex-1 min-w-0">
                  <h3 className="text-display font-semibold">{active.patientName}, {active.age}</h3>
                  <p className="text-xs text-ink-muted line-clamp-1">{active.symptoms}</p>
                </div>
                <button onClick={() => setActive(null)} className="text-xs text-cyan hover:underline">Mark complete</button>
              </div>
              <div className="mt-3 grid grid-cols-3 gap-2 text-xs">
                <div className="glass-soft p-2.5"><MapPin size={12} className="text-cyan mb-1" /><div className="text-mono">{active.distanceKm}km</div></div>
                <div className="glass-soft p-2.5"><Clock size={12} className="text-cyan mb-1" /><div className="text-mono">{active.etaMinutes}min</div></div>
                <div className="glass-soft p-2.5"><Wallet size={12} className="text-bio mb-1" /><div className="text-mono">{formatNaira(active.fee)}</div></div>
              </div>
            </Card>
          )}

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-display font-semibold">Weekly earnings</h3>
              <span className="text-mono text-cyan text-sm">{formatNaira(EARNINGS.reduce((a,b)=>a+b.v,0))}</span>
            </div>
            <div className="h-44">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={EARNINGS}>
                  <XAxis dataKey="d" stroke="#3D5068" fontSize={11} tickLine={false} axisLine={false} />
                  <YAxis stroke="#3D5068" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v/1000}k`} />
                  <Tooltip
                    cursor={{ fill: 'rgba(0,229,255,0.06)' }}
                    contentStyle={{ background: 'rgba(255,255,255,0.97)', border: '1px solid rgba(0,153,255,0.22)', borderRadius: 10, fontSize: 12, boxShadow: '0 4px 20px rgba(0,0,0,0.1)' }}
                    formatter={(v) => formatNaira(v)}
                  />
                  <Bar dataKey="v" radius={[6,6,0,0]}>
                    {EARNINGS.map((_, i) => (
                      <Cell key={i} fill={i === EARNINGS.length - 1 ? '#00FF88' : '#00E5FF'} fillOpacity={i === EARNINGS.length - 1 ? 0.9 : 0.6} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>

          <Card className="p-5">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-display font-semibold">Recent consultations</h3>
              <a href="#" className="text-xs text-cyan hover:underline">View all</a>
            </div>
            <div className="divide-y divide-slate-100">
              {RECENT.map((r) => (
                <div key={r.id} className="flex items-center gap-3 py-3">
                  <Avatar name={r.patient} size="md" />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{r.patient}</div>
                    <div className="text-xs text-ink-muted truncate">{r.symptoms}</div>
                  </div>
                  <div className="text-right text-xs">
                    <div className="text-mono text-bio">{formatNaira(r.fee)}</div>
                    <div className="text-ink-muted flex items-center gap-1 justify-end">
                      <Star size={10} className="fill-amber-500 text-amber-500" /> {r.rating} · {r.time}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* RIGHT - Map */}
        <div className="lg:sticky lg:top-[5.5rem] h-[400px] lg:h-[calc(100vh-7rem)] rounded-card overflow-hidden border border-slate-200/60 shadow-[0_4px_24px_rgba(10,22,50,0.08)]">
          <LiveMap
            center={me.coords}
            zoom={13}
            user={PATIENT_LOCATION}
            doctors={otherDocs}
          />
        </div>
      </div>
    </div>
  );
}
