import ProtectedRoute from '../../src/components/ProtectedRoute';
import CoachLanding from '../../src/components/Coach/CoachLanding';
import Navbar from '../../src/components/Layout/Navbar';

export default function CoachLandingPage() {
  return (
    <ProtectedRoute allowedRoles={['coach']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <CoachLanding />
      </div>
    </ProtectedRoute>
  );
}