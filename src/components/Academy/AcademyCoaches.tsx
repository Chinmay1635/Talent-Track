import React from 'react';
import { Award, Users, Star, Calendar, Trophy, Mail, Phone, Trash2, Edit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const AcademyCoaches: React.FC = () => {
  const { user } = useAuth();
  let { academies, coaches, removeCoachFromAcademy } = useData();

  // Defensive: ensure arrays are always arrays
  if (!Array.isArray(academies)) academies = [];
  if (!Array.isArray(coaches)) coaches = [];
  
  // Use _id for MongoDB consistency - find academy for current user
  const academy = academies.find(a => a.userId === user?._id) || academies[0];
  
  // Filter coaches for the current academy
  const academyCoaches = coaches.filter(c => c.academyId === academy?._id || c.academyId === academy?.id);

  const getExperienceLevel = (years: number) => {
    if (years >= 10) return { level: 'Senior', color: 'bg-purple-100 text-purple-800' };
    if (years >= 5) return { level: 'Experienced', color: 'bg-blue-100 text-blue-800' };
    return { level: 'Junior', color: 'bg-green-100 text-green-800' };
  };

  const handleRemoveCoach = (coachId: string) => {
    if (confirm('Are you sure you want to remove this coach?')) {
      removeCoachFromAcademy(coachId);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Academy Coaches</h1>
          <p className="text-gray-600">Professional coaching staff at {academy?.name || 'your academy'}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Coaches</p>
                <p className="text-2xl font-bold text-blue-600">{academyCoaches.length}</p>
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
                  {academyCoaches.filter(c => (c.experience || 0) >= 10).length}
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
                  {academyCoaches.length > 0 
                    ? Math.round(academyCoaches.reduce((sum, c) => sum + (c.experience || 0), 0) / academyCoaches.length) 
                    : 0} yrs
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
                <p className="text-sm font-medium text-gray-600">Sports Covered</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {new Set(academyCoaches.map(c => c.sport).filter(Boolean)).size}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Coaches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {academyCoaches.map((coach: any) => {
            const experienceInfo = getExperienceLevel(coach.experience || 0);
            return (
              <div key={coach._id || coach.id} className="bg-white rounded-xl shadow-sm p-6 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-3">
                      <Award className="h-6 w-6 text-blue-600" />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-900">{coach.name || 'No name'}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${experienceInfo.color}`}>
                        {experienceInfo.level}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => {
                      if (typeof coach?._id === 'string') handleRemoveCoach(coach._id);
                    }}
                    className="text-red-600 hover:text-red-700 p-1"
                    title="Remove Coach"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center">
                    <Trophy className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">
                      <span className="font-medium">Sport:</span> {coach.sport || 'Not specified'}
                    </span>
                  </div>

                  <div className="flex items-center">
                    <Calendar className="h-4 w-4 text-gray-400 mr-2" />
                    <span className="text-sm text-gray-600">
                      <span className="font-medium">Experience:</span> {coach.experience || 0} years
                    </span>
                  </div>

                  {coach.specialization && (
                    <div className="flex items-center">
                      <Star className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">
                        <span className="font-medium">Specialization:</span> {coach.specialization}
                      </span>
                    </div>
                  )}

                  {coach.contactEmail && (
                    <div className="flex items-center">
                      <Mail className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{coach.contactEmail}</span>
                    </div>
                  )}

                  {coach.contactPhone && (
                    <div className="flex items-center">
                      <Phone className="h-4 w-4 text-gray-400 mr-2" />
                      <span className="text-sm text-gray-600">{coach.contactPhone}</span>
                    </div>
                  )}

                  {coach.bio && (
                    <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                      <p className="text-sm text-gray-600 line-clamp-3">{coach.bio}</p>
                    </div>
                  )}

                  {coach.achievements && Array.isArray(coach.achievements) && coach.achievements.length > 0 && (
                    <div className="mt-3">
                      <p className="text-sm font-medium text-gray-700 mb-2">Key Achievements:</p>
                      <div className="flex flex-wrap gap-1">
                        {coach.achievements.slice(0, 3).map((achievement: string, index: number) => (
                          <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                            {achievement}
                          </span>
                        ))}
                        {coach.achievements.length > 3 && (
                          <span className="text-xs text-gray-500">+{coach.achievements.length - 3} more</span>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {academyCoaches.length === 0 && (
          <div className="text-center py-12">
            <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No coaches assigned</h3>
            <p className="text-gray-500">Add coaches to your academy to start training athletes.</p>
            <p className="text-sm text-gray-400 mt-2">Coaches can be added from the Academy Dashboard.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademyCoaches;