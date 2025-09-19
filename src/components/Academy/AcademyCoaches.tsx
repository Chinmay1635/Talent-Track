import React from 'react';
import { Award, Users, Star, Calendar, Trophy, Mail, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const AcademyCoaches: React.FC = () => {
  const { user } = useAuth();
  const [coaches, setCoaches] = React.useState<any[]>([]);
  const [loading, setLoading] = React.useState(true);

  // Fetch academy and its coaches from backend
  React.useEffect(() => {
    if (user?._id) {
      // Fetch the academy for this user, then fetch coaches by academyId
      fetch(`/api/academies?userId=${user._id}`)
        .then(res => res.json())
        .then(data => {
          if (data && data.length > 0) {
            const academyId = data[0]._id;
            fetch(`/api/coaches?academyId=${academyId}`)
              .then(res => res.json())
              .then(coaches => {
                setCoaches(Array.isArray(coaches) ? coaches : []);
                setLoading(false);
              })
              .catch(() => setLoading(false));
          } else {
            setCoaches([]);
            setLoading(false);
          }
        })
        .catch(() => setLoading(false));
    }
  }, [user?._id]);

  const getExperienceLevel = (years: number) => {
    if (years >= 10) return { level: 'Senior', color: 'bg-purple-100 text-purple-800' };
    if (years >= 5) return { level: 'Experienced', color: 'bg-blue-100 text-blue-800' };
    return { level: 'Junior', color: 'bg-green-100 text-green-800' };
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Academy Coaches</h1>
          <p className="text-gray-600">Professional coaching staff at your academy</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Coaches</p>
                <p className="text-2xl font-bold text-blue-600">{coaches.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Senior Coaches</p>
                <p className="text-2xl font-bold text-purple-600">
                  {coaches.filter(c => c.experience >= 10).length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Experience</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(coaches.reduce((sum, c) => sum + c.experience, 0) / coaches.length)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Athletes Coached</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {coaches.reduce((sum, c) => sum + (c.assignedAthletes || 0), 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Coaches List */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {coaches.map((coach: any) => (
            <div key={coach._id || coach.id} className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
              <div className="flex items-center mb-2">
                <Award className="h-6 w-6 text-blue-500 mr-2" />
                <span className="font-bold text-lg text-gray-900">{coach.name}</span>
              </div>
              <div className="text-sm text-gray-600 mb-1">Sport: <span className="font-medium">{coach.sport || 'N/A'}</span></div>
              <div className="text-xs text-gray-500 mb-1">Experience: <span className="font-semibold">{coach.experience || 0} years</span></div>
              {coach.specialization && <div className="text-xs text-gray-500 mb-1">Specialization: {coach.specialization}</div>}
              {coach.bio && <div className="text-xs text-gray-500 mb-1">Bio: {coach.bio}</div>}
              {coach.contactEmail && <div className="text-xs text-gray-500 flex items-center mb-1"><Mail className="h-4 w-4 mr-1" />{coach.contactEmail}</div>}
              {coach.contactPhone && <div className="text-xs text-gray-500 flex items-center mb-1"><Phone className="h-4 w-4 mr-1" />{coach.contactPhone}</div>}
              {coach.achievements && (
                <div className="text-xs text-gray-500 mt-2">
                  Achievements: {coach.achievements.slice(0, 2).map((achievement: string, index: number) => (
                    <span key={index} className="mr-2">{achievement}</span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {coaches.length === 0 && !loading && (
          <div className="text-center py-12">
            <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No coaches assigned</h3>
            <p className="text-gray-500">Add coaches to your academy to start training athletes.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademyCoaches;