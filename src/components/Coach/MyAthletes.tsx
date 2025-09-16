import React, { useState } from 'react';
import { Users, Award, TrendingUp, Star, Edit, Plus, BarChart3 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const MyAthletes: React.FC = () => {
  const { user } = useAuth();
  const { coaches, athletes, athleteProgress, badges, awardBadgeToAthlete, updateAthleteLevel, updateAthleteProgress } = useData();
  const [selectedAthlete, setSelectedAthlete] = useState<string>('');

  const coach = coaches.find(c => c.userId === user?.id) || coaches[0];
  const myAthletes = athletes.filter(a => a.coachId === coach?.id);

  // Add some dummy athletes for demonstration
  const dummyAthletes = [
    {
      id: 'dummy-1',
      userId: 'user-dummy-1',
      name: 'Amit Sharma',
      sport: 'Boxing',
      region: 'Mumbai',
      level: 'Beginner' as const,
      badges: [badges[3]], // Team Player badge
      coachId: coach?.id,
      age: 18,
      profileImage: 'https://images.pexels.com/photos/8007513/pexels-photo-8007513.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 'dummy-2',
      userId: 'user-dummy-2',
      name: 'Sneha Patel',
      sport: 'Boxing',
      region: 'Gujarat',
      level: 'Intermediate' as const,
      badges: [badges[1], badges[2]], // Fitness Star, Fast Learner
      coachId: coach?.id,
      age: 20,
      profileImage: 'https://images.pexels.com/photos/8007513/pexels-photo-8007513.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 'dummy-3',
      userId: 'user-dummy-3',
      name: 'Rohit Singh',
      sport: 'Boxing',
      region: 'Punjab',
      level: 'Pro' as const,
      badges: [badges[0], badges[1], badges[4]], // State Champion, Fitness Star, Dedication Award
      coachId: coach?.id,
      age: 22,
      profileImage: 'https://images.pexels.com/photos/8007513/pexels-photo-8007513.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 'dummy-4',
      userId: 'user-dummy-4',
      name: 'Kavya Reddy',
      sport: 'Boxing',
      region: 'Telangana',
      level: 'Intermediate' as const,
      badges: [badges[2], badges[3]], // Fast Learner, Team Player
      coachId: coach?.id,
      age: 19,
      profileImage: 'https://images.pexels.com/photos/8007513/pexels-photo-8007513.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 'dummy-5',
      userId: 'user-dummy-5',
      name: 'Arjun Nair',
      sport: 'Boxing',
      region: 'Kerala',
      level: 'Beginner' as const,
      badges: [badges[3]], // Team Player
      coachId: coach?.id,
      age: 17,
      profileImage: 'https://images.pexels.com/photos/8007513/pexels-photo-8007513.jpeg?auto=compress&cs=tinysrgb&w=200'
    },
    {
      id: 'dummy-6',
      userId: 'user-dummy-6',
      name: 'Priya Joshi',
      sport: 'Boxing',
      region: 'Maharashtra',
      level: 'Pro' as const,
      badges: [badges[0], badges[2], badges[4]], // State Champion, Fast Learner, Dedication Award
      coachId: coach?.id,
      age: 21,
      profileImage: 'https://images.pexels.com/photos/8007513/pexels-photo-8007513.jpeg?auto=compress&cs=tinysrgb&w=200'
    }
  ];

  const allAthletes = [...myAthletes, ...dummyAthletes];

  // Dummy progress data
  const dummyProgress = [
    { athleteId: 'dummy-1', speedImprovement: 12.5, accuracyImprovement: 18.2, lastTournamentPosition: 4, completionRate: 75 },
    { athleteId: 'dummy-2', speedImprovement: 25.3, accuracyImprovement: 32.1, lastTournamentPosition: 2, completionRate: 88 },
    { athleteId: 'dummy-3', speedImprovement: 35.7, accuracyImprovement: 42.8, lastTournamentPosition: 1, completionRate: 95 },
    { athleteId: 'dummy-4', speedImprovement: 20.1, accuracyImprovement: 28.5, lastTournamentPosition: 3, completionRate: 82 },
    { athleteId: 'dummy-5', speedImprovement: 8.9, accuracyImprovement: 15.3, lastTournamentPosition: 6, completionRate: 68 },
    { athleteId: 'dummy-6', speedImprovement: 38.2, accuracyImprovement: 45.6, lastTournamentPosition: 1, completionRate: 97 }
  ];

  const getAthleteProgress = (athleteId: string) => {
    const existing = athleteProgress.find(p => p.athleteId === athleteId);
    const dummy = dummyProgress.find(p => p.athleteId === athleteId);
    return existing || dummy || { speedImprovement: 0, accuracyImprovement: 0, lastTournamentPosition: 0, completionRate: 0 };
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Pro': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProgressColor = (value: number) => {
    if (value >= 30) return 'bg-green-500';
    if (value >= 20) return 'bg-yellow-500';
    if (value >= 10) return 'bg-blue-500';
    return 'bg-gray-400';
  };

  const handleAwardBadge = (athleteId: string, badgeId: string) => {
    awardBadgeToAthlete(athleteId, badgeId);
  };

  const handleLevelUp = (athleteId: string, newLevel: 'Beginner' | 'Intermediate' | 'Pro') => {
    updateAthleteLevel(athleteId, newLevel);
  };

  const getNextLevel = (currentLevel: string) => {
    switch (currentLevel) {
      case 'Beginner': return 'Intermediate';
      case 'Intermediate': return 'Pro';
      default: return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Athletes</h1>
          <p className="text-gray-600">Track and manage your athletes' progress</p>
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
                <p className="text-sm font-medium text-gray-600">Avg Progress</p>
                <p className="text-2xl font-bold text-green-600">
                  {Math.round(dummyProgress.reduce((sum, p) => sum + p.completionRate, 0) / dummyProgress.length)}%
                </p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Athletes Table */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-bold text-gray-900">Athletes Overview</h2>
          </div>
          
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Athlete
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Progress Stats
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Badges
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {allAthletes.map((athlete) => {
                  const progress = getAthleteProgress(athlete.id);
                  return (
                    <tr key={athlete.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10">
                            <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center">
                              <span className="text-white font-semibold text-sm">
                                {athlete.name.split(' ').map(n => n[0]).join('')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{athlete.name}</div>
                            <div className="text-sm text-gray-500">{athlete.region} • Age {athlete.age}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(athlete.level)}`}>
                          {athlete.level}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="space-y-2">
                          <div className="flex items-center">
                            <span className="text-xs text-gray-600 w-16">Speed:</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                              <div 
                                className={`h-2 rounded-full ${getProgressColor(progress.speedImprovement)}`}
                                style={{ width: `${Math.min(progress.speedImprovement, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-900 ml-2 w-12">+{progress.speedImprovement}%</span>
                          </div>
                          <div className="flex items-center">
                            <span className="text-xs text-gray-600 w-16">Accuracy:</span>
                            <div className="flex-1 bg-gray-200 rounded-full h-2 ml-2">
                              <div 
                                className={`h-2 rounded-full ${getProgressColor(progress.accuracyImprovement)}`}
                                style={{ width: `${Math.min(progress.accuracyImprovement, 100)}%` }}
                              ></div>
                            </div>
                            <span className="text-xs text-gray-900 ml-2 w-12">+{progress.accuracyImprovement}%</span>
                          </div>
                          <div className="text-xs text-gray-600">
                            Last Position: #{progress.lastTournamentPosition || 'N/A'}
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-1">
                          {athlete.badges.slice(0, 3).map((badge) => (
                            <span key={badge.id} className="text-lg" title={badge.name}>
                              {badge.icon}
                            </span>
                          ))}
                          {athlete.badges.length > 3 && (
                            <span className="text-xs text-gray-500">+{athlete.badges.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              handleAwardBadge(athlete.id, e.target.value);
                              e.target.value = '';
                            }
                          }}
                          className="text-xs px-2 py-1 border border-gray-300 rounded"
                        >
                          <option value="">Award Badge</option>
                          {badges.filter(b => !athlete.badges.find(ab => ab.id === b.id)).map(badge => (
                            <option key={badge.id} value={badge.id}>{badge.name}</option>
                          ))}
                        </select>
                        
                        {getNextLevel(athlete.level) && (
                          <button
                            onClick={() => handleLevelUp(athlete.id, getNextLevel(athlete.level) as any)}
                            className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors"
                          >
                            Level Up
                          </button>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Detailed Progress Section */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <BarChart3 className="h-5 w-5 mr-2 text-blue-600" />
            Performance Analytics
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {allAthletes.slice(0, 6).map((athlete) => {
              const progress = getAthleteProgress(athlete.id);
              return (
                <div key={athlete.id} className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center justify-between mb-3">
                    <h3 className="font-semibold text-gray-900">{athlete.name}</h3>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(athlete.level)}`}>
                      {athlete.level}
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Speed Improvement</span>
                        <span className="font-semibold text-green-600">+{progress.speedImprovement}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progress.speedImprovement, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Accuracy Improvement</span>
                        <span className="font-semibold text-blue-600">+{progress.accuracyImprovement}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${Math.min(progress.accuracyImprovement, 100)}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-gray-600">Training Completion</span>
                        <span className="font-semibold text-purple-600">{progress.completionRate || 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progress.completionRate || 0}%` }}
                        ></div>
                      </div>
                    </div>
                    
                    <div className="pt-2 border-t border-gray-200">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-gray-600">Last Tournament:</span>
                        <span className="font-semibold text-gray-900">
                          {progress.lastTournamentPosition ? `#${progress.lastTournamentPosition}` : 'N/A'}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyAthletes;