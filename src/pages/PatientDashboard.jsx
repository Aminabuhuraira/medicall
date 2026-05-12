import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, SlidersHorizontal, Sparkles } from 'lucide-react';
import SplitLayout from '../components/layout/SplitLayout.jsx';
import LiveMap from '../components/map/LiveMap.jsx';
import DoctorList from '../components/doctor/DoctorList.jsx';
import BookingModal from '../components/booking/BookingModal.jsx';
import ActiveRequest from '../components/booking/ActiveRequest.jsx';
import { mockDoctors, SPECIALTIES_LIST, PATIENT_LOCATION } from '../data/mockDoctors.js';
import useGeolocation from '../hooks/useGeolocation.js';
import { useRequest } from '../context/RequestContext.jsx';

const PLACEHOLDERS = ['fever', 'chest pain', 'anxiety', 'back pain', 'headache', 'cough'];

export default function PatientDashboard() {
  const { coords } = useGeolocation();
  const user = coords || PATIENT_LOCATION;

  const [filter, setFilter] = useState('All');
  const [query, setQuery] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [booking, setBooking] = useState({ open: false, doctor: null, mode: 'home' });
  const [phIdx, setPhIdx] = useState(0);
  const { activeRequest, createRequest, cancelRequest } = useRequest();
  const nav = useNavigate();

  useEffect(() => {
    const id = setInterval(() => setPhIdx((i) => (i + 1) % PLACEHOLDERS.length), 2200);
    return () => clearInterval(id);
  }, []);

  const doctors = useMemo(() => {
    let list = mockDoctors;
    if (filter !== 'All') list = list.filter((d) => d.specialty === filter);
    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((d) => d.name.toLowerCase().includes(q) || d.specialty.toLowerCase().includes(q));
    }
    return list.slice().sort((a, b) => a.distanceKm - b.distanceKm);
  }, [filter, query]);

  const selected = doctors.find((d) => d.id === selectedId);
  const center = selected ? selected.coords : user;

  const handleBook = (doctor, mode) => setBooking({ open: true, doctor, mode });
  const onConfirm = (payload) => {
    const req = createRequest({
      doctor: payload.doctor,
      mode: payload.mode,
      symptoms: payload.symptoms,
      urgency: payload.urgency,
      address: payload.address,
      etaMinutes: payload.doctor.etaMinutes,
      total: payload.total,
    });
    setBooking({ open: false, doctor: null, mode: 'home' });
    nav(`/track/${req.id}`);
  };

  return (
    <>
      <SplitLayout
        left={
          <div className="p-5 lg:p-6 space-y-4 max-w-2xl mx-auto lg:mx-0">
            <div>
              <h1 className="text-display text-2xl font-semibold tracking-tight">Find care, fast.</h1>
              <p className="text-sm text-ink-muted">Verified doctors near you, available now.</p>
            </div>

            {/* Search */}
            <div className="relative">
              <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-ink-muted" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={`What do you need help with? — try "${PLACEHOLDERS[phIdx]}"`}
                className="input-focus w-full bg-white border border-slate-200 text-ink rounded-btn pl-11 pr-12 py-3.5 text-sm placeholder:text-ink-dim shadow-sm"
              />
              <Sparkles size={14} className="absolute right-4 top-1/2 -translate-y-1/2 text-cyan animate-breathe" />
            </div>

            {/* Filter chips */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 -mx-1 px-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              <SlidersHorizontal size={14} className="text-ink-muted shrink-0 mr-1" />
              {SPECIALTIES_LIST.map((s) => (
                <button
                  key={s}
                  onClick={() => setFilter(s)}
                  className={`shrink-0 px-3 py-1.5 text-xs rounded-full border transition-all ${
                    filter === s
                      ? 'bg-cyan/10 border-cyan/40 text-cyan'
                      : 'bg-white border-slate-200 text-ink-muted hover:text-ink hover:border-slate-300'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>

            <div className="flex items-center justify-between text-xs text-ink-muted">
              <span><span className="text-mono text-ink">{doctors.length}</span> doctors found nearby</span>
              <span>Sorted by distance</span>
            </div>

            <DoctorList
              doctors={doctors}
              selectedId={selectedId}
              onSelect={(d) => setSelectedId(d.id)}
              onBook={handleBook}
            />

            {activeRequest && (
              <div className="sticky bottom-3 mt-4">
                <ActiveRequest request={activeRequest} onCancel={cancelRequest} />
              </div>
            )}

            <div className="h-4" />
          </div>
        }
        right={
          <div className="absolute inset-0 lg:sticky lg:top-16 lg:h-[calc(100vh-4rem)]">
            <LiveMap
              center={center}
              zoom={14}
              user={user}
              doctors={doctors}
              selectedId={selectedId}
              onSelect={(d) => setSelectedId(d.id)}
            />
            <div className="pointer-events-none absolute top-4 left-4 right-4 flex justify-between gap-2">
              <div className="glass px-3 py-1.5 text-xs text-ink-muted backdrop-blur">
                <span className="text-mono text-cyan">LIVE</span> · {doctors.filter(d => d.status==='available').length} available now
              </div>
              <div className="glass px-3 py-1.5 text-xs text-ink-muted backdrop-blur hidden sm:block">
                Abuja · Nigeria
              </div>
            </div>
          </div>
        }
      />

      <BookingModal
        open={booking.open}
        doctor={booking.doctor}
        mode={booking.mode}
        onClose={() => setBooking({ open: false, doctor: null, mode: 'home' })}
        onConfirm={onConfirm}
      />
    </>
  );
}
