import ProtectedRoute from '../../src/components/ProtectedRoute';
import AcademyDashboard from '../../src/components/Academy/AcademyDashboard';
import Navbar from '../../src/components/Layout/Navbar';

export default function AcademyDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['academy']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AcademyDashboard />
      </div>
    </ProtectedRoute>
  );
}