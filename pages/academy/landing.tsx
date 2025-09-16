import ProtectedRoute from '../../src/components/ProtectedRoute';
import AcademyLanding from '../../src/components/Academy/AcademyLanding';
import Navbar from '../../src/components/Layout/Navbar';

export default function AcademyLandingPage() {
  return (
    <ProtectedRoute allowedRoles={['academy']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AcademyLanding />
      </div>
    </ProtectedRoute>
  );
}