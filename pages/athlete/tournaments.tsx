import ProtectedRoute from '../../src/components/ProtectedRoute';
import AthleteTournaments from '../../src/components/Athlete/AthleteTournaments';
import Navbar from '../../src/components/Layout/Navbar';

export default function AthleteTournamentsPage() {
  return (
    <ProtectedRoute allowedRoles={['athlete']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AthleteTournaments />
      </div>
    </ProtectedRoute>
  );
}