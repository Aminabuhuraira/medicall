import { useMemo, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Mail, Lock, User, Phone, Calendar, Droplet, MapPin, ArrowRight, ArrowLeft, X, Check } from 'lucide-react';
import Card from '../components/ui/Card.jsx';
import Input from '../components/ui/Input.jsx';
import Button from '../components/ui/Button.jsx';
import Badge from '../components/ui/Badge.jsx';
import { useAuth } from '../context/AuthContext.jsx';

const STEPS = ['Account', 'Health profile', 'Address & contact'];

function passwordStrength(p) {
  let score = 0;
  if (p.length >= 8) score++;
  if (/[A-Z]/.test(p)) score++;
  if (/[0-9]/.test(p)) score++;
  if (/[^A-Za-z0-9]/.test(p)) score++;
  return score; // 0..4
}

export default function PatientRegister() {
  const [step, setStep] = useState(0);
  const [data, setData] = useState({
    email: '', password: '', name: '', phone: '',
    dob: '', gender: '', blood: '', allergies: [],
    address: '', emergencyName: '', emergencyPhone: '',
  });
  const [errors, setErrors] = useState({});
  const [allergyDraft, setAllergyDraft] = useState('');
  const { signIn } = useAuth();
  const nav = useNavigate();
  const [loading, setLoading] = useState(false);

  const set = (k) => (e) => setData((d) => ({ ...d, [k]: e.target.value }));
  const strength = useMemo(() => passwordStrength(data.password), [data.password]);

  const validate = () => {
    const errs = {};
    if (step === 0) {
      if (!/^\S+@\S+\.\S+$/.test(data.email)) errs.email = 'Enter a valid email';
      if (data.password.length < 8) errs.password = 'At least 8 characters';
      if (!data.name.trim()) errs.name = 'Required';
      if (!/^\+?\d{7,}$/.test(data.phone.replace(/\s/g, ''))) errs.phone = 'Enter a valid phone';
    }
    if (step === 1) {
      if (!data.dob) errs.dob = 'Required';
      if (!data.gender) errs.gender = 'Select one';
      if (!data.blood) errs.blood = 'Select your blood type';
    }
    if (step === 2) {
      if (data.address.trim().length < 6) errs.address = 'Please enter your home address';
      if (!data.emergencyName.trim()) errs.emergencyName = 'Required';
      if (!/^\+?\d{7,}$/.test(data.emergencyPhone.replace(/\s/g, ''))) errs.emergencyPhone = 'Enter a valid phone';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const next = () => { if (validate()) setStep((s) => Math.min(s + 1, STEPS.length - 1)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    if (!validate()) return;
    setLoading(true);
    setTimeout(() => {
      signIn('patient', { name: data.name, email: data.email, address: data.address });
      nav('/dashboard/patient');
    }, 900);
  };

  const addAllergy = () => {
    const v = allergyDraft.trim();
    if (!v) return;
    setData((d) => ({ ...d, allergies: [...new Set([...d.allergies, v])] }));
    setAllergyDraft('');
  };

  return (
    <div className="relative flex-1 flex items-center justify-center p-5 lg:p-10 overflow-hidden">
      <div className="absolute inset-0 dots-bg opacity-50" />
      <div className="absolute -top-40 right-0 w-[600px] h-[600px] bg-cyan/10 blur-3xl rounded-full" />

      <Card glow className="relative w-full max-w-xl p-7 sm:p-9">
        <div className="flex items-center justify-between mb-1">
          <Badge tone="cyan">Patient onboarding</Badge>
          <span className="text-xs text-ink-muted text-mono">Step {step + 1} / {STEPS.length}</span>
        </div>
        <h1 className="text-display text-2xl sm:text-3xl font-semibold tracking-tight mt-3">{STEPS[step]}</h1>

        {/* Progress bar */}
        <div className="mt-4 h-1 rounded-full bg-slate-100 overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-cyan to-bio transition-all duration-500 ease-smooth"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>

        <div key={step} className="mt-6 animate-slideRight space-y-4">
          {step === 0 && (
            <>
              <Input label="Full name" leftIcon={<User size={14} />} value={data.name} onChange={set('name')} error={errors.name} placeholder="Your full name" />
              <Input label="Email" type="email" leftIcon={<Mail size={14} />} value={data.email} onChange={set('email')} error={errors.email} placeholder="you@example.com" />
              <Input label="Phone" leftIcon={<Phone size={14} />} value={data.phone} onChange={set('phone')} error={errors.phone} placeholder="+234 ..." />
              <div>
                <Input label="Password" type="password" leftIcon={<Lock size={14} />} value={data.password} onChange={set('password')} error={errors.password} placeholder="Create a strong password" />
                <div className="mt-2 grid grid-cols-4 gap-1.5">
                  {[0,1,2,3].map((i) => (
                    <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i < strength ? (strength <=1 ? 'bg-danger' : strength === 2 ? 'bg-amber-500' : strength === 3 ? 'bg-cyan' : 'bg-bio shadow-glowGreen') : 'bg-slate-200'}`} />
                  ))}
                </div>
                <p className="text-[11px] text-ink-muted mt-1">{['Too weak','Weak','Okay','Strong','Excellent'][strength]}</p>
              </div>
            </>
          )}

          {step === 1 && (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Date of birth" type="date" leftIcon={<Calendar size={14} />} value={data.dob} onChange={set('dob')} error={errors.dob} />
                <div>
                  <span className="block text-xs font-medium tracking-wide uppercase text-ink-muted mb-1.5">Gender</span>
                  <div className="grid grid-cols-3 gap-1.5">
                    {['Female','Male','Other'].map((g) => (
                      <button type="button" key={g} onClick={() => setData((d) => ({...d, gender: g}))}
                        className={`px-3 py-2.5 text-sm rounded-btn border transition-all ${data.gender===g ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-slate-200 bg-slate-50 text-ink-muted hover:text-ink'}`}>{g}</button>
                    ))}
                  </div>
                  {errors.gender && <p className="text-xs text-danger mt-1.5">{errors.gender}</p>}
                </div>
              </div>
              <div>
                <span className="block text-xs font-medium tracking-wide uppercase text-ink-muted mb-1.5"><Droplet size={11} className="inline mr-1 text-cyan" />Blood type</span>
                <div className="grid grid-cols-4 sm:grid-cols-8 gap-1.5">
                  {['A+','A-','B+','B-','O+','O-','AB+','AB-'].map((b) => (
                    <button key={b} type="button" onClick={() => setData((d) => ({...d, blood: b}))}
                      className={`px-2 py-2 text-sm rounded-btn border text-mono transition-all ${data.blood===b ? 'border-cyan/60 bg-cyan/10 text-cyan' : 'border-slate-200 bg-slate-50 text-ink-muted hover:text-ink'}`}>{b}</button>
                  ))}
                </div>
                {errors.blood && <p className="text-xs text-danger mt-1.5">{errors.blood}</p>}
              </div>
              <div>
                <span className="block text-xs font-medium tracking-wide uppercase text-ink-muted mb-1.5">Known allergies</span>
                <div className="flex gap-2">
                  <input
                    value={allergyDraft}
                    onChange={(e) => setAllergyDraft(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); addAllergy(); } }}
                    placeholder="Type and press Enter (e.g. penicillin)"
                    className="input-focus flex-1 bg-white border border-slate-200 text-ink rounded-btn px-4 py-2.5 text-sm placeholder:text-ink-dim"
                  />
                  <Button variant="ghost" onClick={addAllergy}>Add</Button>
                </div>
                {!!data.allergies.length && (
                  <div className="mt-2 flex flex-wrap gap-1.5">
                    {data.allergies.map((a) => (
                      <span key={a} className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-cyan/10 border border-cyan/30 text-xs text-cyan">
                        {a}
                        <button onClick={() => setData((d) => ({...d, allergies: d.allergies.filter((x) => x!==a)}))} className="hover:text-ink"><X size={12} /></button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <Input label="Home address" leftIcon={<MapPin size={14} />} value={data.address} onChange={set('address')} error={errors.address} placeholder="Start typing your address…" hint="We'll use this for home visits" />
              <div className="grid sm:grid-cols-2 gap-4">
                <Input label="Emergency contact name" leftIcon={<User size={14} />} value={data.emergencyName} onChange={set('emergencyName')} error={errors.emergencyName} />
                <Input label="Emergency contact phone" leftIcon={<Phone size={14} />} value={data.emergencyPhone} onChange={set('emergencyPhone')} error={errors.emergencyPhone} />
              </div>
              <div className="glass-soft p-4 text-xs text-ink-muted flex gap-2 items-start">
                <Check size={14} className="text-bio mt-0.5 shrink-0" />
                <span>By creating an account you agree to MediCall's Terms of Service and Privacy Policy. Your medical information is encrypted end-to-end.</span>
              </div>
            </>
          )}
        </div>

        <div className="mt-7 flex items-center justify-between gap-2">
          <Button variant="ghost" onClick={back} disabled={step === 0}><ArrowLeft size={14} /> Back</Button>
          {step < STEPS.length - 1 ? (
            <Button onClick={next}>Continue <ArrowRight size={14} /></Button>
          ) : (
            <Button onClick={submit} loading={loading} variant="success">Create account <ArrowRight size={14} /></Button>
          )}
        </div>

        <p className="mt-6 text-center text-sm text-ink-muted">
          Already have an account? <Link to="/signin" className="text-cyan hover:underline">Sign in</Link>
        </p>
      </Card>
    </div>
  );
}
