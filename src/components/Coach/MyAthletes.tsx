import React, { useEffect, useMemo, useState } from 'react';
import { Users, Award, TrendingUp, Star, BarChart3, X, Plus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const MyAthletes: React.FC = () => {
  const { user } = useAuth();
  const { coaches, athletes, athleteProgress, badges, awardBadgeToAthlete, removeBadgeFromAthlete, updateAthleteLevel } = useData();
  
  // State for badge management modal
  const [selectedAthlete, setSelectedAthlete] = useState<any>(null);
  const [showBadgeModal, setShowBadgeModal] = useState(false);

  const coach = coaches.find(c => c.userId === user?._id) || coaches[0];
  const myAthletes = athletes.filter(a => a.coachId === coach?.id);

  // Function to generate random progress stats for real athletes
  const generateRandomStats = (athleteId: string) => {
    // Safety check for athleteId
    if (!athleteId || typeof athleteId !== 'string') {
      return { athleteId: athleteId || 'unknown', speedImprovement: 0, accuracyImprovement: 0, lastTournamentPosition: 0, completionRate: 0 };
    }
    
    // Use athleteId as seed for consistent randomization
    const seed = athleteId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = (min: number, max: number) => {
      const x = Math.sin(seed + min) * 10000;
      return Math.floor((x - Math.floor(x)) * (max - min + 1)) + min;
    };

    return {
      athleteId,
      speedImprovement: random(5, 45),
      accuracyImprovement: random(10, 50),
      lastTournamentPosition: random(1, 8),
      completionRate: random(60, 98)
    };
  };

  // Function to assign random badges to real athletes
  const assignRandomBadges = (athleteId: string, level: string) => {
    // Safety check for athleteId
    if (!athleteId || typeof athleteId !== 'string') {
      return [];
    }
    
    const seed = athleteId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    const random = (max: number) => {
      const x = Math.sin(seed) * 10000;
      return Math.floor((x - Math.floor(x)) * max);
    };

    let badgeCount;
    switch (level) {
      case 'Beginner': badgeCount = random(2) + 1; break; // 1-2 badges
      case 'Intermediate': badgeCount = random(3) + 2; break; // 2-4 badges  
      case 'Pro': badgeCount = random(4) + 3; break; // 3-6 badges
      default: badgeCount = 1;
    }

    const availableBadges = [...badges];
    const assignedBadges = [];
    
    for (let i = 0; i < Math.min(badgeCount, availableBadges.length); i++) {
      const randomIndex = (seed + i) % availableBadges.length;
      assignedBadges.push(availableBadges[randomIndex]);
      availableBadges.splice(randomIndex, 1);
    }
    
    return assignedBadges;
  };

  // Enhance real athletes with stats and badges
  const enhancedMyAthletes = useMemo(() => {
    return myAthletes.map(athlete => {
      // Use the MongoDB _id as the primary ID, fallback to id if it exists
      const athleteId = athlete._id || athlete.id;
      return {
        ...athlete,
        id: athleteId, // Ensure consistent ID using MongoDB _id
        _id: athlete._id, // Preserve the original _id
        badges: athlete.badges || [], // Use actual badges from database, not random ones
        age: athlete.age || 20, // Default age if not provided
        profileImage: athlete.profileImage || 'https://images.pexels.com/photos/8007513/pexels-photo-8007513.jpeg?auto=compress&cs=tinysrgb&w=200'
      };
    });
  }, [myAthletes]);

  const allAthletes = enhancedMyAthletes;

  // Update selected athlete when athletes data changes
  useEffect(() => {
    if (selectedAthlete && showBadgeModal) {
      const updatedAthlete = allAthletes.find(a => a.id === selectedAthlete.id || a._id === selectedAthlete.id);
      if (updatedAthlete) {
        console.log('Updating selected athlete badges:', {
          athleteId: selectedAthlete.id,
          oldBadges: selectedAthlete.badges?.length || 0,
          newBadges: updatedAthlete.badges?.length || 0,
          updatedBadgesList: updatedAthlete.badges
        });
        setSelectedAthlete({...updatedAthlete});
      }
    }
  }, [allAthletes, selectedAthlete?.id, showBadgeModal]);

  // Generate progress data for real athletes using useMemo
  const allProgress = useMemo(() => {
    const progress = [];
    
    // Generate progress for real athletes
    enhancedMyAthletes.forEach(athlete => {
      const athleteId = athlete.id; // Now consistently available
      progress.push(generateRandomStats(athleteId));
    });
    
    return progress;
  }, [enhancedMyAthletes]);

  // Debug log to verify real athletes are being enhanced
  useEffect(() => {
    if (enhancedMyAthletes.length > 0) {
      console.log('Athletes loaded:', enhancedMyAthletes.length);
      console.log('Progress data generated:', allProgress.length);
    }
  }, [enhancedMyAthletes.length, allProgress.length]);

  const getAthleteProgress = (athleteId: string) => {
    const existing = athleteProgress.find(p => p.athleteId === athleteId);
    const generated = allProgress.find(p => p.athleteId === athleteId);
    return existing || generated || { speedImprovement: 0, accuracyImprovement: 0, lastTournamentPosition: 0, completionRate: 0 };
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

  // Badge management functions
  const openBadgeModal = (athlete: any) => {
    setSelectedAthlete(athlete);
    setShowBadgeModal(true);
  };

  const closeBadgeModal = () => {
    setSelectedAthlete(null);
    setShowBadgeModal(false);
  };

  const handleRemoveBadge = async (athleteId: string, badgeId: string) => {
    console.log('Removing badge:', { athleteId, badgeId });
    await removeBadgeFromAthlete(athleteId, badgeId);
  };

  const handleAddBadge = async (athleteId: string, badgeId: string) => {
    console.log('Adding badge:', { athleteId, badgeId });
    await awardBadgeToAthlete(athleteId, badgeId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">My Athletes</h1>
          <p className="text-gray-600">Track and manage your athletes&apos; progress</p>
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
                  {Math.round(allProgress.reduce((sum, p) => sum + (p.completionRate || 0), 0) / (allProgress.length || 1))}%
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
                            <div className="text-sm font-medium text-gray-900 flex items-center space-x-2">
                              <span>{athlete.name}</span>
                              {athlete.isDisabled && (
                                <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                                  {/* ♿ Disabled */}
                                  Person with a disability
                                </span>
                              )}
                            </div>
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
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            {athlete.badges.slice(0, 3).map((badge) => (
                              <span key={badge?.id || Math.random()} className="text-lg" title={badge?.name || ''}>
                                {badge?.icon || ''}
                              </span>
                            ))}
                            {athlete.badges.length > 3 && (
                              <span className="text-xs text-gray-500">+{athlete.badges.length - 3}</span>
                            )}
                          </div>
                          <button
                            onClick={() => openBadgeModal(athlete)}
                            className="text-xs text-blue-600 hover:text-blue-800 font-medium ml-2"
                          >
                            Manage
                          </button>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        {getNextLevel(athlete.level) && (
                          <button
                            onClick={() => handleLevelUp(athlete.id, getNextLevel(athlete.level) as any)}
                            className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-xs font-medium"
                          >
                            Level Up to {getNextLevel(athlete.level)}
                          </button>
                        )}
                        {!getNextLevel(athlete.level) && (
                          <span className="text-xs text-gray-500 italic">Max Level</span>
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
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold text-gray-900">{athlete.name}</h3>
                      {athlete.isDisabled && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          {/* ♿ Adaptive */}
                          Person with Disability
                        </span>
                      )}
                    </div>
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
                        <span className="font-semibold text-purple-600">{'completionRate' in progress ? progress.completionRate : 0}%</span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-purple-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${'completionRate' in progress ? progress.completionRate : 0}%` }}
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

        {/* Badge Management Modal */}
        {showBadgeModal && selectedAthlete && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-6">
                {/* Modal Header */}
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">Manage Badges</h2>
                    <div className="flex items-center space-x-2">
                      <p className="text-gray-600">{selectedAthlete.name} • {selectedAthlete.level}</p>
                      {selectedAthlete.isDisabled && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                          Person with Disability
                        </span>
                      )}
                    </div>
                  </div>
                  <button
                    onClick={closeBadgeModal}
                    className="text-gray-400 hover:text-gray-600 p-1"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>

                {/* Current Badges */}
                <div className="mb-8">
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">Current Badges ({selectedAthlete.badges.length})</h3>
                  {selectedAthlete.badges.length > 0 ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {selectedAthlete.badges.map((badge: any) => (
                        <div key={badge.id || badge._id} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{badge.icon}</span>
                            <div>
                              <p className="font-medium text-gray-900">{badge.name}</p>
                              <p className="text-sm text-gray-500">{badge.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleRemoveBadge(selectedAthlete.id, badge.id || badge._id)}
                            className="text-red-500 hover:text-red-700 p-1"
                            title="Remove badge"
                          >
                            <X className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-500 italic">No badges assigned yet.</p>
                  )}
                </div>

                {/* Available Badges */}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    Available Badges ({badges.filter(b => {
                      const badgeId = b.id || b._id;
                      return !selectedAthlete.badges.find((ab: any) => {
                        const athleteBadgeId = ab.id || ab._id;
                        return athleteBadgeId === badgeId;
                      });
                    }).length})
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-h-60 overflow-y-auto">
                    {badges
                      .filter(badge => {
                        const badgeId = badge.id || badge._id;
                        return !selectedAthlete.badges.find((ab: any) => {
                          const athleteBadgeId = ab.id || ab._id;
                          return athleteBadgeId === badgeId;
                        });
                      })
                      .map(badge => (
                        <div key={badge.id || badge._id} className="flex items-center justify-between border border-gray-200 rounded-lg p-3 hover:bg-gray-50">
                          <div className="flex items-center space-x-3">
                            <span className="text-2xl">{badge.icon}</span>
                            <div>
                              <p className="font-medium text-gray-900">{badge.name}</p>
                              <p className="text-sm text-gray-500">{badge.description}</p>
                            </div>
                          </div>
                          <button
                            onClick={() => handleAddBadge(selectedAthlete.id, badge.id || badge._id)}
                            className="text-green-500 hover:text-green-700 p-1"
                            title="Add badge"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>
                      ))}
                  </div>
                  {badges.filter(b => {
                    const badgeId = b.id || b._id;
                    return !selectedAthlete.badges.find((ab: any) => {
                      const athleteBadgeId = ab.id || ab._id;
                      return athleteBadgeId === badgeId;
                    });
                  }).length === 0 && (
                    <p className="text-gray-500 italic">All badges have been awarded to this athlete.</p>
                  )}
                </div>

                {/* Modal Actions */}
                <div className="flex justify-end mt-6 pt-6 border-t border-gray-200">
                  <button
                    onClick={closeBadgeModal}
                    className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyAthletes;