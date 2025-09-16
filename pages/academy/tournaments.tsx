import ProtectedRoute from '../../src/components/ProtectedRoute';
import AcademyTournaments from '../../src/components/Academy/AcademyTournaments';
import Navbar from '../../src/components/Layout/Navbar';

export default function AcademyTournamentsPage() {
  return (
    <ProtectedRoute allowedRoles={['academy']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AcademyTournaments />
      </div>
    </ProtectedRoute>
  );
}