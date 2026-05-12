// 15+ realistic doctor profiles around Abuja City Centre (9.0579 N, 7.4951 E)

const HOSPITALS = [
  'National Hospital Abuja',
  'Garki Hospital',
  'Maitama District Hospital',
  'Asokoro District Hospital',
  'Bwari General Hospital',
  'Gwagwalada Specialist Hospital',
  'Gwarimpa General Hospital',
  'University of Abuja Teaching Hospital',
];

const SPECIALTIES = [
  'General Practitioner',
  'Cardiologist',
  'Pediatrician',
  'Dermatologist',
  'Psychiatrist',
  'Neurologist',
  'Gynecologist',
  'Orthopedic Surgeon',
  'ENT Specialist',
  'Endocrinologist',
];

const photo = (name) =>
  `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=0D1421&color=00E5FF&size=128&bold=true`;

// Abuja City Centre
const C = { lat: 9.0579, lng: 7.4951 };
// pseudo-random offset within ~5km
const offset = (kmLat, kmLng) => ({ lat: C.lat + kmLat / 111, lng: C.lng + kmLng / 111 });

const RAW = [
  { name: 'Dr. Adeola Okonkwo', specialty: 'General Practitioner', years: 8, fee: 8000, rating: 4.9, status: 'available', off: [0.8, -1.2], hospital: 0 },
  { name: 'Dr. Chinedu Ibe', specialty: 'Cardiologist', years: 14, fee: 22000, rating: 4.8, status: 'available', off: [-1.4, 0.6], hospital: 1 },
  { name: 'Dr. Aisha Bello', specialty: 'Pediatrician', years: 10, fee: 12000, rating: 5.0, status: 'available', off: [1.6, 0.9], hospital: 2 },
  { name: 'Dr. Tunde Akinwale', specialty: 'Dermatologist', years: 6, fee: 15000, rating: 4.7, status: 'busy', off: [-0.4, -2.1], hospital: 3 },
  { name: 'Dr. Ngozi Eze', specialty: 'Psychiatrist', years: 12, fee: 18000, rating: 4.9, status: 'available', off: [2.4, -0.7], hospital: 4 },
  { name: 'Dr. Yusuf Mohammed', specialty: 'Neurologist', years: 18, fee: 25000, rating: 4.8, status: 'available', off: [-2.2, -1.4], hospital: 5 },
  { name: 'Dr. Folake Adebayo', specialty: 'Gynecologist', years: 11, fee: 17000, rating: 4.9, status: 'available', off: [0.3, 2.2], hospital: 6 },
  { name: 'Dr. Emeka Nwosu', specialty: 'Orthopedic Surgeon', years: 15, fee: 24000, rating: 4.6, status: 'busy', off: [-1.1, 1.8], hospital: 7 },
  { name: 'Dr. Hauwa Sani', specialty: 'ENT Specialist', years: 7, fee: 11000, rating: 4.7, status: 'available', off: [2.1, 1.4], hospital: 0 },
  { name: 'Dr. Ifeanyi Obi', specialty: 'General Practitioner', years: 5, fee: 7000, rating: 4.5, status: 'available', off: [-0.6, 0.4], hospital: 1 },
  { name: 'Dr. Ngozichukwu Ade', specialty: 'Endocrinologist', years: 13, fee: 20000, rating: 4.8, status: 'offline', off: [3.0, 0.2], hospital: 2 },
  { name: 'Dr. Bisi Ogundipe', specialty: 'Cardiologist', years: 9, fee: 19000, rating: 4.7, status: 'available', off: [1.2, -1.7], hospital: 3 },
  { name: 'Dr. Kelechi Umeh', specialty: 'Pediatrician', years: 4, fee: 10000, rating: 4.6, status: 'available', off: [-1.8, -0.3], hospital: 4 },
  { name: 'Dr. Sade Williams', specialty: 'Dermatologist', years: 16, fee: 21000, rating: 4.9, status: 'available', off: [0.0, 1.1], hospital: 5 },
  { name: 'Dr. Abdul Bashir', specialty: 'Psychiatrist', years: 20, fee: 23000, rating: 5.0, status: 'available', off: [-2.6, 1.2], hospital: 6 },
  { name: 'Dr. Chiamaka Nnamdi', specialty: 'General Practitioner', years: 3, fee: 5000, rating: 4.4, status: 'available', off: [1.9, -2.0], hospital: 7 },
];

export const mockDoctors = RAW.map((d, i) => {
  const o = offset(d.off[0], d.off[1]);
  const distanceKm = Math.sqrt(d.off[0] ** 2 + d.off[1] ** 2);
  const eta = Math.max(4, Math.round(distanceKm * 4 + (d.status === 'busy' ? 18 : 0)));
  return {
    id: `doc_${i + 1}`,
    name: d.name,
    photo: photo(d.name),
    specialty: d.specialty,
    rating: d.rating,
    years: d.years,
    fee: d.fee,
    status: d.status,
    coords: o,
    distanceKm: Number(distanceKm.toFixed(2)),
    etaMinutes: eta,
    hospital: HOSPITALS[d.hospital],
    bio: `${d.years}+ years experience. Trusted ${d.specialty.toLowerCase()} delivering compassionate, evidence-based care across Abuja.`,
  };
});

export const SPECIALTIES_LIST = ['All', 'General Practitioner', 'Cardiologist', 'Pediatrician', 'Dermatologist', 'Psychiatrist'];

export const PATIENT_LOCATION = { lat: C.lat, lng: C.lng };

export const formatNaira = (n) =>
  '₦' + Number(n).toLocaleString('en-NG');
