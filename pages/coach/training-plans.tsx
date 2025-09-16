import ProtectedRoute from '../../src/components/ProtectedRoute';
import TrainingPlans from '../../src/components/Coach/TrainingPlans';
import Navbar from '../../src/components/Layout/Navbar';

export default function CoachTrainingPlansPage() {
  return (
    <ProtectedRoute allowedRoles={['coach']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <TrainingPlans />
      </div>
    </ProtectedRoute>
  );
}