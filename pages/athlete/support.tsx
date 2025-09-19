import ProtectedRoute from '../../src/components/ProtectedRoute';
import AthleteSupport from '../../src/components/Athlete/AthleteSupportNew';
import Navbar from '../../src/components/Layout/Navbar';

export default function AthleteSupportPage() {
  return (
    <ProtectedRoute allowedRoles={['athlete']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AthleteSupport />
      </div>
    </ProtectedRoute>
  );
}