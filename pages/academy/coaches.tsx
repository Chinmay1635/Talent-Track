import ProtectedRoute from '../../src/components/ProtectedRoute';
import AcademyCoaches from '../../src/components/Academy/AcademyCoaches';
import Navbar from '../../src/components/Layout/Navbar';

export default function AcademyCoachesPage() {
  return (
    <ProtectedRoute allowedRoles={['academy']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AcademyCoaches />
      </div>
    </ProtectedRoute>
  );
}