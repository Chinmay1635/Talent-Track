import React, { useState } from 'react';
import { Trophy, MapPin, Calendar, Users, Star, Search, DollarSign, Award, Target } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const SponsorDashboard: React.FC = () => {
  const { user } = useAuth();
  const { sponsors, tournaments, athletes, tournamentWinners, sponsorTournament } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');
  const [showSponsorForm, setShowSponsorForm] = useState(false);
  const [selectedTournament, setSelectedTournament] = useState<string>('');
  const [sponsorAmount, setSponsorAmount] = useState('');

  const sponsor = sponsors.find(s => s.userId === user?.id) || sponsors[0];

  const filteredTournaments = tournaments.filter(tournament => {
    const matchesSearch = tournament.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tournament.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = sportFilter === 'all' || tournament.sport === sportFilter;
    const matchesLocation = locationFilter === 'all' || tournament.location.includes(locationFilter);
    
    return matchesSearch && matchesSport && matchesLocation;
  });

  const uniqueSports = [...new Set(tournaments.map(t => t.sport))];
  const uniqueLocations = [...new Set(tournaments.map(t => t.location.split(',')[1]?.trim() || t.location))];

  const sponsoredTournaments = tournaments.filter(t => sponsor?.sponsoredTournaments.includes(t.id));
  const topAthletes = athletes.filter(a => a.badges.length > 0).sort((a, b) => b.badges.length - a.badges.length).slice(0, 6);

  const handleSponsorSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedTournament && sponsorAmount && sponsor) {
      sponsorTournament(selectedTournament, sponsor.id, sponsorAmount);
      setShowSponsorForm(false);
      setSelectedTournament('');
      setSponsorAmount('');
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
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Sponsor Dashboard</h1>
          <p className="text-gray-600">Welcome back, {sponsor?.name}!</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sponsored Tournaments</p>
                <p className="text-2xl font-bold text-gray-900">{sponsoredTournaments.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-gray-900">{sponsor?.budget}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Athletes Supported</p>
                <p className="text-2xl font-bold text-gray-900">
                  {tournamentWinners.filter(w => sponsor?.sponsoredTournaments.includes(w.tournamentId)).length}
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
                <p className="text-sm font-medium text-gray-600">Industry</p>
                <p className="text-lg font-bold text-gray-900">{sponsor?.industry}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tournament Search */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Discover Tournaments</h2>
                <button
                  onClick={() => setShowSponsorForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Sponsor Tournament
                </button>
              </div>

              {/* Filters */}
              <div className="flex flex-col md:flex-row gap-4 mb-6">
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
                <select
                  value={sportFilter}
                  onChange={(e) => setSportFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Sports</option>
                  {uniqueSports.map(sport => (
                    <option key={sport} value={sport}>{sport}</option>
                  ))}
                </select>
                <select
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                >
                  <option value="all">All Locations</option>
                  {uniqueLocations.map(location => (
                    <option key={location} value={location}>{location}</option>
                  ))}
                </select>
              </div>

              {/* Tournament List */}
              <div className="space-y-4">
                {filteredTournaments.slice(0, 5).map((tournament) => (
                  <div key={tournament.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{tournament.name}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(tournament.status)}`}>
                        {tournament.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
                      <div className="flex items-center space-x-4">
                        <span className="flex items-center">
                          <Trophy className="h-4 w-4 mr-1" />
                          {tournament.sport}
                        </span>
                        <span className="flex items-center">
                          <MapPin className="h-4 w-4 mr-1" />
                          {tournament.location}
                        </span>
                        <span className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1" />
                          {new Date(tournament.startDate).toLocaleDateString()}
                        </span>
                      </div>
                      {tournament.prizePool && (
                        <span className="font-semibold text-green-600">{tournament.prizePool}</span>
                      )}
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">
                        {tournament.currentParticipants}/{tournament.maxParticipants} participants
                      </span>
                      <div className="flex space-x-2">
                        {tournament.status === 'completed' && (
                          <button className="text-yellow-600 hover:text-yellow-700 text-sm font-medium">
                            View Winners
                          </button>
                        )}
                        {!sponsor?.sponsoredTournaments.includes(tournament.id) && tournament.status === 'upcoming' && (
                          <button
                            onClick={() => {
                              setSelectedTournament(tournament.id);
                              setShowSponsorForm(true);
                            }}
                            className="text-blue-600 hover:text-blue-700 text-sm font-medium"
                          >
                            Sponsor This
                          </button>
                        )}
                        {sponsor?.sponsoredTournaments.includes(tournament.id) && (
                          <span className="text-green-600 text-sm font-medium">Sponsored</span>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Top Athletes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Top Athletes</h2>
              <div className="space-y-3">
                {topAthletes.map((athlete) => (
                  <div key={athlete.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{athlete.name}</h3>
                      <p className="text-sm text-gray-600">{athlete.sport} • {athlete.region}</p>
                      <div className="flex items-center mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(athlete.level)}`}>
                          {athlete.level}
                        </span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-yellow-600">
                        <Award className="h-4 w-4 mr-1" />
                        <span className="font-semibold">{athlete.badges.length}</span>
                      </div>
                      <p className="text-xs text-gray-500">badges</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sponsored Tournaments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">My Sponsored Tournaments</h2>
              <div className="space-y-3">
                {sponsoredTournaments.map((tournament) => (
                  <div key={tournament.id} className="p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900">{tournament.name}</h3>
                    <p className="text-sm text-blue-700">{tournament.sport} • {tournament.location}</p>
                    <div className="flex items-center justify-between mt-2">
                      <span className="text-xs text-blue-600">{tournament.status}</span>
                      {tournament.prizePool && (
                        <span className="text-sm font-semibold text-green-600">{tournament.prizePool}</span>
                      )}
                    </div>
                  </div>
                ))}

                {sponsoredTournaments.length === 0 && (
                  <div className="text-center py-4">
                    <Trophy className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No sponsored tournaments yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Sponsor Form Modal */}
        {showSponsorForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Sponsor Tournament</h2>
                
                <form onSubmit={handleSponsorSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Select Tournament</label>
                    <select
                      value={selectedTournament}
                      onChange={(e) => setSelectedTournament(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Choose a tournament</option>
                      {tournaments.filter(t => !sponsor?.sponsoredTournaments.includes(t.id) && t.status === 'upcoming').map(tournament => (
                        <option key={tournament.id} value={tournament.id}>{tournament.name}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Prize Amount</label>
                    <input
                      type="text"
                      value={sponsorAmount}
                      onChange={(e) => setSponsorAmount(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="₹50,000"
                      required
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowSponsorForm(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Sponsor Tournament
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SponsorDashboard;