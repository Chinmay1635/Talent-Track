import React, { useState } from 'react';
import { Trophy, Medal, Crown, Award, DollarSign, Calendar, MapPin } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const TopPerformers: React.FC = () => {
  const { tournaments, athletes, tournamentWinners, sponsors } = useData();
  const { user } = useAuth();
  const [selectedTournament, setSelectedTournament] = useState('');

  const sponsor = sponsors.find(s => s.userId === user?.id) || sponsors[0];
  const completedTournaments = tournaments.filter(t => t.status === 'completed');

  // Mock tournament winners data for demonstration
  const mockWinners = {
    '3': [ // Gujarat Junior Cricket League
      { 
        athleteId: '3', 
        position: 1, 
        prize: '₹15,000',
        performance: 'Outstanding batting average of 85.5',
        sponsorId: '2'
      },
      { 
        athleteId: '1', 
        position: 2, 
        prize: '₹8,000',
        performance: 'Excellent all-round performance',
        sponsorId: '2'
      },
      { 
        athleteId: '2', 
        position: 3, 
        prize: '₹5,000',
        performance: 'Best bowling figures in tournament',
        sponsorId: '2'
      }
    ]
  };

  const getSelectedTournamentWinners = () => {
    if (!selectedTournament) return [];
    
    const winners = mockWinners[selectedTournament as keyof typeof mockWinners] || [];
    return winners.map(winner => ({
      ...winner,
      athlete: athletes.find(a => a.id === winner.athleteId),
      sponsor: sponsors.find(s => s.id === winner.sponsorId)
    }));
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="h-6 w-6 text-yellow-500" />;
      case 2: return <Medal className="h-6 w-6 text-gray-400" />;
      case 3: return <Award className="h-6 w-6 text-orange-500" />;
      default: return <Trophy className="h-6 w-6 text-gray-400" />;
    }
  };

  const getPositionColor = (position: number) => {
    switch (position) {
      case 1: return 'bg-yellow-50 border-yellow-200';
      case 2: return 'bg-gray-50 border-gray-200';
      case 3: return 'bg-orange-50 border-orange-200';
      default: return 'bg-gray-50 border-gray-200';
    }
  };

  const handleSponsorAthlete = (athleteId: string) => {
    alert(`Sponsorship request sent for athlete ID: ${athleteId}`);
  };

  const selectedTournamentData = tournaments.find(t => t.id === selectedTournament);
  const winners = getSelectedTournamentWinners();

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Top Performers</h1>
          <p className="text-gray-600">Discover tournament winners and high-performing athletes</p>
        </div>

        {/* Tournament Selection */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
            <div className="flex-1">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Select Tournament to View Winners
              </label>
              <select
                value={selectedTournament}
                onChange={(e) => setSelectedTournament(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="">Choose a tournament</option>
                {completedTournaments.map(tournament => (
                  <option key={tournament.id} value={tournament.id}>
                    {tournament.name} - {tournament.sport}
                  </option>
                ))}
              </select>
            </div>
            {selectedTournamentData && (
              <div className="bg-blue-50 p-4 rounded-lg">
                <h3 className="font-semibold text-blue-900">{selectedTournamentData.name}</h3>
                <div className="text-sm text-blue-700 space-y-1">
                  <div className="flex items-center">
                    <MapPin className="h-3 w-3 mr-1" />
                    <span>{selectedTournamentData.location}</span>
                  </div>
                  <div className="flex items-center">
                    <Calendar className="h-3 w-3 mr-1" />
                    <span>{new Date(selectedTournamentData.startDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex items-center">
                    <Trophy className="h-3 w-3 mr-1" />
                    <span>{selectedTournamentData.prizePool}</span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Winners Display */}
        {selectedTournament && winners.length > 0 && (
          <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
              <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
              Tournament Winners - {selectedTournamentData?.name}
            </h2>
            
            <div className="grid md:grid-cols-3 gap-6">
              {winners.map((winner) => (
                <div 
                  key={`${winner.athleteId}-${winner.position}`}
                  className={`border-2 rounded-xl p-6 ${getPositionColor(winner.position)}`}
                >
                  {/* Position Header */}
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center space-x-2">
                      {getPositionIcon(winner.position)}
                      <span className="text-lg font-bold text-gray-900">
                        {winner.position === 1 ? '1st Place' : 
                         winner.position === 2 ? '2nd Place' : 
                         winner.position === 3 ? '3rd Place' : 
                         `${winner.position}th Place`}
                      </span>
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-green-600">{winner.prize}</div>
                      <div className="text-xs text-gray-500">Prize Money</div>
                    </div>
                  </div>

                  {/* Athlete Info */}
                  {winner.athlete && (
                    <div className="mb-4">
                      <div className="flex items-center space-x-3 mb-3">
                        <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                          <span className="text-white font-semibold">
                            {winner.athlete.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div>
                          <h3 className="font-bold text-gray-900">{winner.athlete.name}</h3>
                          <p className="text-sm text-gray-600">{winner.athlete.sport} • {winner.athlete.region}</p>
                        </div>
                      </div>

                      {/* Performance */}
                      <div className="mb-3">
                        <h4 className="text-sm font-medium text-gray-700 mb-1">Performance</h4>
                        <p className="text-sm text-gray-600">{winner.performance}</p>
                      </div>

                      {/* Athlete Stats */}
                      <div className="grid grid-cols-2 gap-2 mb-4">
                        <div className="text-center p-2 bg-white rounded">
                          <div className="font-semibold text-blue-600">{winner.athlete.level}</div>
                          <div className="text-xs text-gray-600">Level</div>
                        </div>
                        <div className="text-center p-2 bg-white rounded">
                          <div className="font-semibold text-yellow-600">{winner.athlete.badges.length}</div>
                          <div className="text-xs text-gray-600">Badges</div>
                        </div>
                      </div>

                      {/* Badges */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Recent Badges</h4>
                        <div className="flex space-x-1">
                          {winner.athlete.badges.slice(0, 3).map((badge) => (
                            <span 
                              key={badge.id} 
                              className="text-lg" 
                              title={badge.name}
                            >
                              {badge.icon}
                            </span>
                          ))}
                          {winner.athlete.badges.length > 3 && (
                            <span className="text-xs text-gray-500">+{winner.athlete.badges.length - 3}</span>
                          )}
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Sponsorship Info */}
                  {winner.sponsor && (
                    <div className="mb-4 p-3 bg-white rounded-lg">
                      <h4 className="text-sm font-medium text-gray-700 mb-1">Sponsored by</h4>
                      <p className="text-sm font-semibold text-blue-600">{winner.sponsor.name}</p>
                      <p className="text-xs text-gray-500">{winner.sponsor.industry}</p>
                    </div>
                  )}

                  {/* Action Button */}
                  <button
                    onClick={() => winner.athlete && handleSponsorAthlete(winner.athlete.id)}
                    className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    Sponsor This Athlete
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* All-Time Top Performers */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
            <Award className="h-5 w-5 mr-2 text-purple-600" />
            All-Time Top Performers
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {athletes
              .filter(a => a.badges.length > 0)
              .sort((a, b) => b.badges.length - a.badges.length)
              .slice(0, 6)
              .map((athlete, index) => (
                <div key={athlete.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-semibold text-sm">
                          {athlete.name.split(' ').map(n => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">{athlete.name}</h3>
                        <p className="text-sm text-gray-600">{athlete.sport} • {athlete.region}</p>
                      </div>
                    </div>
                    <div className="text-center">
                      <div className="text-lg font-bold text-purple-600">#{index + 1}</div>
                      <div className="text-xs text-gray-500">Rank</div>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-2 mb-3">
                    <div className="text-center p-2 bg-purple-50 rounded">
                      <div className="font-semibold text-purple-600">{athlete.badges.length}</div>
                      <div className="text-xs text-purple-700">Badges</div>
                    </div>
                    <div className="text-center p-2 bg-blue-50 rounded">
                      <div className="font-semibold text-blue-600">{athlete.level}</div>
                      <div className="text-xs text-blue-700">Level</div>
                    </div>
                  </div>

                  <div className="flex space-x-1 mb-3">
                    {athlete.badges.slice(0, 4).map((badge) => (
                      <span key={badge.id} className="text-sm" title={badge.name}>
                        {badge.icon}
                      </span>
                    ))}
                    {athlete.badges.length > 4 && (
                      <span className="text-xs text-gray-500">+{athlete.badges.length - 4}</span>
                    )}
                  </div>

                  <button
                    onClick={() => handleSponsorAthlete(athlete.id)}
                    className="w-full bg-purple-600 text-white py-2 px-3 rounded-lg hover:bg-purple-700 transition-colors text-sm font-medium"
                  >
                    Sponsor Athlete
                  </button>
                </div>
              ))}
          </div>
        </div>

        {/* No Selection State */}
        {!selectedTournament && (
          <div className="text-center py-12">
            <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">Select a Tournament</h3>
            <p className="text-gray-500">Choose a completed tournament to view its winners and top performers.</p>
          </div>
        )}

        {/* No Winners State */}
        {selectedTournament && winners.length === 0 && (
          <div className="text-center py-12">
            <Medal className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No Winners Data</h3>
            <p className="text-gray-500">Winners data is not available for this tournament yet.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TopPerformers;