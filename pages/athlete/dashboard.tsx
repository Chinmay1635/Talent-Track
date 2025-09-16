import ProtectedRoute from '../../src/components/ProtectedRoute';
import AthleteDashboard from '../../src/components/Athlete/AthleteDashboard';
import Navbar from '../../src/components/Layout/Navbar';

export default function AthleteDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['athlete']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AthleteDashboard />
      </div>
    </ProtectedRoute>
  );
}