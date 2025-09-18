import { useAuth } from '../src/context/AuthContext';
import LandingPage from '../src/components/LandingPage';
import Navbar from '../src/components/Layout/Navbar';

export default function Home() {
  // Optionally use user from AuthContext if you want to show/hide dashboard
  // const { user } = useAuth();
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <LandingPage />
    </div>
  );
}