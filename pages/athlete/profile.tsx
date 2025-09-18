import ProtectedRoute from '../../src/components/ProtectedRoute';
import AthleteProfile from '../../src/components/Athlete/AthleteProfile';
import ProfileSetupAthlete from '../../src/components/Athlete/ProfileSetupAthlete';
import Navbar from '../../src/components/Layout/Navbar';
import { useData } from '../../src/context/DataContext';
import { useAuth } from '../../src/context/AuthContext';

export default function AthleteProfilePage() {
  const { user } = useAuth();
  const { athletes } = useData();
  const athleteList = Array.isArray(athletes) ? athletes : [];
  const athlete = athleteList.find(a => {
    if (!user?._id) return false;
    if (a.userId === user._id) return true;
    const populatedUser = (a as any).user;
    if (populatedUser && typeof populatedUser === 'object' && populatedUser._id === user._id) return true;
    return false;
  });
  return (
    <ProtectedRoute allowedRoles={['athlete']}>
      <div className="min-h-screen bg-gray-50">
        <Navbar />
        {athlete ? <AthleteProfile /> : <ProfileSetupAthlete />}
      </div>
    </ProtectedRoute>
  );
}