import ProtectedRoute from '../../src/components/ProtectedRoute';
import YouTubeEmbeddedViewer from '../../src/components/Coach/precaution';
import Navbar from '../../src/components/Layout/Navbar';

export default function CoachDashboardPage() {
  return (
    <ProtectedRoute allowedRoles={['coach']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        <YouTubeEmbeddedViewer />
      </div>
    </ProtectedRoute>
  );
}