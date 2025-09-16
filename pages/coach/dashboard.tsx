import ProtectedRoute from '../../src/components/ProtectedRoute';
import CoachDashboard from '../../src/components/Coach/CoachDashboard';
import Navbar from '../../src/components/Layout/Navbar';

export default function CoachDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['coach']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <CoachDashboard />
      </div>
    </ProtectedRoute>
  );
}