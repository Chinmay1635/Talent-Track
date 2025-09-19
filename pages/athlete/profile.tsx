import ProtectedRoute from '../../src/components/ProtectedRoute';
import AthleteProfile from '../../src/components/Athlete/AthleteProfile';
import Navbar from '../../src/components/Layout/Navbar';

export default function AthleteProfilePage() {
  return (
    <ProtectedRoute allowedRoles={['athlete']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AthleteProfile />
      </div>
    </ProtectedRoute>
  );
}