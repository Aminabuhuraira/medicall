import { Routes, Route, Navigate } from 'react-router-dom';
import Landing from './pages/Landing.jsx';
import SignIn from './pages/SignIn.jsx';
import PatientRegister from './pages/PatientRegister.jsx';
import DoctorRegister from './pages/DoctorRegister.jsx';
import PatientDashboard from './pages/PatientDashboard.jsx';
import DoctorDashboard from './pages/DoctorDashboard.jsx';
import TrackingPage from './pages/TrackingPage.jsx';
import HomeVisits from './pages/HomeVisits.jsx';
import VideoConsults from './pages/VideoConsults.jsx';
import Pricing from './pages/Pricing.jsx';
import Payouts from './pages/Payouts.jsx';
import Resources from './pages/Resources.jsx';
import Verification from './pages/Verification.jsx';
import About from './pages/About.jsx';
import Careers from './pages/Careers.jsx';
import Press from './pages/Press.jsx';
import Contact from './pages/Contact.jsx';
import Navbar from './components/layout/Navbar.jsx';

export default function App() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/register/patient" element={<PatientRegister />} />
          <Route path="/register/doctor" element={<DoctorRegister />} />
          <Route path="/dashboard/patient" element={<PatientDashboard />} />
          <Route path="/dashboard/doctor" element={<DoctorDashboard />} />
          <Route path="/track/:requestId" element={<TrackingPage />} />
          <Route path="/home-visits" element={<HomeVisits />} />
          <Route path="/video-consults" element={<VideoConsults />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/payouts" element={<Payouts />} />
          <Route path="/resources" element={<Resources />} />
          <Route path="/verification" element={<Verification />} />
          <Route path="/about" element={<About />} />
          <Route path="/careers" element={<Careers />} />
          <Route path="/press" element={<Press />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </div>
  );
}
