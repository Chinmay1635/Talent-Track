import ProtectedRoute from '../../src/components/ProtectedRoute';
import DiscoverAthletes from '../../src/components/Sponsor/DiscoverAthletes';
import Navbar from '../../src/components/Layout/Navbar';

export default function SponsorAthletesPage() {
  return (
    <ProtectedRoute allowedRoles={['sponsor']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <DiscoverAthletes />
      </div>
    </ProtectedRoute>
  );
}