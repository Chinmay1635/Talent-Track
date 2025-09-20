import React, { useState } from 'react';
import { Trophy, MapPin, Calendar, Users, Star, Filter, Search } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';
import { findAthleteForUser } from '../../utils/userMatching';
import FloatingChatbotButton from '../Layout/FloatingChatbotButton';

const AthleteTournaments: React.FC = () => {
  const [registerLoading, setRegisterLoading] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const [registerError, setRegisterError] = useState<string | null>(null);
  const [successTournamentName, setSuccessTournamentName] = useState<string>('');
  const { tournaments, athletes } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const athleteList = Array.isArray(athletes) ? athletes : [];
    const athlete = findAthleteForUser(athletes, user);
  // ...existing code...
  const [registrations, setRegistrations] = useState<any[]>([]);

  // Fetch athlete's registrations on mount and after registration
  React.useEffect(() => {
    async function fetchRegistrations() {
      if (!athlete) return;
      try {
        const res = await fetch(`/api/tournament/registrations?athleteId=${athlete._id || athlete.id}`);
        if (res.ok) {
          const data = await res.json();
          setRegistrations(data.registrations || []);
        }
      } catch {}
    }
    fetchRegistrations();
  }, [athlete, registerSuccess]);

  const filteredTournaments = Array.isArray(tournaments)
    ? tournaments.filter(tournament => {
        const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          tournament.location.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesSport = sportFilter === 'all' || tournament.sport === sportFilter;
        const matchesLevel = levelFilter === 'all' ||
          tournament.eligibilityLevel === 'All' ||
          tournament.eligibilityLevel === levelFilter;
        return matchesSearch && matchesSport && matchesLevel;
      })
    : [];

  const uniqueSports = Array.isArray(tournaments)
    ? [...new Set(tournaments.map(t => t.sport))]
    : [];

  // ...existing code...

  const handleRegister = async (tournamentId: string, tournamentName: string) => {
    if (!athlete) return;
    setRegisterLoading(true);
    setRegisterError(null);
    try {
      const res = await fetch('/api/tournament/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          tournamentId,
          athleteId: athlete._id || athlete.id,
          contact: user?.email ?? 'N/A',
          additionalInfo: ''
        })
      });
      if (!res.ok) {
        const error = await res.json();
        setRegisterError(error.error || 'Registration failed.');
        setRegisterLoading(false);
        return;
      }
      setSuccessTournamentName(tournamentName);
      setRegisterSuccess(true);
      setRegisterLoading(false);
      // Refetch registrations to update UI
      try {
        const res = await fetch(`/api/tournament/registrations?athleteId=${athlete._id || athlete.id}`);
        if (res.ok) {
          const data = await res.json();
          setRegistrations(data.registrations || []);
        }
      } catch {}
      setTimeout(() => {
        setRegisterSuccess(false);
      }, 1500);
    } catch (err) {
      setRegisterError('Error submitting registration.');
      setRegisterLoading(false);
    }
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

  if (!athlete) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="text-center text-gray-600">
          No athlete profile is associated with your account. Please contact support or create an athlete profile.
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Tournaments</h1>
          <p className="text-gray-600">Discover and register for tournaments in your sport</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search tournaments..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Sport Filter */}
            <div className="md:w-48">
              <select
                value={sportFilter}
                onChange={(e) => setSportFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Sports</option>
                {uniqueSports.map(sport => (
                  <option key={sport} value={sport}>{sport}</option>
                ))}
              </select>
            </div>

            {/* Level Filter */}
            <div className="md:w-48">
              <select
                value={levelFilter}
                onChange={(e) => setLevelFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Levels</option>
                <option value="Beginner">Beginner</option>
                <option value="Intermediate">Intermediate</option>
                <option value="Pro">Pro</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tournament Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTournaments.map((tournament) => (
            <div key={tournament._id || tournament.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{tournament.name}</h3>
                    <p className="text-sm text-gray-600">{tournament.academyName}</p>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                    {tournament.status}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-6">
                  <div className="flex items-center text-gray-600">
                    <Trophy className="h-4 w-4 mr-2" />
                    <span className="text-sm">{tournament.sport}</span>
                  </div>
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
                <div className="flex items-center justify-between mb-6">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(tournament.eligibilityLevel)}`}>
                    <Star className="h-3 w-3 mr-1" />
                    {tournament.eligibilityLevel}
                  </span>
                  {tournament.prizePool && (
                    <span className="text-sm font-semibold text-green-600">₹{Number(tournament.prizePool).toLocaleString('en-IN')}</span>
                  )}
                </div>

                {/* Description */}
                {tournament.description && (
                  <p className="text-sm text-gray-600 mb-6">{tournament.description}</p>
                )}

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    Register by: {new Date(tournament.registrationDeadline).toLocaleDateString()}
                  </div>
                  {(() => {
                    const isRegistered = registrations.some(r => r.tournamentId === (tournament._id || tournament.id));
                    if (isRegistered) {
                      return (
                        <button className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-medium cursor-default" disabled>
                          Registered
                        </button>
                      );
                    }
                    if (tournament.status === 'upcoming' && tournament.currentParticipants < tournament.maxParticipants) {
                      return (
                        <button
                          onClick={() => handleRegister(tournament._id || tournament.id, tournament.name)}
                          className={`bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium ${registerLoading ? 'opacity-50 cursor-not-allowed' : ''}`}
                          disabled={registerLoading}
                        >
                          {registerLoading ? 'Registering...' : 'Register'}
                        </button>
                      );
                    }
                    if (tournament.currentParticipants >= tournament.maxParticipants) {
                      return <span className="text-red-600 text-sm font-medium">Full</span>;
                    }
                    return <span className="text-gray-500 text-sm font-medium">{tournament.status === 'completed' ? 'Completed' : 'Ongoing'}</span>;
                  })()}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredTournaments.length === 0 && (
          <div className="text-center py-12">
            <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No tournaments found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or check back later for new tournaments.</p>
          </div>
        )}

        {/* Success Popup */}
        {registerSuccess && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
              <Trophy className="h-10 w-10 text-green-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-green-700 mb-2">Successfully Registered!</h3>
              <p className="text-gray-700 mb-2">You have registered for <span className="font-semibold">{successTournamentName}</span>.</p>
            </div>
          </div>
        )}
        {registerError && (
          <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-sm w-full text-center">
              <Trophy className="h-10 w-10 text-red-500 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-red-700 mb-2">Registration Failed</h3>
              <p className="text-gray-700 mb-2">{registerError}</p>
            </div>
          </div>
        )}
        {/* Global Floating Chatbot Button */}
        <FloatingChatbotButton />
      </div>
    </div>
  );
};

export default AthleteTournaments;