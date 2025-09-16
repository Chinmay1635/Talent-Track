import ProtectedRoute from '../../src/components/ProtectedRoute';
import SponsorDashboard from '../../src/components/Sponsor/SponsorDashboard';
import Navbar from '../../src/components/Layout/Navbar';

export default function SponsorDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['sponsor']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <SponsorDashboard />
      </div>
    </ProtectedRoute>
  );
}