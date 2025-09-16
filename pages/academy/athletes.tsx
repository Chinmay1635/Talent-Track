import ProtectedRoute from '../../src/components/ProtectedRoute';
import AcademyAthletes from '../../src/components/Academy/AcademyAthletes';
import Navbar from '../../src/components/Layout/Navbar';

export default function AcademyAthletesPage() {
  return (
    <ProtectedRoute allowedRoles={['academy']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AcademyAthletes />
      </div>
    </ProtectedRoute>
  );
}