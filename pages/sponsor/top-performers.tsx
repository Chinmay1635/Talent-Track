import ProtectedRoute from '../../src/components/ProtectedRoute';
import TopPerformers from '../../src/components/Sponsor/TopPerformers';
import Navbar from '../../src/components/Layout/Navbar';

export default function SponsorTopPerformersPage() {
  return (
    <ProtectedRoute allowedRoles={['sponsor']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <TopPerformers />
      </div>
    </ProtectedRoute>
  );
}