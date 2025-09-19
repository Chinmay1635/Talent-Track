// pages/athlete/injuries.tsx
import ProtectedRoute from '../../src/components/ProtectedRoute';
import Navbar from '../../src/components/Layout/Navbar';

// import AthleteLayout from '../../components/Layout/AthleteLayout';
import AthleteInjuries from '../../src/components/Athlete/AthleteInjuries';

const InjuriesPage: React.FC = () => {
  return (
     <ProtectedRoute allowedRoles={['athlete']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
      <AthleteInjuries />
        
      </div>
    </ProtectedRoute>
  );
};

export default InjuriesPage;