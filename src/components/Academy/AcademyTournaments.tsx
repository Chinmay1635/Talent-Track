import React, { useState } from 'react';
import { Trophy, Calendar, MapPin, Users, Award, Medal, Crown } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const AcademyTournaments: React.FC = () => {
  const { user } = useAuth();
  const { academies, tournaments } = useData();
  const [selectedTournament, setSelectedTournament] = useState<string>('');
  const [showWinners, setShowWinners] = useState(false);

  const academy = academies.find(a => a.userId === user?.id) || academies[0];
  const academyTournaments = tournaments.filter(t => t.academyId === academy?.id);

  // Add some dummy tournaments for demonstration
  const dummyTournaments = [
    {
      id: 'academy-tournament-1',
      name: 'Mumbai Junior Boxing Championship',
      sport: 'Boxing',
      location: 'Panvel, Mumbai',
      startDate: '2025-02-20',
      endDate: '2025-02-22',
      registrationDeadline: '2025-02-15',
      maxParticipants: 32,
      currentParticipants: 28,
      academyId: academy?.id || '',
      academyName: academy?.name || '',
      description: 'Annual junior boxing championship for athletes under 18 years.',
      eligibilityLevel: 'Beginner' as const,
      prizePool: '₹25,000',
      status: 'upcoming' as const
    },
    {
      id: 'academy-tournament-2',
      name: 'Inter-Academy Boxing League',
      sport: 'Boxing',
      location: 'Panvel, Mumbai',
      startDate: '2025-01-15',
      endDate: '2025-01-17',
      registrationDeadline: '2025-01-10',
      maxParticipants: 48,
      currentParticipants: 48,
      academyId: academy?.id || '',
      academyName: academy?.name || '',
      description: 'Competitive league between multiple boxing academies.',
      eligibilityLevel: 'Intermediate' as const,
      prizePool: '₹50,000',
      status: 'completed' as const
    },
    {
      id: 'academy-tournament-3',
      name: 'State Boxing Open',
      sport: 'Boxing',
      location: 'Panvel, Mumbai',
      startDate: '2025-01-25',
      endDate: '2025-01-27',
      registrationDeadline: '2025-01-20',
      maxParticipants: 64,
      currentParticipants: 45,
      academyId: academy?.id || '',
      academyName: academy?.name || '',
      description: 'Open tournament for all skill levels with professional judging.',
      eligibilityLevel: 'All' as const,
      prizePool: '₹75,000',
      status: 'ongoing' as const
    }
  ];

  const allTournaments = [...academyTournaments, ...dummyTournaments];

  // Dummy winners data
  const tournamentWinners = {
    'academy-tournament-2': [
      { position: 1, name: 'Vikram Singh', academy: 'Mumbai Boxing Academy', prize: '₹20,000' },
      { position: 2, name: 'Rahul Kumar', academy: 'Panvel Sports Club', prize: '₹15,000' },
      { position: 3, name: 'Amit Sharma', academy: 'Mumbai Boxing Academy', prize: '₹10,000' }
    ]
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'upcoming': return 'bg-blue-100 text-blue-800';
      case 'ongoing': return 'bg-green-100 text-green-800';
      case 'completed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Pro': return 'bg-purple-100 text-purple-800';
      case 'All': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPositionIcon = (position: number) => {
    switch (position) {
      case 1: return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2: return <Medal className="h-5 w-5 text-gray-400" />;
      case 3: return <Award className="h-5 w-5 text-orange-500" />;
      default: return <Trophy className="h-5 w-5 text-gray-400" />;
    }
  };

  const handleViewWinners = (tournamentId: string) => {
    setSelectedTournament(tournamentId);
    setShowWinners(true);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Academy Tournaments</h1>
          <p className="text-gray-600">Tournaments conducted by {academy?.name}</p>
        </div>

        {/* Stats Overview */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Tournaments</p>
                <p className="text-2xl font-bold text-blue-600">{allTournaments.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Upcoming</p>
                <p className="text-2xl font-bold text-green-600">
                  {allTournaments.filter(t => t.status === 'upcoming').length}
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
                <p className="text-sm font-medium text-gray-600">Completed</p>
                <p className="text-2xl font-bold text-purple-600">
                  {allTournaments.filter(t => t.status === 'completed').length}
                </p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Participants</p>
                <p className="text-2xl font-bold text-yellow-600">
                  {allTournaments.reduce((sum, t) => sum + t.currentParticipants, 0)}
                </p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>
        </div>

        {/* Tournaments Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allTournaments.map((tournament) => (
            <div key={tournament.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{tournament.name}</h3>
                    <p className="text-sm text-gray-600">{tournament.sport}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                    {tournament.status}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{tournament.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">
                      {new Date(tournament.startDate).toLocaleDateString()} - {new Date(tournament.endDate).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{tournament.currentParticipants}/{tournament.maxParticipants} participants</span>
                  </div>
                </div>

                {/* Level & Prize */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(tournament.eligibilityLevel)}`}>
                    {tournament.eligibilityLevel}
                  </span>
                  {tournament.prizePool && (
                    <span className="text-sm font-semibold text-green-600">{tournament.prizePool}</span>
                  )}
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-2">{tournament.description}</p>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Registration</span>
                    <span>{Math.round((tournament.currentParticipants / tournament.maxParticipants) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full transition-all duration-300 ${
                        tournament.status === 'completed' ? 'bg-green-500' :
                        tournament.status === 'ongoing' ? 'bg-blue-500' :
                        'bg-yellow-500'
                      }`}
                      style={{ width: `${(tournament.currentParticipants / tournament.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500">
                    {tournament.status === 'upcoming' && `Reg. deadline: ${new Date(tournament.registrationDeadline).toLocaleDateString()}`}
                    {tournament.status === 'ongoing' && 'Tournament in progress'}
                    {tournament.status === 'completed' && 'Tournament completed'}
                  </div>
                  {tournament.status === 'completed' && (
                    <button
                      onClick={() => handleViewWinners(tournament.id)}
                      className="bg-yellow-600 text-white px-3 py-1 rounded text-xs font-medium hover:bg-yellow-700 transition-colors"
                    >
                      View Winners
                    </button>
                  )}
                  {tournament.status !== 'completed' && (
                    <button className="text-blue-600 hover:text-blue-700 text-xs font-medium">
                      Manage
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {allTournaments.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tournaments yet</h3>
            <p className="text-gray-500">Start hosting tournaments to showcase your academy's talent.</p>
          </div>
        )}

        {/* Winners Modal */}
        {showWinners && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                  <Trophy className="h-6 w-6 mr-2 text-yellow-500" />
                  Tournament Winners
                </h2>
                
                {tournamentWinners[selectedTournament as keyof typeof tournamentWinners] ? (
                  <div className="space-y-4">
                    {tournamentWinners[selectedTournament as keyof typeof tournamentWinners].map((winner) => (
                      <div key={winner.position} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          {getPositionIcon(winner.position)}
                          <div>
                            <h3 className="font-semibold text-gray-900">{winner.name}</h3>
                            <p className="text-sm text-gray-600">{winner.academy}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="font-semibold text-green-600">{winner.prize}</div>
                          <div className="text-xs text-gray-500">Position #{winner.position}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">Winners data not available for this tournament.</p>
                  </div>
                )}

                <div className="flex justify-end pt-6">
                  <button
                    onClick={() => setShowWinners(false)}
                    className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
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

export default AcademyTournaments;