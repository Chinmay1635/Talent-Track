import ProtectedRoute from '../../src/components/ProtectedRoute';
import AthleteAcademies from '../../src/components/Athlete/AthleteAcademies';
import Navbar from '../../src/components/Layout/Navbar';

export default function AthleteAcademiesPage() {
  return (
    <ProtectedRoute allowedRoles={['athlete']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AthleteAcademies />
      </div>
    </ProtectedRoute>
  );
}