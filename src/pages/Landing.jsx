import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight, Stethoscope, MapPin, Clock, Activity,
  ShieldCheck, Star, ChevronLeft, ChevronRight, Zap,
  Heart, Video, CheckCircle2, TrendingUp, Users, Globe2,
} from 'lucide-react';
import { MapContainer, TileLayer, Marker, useMap } from 'react-leaflet';
import L from 'leaflet';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import { mockDoctors, formatNaira, PATIENT_LOCATION } from '../data/mockDoctors.js';

// ─── Hero map pins (white/glass style) ──────────────────────────────────────
function heroPin(status = 'available', size = 44) {
  const colors = {
    available: { border: '#059669', glow: 'rgba(5,150,105,0.5)', bg: '#ECFDF5' },
    busy:      { border: '#D97706', glow: 'rgba(217,119,6,0.4)',  bg: '#FFFBEB' },
    offline:   { border: '#94A3B8', glow: 'rgba(148,163,184,0.2)', bg: '#F8FAFC' },
  };
  const c = colors[status] || colors.available;
  const half = size / 2;
  const inner = Math.round(size * 0.25);
  return L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:${size}px;height:${size}px">
        <div style="position:absolute;inset:0;border-radius:999px;border:2px solid ${c.border};opacity:0.45;animation:pulseRing 2.4s cubic-bezier(.16,1,.3,1) infinite;"></div>
        <div style="position:absolute;inset:0;border-radius:999px;border:2px solid ${c.border};opacity:0.25;animation:pulseRing 2.4s cubic-bezier(.16,1,.3,1) infinite;animation-delay:1.2s;"></div>
        <div style="position:absolute;inset:${inner}px;border-radius:999px;background:linear-gradient(135deg,#fff,${c.bg});border:2.5px solid ${c.border};box-shadow:0 0 12px ${c.glow},0 2px 8px rgba(0,0,0,0.08);"></div>
      </div>`,
    iconSize: [size, size],
    iconAnchor: [half, half],
  });
}

function userHeroPin() {
  return L.divIcon({
    className: '',
    html: `
      <div style="position:relative;width:28px;height:28px">
        <div style="position:absolute;inset:-8px;border-radius:999px;background:rgba(0,82,217,0.15);animation:pulseRing 2s ease infinite;"></div>
        <div style="position:absolute;inset:0;border-radius:999px;background:linear-gradient(135deg,#0052D9,#3B82F6);border:3px solid #fff;box-shadow:0 0 0 4px rgba(0,82,217,0.2),0 4px 14px rgba(0,82,217,0.6);"></div>
      </div>`,
    iconSize: [28, 28],
    iconAnchor: [14, 14],
  });
}

function MapAutoFit({ doctors, user }) {
  const map = useMap();
  useEffect(() => {
    const pts = doctors.filter(d => d.status !== 'offline').map(d => [d.coords.lat, d.coords.lng]);
    pts.push([user.lat, user.lng]);
    if (pts.length > 1) map.fitBounds(L.latLngBounds(pts), { padding: [55, 55] });
  }, []);
  return null;
}

// ─── Live activity ticker ─────────────────────────────────────────────────────
const TICKS = [
  { label: 'Dr. Adeola accepted a request', loc: 'Victoria Island', time: '2s ago', color: '#00C36B' },
  { label: 'New request — chest pain', loc: 'Lekki Phase 1', time: '18s ago', color: '#0052D9' },
  { label: 'Dr. Aisha completed consultation', loc: 'Ikoyi', time: '1m ago', color: '#059669' },
  { label: 'Dr. Bello is en route', loc: 'Garki, Abuja', time: '2m ago', color: '#F59E0B' },
  { label: 'Dr. Ngozi joined as available', loc: 'Surulere', time: '3m ago', color: '#00C36B' },
];

function LiveTicker() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % TICKS.length), 3200);
    return () => clearInterval(t);
  }, []);
  const tick = TICKS[idx];
  return (
    <div key={idx} className="flex items-center gap-2.5 text-sm">
      <span className="shrink-0 w-2 h-2 rounded-full" style={{ background: tick.color, boxShadow: `0 0 8px ${tick.color}` }} />
      <span className="font-medium truncate" style={{ color: '#0B1D35' }}>{tick.label}</span>
      <span className="shrink-0 text-xs text-mono ml-auto" style={{ color: '#7A9ABB' }}>{tick.time}</span>
    </div>
  );
}

// ─── Page-level data ─────────────────────────────────────────────────────────
const TESTIMONIALS = [
  { name: 'Tolu A.', city: 'Maitama, Abuja', role: 'Marketing Director', text: 'A doctor was at my door in 11 minutes. MediCall is what healthcare should have always been.', rating: 5 },
  { name: 'Ifeoma N.', city: 'Lekki', role: 'Software Engineer', text: 'I tracked Dr. Bello on the map in real time, exactly like Uber. This is the future.', rating: 5 },
  { name: 'Ahmed B.', city: 'Abuja', role: 'Business Owner', text: 'Booked a video call for my mum at 11pm. Doctor was professional and caring. 10/10.', rating: 5 },
  { name: 'Chiamaka E.', city: 'Port Harcourt', role: 'Teacher', text: 'Premium experience from start to finish. The doctors are world-class.', rating: 5 },
  { name: 'Seyi O.', city: 'Ibadan', role: 'Pharmacist', text: 'Replaced my regular GP visits entirely. Faster, cheaper, and far more convenient.', rating: 5 },
];

const STEPS = [
  { num: '01', title: 'Request', desc: 'Open MediCall and describe your symptoms. Browse verified doctors nearby on the live map.', icon: MapPin, color: 'from-blue-600 to-blue-400' },
  { num: '02', title: 'Match', desc: 'A nearby doctor accepts your request within seconds. Watch them en route on real-time GPS.', icon: Zap, color: 'from-emerald-600 to-green-400' },
  { num: '03', title: 'Heal', desc: 'Receive premium care at your door — or connect instantly over encrypted HD video.', icon: Heart, color: 'from-violet-600 to-purple-400' },
];

const FEATURES = [
  { icon: MapPin, title: 'Live GPS Tracking', desc: 'Watch your doctor navigate to your door in real time — full transparency, always.' },
  { icon: ShieldCheck, title: 'Verified Credentials', desc: 'Every doctor is MDCN-licensed, background-checked, and peer-reviewed.' },
  { icon: Video, title: 'HD Teleconsult', desc: 'Encrypted end-to-end video calls with prescription delivery straight to your pharmacy.' },
  { icon: Clock, title: '8-Min Average', desc: 'Our smart matching algorithm connects you to the nearest available doctor instantly.' },
  { icon: TrendingUp, title: 'Health Records', desc: 'Every consultation is automatically logged in your secure digital health profile.' },
  { icon: Globe2, title: '47 Cities', desc: 'Available across Nigeria and expanding across West Africa in 2026.' },
];

export default function Landing() {
  const carouselRef = useRef(null);
  const scroll = (dir) => {
    if (carouselRef.current) carouselRef.current.scrollBy({ left: dir * 380, behavior: 'smooth' });
  };

  const heroDoctors = mockDoctors.filter(d => d.status !== 'offline').slice(0, 8);
  const availableDoc = mockDoctors.find(x => x.status === 'available') || mockDoctors[0];

  return (
    <div className="relative">

      {/* ═══ HERO — glossy white with live map ═══════════════════════════════ */}
      <section className="relative overflow-hidden min-h-screen flex flex-col"
        style={{ background: 'linear-gradient(140deg, #EEF4FF 0%, #F8FBFF 45%, #F0FBF6 100%)' }}>

        {/* Ambient glows */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-32 -left-32 w-[600px] h-[600px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,82,217,0.09) 0%, transparent 65%)' }} />
          <div className="absolute -bottom-32 right-0 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(5,150,105,0.07) 0%, transparent 65%)' }} />
        </div>

        {/* Two-column layout */}
        <div className="relative z-10 flex-1 flex flex-col lg:grid lg:grid-cols-[1fr_1fr] max-w-none">

          {/* LEFT — copy */}
          <div className="flex flex-col justify-center px-8 sm:px-12 lg:px-16 xl:px-20 pt-14 pb-12 lg:py-24">
            <div className="stagger max-w-lg">

              {/* Pill badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-8"
                style={{ background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.2)' }}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-breathe shadow-glowGreen" />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#059669' }}>Live now · 47 cities</span>
              </div>

              <h1 className="font-bold leading-[1.04] tracking-tight">
                <span className="block text-5xl sm:text-6xl xl:text-7xl" style={{ color: '#0B1D35' }}>A Doctor.</span>
                <span className="block text-5xl sm:text-6xl xl:text-7xl" style={{
                  background: 'linear-gradient(110deg, #0052D9 0%, #2563EB 40%, #059669 80%)',
                  backgroundSize: '200% 100%',
                  WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent',
                  animation: 'gradientShift 7s ease infinite',
                }}>At Your Door.</span>
                <span className="block text-5xl sm:text-6xl xl:text-7xl" style={{ color: '#0B1D35' }}>In Minutes.</span>
              </h1>

              <p className="mt-6 text-lg leading-relaxed" style={{ color: '#3D5A80' }}>
                On-demand healthcare for the modern era. Browse verified doctors on a live map, book a home visit or video call, and track them in real time — just like ordering an Uber.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link to="/register/patient">
                  <button className="btn-ripple btn-press group inline-flex items-center gap-2 px-7 py-3.5 rounded-btn font-semibold text-white transition-all duration-300"
                    style={{ background: 'linear-gradient(135deg, #0052D9 0%, #2563EB 100%)', boxShadow: '0 4px 20px rgba(0,82,217,0.28), 0 1px 0 rgba(255,255,255,0.15) inset' }}>
                    Request a doctor
                    <ArrowRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
                  </button>
                </Link>
                <Link to="/register/doctor">
                  <button className="btn-ripple btn-press inline-flex items-center gap-2 px-7 py-3.5 rounded-btn font-semibold transition-all duration-300"
                    style={{ background: 'rgba(255,255,255,0.85)', border: '1px solid rgba(0,82,217,0.18)', color: '#0052D9', backdropFilter: 'blur(8px)', boxShadow: '0 2px 12px rgba(0,82,217,0.08)' }}>
                    <Stethoscope size={16} /> Join as a doctor
                  </button>
                </Link>
              </div>

              {/* Social proof */}
              <div className="mt-10 flex items-center gap-5">
                <div className="flex -space-x-2.5">
                  {mockDoctors.slice(0, 5).map(d => (
                    <img key={d.id} src={d.photo} alt={d.name} className="w-9 h-9 rounded-full border-2 border-white object-cover" />
                  ))}
                </div>
                <div>
                  <div className="flex items-center gap-1 mb-0.5">
                    {[1,2,3,4,5].map(i => <Star key={i} size={13} className="fill-amber-400 text-amber-400" />)}
                  </div>
                  <p className="text-xs" style={{ color: '#7A9ABB' }}>
                    <span className="font-semibold" style={{ color: '#0B1D35' }}>2,400+</span> verified doctors
                  </p>
                </div>
              </div>
            </div>

            {/* Live ticker — white glass */}
            <div className="mt-10 max-w-lg rounded-2xl overflow-hidden"
              style={{ background: 'rgba(255,255,255,0.82)', backdropFilter: 'blur(20px)', border: '1px solid rgba(0,82,217,0.1)', boxShadow: '0 4px 24px rgba(0,82,217,0.07)' }}>
              <div className="px-4 py-2 flex items-center gap-2 border-b" style={{ borderColor: 'rgba(0,82,217,0.08)' }}>
                <Activity size={12} style={{ color: '#059669' }} />
                <span className="text-[11px] font-semibold tracking-widest uppercase" style={{ color: '#7A9ABB' }}>Live activity</span>
              </div>
              <div className="px-4 py-3">
                <LiveTicker />
              </div>
            </div>
          </div>

          {/* RIGHT — live map */}
          <div className="relative h-72 sm:h-96 lg:h-full lg:min-h-screen">
            <div className="absolute inset-0 lg:inset-y-8 lg:rounded-l-3xl overflow-hidden"
              style={{ boxShadow: '0 0 0 1px rgba(0,82,217,0.1), 0 8px 40px rgba(0,82,217,0.08)' }}>
              <MapContainer
                center={[PATIENT_LOCATION.lat, PATIENT_LOCATION.lng]}
                zoom={14}
                zoomControl={false}
                scrollWheelZoom={false}
                dragging={false}
                touchZoom={false}
                doubleClickZoom={false}
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
                  subdomains="abcd"
                  maxZoom={20}
                />
                <Marker position={[PATIENT_LOCATION.lat, PATIENT_LOCATION.lng]} icon={userHeroPin()} />
                {heroDoctors.map(d => (
                  <Marker key={d.id} position={[d.coords.lat, d.coords.lng]} icon={heroPin(d.status)} />
                ))}
                <MapAutoFit doctors={heroDoctors} user={PATIENT_LOCATION} />
              </MapContainer>

              {/* Soft fade overlays — fade to page bg */}
              <div className="absolute inset-y-0 left-0 w-20 lg:w-14 pointer-events-none"
                style={{ background: 'linear-gradient(to right, #F0F6FE, transparent)' }} />
              <div className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, #F0F6FE, transparent)' }} />
              <div className="absolute inset-x-0 top-0 h-10 pointer-events-none"
                style={{ background: 'linear-gradient(to bottom, #EEF4FF, transparent)' }} />
            </div>

            {/* Floating overlay cards — white glass */}
            <div className="absolute top-6 right-6 z-[500] rounded-2xl px-4 py-3"
              style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)', border: '1px solid rgba(5,150,105,0.2)', boxShadow: '0 4px 20px rgba(0,82,217,0.1)' }}>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-breathe" style={{ boxShadow: '0 0 8px rgba(5,150,105,0.6)' }} />
                <span className="text-xs font-semibold tracking-wider uppercase" style={{ color: '#059669' }}>
                  {heroDoctors.filter(d => d.status === 'available').length} available now
                </span>
              </div>
              <p className="text-lg font-bold text-mono mt-0.5" style={{ color: '#0B1D35' }}>
                Avg. <span style={{ color: '#059669' }}>8 min</span> away
              </p>
            </div>

            <div className="absolute bottom-10 left-6 right-6 sm:left-auto sm:right-6 sm:w-72 z-[500] rounded-2xl p-4 animate-float"
              style={{ background: 'rgba(255,255,255,0.95)', backdropFilter: 'blur(24px)', border: '1px solid rgba(0,82,217,0.12)', boxShadow: '0 8px 40px rgba(0,82,217,0.12), 0 2px 8px rgba(0,0,0,0.04)' }}>
              <div className="flex items-center gap-3 mb-3">
                <div className="relative">
                  <img src={availableDoc.photo} alt={availableDoc.name} className="w-12 h-12 rounded-full object-cover border-2"
                    style={{ borderColor: '#059669' }} />
                  <span className="absolute -bottom-0.5 -right-0.5 w-4 h-4 rounded-full bg-emerald-500 border-2 border-white animate-breathe" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm truncate" style={{ color: '#0B1D35' }}>{availableDoc.name}</p>
                  <p className="text-xs truncate" style={{ color: '#7A9ABB' }}>{availableDoc.specialty}</p>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 justify-end text-amber-500 text-xs">
                    <Star size={11} className="fill-current" />
                    <span className="text-mono font-semibold">{availableDoc.rating.toFixed(1)}</span>
                  </div>
                  <p className="text-mono text-xs font-medium mt-0.5" style={{ color: '#059669' }}>{availableDoc.distanceKm.toFixed(1)}km</p>
                </div>
              </div>
              <div className="grid grid-cols-3 gap-2 text-center mb-3">
                {[
                  { v: `${availableDoc.etaMinutes}min`, l: 'ETA' },
                  { v: formatNaira(availableDoc.fee), l: 'Fee' },
                  { v: 'Home', l: 'Mode' },
                ].map(s => (
                  <div key={s.l} className="rounded-xl py-2" style={{ background: 'rgba(0,82,217,0.05)', border: '1px solid rgba(0,82,217,0.07)' }}>
                    <div className="text-mono text-xs font-bold" style={{ color: '#0B1D35' }}>{s.v}</div>
                    <div className="text-[10px]" style={{ color: '#7A9ABB' }}>{s.l}</div>
                  </div>
                ))}
              </div>
              <Link to="/register/patient">
                <button className="btn-press w-full py-2.5 rounded-xl text-sm font-semibold text-white"
                  style={{ background: 'linear-gradient(135deg,#0052D9,#2563EB)', boxShadow: '0 4px 16px rgba(0,82,217,0.3)' }}>
                  Request this doctor →
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ STATS BAR (light) ═══════════════════════════════════════════════ */}
      <section style={{ background: '#F4F8FF' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 divide-x divide-y md:divide-y-0 rounded-2xl overflow-hidden"
            style={{ border: '1px solid rgba(0,82,217,0.1)', background: '#fff' }}>
            {[
              { n: '50,000+', l: 'Consultations completed', icon: CheckCircle2, color: '#0052D9' },
              { n: '2,400+', l: 'Verified doctors', icon: Stethoscope, color: '#059669' },
              { n: '47 cities', l: 'Active markets', icon: Globe2, color: '#7C3AED' },
              { n: '4.9 / 5', l: 'Average patient rating', icon: Star, color: '#F59E0B' },
            ].map((s, i) => (
              <div key={i} className="flex items-center gap-4 px-6 py-5">
                <span className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0"
                  style={{ background: `${s.color}15` }}>
                  <s.icon size={18} style={{ color: s.color }} />
                </span>
                <div>
                  <div className="text-xl font-bold text-mono" style={{ color: s.color }}>{s.n}</div>
                  <div className="text-xs text-ink-dim uppercase tracking-wide">{s.l}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ FEATURES (white/glass) ═══════════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#F8FBFF' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[300px]"
            style={{ background: 'radial-gradient(ellipse, rgba(0,82,217,0.06) 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(0,82,217,0.08)', border: '1px solid rgba(0,82,217,0.15)' }}>
              <Zap size={12} style={{ color: '#0052D9' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#0052D9' }}>Built different</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: '#0B1D35' }}>
              Why patients{' '}
              <span style={{ background: 'linear-gradient(110deg,#0052D9,#2563EB,#059669)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                chose MediCall
              </span>
            </h2>
            <p className="mt-3 text-base" style={{ color: '#3D5A80' }}>Every feature is purpose-built to make healthcare feel like it belongs in 2026.</p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 stagger">
            {FEATURES.map((f, i) => (
              <div key={i} className="group p-6 rounded-2xl transition-all duration-300 cursor-default"
                style={{ background: 'rgba(255,255,255,0.9)', border: '1px solid rgba(0,82,217,0.08)', boxShadow: '0 2px 12px rgba(0,82,217,0.05)' }}
                onMouseEnter={e => { Object.assign(e.currentTarget.style, { background: '#fff', borderColor: 'rgba(0,82,217,0.25)', transform: 'translateY(-4px)', boxShadow: '0 16px 40px rgba(0,82,217,0.12)' }); }}
                onMouseLeave={e => { Object.assign(e.currentTarget.style, { background: 'rgba(255,255,255,0.9)', borderColor: 'rgba(0,82,217,0.08)', transform: 'translateY(0)', boxShadow: '0 2px 12px rgba(0,82,217,0.05)' }); }}>
                <div className="w-11 h-11 rounded-xl flex items-center justify-center mb-4"
                  style={{ background: 'rgba(0,82,217,0.08)', border: '1px solid rgba(0,82,217,0.15)' }}>
                  <f.icon size={20} style={{ color: '#0052D9' }} />
                </div>
                <h3 className="text-base font-semibold mb-2" style={{ color: '#0B1D35' }}>{f.title}</h3>
                <p className="text-sm leading-relaxed" style={{ color: '#3D5A80' }}>{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ HOW IT WORKS (light) ════════════════════════════════════════════ */}
      <section className="py-24" style={{ background: '#F4F8FF' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="text-center max-w-xl mx-auto mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-5"
              style={{ background: 'rgba(0,82,217,0.08)', border: '1px solid rgba(0,82,217,0.15)' }}>
              <Activity size={12} style={{ color: '#0052D9' }} />
              <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#0052D9' }}>How it works</span>
            </div>
            <h2 className="text-4xl lg:text-5xl font-bold tracking-tight text-navy-deep">Three steps to feeling better</h2>
            <p className="mt-3 text-ink-muted">From symptom to doctor at your door — in less time than it takes to make tea.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 relative">
            {/* Connector line */}
            <div className="hidden md:block absolute top-[3.75rem] left-[calc(16.66%+2rem)] right-[calc(16.66%+2rem)] h-px"
              style={{ background: 'linear-gradient(90deg,transparent,rgba(0,82,217,0.3),rgba(0,82,217,0.3),transparent)' }} />

            {STEPS.map((s, i) => (
              <div key={i} className="glass p-8 text-center hover:shadow-bloom hover:-translate-y-1 transition-all duration-400 ease-smooth">
                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${s.color} flex items-center justify-center mx-auto mb-5 shadow-lg`}>
                  <s.icon size={28} className="text-white" />
                </div>
                <div className="text-mono text-xs font-bold mb-2" style={{ color: '#0052D9' }}>{s.num}</div>
                <h3 className="text-xl font-bold text-navy-deep mb-3">{s.title}</h3>
                <p className="text-sm text-ink-muted leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ MAP SHOWCASE (white/glass) ══════════════════════════════════════ */}
      <section className="py-24 relative overflow-hidden" style={{ background: '#EEF4FF' }}>
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -right-40 top-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full"
            style={{ background: 'radial-gradient(circle, rgba(0,82,217,0.07) 0%, transparent 70%)' }} />
        </div>

        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="grid lg:grid-cols-[1fr_1.3fr] gap-12 items-center">
            <div className="stagger">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-6"
                style={{ background: 'rgba(5,150,105,0.08)', border: '1px solid rgba(5,150,105,0.18)' }}>
                <MapPin size={12} style={{ color: '#059669' }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#059669' }}>Live map</span>
              </div>
              <h2 className="text-4xl lg:text-5xl font-bold tracking-tight" style={{ color: '#0B1D35' }}>
                See every doctor,{' '}
                <span style={{ background: 'linear-gradient(110deg,#059669,#0052D9)', WebkitBackgroundClip: 'text', backgroundClip: 'text', color: 'transparent' }}>
                  in real time.
                </span>
              </h2>
              <p className="mt-4 text-base leading-relaxed" style={{ color: '#3D5A80' }}>
                Our live map shows every nearby doctor — their exact distance, ETA, specialty, and rating. Pick the best one and watch them navigate to you in real time.
              </p>
              <div className="mt-8 space-y-3">
                {[
                  { c: '#059669', t: 'Green pins — Available now, ready to accept' },
                  { c: '#D97706', t: 'Amber pins — Finishing a consultation soon' },
                  { c: '#0052D9', t: 'Blue pin — Your current location' },
                ].map((l, i) => (
                  <div key={i} className="flex items-center gap-3 text-sm" style={{ color: '#3D5A80' }}>
                    <span className="w-3 h-3 rounded-full shrink-0" style={{ background: l.c, boxShadow: `0 0 8px ${l.c}55` }} />
                    {l.t}
                  </div>
                ))}
              </div>
              <div className="mt-8">
                <Link to="/dashboard/patient">
                  <button className="btn-ripple btn-press inline-flex items-center gap-2 px-7 py-3.5 rounded-btn font-semibold text-white"
                    style={{ background: 'linear-gradient(135deg,#0052D9,#2563EB)', boxShadow: '0 4px 20px rgba(0,82,217,0.25)' }}>
                    Open live map <ArrowRight size={16} />
                  </button>
                </Link>
              </div>
            </div>

            {/* Map preview */}
            <div className="relative h-[420px] lg:h-[520px] rounded-3xl overflow-hidden"
              style={{ border: '1px solid rgba(0,82,217,0.12)', boxShadow: '0 4px 40px rgba(0,82,217,0.1), 0 20px 60px rgba(0,82,217,0.06)' }}>
              <MapContainer
                center={[PATIENT_LOCATION.lat, PATIENT_LOCATION.lng]}
                zoom={14}
                scrollWheelZoom
                style={{ height: '100%', width: '100%' }}
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  subdomains="abcd"
                  maxZoom={20}
                />
                <Marker position={[PATIENT_LOCATION.lat, PATIENT_LOCATION.lng]} icon={userHeroPin()} />
                {mockDoctors.filter(d => d.status !== 'offline').slice(0, 10).map(d => (
                  <Marker key={d.id} position={[d.coords.lat, d.coords.lng]} icon={heroPin(d.status, 40)} />
                ))}
              </MapContainer>
              {/* White glass badge overlay */}
              <div className="absolute top-4 left-4 z-[500] rounded-xl px-3 py-2.5"
                style={{ background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(16px)', border: '1px solid rgba(5,150,105,0.2)', boxShadow: '0 2px 12px rgba(0,0,0,0.06)' }}>
                <div className="flex items-center gap-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-breathe" />
                  <span className="text-[11px] font-bold tracking-wider uppercase" style={{ color: '#059669' }}>
                    {mockDoctors.filter(d => d.status === 'available').length} available
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ═══ TESTIMONIALS (light) ════════════════════════════════════════════ */}
      <section className="py-24" style={{ background: '#F4F8FF' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8">
          <div className="flex items-end justify-between mb-10 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full mb-4"
                style={{ background: 'rgba(5,150,105,0.1)', border: '1px solid rgba(5,150,105,0.2)' }}>
                <Users size={12} style={{ color: '#059669' }} />
                <span className="text-xs font-semibold tracking-widest uppercase" style={{ color: '#059669' }}>Trusted by patients</span>
              </div>
              <h2 className="text-3xl lg:text-4xl font-bold text-navy-deep tracking-tight">What people are saying</h2>
            </div>
            <div className="hidden sm:flex items-center gap-2">
              <button onClick={() => scroll(-1)} className="w-10 h-10 glass rounded-full flex items-center justify-center text-ink-muted hover:text-ink transition-all">
                <ChevronLeft size={18} />
              </button>
              <button onClick={() => scroll(1)} className="w-10 h-10 glass rounded-full flex items-center justify-center text-ink-muted hover:text-ink transition-all">
                <ChevronRight size={18} />
              </button>
            </div>
          </div>

          <div ref={carouselRef} className="flex gap-4 overflow-x-auto snap-x snap-mandatory pb-4 -mx-5 px-5 lg:mx-0 lg:px-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {TESTIMONIALS.map((t, i) => (
              <div key={i} className="snap-start shrink-0 w-[340px] glass p-7 hover:shadow-bloom hover:-translate-y-1 transition-all duration-400">
                <div className="flex items-center gap-1 mb-4">
                  {Array.from({ length: t.rating }).map((_, j) => (
                    <Star key={j} size={15} className="fill-amber-500 text-amber-500" />
                  ))}
                </div>
                <p className="text-ink leading-relaxed text-sm mb-6">"{t.text}"</p>
                <div className="flex items-center gap-3 pt-4 border-t border-border">
                  <Avatar name={t.name} size="sm" />
                  <div>
                    <div className="text-sm font-semibold text-ink">{t.name}</div>
                    <div className="text-xs text-ink-dim">{t.role} · {t.city}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══ CTA — vibrant electric blue (the only color section) ══════════ */}
      <section className="relative overflow-hidden py-24"
        style={{ background: 'linear-gradient(135deg, #0041C2 0%, #0052D9 40%, #1D6FEF 70%, #0E8A6A 100%)' }}>
        {/* Glossy highlight overlay */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-1/2"
          style={{ background: 'linear-gradient(to bottom, rgba(255,255,255,0.08), transparent)' }} />
        {/* Inner glow */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px]"
            style={{ background: 'radial-gradient(ellipse, rgba(255,255,255,0.1) 0%, transparent 70%)' }} />
        </div>

        <div className="relative max-w-4xl mx-auto px-5 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-7"
            style={{ background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.25)', backdropFilter: 'blur(8px)' }}>
            <Clock size={13} className="text-white" />
            <span className="text-xs font-semibold tracking-widest text-white uppercase">Care on your terms</span>
          </div>
          <h2 className="text-4xl lg:text-6xl font-bold text-white tracking-tight leading-tight">
            Your health can&apos;t wait.<br />
            <span style={{ color: 'rgba(255,255,255,0.88)' }}>Neither can we.</span>
          </h2>
          <p className="mt-5 text-lg max-w-xl mx-auto" style={{ color: 'rgba(255,255,255,0.78)' }}>
            Join 50,000+ Nigerians who&apos;ve already discovered on-demand healthcare. A doctor is closer than you think.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <Link to="/register/patient">
              <button className="btn-ripple btn-press group inline-flex items-center gap-2 px-8 py-4 rounded-btn font-bold text-base transition-all"
                style={{ background: 'rgba(255,255,255,0.97)', color: '#0052D9', boxShadow: '0 4px 24px rgba(0,0,0,0.15), 0 1px 0 rgba(255,255,255,0.3) inset' }}>
                Get started for free
                <ArrowRight size={18} className="group-hover:translate-x-0.5 transition-transform" />
              </button>
            </Link>
            <Link to="/signin">
              <button className="btn-ripple btn-press inline-flex items-center gap-2 px-8 py-4 rounded-btn font-bold text-white text-base transition-all"
                style={{ background: 'rgba(255,255,255,0.12)', border: '1px solid rgba(255,255,255,0.3)', backdropFilter: 'blur(8px)' }}>
                Sign in
              </button>
            </Link>
          </div>
        </div>
      </section>

      {/* ═══ FOOTER — white/light ═════════════════════════════════════════════ */}
      <footer style={{ background: '#F8FBFF', borderTop: '1px solid rgba(0,82,217,0.08)' }}>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-12 grid md:grid-cols-4 gap-8 text-sm">
          <div>
            <div className="flex items-center gap-2.5 mb-4">
              <span className="w-8 h-8 rounded-xl flex items-center justify-center"
                style={{ background: 'rgba(0,82,217,0.1)', border: '1px solid rgba(0,82,217,0.18)' }}>
                <Stethoscope size={15} style={{ color: '#0052D9' }} />
              </span>
              <span className="font-bold text-lg" style={{ color: '#0B1D35' }}>Medi<span style={{ color: '#0052D9' }}>Call</span></span>
            </div>
            <p className="text-sm leading-relaxed" style={{ color: '#7A9ABB' }}>
              A doctor. At your door. In minutes.
            </p>
          </div>
          {[
            { title: 'Patients', items: [
              { label: 'Find a doctor', to: '/dashboard/patient' },
              { label: 'Home visits', to: '/home-visits' },
              { label: 'Video consults', to: '/video-consults' },
              { label: 'Pricing', to: '/pricing' },
            ]},
            { title: 'Doctors', items: [
              { label: 'Join MediCall', to: '/register/doctor' },
              { label: 'How payouts work', to: '/payouts' },
              { label: 'Resources', to: '/resources' },
              { label: 'Verification', to: '/verification' },
            ]},
            { title: 'Company', items: [
              { label: 'About', to: '/about' },
              { label: 'Careers', to: '/careers' },
              { label: 'Press', to: '/press' },
              { label: 'Contact', to: '/contact' },
            ]},
          ].map(g => (
            <div key={g.title}>
              <div className="text-xs font-bold uppercase tracking-widest mb-4" style={{ color: '#3D5A80' }}>{g.title}</div>
              <ul className="space-y-2.5">
                {g.items.map(item => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm transition-colors"
                      style={{ color: '#7A9ABB', textDecoration: 'none' }}
                      onMouseEnter={e => { e.currentTarget.style.color = '#0052D9'; }}
                      onMouseLeave={e => { e.currentTarget.style.color = '#7A9ABB'; }}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-5 lg:px-8 py-5 flex flex-wrap items-center justify-between gap-2 text-xs"
          style={{ borderTop: '1px solid rgba(0,82,217,0.07)', color: '#7A9ABB' }}>
          <span>© 2026 MediCall Health, Inc. All rights reserved.</span>
          <span>Built with care in Abuja · Made for the world.</span>
        </div>
      </footer>
    </div>
  );
}
