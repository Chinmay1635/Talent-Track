import React, { useState } from 'react';
import { Search, Award, Star, MapPin, Trophy, DollarSign, Filter } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const DiscoverAthletes: React.FC = () => {
  const { athletes, tournaments, sponsors } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');
  const [regionFilter, setRegionFilter] = useState('all');

  const sponsor = sponsors.find(s => s.userId === user?.id) || sponsors[0];

  const filteredAthletes = athletes.filter(athlete => {
    const matchesSearch = athlete.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         athlete.region.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = sportFilter === 'all' || athlete.sport === sportFilter;
    const matchesLevel = levelFilter === 'all' || athlete.level === levelFilter;
    const matchesRegion = regionFilter === 'all' || athlete.region === regionFilter;
    
    return matchesSearch && matchesSport && matchesLevel && matchesRegion;
  });

  const uniqueSports = [...new Set(athletes.map(a => a.sport))];
  const uniqueRegions = [...new Set(athletes.map(a => a.region))];

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Pro': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getBadgeRarityColor = (rarity: string) => {
    switch (rarity) {
      case 'common': return 'border-gray-300';
      case 'rare': return 'border-blue-400';
      case 'epic': return 'border-purple-500';
      case 'legendary': return 'border-yellow-500';
      default: return 'border-gray-300';
    }
  };

  const handleSponsorAthlete = (athleteId: string) => {
    // This would typically open a sponsorship form or modal
    alert(`Sponsorship request sent for athlete ID: ${athleteId}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Discover Athletes</h1>
          <p className="text-gray-600">Find and support talented athletes across various sports</p>
        </div>

        {/* Filters */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-8">
          <div className="flex flex-col lg:flex-row gap-4">
            {/* Search */}
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search athletes by name or region..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Sport Filter */}
            <div className="lg:w-48">
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
            <div className="lg:w-48">
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

            {/* Region Filter */}
            <div className="lg:w-48">
              <select
                value={regionFilter}
                onChange={(e) => setRegionFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All Regions</option>
                {uniqueRegions.map(region => (
                  <option key={region} value={region}>{region}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Athletes Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAthletes.map((athlete) => (
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
                    <Star className="h-3 w-3 mr-1" />
                    {athlete.level}
                  </span>
                </div>

                {/* Sport & Age */}
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Sport:</span>
                    <span className="font-medium text-gray-900">{athlete.sport}</span>
                  </div>
                  {athlete.age && (
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Age:</span>
                      <span className="font-medium text-gray-900">{athlete.age} years</span>
                    </div>
                  )}
                </div>

                {/* Badges */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Award className="h-4 w-4 mr-1" />
                    Achievements ({athlete.badges.length})
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {athlete.badges.slice(0, 3).map((badge) => (
                      <div 
                        key={badge.id} 
                        className={`flex items-center space-x-1 px-2 py-1 rounded-full border-2 ${getBadgeRarityColor(badge.rarity)} bg-white`}
                        title={badge.description}
                      >
                        <span className="text-sm">{badge.icon}</span>
                        <span className="text-xs font-medium text-gray-700">{badge.name}</span>
                      </div>
                    ))}
                    {athlete.badges.length > 3 && (
                      <div className="flex items-center px-2 py-1 rounded-full bg-gray-100 text-gray-600">
                        <span className="text-xs">+{athlete.badges.length - 3} more</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Performance Stats */}
                <div className="mb-4 p-3 bg-gray-50 rounded-lg">
                  <h4 className="text-sm font-medium text-gray-700 mb-2 flex items-center">
                    <Trophy className="h-4 w-4 mr-1" />
                    Performance Highlights
                  </h4>
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="text-center">
                      <div className="font-semibold text-blue-600">{athlete.badges.length}</div>
                      <div className="text-gray-600 text-xs">Badges</div>
                    </div>
                    <div className="text-center">
                      <div className="font-semibold text-green-600">{athlete.level}</div>
                      <div className="text-gray-600 text-xs">Level</div>
                    </div>
                  </div>
                </div>

                {/* Bio */}
                {athlete.bio && (
                  <div className="mb-4">
                    <p className="text-sm text-gray-600 line-clamp-2">{athlete.bio}</p>
                  </div>
                )}

                {/* Sponsorship Potential */}
                <div className="mb-4 p-3 bg-gradient-to-r from-yellow-50 to-orange-50 rounded-lg border border-yellow-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="text-sm font-medium text-yellow-800">Sponsorship Potential</h4>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star 
                            key={i} 
                            className={`h-3 w-3 ${
                              i < Math.min(athlete.badges.length, 5) ? 'text-yellow-500 fill-current' : 'text-gray-300'
                            }`} 
                          />
                        ))}
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-xs text-yellow-700">High Potential</div>
                    </div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleSponsorAthlete(athlete.id)}
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium flex items-center justify-center"
                  >
                    <DollarSign className="h-4 w-4 mr-1" />
                    Sponsor Now
                  </button>
                  <button className="px-3 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors text-sm">
                    View Profile
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAthletes.length === 0 && (
          <div className="text-center py-12">
            <Search className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No athletes found</h3>
            <p className="text-gray-500">Try adjusting your search criteria to find more athletes.</p>
          </div>
        )}

        {/* Summary Stats */}
        <div className="mt-8 bg-white rounded-xl shadow-sm p-6">
          <h2 className="text-lg font-bold text-gray-900 mb-4">Search Summary</h2>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-blue-50 rounded-lg">
              <div className="text-2xl font-bold text-blue-600">{filteredAthletes.length}</div>
              <div className="text-sm text-blue-700">Athletes Found</div>
            </div>
            <div className="text-center p-4 bg-green-50 rounded-lg">
              <div className="text-2xl font-bold text-green-600">
                {filteredAthletes.filter(a => a.level === 'Pro').length}
              </div>
              <div className="text-sm text-green-700">Pro Level</div>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-lg">
              <div className="text-2xl font-bold text-yellow-600">
                {filteredAthletes.reduce((sum, a) => sum + a.badges.length, 0)}
              </div>
              <div className="text-sm text-yellow-700">Total Badges</div>
            </div>
            <div className="text-center p-4 bg-purple-50 rounded-lg">
              <div className="text-2xl font-bold text-purple-600">
                {uniqueSports.length}
              </div>
              <div className="text-sm text-purple-700">Sports Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiscoverAthletes;