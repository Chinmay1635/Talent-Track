import ProtectedRoute from '../../src/components/ProtectedRoute';
import MyAthletes from '../../src/components/Coach/MyAthletes';
import Navbar from '../../src/components/Layout/Navbar';

export default function CoachAthletesPage() {
  return (
    <ProtectedRoute allowedRoles={['coach']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <MyAthletes />
      </div>
    </ProtectedRoute>
  );
}