import React from 'react';
import { Award, Users, Star, Calendar, Trophy, Mail, Phone } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const AcademyCoaches: React.FC = () => {
  const { user } = useAuth();
  const { academies, coaches, athletes } = useData();

  const academy = academies.find(a => a.userId === user?.id) || academies[0];
  const academyCoaches = coaches.filter(c => c.academyId === academy?.id);

  // Add some dummy coaches for demonstration
  const dummyCoaches = [
    {
      id: 'academy-coach-1',
      userId: 'user-academy-coach-1',
      name: 'Rajesh Kumar',
      sport: 'Boxing',
      experience: 10,
      academyId: academy?.id,
      bio: 'Former national boxing champion with expertise in technical training and youth development.',
      specialization: 'Technical Boxing & Youth Training',
      contactEmail: 'rajesh.kumar@Mumbaiboxing.com',
      contactPhone: '+91-9876543213',
      achievements: ['National Boxing Champion 2015', 'Trained 20+ state champions', 'Youth Development Specialist'],
      assignedAthletes: 8
    },
    {
      id: 'academy-coach-2',
      userId: 'user-academy-coach-2',
      name: 'Sunita Devi',
      sport: 'Boxing',
      experience: 6,
      academyId: academy?.id,
      bio: 'Specialized in fitness conditioning and mental preparation for competitive boxing.',
      specialization: 'Fitness & Mental Conditioning',
      contactEmail: 'sunita.devi@Mumbaiboxing.com',
      contactPhone: '+91-9876543214',
      achievements: ['Fitness Trainer Certification', 'Sports Psychology Diploma', 'Trained 15+ athletes'],
      assignedAthletes: 6
    },
    {
      id: 'academy-coach-3',
      userId: 'user-academy-coach-3',
      name: 'Amit Singh',
      sport: 'Boxing',
      experience: 12,
      academyId: academy?.id,
      bio: 'Senior coach with international experience and expertise in advanced boxing techniques.',
      specialization: 'Advanced Techniques & Strategy',
      contactEmail: 'amit.singh@Mumbaiboxing.com',
      contactPhone: '+91-9876543215',
      achievements: ['International Coaching License', 'Coached at Asian Games', 'Master Trainer Certification'],
      assignedAthletes: 10
    }
  ];

  const allCoaches = [...academyCoaches, ...dummyCoaches];

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
          <p className="text-gray-600">Professional coaching staff at {academy?.name}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Coaches</p>
                <p className="text-2xl font-bold text-blue-600">{allCoaches.length}</p>
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
                  {allCoaches.filter(c => c.experience >= 10).length}
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
                  {Math.round(allCoaches.reduce((sum, c) => sum + c.experience, 0) / allCoaches.length)}y
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
                  {dummyCoaches.reduce((sum, c) => sum + (c.assignedAthletes || 0), 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Coaches Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allCoaches.map((coach) => {
            const experienceInfo = getExperienceLevel(coach.experience);
            const dummyCoach = dummyCoaches.find(dc => dc.id === coach.id);
            
            return (
              <div key={coach.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-green-500 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {coach.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{coach.name}</h3>
                        <p className="text-sm text-gray-600">{coach.sport} Coach</p>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${experienceInfo.color}`}>
                      {experienceInfo.level}
                    </span>
                  </div>

                  {/* Experience & Specialization */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Experience:</span>
                      <span className="font-medium text-gray-900">{coach.experience} years</span>
                    </div>
                    <div className="text-sm">
                      <span className="text-gray-600">Specialization:</span>
                      <p className="font-medium text-gray-900 mt-1">{coach.specialization}</p>
                    </div>
                    {dummyCoach?.assignedAthletes && (
                      <div className="flex items-center justify-between text-sm">
                        <span className="text-gray-600">Athletes:</span>
                        <span className="font-medium text-blue-600">{dummyCoach.assignedAthletes}</span>
                      </div>
                    )}
                  </div>

                  {/* Bio */}
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-3">
                      {coach.bio || dummyCoach?.bio || 'Experienced coach dedicated to developing athletic talent.'}
                    </p>
                  </div>

                  {/* Achievements */}
                  {dummyCoach?.achievements && (
                    <div className="mb-4">
                      <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                        <Trophy className="h-4 w-4 mr-1" />
                        Key Achievements
                      </h4>
                      <div className="space-y-1">
                        {dummyCoach.achievements.slice(0, 2).map((achievement, index) => (
                          <div key={index} className="flex items-start text-sm text-gray-600">
                            <div className="w-1 h-1 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></div>
                            <span>{achievement}</span>
                          </div>
                        ))}
                        {dummyCoach.achievements.length > 2 && (
                          <div className="text-xs text-gray-500">
                            +{dummyCoach.achievements.length - 2} more achievements
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Contact Info */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Contact Information</h4>
                    <div className="space-y-2">
                      {dummyCoach?.contactEmail && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Mail className="h-4 w-4 mr-2" />
                          <span className="truncate">{dummyCoach.contactEmail}</span>
                        </div>
                      )}
                      {dummyCoach?.contactPhone && (
                        <div className="flex items-center text-sm text-gray-600">
                          <Phone className="h-4 w-4 mr-2" />
                          <span>{dummyCoach.contactPhone}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="mt-4 pt-4 border-t border-gray-200 flex space-x-2">
                    <button className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      View Profile
                    </button>
                    <button className="flex-1 border border-gray-300 text-gray-700 py-2 px-3 rounded-lg hover:bg-gray-50 transition-colors text-sm font-medium">
                      Contact
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {allCoaches.length === 0 && (
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