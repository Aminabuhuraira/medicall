import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Phone, User, Camera, BadgeCheck, Building2, Calendar, ArrowRight, ArrowLeft, Upload, CreditCard, Check } from 'lucide-react';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import Avatar from '../components/ui/Avatar.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const STEPS = ['Personal', 'Credentials', 'Availability', 'Payouts'];
const SPECIALTIES = ['General Practitioner','Cardiologist','Pediatrician','Dermatologist','Psychiatrist','Neurologist','Gynecologist','Orthopedic Surgeon','ENT Specialist','Endocrinologist'];
const DAYS = ['Mon','Tue','Wed','Thu','Fri','Sat','Sun'];

export default function DoctorRegister() {
  const [step, setStep] = useState(0);
  const [d, setD] = useState({
    name: '', email: '', phone: '', photo: '',
    license: '', specialty: '', years: '', hospital: '',
    days: { Mon:true, Tue:true, Wed:true, Thu:true, Fri:true, Sat:false, Sun:false },
    startHour: '09:00', endHour: '17:00', radius: 5,
    bank: '', account: '', idDoc: '',
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const nav = useNavigate();

  const set = (k) => (e) => setD((p) => ({ ...p, [k]: e.target.value }));

  const validate = () => {
    const e = {};
    if (step === 0) {
      if (!d.name.trim()) e.name = 'Required';
      if (!/^\S+@\S+\.\S+$/.test(d.email)) e.email = 'Enter a valid email';
      if (!/^\+?\d{7,}$/.test(d.phone.replace(/\s/g,''))) e.phone = 'Valid phone required';
    }
    if (step === 1) {
      if (d.license.trim().length < 4) e.license = 'License number required';
      if (!d.specialty) e.specialty = 'Select your specialty';
      if (!d.years || +d.years < 1) e.years = 'Enter years';
      if (!d.hospital.trim()) e.hospital = 'Required';
    }
    if (step === 3) {
      if (!d.bank.trim()) e.bank = 'Required';
      if (!/^\d{6,}$/.test(d.account)) e.account = 'Enter a valid account number';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => Math.min(s + 1, STEPS.length - 1)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));
  const submit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      signIn('doctor', { name: d.name, email: d.email, specialty: d.specialty });
      nav('/dashboard/doctor');
    }, 1100);
  };

  const handlePhoto = (e) => {
    const f = e.target.files?.[0];
    if (f) {
      const url = URL.createObjectURL(f);
      setD((p) => ({ ...p, photo: url }));
    }
  };

  return (
    <div className="relative flex-1 flex items-center justify-center p-5 lg:p-10 overflow-hidden">
      <div className="absolute inset-0 dots-bg opacity-50" />
      <div className="absolute -top-40 -left-40 w-[600px] h-[600px] bg-bio/10 blur-3xl rounded-full" />

      <Card glow className="relative w-full max-w-2xl p-7 sm:p-9">
        <div className="flex items-center justify-between mb-1">
          <Badge tone="green">Join the elite network</Badge>
          <span className="text-xs text-ink-muted text-mono">Step {step + 1} / {STEPS.length}</span>
        </div>
        <h1 className="text-display text-2xl sm:text-3xl font-semibold tracking-tight mt-3">{STEPS[step]}</h1>

        <div className="mt-4 grid grid-cols-4 gap-1.5">
          {STEPS.map((s, i) => (
            <div key={s} className={`h-1 rounded-full transition-all duration-500 ${i <= step ? 'bg-gradient-to-r from-cyan to-bio' : 'bg-slate-200'}`} />
          ))}
        </div>

        <div key={step} className="mt-6 animate-slideRight space-y-4">
          {step === 0 && (
            <>
              <div className="flex items-center gap-4">
                <label className="relative cursor-pointer group">
                  <Avatar src={d.photo} name={d.name || 'Doctor'} size="xl" />
                  <span className="absolute inset-0 rounded-full bg-base/70 opacity-0 group-hover:opacity-100 flex items-center justify-center text-cyan transition-opacity">
                    <Camera size={18} />
                  </span>
                  <input type="file" accept="image/*" onChange={handlePhoto} className="hidden" />
                </label>
                <div className="text-sm text-ink-muted">
                  <p className="text-ink font-medium">Upload your photo</p>
                  <p className="text-xs">Patients trust faces. PNG/JPG · max 5MB.</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Full name" leftIcon={<User size={14} />} value={d.name} onChange={set('name')} error={errors.name} placeholder="Dr. ..." />
                <Input label="Email" leftIcon={<Mail size={14} />} value={d.email} onChange={set('email')} error={errors.email} />
                <Input label="Phone" leftIcon={<Phone size={14} />} value={d.phone} onChange={set('phone')} error={errors.phone} className="sm:col-span-2" />
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <Input label="Medical license number" leftIcon={<BadgeCheck size={14} />} value={d.license} onChange={set('license')} error={errors.license} placeholder="MDCN/123456" />
              <div className="grid sm:grid-cols-2 gap-4">
                <div>
                  <span className="block text-xs font-medium tracking-wide uppercase text-ink-muted mb-1.5">Specialty</span>
                  <select
                    value={d.specialty}
                    onChange={set('specialty')}
                    className={`input-focus w-full bg-white border border-slate-200 text-ink rounded-btn px-4 py-3 text-sm ${errors.specialty ? 'input-error' : ''}`}
                  >
                    <option value="">Select your specialty</option>
                    {SPECIALTIES.map((s) => <option key={s} value={s} className="bg-surface">{s}</option>)}
                  </select>
                  {errors.specialty && <p className="text-xs text-danger mt-1.5">{errors.specialty}</p>}
                </div>
                <Input label="Years of experience" type="number" leftIcon={<Calendar size={14} />} value={d.years} onChange={set('years')} error={errors.years} placeholder="e.g. 8" />
              </div>
              <Input label="Hospital affiliation" leftIcon={<Building2 size={14} />} value={d.hospital} onChange={set('hospital')} error={errors.hospital} placeholder="Reddington Hospital" />
            </>
          )}

          {step === 2 && (
            <>
              <div>
                <span className="block text-xs font-medium tracking-wide uppercase text-ink-muted mb-2">Available days</span>
                <div className="grid grid-cols-7 gap-1.5">
                  {DAYS.map((day) => (
                    <button key={day} type="button"
                      onClick={() => setD((p) => ({...p, days: {...p.days, [day]: !p.days[day]}}))}
                      className={`py-2.5 text-xs font-medium rounded-btn border transition-all ${d.days[day] ? 'border-cyan/60 bg-cyan/10 text-cyan shadow-glow' : 'border-slate-200 bg-slate-50 text-ink-muted'}`}
                    >{day}</button>
                  ))}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Start time" type="time" value={d.startHour} onChange={set('startHour')} />
                <Input label="End time" type="time" value={d.endHour} onChange={set('endHour')} />
              </div>
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-xs font-medium tracking-wide uppercase text-ink-muted">Home visit radius</span>
                  <span className="text-mono text-cyan text-sm">{d.radius} km</span>
                </div>
                <input type="range" min="1" max="25" value={d.radius} onChange={set('radius')}
                  className="w-full accent-cyan"
                />
                <div className="flex justify-between text-[10px] text-ink-dim text-mono mt-1"><span>1 km</span><span>25 km</span></div>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <Input label="Bank name" leftIcon={<CreditCard size={14} />} value={d.bank} onChange={set('bank')} error={errors.bank} placeholder="GTBank" />
              <Input label="Account number" value={d.account} onChange={set('account')} error={errors.account} placeholder="0123456789" />
              <div>
                <span className="block text-xs font-medium tracking-wide uppercase text-ink-muted mb-1.5">ID document</span>
                <label className="glass-soft flex items-center gap-3 p-4 cursor-pointer hover:border-cyan/30 transition-all">
                  <span className="w-10 h-10 rounded-lg bg-cyan/10 border border-cyan/30 flex items-center justify-center text-cyan">
                    <Upload size={16} />
                  </span>
                  <span className="flex-1 text-sm">
                    <div className="text-ink">{d.idDoc || 'Upload ID document'}</div>
                    <div className="text-xs text-ink-muted">National ID · Driver's License · International Passport</div>
                  </span>
                  <input type="file" className="hidden" onChange={(e) => setD((p) => ({...p, idDoc: e.target.files?.[0]?.name || ''}))} />
                </label>
              </div>
              <div className="glass-soft p-4 text-xs text-ink-muted flex gap-2 items-start">
                <Check size={14} className="text-bio mt-0.5 shrink-0" />
                <span>Your credentials will be reviewed within 24 hours. You'll receive an email once you're approved to accept patients.</span>
              </div>
            </>
          )}
        </div>

        <div className="mt-7 flex items-center justify-between gap-2">
          <Button variant="ghost" onClick={back} disabled={step === 0}><ArrowLeft size={14} /> Back</Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={next}>Continue <ArrowRight size={14} /></Button>
          ) : (
            <Button onClick={submit} loading={loading} variant="success">Submit application <ArrowRight size={14} /></Button>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Already a member? <Link to="/signin" className="text-cyan hover:underline">Sign in</Link>
        </p>
      </Card>
    </div>
  );
}
