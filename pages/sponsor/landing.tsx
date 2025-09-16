import ProtectedRoute from '../../src/components/ProtectedRoute';
import SponsorLanding from '../../src/components/Sponsor/SponsorLanding';
import Navbar from '../../src/components/Layout/Navbar';

export default function SponsorLandingPage() {
  return (
    <ProtectedRoute allowedRoles={['sponsor']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <SponsorLanding />
      </div>
    </ProtectedRoute>
  );
}