import React, { useState } from 'react';
import { Users, Trophy, MapPin, Plus, Calendar, Award, Building, Edit, Trash2, UserPlus } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const AcademyDashboard: React.FC = () => {
  const { user } = useAuth();
  const { 
    academies, 
    athletes, 
    coaches, 
    tournaments, 
    addTournament, 
    assignCoachToAthlete,
    addCoachToAcademy,
    removeCoachFromAcademy,
    updateAcademySports
  } = useData();
  const [showTournamentForm, setShowTournamentForm] = useState(false);
  const [showCoachForm, setShowCoachForm] = useState(false);
  const [showSportsForm, setShowSportsForm] = useState(false);
  const [tournamentForm, setTournamentForm] = useState({
    name: '',
    sport: '',
    location: '',
    startDate: '',
    endDate: '',
    registrationDeadline: '',
    maxParticipants: 50,
    description: '',
    eligibilityLevel: 'All' as 'Beginner' | 'Intermediate' | 'Pro' | 'All',
    prizePool: ''
  });
  const [coachForm, setCoachForm] = useState({
    userId: '',
    name: '',
    sport: '',
    experience: 0,
    bio: '',
    specialization: ''
  });
  const [newSports, setNewSports] = useState<string[]>([]);

  const academy = academies.find(a => a.userId === user?.id) || academies[0];
  const academyAthletes = athletes.filter(a => a.academyId === academy?.id);
  const academyCoaches = coaches.filter(c => c.academyId === academy?.id);
  const academyTournaments = tournaments.filter(t => t.academyId === academy?.id);

  const handleTournamentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!academy) return;

    addTournament({
      ...tournamentForm,
      academyId: academy.id,
      academyName: academy.name,
      currentParticipants: 0,
      status: 'upcoming'
    });

    setTournamentForm({
      name: '',
      sport: '',
      location: '',
      startDate: '',
      endDate: '',
      registrationDeadline: '',
      maxParticipants: 50,
      description: '',
      eligibilityLevel: 'All',
      prizePool: ''
    });
    setShowTournamentForm(false);
  };

  const handleCoachSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!academy) return;

    addCoachToAcademy(academy.id, {
      ...coachForm,
      userId: `user-coach-${Date.now()}`
    });

    setCoachForm({
      userId: '',
      name: '',
      sport: '',
      experience: 0,
      bio: '',
      specialization: ''
    });
    setShowCoachForm(false);
  };

  const handleRemoveCoach = (coachId: string) => {
    if (confirm('Are you sure you want to remove this coach?')) {
      removeCoachFromAcademy(coachId);
    }
  };

  const handleSportsSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!academy) return;

    updateAcademySports(academy.id, newSports);
    setShowSportsForm(false);
  };

  const handleAssignCoach = (athleteId: string, coachId: string) => {
    assignCoachToAthlete(athleteId, coachId);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Academy Dashboard</h1>
          <p className="text-gray-600">Welcome to {academy?.name}</p>
        </div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Athletes</p>
                <p className="text-2xl font-bold text-gray-900">{academyAthletes.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Coaches</p>
                <p className="text-2xl font-bold text-gray-900">{academyCoaches.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tournaments</p>
                <p className="text-2xl font-bold text-gray-900">{academyTournaments.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sports Offered</p>
                <p className="text-2xl font-bold text-gray-900">{academy?.sports.length || 0}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Building className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Athletes Management */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Athletes Management</h2>
                <span className="text-sm text-gray-600">{academyAthletes.length} athletes</span>
              </div>

              <div className="space-y-4">
                {academyAthletes.map((athlete) => (
                  <div key={athlete.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <h3 className="font-semibold text-gray-900">{athlete.name}</h3>
                        <p className="text-sm text-gray-600">{athlete.sport} • {athlete.level}</p>
                      </div>
                      <div className="flex items-center space-x-2">
                        <span className="text-sm text-gray-600">Badges: {athlete.badges.length}</span>
                        <div className="flex space-x-1">
                          {athlete.badges.slice(0, 3).map((badge) => (
                            <span key={badge.id} className="text-sm">{badge.icon}</span>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="text-sm text-gray-600">
                        Coach: {coaches.find(c => c.id === athlete.coachId)?.name || 'Not assigned'}
                      </div>
                      
                      {!athlete.coachId && academyCoaches.length > 0 && (
                        <select
                          onChange={(e) => {
                            if (e.target.value) {
                              handleAssignCoach(athlete.id, e.target.value);
                            }
                          }}
                          className="text-sm px-2 py-1 border border-gray-300 rounded"
                        >
                          <option value="">Assign Coach</option>
                          {academyCoaches.map(coach => (
                            <option key={coach.id} value={coach.id}>{coach.name}</option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                ))}

                {academyAthletes.length === 0 && (
                  <div className="text-center py-8">
                    <Users className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No athletes registered yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Tournaments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold text-gray-900">Tournaments</h2>
                <button
                  onClick={() => setShowTournamentForm(true)}
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Host Tournament
                </button>
              </div>

              <div className="space-y-4">
                {academyTournaments.map((tournament) => (
                  <div key={tournament.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <h3 className="font-semibold text-gray-900">{tournament.name}</h3>
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        tournament.status === 'upcoming' ? 'bg-blue-100 text-blue-800' :
                        tournament.status === 'ongoing' ? 'bg-green-100 text-green-800' :
                        'bg-gray-100 text-gray-800'
                      }`}>
                        {tournament.status}
                      </span>
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center space-x-4">
                        <span>{tournament.sport}</span>
                        <span>{tournament.currentParticipants}/{tournament.maxParticipants} participants</span>
                      </div>
                      <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
                    </div>
                  </div>
                ))}

                {academyTournaments.length === 0 && (
                  <div className="text-center py-8">
                    <Trophy className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No tournaments hosted yet.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Academy Profile */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Academy Profile</h2>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-600">Name</p>
                  <p className="text-gray-900">{academy?.name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Location</p>
                  <p className="text-gray-900">{academy?.location}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Sports</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {academy?.sports.map((sport) => (
                      <span key={sport} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-600">Established</p>
                  <p className="text-gray-900">{academy?.establishedYear}</p>
                </div>
              </div>
            </div>

            {/* Coaches */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Coaches</h2>
                <button
                  onClick={() => setShowCoachForm(true)}
                  className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition-colors text-sm flex items-center"
                >
                  <UserPlus className="h-4 w-4 mr-1" />
                  Add Coach
                </button>
              </div>
              <div className="space-y-3">
                {academyCoaches.map((coach) => (
                  <div key={coach.id} className="p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-medium text-gray-900">{coach.name}</h3>
                        <p className="text-sm text-gray-600">{coach.sport}</p>
                        <p className="text-xs text-gray-500">{coach.experience} years experience</p>
                      </div>
                      <button
                        onClick={() => handleRemoveCoach(coach.id)}
                        className="text-red-600 hover:text-red-700 p-1"
                        title="Remove Coach"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}

                {academyCoaches.length === 0 && (
                  <div className="text-center py-4">
                    <Award className="h-8 w-8 text-gray-300 mx-auto mb-2" />
                    <p className="text-gray-500 text-sm">No coaches assigned yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Sports Management */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-bold text-gray-900">Sports Offered</h2>
                <button
                  onClick={() => {
                    setNewSports([...academy?.sports || []]);
                    setShowSportsForm(true);
                  }}
                  className="bg-purple-600 text-white px-3 py-1 rounded-lg hover:bg-purple-700 transition-colors text-sm flex items-center"
                >
                  <Edit className="h-4 w-4 mr-1" />
                  Edit Sports
                </button>
              </div>
              <div className="flex flex-wrap gap-2">
                {academy?.sports.map((sport) => (
                  <span key={sport} className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-blue-100 text-blue-800">
                    {sport}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Tournament Form Modal */}
        {showTournamentForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Host New Tournament</h2>
                
                <form onSubmit={handleTournamentSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Tournament Name</label>
                      <input
                        type="text"
                        value={tournamentForm.name}
                        onChange={(e) => setTournamentForm({...tournamentForm, name: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                      <select
                        value={tournamentForm.sport}
                        onChange={(e) => setTournamentForm({...tournamentForm, sport: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      >
                        <option value="">Select Sport</option>
                        {academy?.sports.map(sport => (
                          <option key={sport} value={sport}>{sport}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                    <input
                      type="text"
                      value={tournamentForm.location}
                      onChange={(e) => setTournamentForm({...tournamentForm, location: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        value={tournamentForm.startDate}
                        onChange={(e) => setTournamentForm({...tournamentForm, startDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                      <input
                        type="date"
                        value={tournamentForm.endDate}
                        onChange={(e) => setTournamentForm({...tournamentForm, endDate: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Registration Deadline</label>
                      <input
                        type="date"
                        value={tournamentForm.registrationDeadline}
                        onChange={(e) => setTournamentForm({...tournamentForm, registrationDeadline: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        required
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Max Participants</label>
                      <input
                        type="number"
                        value={tournamentForm.maxParticipants}
                        onChange={(e) => setTournamentForm({...tournamentForm, maxParticipants: parseInt(e.target.value)})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        min="1"
                        required
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility Level</label>
                      <select
                        value={tournamentForm.eligibilityLevel}
                        onChange={(e) => setTournamentForm({...tournamentForm, eligibilityLevel: e.target.value as any})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      >
                        <option value="All">All Levels</option>
                        <option value="Beginner">Beginner</option>
                        <option value="Intermediate">Intermediate</option>
                        <option value="Pro">Pro</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Prize Pool (Optional)</label>
                      <input
                        type="text"
                        value={tournamentForm.prizePool}
                        onChange={(e) => setTournamentForm({...tournamentForm, prizePool: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        placeholder="₹10,000"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={tournamentForm.description}
                      onChange={(e) => setTournamentForm({...tournamentForm, description: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="Tournament description..."
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowTournamentForm(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                    >
                      Create Tournament
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Coach Form Modal */}
        {showCoachForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Add New Coach</h2>
                
                <form onSubmit={handleCoachSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Coach Name</label>
                    <input
                      type="text"
                      value={coachForm.name}
                      onChange={(e) => setCoachForm({...coachForm, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Sport</label>
                    <select
                      value={coachForm.sport}
                      onChange={(e) => setCoachForm({...coachForm, sport: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      required
                    >
                      <option value="">Select Sport</option>
                      {academy?.sports.map(sport => (
                        <option key={sport} value={sport}>{sport}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Experience (years)</label>
                    <input
                      type="number"
                      value={coachForm.experience}
                      onChange={(e) => setCoachForm({...coachForm, experience: parseInt(e.target.value)})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      min="0"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Specialization</label>
                    <input
                      type="text"
                      value={coachForm.specialization}
                      onChange={(e) => setCoachForm({...coachForm, specialization: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      placeholder="e.g., Technical Training, Fitness"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      value={coachForm.bio}
                      onChange={(e) => setCoachForm({...coachForm, bio: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={3}
                      placeholder="Coach background and experience..."
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowCoachForm(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                    >
                      Add Coach
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Sports Form Modal */}
        {showSportsForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-xl max-w-md w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-900 mb-6">Edit Sports Offered</h2>
                
                <form onSubmit={handleSportsSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Sports (one per line)</label>
                    <textarea
                      value={newSports.join('\n')}
                      onChange={(e) => setNewSports(e.target.value.split('\n').filter(s => s.trim()))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      rows={6}
                      placeholder="Boxing&#10;Cricket&#10;Badminton&#10;Football"
                    />
                  </div>

                  <div className="flex justify-end space-x-4 pt-4">
                    <button
                      type="button"
                      onClick={() => setShowSportsForm(false)}
                      className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
                    >
                      Update Sports
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

export default AcademyDashboard;