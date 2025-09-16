import React from 'react';
import { Users, Award, Star, MapPin, Calendar, Trophy } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const AcademyAthletes: React.FC = () => {
  const { user } = useAuth();
  const { academies, athletes, athleteProgress } = useData();

  const academy = academies.find(a => a.userId === user?.id) || academies[0];
  const academyAthletes = athletes.filter(a => a.academyId === academy?.id);

  // Add some dummy athletes for demonstration
  const dummyAthletes = [
    {
      id: 'academy-dummy-1',
      userId: 'user-academy-dummy-1',
      name: 'Vikram Singh',
      sport: 'Boxing',
      region: 'Mumbai',
      level: 'Pro' as const,
      badges: [
        { id: '1', name: 'State Champion', description: 'Won state championship', icon: '🏆', category: 'achievement' as const, rarity: 'epic' as const },
        { id: '2', name: 'Fitness Star', description: 'Completed 100 training sessions', icon: '⭐', category: 'skill' as const, rarity: 'rare' as const }
      ],
      academyId: academy?.id,
      age: 23,
      profileImage: 'https://images.pexels.com/photos/8007513/pexels-photo-8007513.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 'academy-dummy-2',
      userId: 'user-academy-dummy-2',
      name: 'Anjali Kumari',
      sport: 'Boxing',
      region: 'Mumbai',
      level: 'Intermediate' as const,
      badges: [
        { id: '3', name: 'Fast Learner', description: 'Mastered 5 new techniques', icon: '🚀', category: 'skill' as const, rarity: 'rare' as const }
      ],
      academyId: academy?.id,
      age: 19,
      profileImage: 'https://images.pexels.com/photos/8007513/pexels-photo-8007513.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 'academy-dummy-3',
      userId: 'user-academy-dummy-3',
      name: 'Rahul Sharma',
      sport: 'Boxing',
      region: 'Mumbai',
      level: 'Beginner' as const,
      badges: [
        { id: '4', name: 'Team Player', description: 'Participated in 10 team events', icon: '🤝', category: 'participation' as const, rarity: 'common' as const }
      ],
      academyId: academy?.id,
      age: 18,
      profileImage: 'https://images.pexels.com/photos/8007513/pexels-photo-8007513.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 'academy-dummy-4',
      userId: 'user-academy-dummy-4',
      name: 'Pooja Devi',
      sport: 'Boxing',
      region: 'Mumbai',
      level: 'Intermediate' as const,
      badges: [
        { id: '2', name: 'Fitness Star', description: 'Completed 100 training sessions', icon: '⭐', category: 'skill' as const, rarity: 'rare' as const },
        { id: '4', name: 'Team Player', description: 'Participated in 10 team events', icon: '🤝', category: 'participation' as const, rarity: 'common' as const }
      ],
      academyId: academy?.id,
      age: 20,
      profileImage: 'https://images.pexels.com/photos/8007513/pexels-photo-8007513.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 'academy-dummy-5',
      userId: 'user-academy-dummy-5',
      name: 'Suresh Kumar',
      sport: 'Boxing',
      region: 'Mumbai',
      level: 'Pro' as const,
      badges: [
        { id: '1', name: 'State Champion', description: 'Won state championship', icon: '🏆', category: 'achievement' as const, rarity: 'epic' as const },
        { id: '5', name: 'Dedication Award', description: 'Perfect attendance for 6 months', icon: '💪', category: 'special' as const, rarity: 'legendary' as const }
      ],
      academyId: academy?.id,
      age: 24,
      profileImage: 'https://images.pexels.com/photos/8007513/pexels-photo-8007513.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  const allAthletes = [...academyAthletes, ...dummyAthletes];

  // Dummy performance stats
  const performanceStats = [
    { athleteId: 'academy-dummy-1', tournaments: 8, wins: 6, winRate: 75, avgRating: 4.5 },
    { athleteId: 'academy-dummy-2', tournaments: 4, wins: 2, winRate: 50, avgRating: 3.8 },
    { athleteId: 'academy-dummy-3', tournaments: 2, wins: 0, winRate: 0, avgRating: 3.2 },
    { athleteId: 'academy-dummy-4', tournaments: 5, wins: 3, winRate: 60, avgRating: 4.1 },
    { athleteId: 'academy-dummy-5', tournaments: 12, wins: 10, winRate: 83, avgRating: 4.8 }
  ];

  const getPerformanceStats = (athleteId: string) => {
    return performanceStats.find(p => p.athleteId === athleteId) || 
           { tournaments: 0, wins: 0, winRate: 0, avgRating: 0 };
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Pro': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4.5) return 'text-green-600';
    if (rating >= 4.0) return 'text-yellow-600';
    if (rating >= 3.5) return 'text-orange-600';
    return 'text-red-600';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Academy Athletes</h1>
          <p className="text-gray-600">Manage and track all athletes registered at {academy?.name}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Athletes</p>
                <p className="text-2xl font-bold text-blue-600">{allAthletes.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Pro Level</p>
                <p className="text-2xl font-bold text-purple-600">
                  {allAthletes.filter(a => a.level === 'Pro').length}
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
                <p className="text-sm font-medium text-gray-600">Total Badges</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {allAthletes.reduce((total, athlete) => total + athlete.badges.length, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Avg Age</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(allAthletes.reduce((sum, a) => sum + (a.age || 20), 0) / allAthletes.length)}
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Athletes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allAthletes.map((athlete) => {
            const stats = getPerformanceStats(athlete.id);
            return (
              <div key={athlete.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="p-6">
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold">
                          {athlete.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900">{athlete.name}</h3>
                        <div className="flex items-center text-gray-600 text-sm">
                          <MapPin className="h-3 w-3 mr-1" />
                          <span>{athlete.region}</span>
                        </div>
                      </div>
                    </div>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(athlete.level)}`}>
                      {athlete.level}
                    </span>
                  </div>

                  {/* Basic Info */}
                  <div className="space-y-3 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Sport:</span>
                      <span className="font-medium text-gray-900">{athlete.sport}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium text-gray-900">{athlete.age} years</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Badges:</span>
                      <div className="flex items-center space-x-1">
                        {athlete.badges.slice(0, 3).map((badge) => (
                          <span key={badge.id} className="text-sm" title={badge.name}>
                            {badge.icon}
                          </span>
                        ))}
                        {athlete.badges.length > 3 && (
                          <span className="text-xs text-gray-500">+{athlete.badges.length - 3}</span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Performance Stats */}
                  <div className="border-t border-gray-200 pt-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-3 flex items-center">
                      <Trophy className="h-4 w-4 mr-1" />
                      Performance Stats
                    </h4>
                    <div className="grid grid-cols-2 gap-3 text-sm">
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="font-semibold text-gray-900">{stats.tournaments}</div>
                        <div className="text-gray-600 text-xs">Tournaments</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="font-semibold text-green-600">{stats.wins}</div>
                        <div className="text-gray-600 text-xs">Wins</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className="font-semibold text-blue-600">{stats.winRate}%</div>
                        <div className="text-gray-600 text-xs">Win Rate</div>
                      </div>
                      <div className="text-center p-2 bg-gray-50 rounded">
                        <div className={`font-semibold ${getRatingColor(stats.avgRating)}`}>
                          {stats.avgRating.toFixed(1)}
                        </div>
                        <div className="text-gray-600 text-xs">Rating</div>
                      </div>
                    </div>
                  </div>

                  {/* Win Rate Progress Bar */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-gray-600 mb-1">
                      <span>Win Rate</span>
                      <span>{stats.winRate}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${
                          stats.winRate >= 70 ? 'bg-green-500' :
                          stats.winRate >= 50 ? 'bg-yellow-500' :
                          stats.winRate >= 30 ? 'bg-orange-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${stats.winRate}%` }}
                      ></div>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium">
                      View Full Profile
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {allAthletes.length === 0 && (
          <div className="text-center py-12">
            <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No athletes registered</h3>
            <p className="text-gray-500">Athletes will appear here once they register with your academy.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AcademyAthletes;