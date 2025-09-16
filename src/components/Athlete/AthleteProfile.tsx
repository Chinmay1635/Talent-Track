import React from 'react';
import { MapPin, Trophy, Star, Calendar, User, Award } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const AthleteProfile: React.FC = () => {
  const { user } = useAuth();
  const { athletes, coaches, academies, tournaments } = useData();

  // Find the athlete data for the current user
  const athlete = athletes.find(a => a.userId === user?.id) || athletes[0]; // Fallback to sample data
  const coach = coaches.find(c => c.id === athlete?.coachId);
  const academy = academies.find(a => a.id === athlete?.academyId);
  const athleteTournaments = tournaments.filter(t => t.sport === athlete?.sport);

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Pro': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBadgeColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'bg-gray-100 text-gray-800';
      case 'rare': return 'bg-blue-100 text-blue-800';
      case 'epic': return 'bg-purple-100 text-purple-800';
      case 'legendary': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (!athlete) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Profile Not Found</h2>
          <p className="text-gray-600">Please complete your athlete profile setup.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="bg-white rounded-xl shadow-sm p-8 mb-8">
          <div className="flex flex-col md:flex-row items-start md:items-center space-y-4 md:space-y-0 md:space-x-6">
            <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{athlete.name}</h1>
              <div className="flex flex-wrap items-center gap-4 text-gray-600">
                <div className="flex items-center space-x-1">
                  <Trophy className="h-4 w-4" />
                  <span>{athlete.sport}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <MapPin className="h-4 w-4" />
                  <span>{athlete.region}</span>
                </div>
                <div className="flex items-center space-x-1">
                  <Calendar className="h-4 w-4" />
                  <span>{athlete.age} years old</span>
                </div>
              </div>
              <div className="mt-3">
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getLevelColor(athlete.level)}`}>
                  <Star className="h-4 w-4 mr-1" />
                  {athlete.level}
                </span>
              </div>
            </div>
          </div>

          {athlete.bio && (
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-gray-700">{athlete.bio}</p>
            </div>
          )}
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Badges */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Award className="h-5 w-5 mr-2 text-yellow-500" />
                Badges & Achievements
              </h2>
              
              {athlete.badges.length > 0 ? (
                <div className="grid md:grid-cols-2 gap-4">
                  {athlete.badges.map((badge) => (
                    <div key={badge.id} className="flex items-center space-x-3 p-4 bg-gray-50 rounded-lg">
                      <div className="text-2xl">{badge.icon}</div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900">{badge.name}</h3>
                        <p className="text-sm text-gray-600">{badge.description}</p>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${getBadgeColor(badge.rarity)}`}>
                          {badge.rarity}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8">
                  <Award className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">No badges earned yet. Keep training to unlock achievements!</p>
                </div>
              )}
            </div>

            {/* Tournament History */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-blue-500" />
                Tournament History
              </h2>
              
              <div className="space-y-4">
                {athleteTournaments.slice(0, 3).map((tournament) => (
                  <div key={tournament.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">{tournament.name}</h3>
                      <p className="text-sm text-gray-600">{tournament.location}</p>
                      <p className="text-xs text-gray-500">{new Date(tournament.startDate).toLocaleDateString()}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        tournament.status === 'completed' ? 'bg-green-100 text-green-800' :
                        tournament.status === 'ongoing' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }`}>
                        {tournament.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-8">
            {/* Academy & Coach Info */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Training Details</h2>
              
              {academy && (
                <div className="mb-6">
                  <h3 className="font-semibold text-gray-900 mb-2">Academy</h3>
                  <div className="p-3 bg-blue-50 rounded-lg">
                    <p className="font-medium text-blue-900">{academy.name}</p>
                    <p className="text-sm text-blue-700">{academy.location}</p>
                  </div>
                </div>
              )}

              {coach && (
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Coach</h3>
                  <div className="p-3 bg-green-50 rounded-lg">
                    <p className="font-medium text-green-900">{coach.name}</p>
                    <p className="text-sm text-green-700">{coach.specialization}</p>
                    <p className="text-xs text-green-600">{coach.experience} years experience</p>
                  </div>
                </div>
              )}

              {!academy && !coach && (
                <div className="text-center py-4">
                  <p className="text-gray-500 text-sm">No academy or coach assigned yet.</p>
                </div>
              )}
            </div>

            {/* Quick Stats */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Quick Stats</h2>
              
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Badges Earned</span>
                  <span className="font-semibold text-gray-900">{athlete.badges.length}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Current Level</span>
                  <span className="font-semibold text-gray-900">{athlete.level}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Sport</span>
                  <span className="font-semibold text-gray-900">{athlete.sport}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-600">Region</span>
                  <span className="font-semibold text-gray-900">{athlete.region}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteProfile;