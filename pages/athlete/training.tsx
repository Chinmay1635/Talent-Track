import ProtectedRoute from '../../src/components/ProtectedRoute';
import AthleteTraining from '../../src/components/Athlete/AthleteTraining';
import Navbar from '../../src/components/Layout/Navbar';

export default function AthleteTrainingPage() {
  return (
    <ProtectedRoute allowedRoles={['athlete']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <AthleteTraining />
      </div>
    </ProtectedRoute>
  );
}