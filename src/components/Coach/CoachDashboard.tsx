import React from 'react';
import { Users, Target, Award, TrendingUp, Plus, Calendar, BarChart3, Edit } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const CoachDashboard: React.FC = () => {
  const { user } = useAuth();
  const { coaches, athletes, trainingPlans, athleteProgress, awardBadgeToAthlete, updateAthleteLevel, updateAthleteProgress, badges } = useData();

  const coach = coaches.find(c => c.userId === user?.id) || coaches[0];
  const myAthletes = athletes.filter(a => a.coachId === coach?.id);
  const myTrainingPlans = trainingPlans.filter(tp => tp.coachId === coach?.id);
  const myAthleteProgress = athleteProgress.filter(ap => ap.coachId === coach?.id);

  const handleAwardBadge = (athleteId: string, badgeId: string) => {
    awardBadgeToAthlete(athleteId, badgeId);
  };

  const handleLevelUp = (athleteId: string, newLevel: 'Beginner' | 'Intermediate' | 'Pro') => {
    updateAthleteLevel(athleteId, newLevel);
  };

  const handleUpdateProgress = (athleteId: string, field: string, value: number) => {
    const existingProgress = myAthleteProgress.find(p => p.athleteId === athleteId);
    updateAthleteProgress(athleteId, {
      ...existingProgress,
      coachId: coach?.id,
      [field]: value
    });
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
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Coach Dashboard</h1>
          <p className="text-gray-600">Welcome back, {coach?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Athletes</p>
                <p className="text-2xl font-bold text-gray-900">{myAthletes.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Training Plans</p>
                <p className="text-2xl font-bold text-gray-900">{myTrainingPlans.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Badges Awarded</p>
                <p className="text-2xl font-bold text-gray-900">
                  {myAthletes.reduce((total, athlete) => total + athlete.badges.length, 0)}
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
                <p className="text-sm font-medium text-gray-600">Experience</p>
                <p className="text-2xl font-bold text-gray-900">{coach?.experience}y</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* My Athletes */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">My Athletes</h2>
                <button className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Training Plan
                </button>
              </div>

              <div className="space-y-4">
                {myAthletes.map((athlete) => (
                  <div key={athlete.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{athlete.name}</h3>
                        <p className="text-sm text-gray-600">{athlete.sport} • {athlete.region}</p>
                      </div>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        athlete.level === 'Beginner' ? 'bg-green-100 text-green-800' :
                        athlete.level === 'Intermediate' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-purple-100 text-purple-800'
                      }`}>
                        {athlete.level}
                      </span>
                    </div>

                    {/* Progress Metrics */}
                    {(() => {
                      const progress = myAthleteProgress.find(p => p.athleteId === athlete.id);
                      return progress && (
                        <div className="mb-3 p-3 bg-gray-50 rounded-lg">
                          <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                            <BarChart3 className="h-4 w-4 mr-1" />
                            Performance Metrics
                          </h4>
                          <div className="grid grid-cols-3 gap-3 text-sm">
                            <div>
                              <span className="text-gray-600">Speed:</span>
                              <div className="flex items-center">
                                <span className="font-semibold text-green-600">+{progress.speedImprovement}%</span>
                                <button
                                  onClick={() => {
                                    const newValue = prompt('Update speed improvement %:', progress.speedImprovement.toString());
                                    if (newValue) handleUpdateProgress(athlete.id, 'speedImprovement', parseFloat(newValue));
                                  }}
                                  className="ml-2 text-gray-400 hover:text-blue-600"
                                >
                                  <Edit className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600">Accuracy:</span>
                              <div className="flex items-center">
                                <span className="font-semibold text-blue-600">+{progress.accuracyImprovement}%</span>
                                <button
                                  onClick={() => {
                                    const newValue = prompt('Update accuracy improvement %:', progress.accuracyImprovement.toString());
                                    if (newValue) handleUpdateProgress(athlete.id, 'accuracyImprovement', parseFloat(newValue));
                                  }}
                                  className="ml-2 text-gray-400 hover:text-blue-600"
                                >
                                  <Edit className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                            <div>
                              <span className="text-gray-600">Last Position:</span>
                              <div className="flex items-center">
                                <span className="font-semibold text-purple-600">#{progress.lastTournamentPosition}</span>
                                <button
                                  onClick={() => {
                                    const newValue = prompt('Update last tournament position:', progress.lastTournamentPosition.toString());
                                    if (newValue) handleUpdateProgress(athlete.id, 'lastTournamentPosition', parseInt(newValue));
                                  }}
                                  className="ml-2 text-gray-400 hover:text-blue-600"
                                >
                                  <Edit className="h-3 w-3" />
                                </button>
                              </div>
                            </div>
                          </div>
                          {progress.notes && (
                            <div className="mt-2 text-xs text-gray-600">
                              <strong>Notes:</strong> {progress.notes}
                            </div>
                          )}
                        </div>
                      );
                    })()}

                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Badges: {athlete.badges.length}</span>
                        <div className="flex space-x-1">
                          {athlete.badges.slice(0, 3).map((badge) => (
                            <span key={badge.id} className="text-sm">{badge.icon}</span>
                          ))}
                        </div>
                      </div>

                      <div className="flex space-x-2">
                        {/* Award Badge */}
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

                        {/* Level Up */}
                        {getNextLevel(athlete.level) && (
                          <button
                            onClick={() => handleLevelUp(athlete.id, getNextLevel(athlete.level) as any)}
                            className="text-xs bg-green-600 text-white px-2 py-1 rounded hover:bg-green-700 transition-colors"
                          >
                            Level Up
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}

                {myAthletes.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No athletes assigned yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Coach Profile */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Coach Profile</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Name</p>
                  <p className="text-gray-900">{coach?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Sport</p>
                  <p className="text-gray-900">{coach?.sport}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Experience</p>
                  <p className="text-gray-900">{coach?.experience} years</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Specialization</p>
                  <p className="text-gray-900">{coach?.specialization}</p>
                </div>
              </div>
            </div>

            {/* Recent Training Plans */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Recent Training Plans</h2>
              <div className="space-y-3">
                {myTrainingPlans.slice(0, 3).map((plan) => (
                  <div key={plan.id} className="p-3 bg-gray-50 rounded-lg">
                    <h3 className="font-medium text-gray-900 text-sm">{plan.title}</h3>
                    <p className="text-xs text-gray-600 mt-1">{plan.duration} weeks</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                      plan.status === 'active' ? 'bg-green-100 text-green-800' :
                      plan.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {plan.status}
                    </span>
                  </div>
                ))}

                {myTrainingPlans.length === 0 && (
                  <div className="text-center py-4">
                    <Calendar className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No training plans yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachDashboard;