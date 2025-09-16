import React, { useState } from 'react';
import { Clock, MapPin, Users, Star, Search, Calendar, DollarSign, User } from 'lucide-react';
import { useData } from '../../context/DataContext';
import { useAuth } from '../../context/AuthContext';

const AthleteTraining: React.FC = () => {
  const { trainingPrograms, enrollInTraining, athletes } = useData();
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [levelFilter, setLevelFilter] = useState('all');

  const athlete = athletes.find(a => a.userId === user?.id) || athletes[0];

  const filteredPrograms = trainingPrograms.filter(program => {
    const matchesSearch = program.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         program.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = sportFilter === 'all' || program.sport === sportFilter;
    const matchesLevel = levelFilter === 'all' || 
                        program.level === 'All' || 
                        program.level === levelFilter;
    
    return matchesSearch && matchesSport && matchesLevel;
  });

  const uniqueSports = [...new Set(trainingPrograms.map(p => p.sport))];

  const handleEnroll = (programId: string) => {
    if (athlete) {
      enrollInTraining(programId, athlete.id);
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Training Programs</h1>
          <p className="text-gray-600">Enhance your skills with professional training programs</p>
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
                  placeholder="Search training programs..."
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

        {/* Training Programs Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPrograms.map((program) => (
            <div key={program.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{program.title}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <User className="h-4 w-4 mr-1" />
                      <span className="text-sm">{program.providerName}</span>
                    </div>
                  </div>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getLevelColor(program.level)}`}>
                    <Star className="h-3 w-3 mr-1" />
                    {program.level}
                  </span>
                </div>

                {/* Details */}
                <div className="space-y-3 mb-4">
                  <div className="flex items-center text-gray-600">
                    <MapPin className="h-4 w-4 mr-2" />
                    <span className="text-sm">{program.location}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Clock className="h-4 w-4 mr-2" />
                    <span className="text-sm">{program.duration} weeks • {program.schedule}</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Users className="h-4 w-4 mr-2" />
                    <span className="text-sm">{program.currentParticipants}/{program.maxParticipants} enrolled</span>
                  </div>
                  <div className="flex items-center text-gray-600">
                    <Calendar className="h-4 w-4 mr-2" />
                    <span className="text-sm">Starts {new Date(program.startDate).toLocaleDateString()}</span>
                  </div>
                </div>

                {/* Description */}
                <p className="text-sm text-gray-600 mb-4 line-clamp-3">{program.description}</p>

                {/* Sport & Fees */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                    {program.sport}
                  </span>
                  <div className="flex items-center text-green-600 font-semibold">
                    <DollarSign className="h-4 w-4 mr-1" />
                    <span>{program.fees}</span>
                  </div>
                </div>

                {/* Progress Bar */}
                <div className="mb-4">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Enrollment</span>
                    <span>{Math.round((program.currentParticipants / program.maxParticipants) * 100)}%</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-600 h-2 rounded-full" 
                      style={{ width: `${(program.currentParticipants / program.maxParticipants) * 100}%` }}
                    ></div>
                  </div>
                </div>

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <div className="text-xs text-gray-500">
                    {program.maxParticipants - program.currentParticipants} spots left
                  </div>
                  {program.currentParticipants < program.maxParticipants ? (
                    <button
                      onClick={() => handleEnroll(program.id)}
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                    >
                      Enroll Now
                    </button>
                  ) : (
                    <span className="text-red-600 text-sm font-medium">Full</span>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <Clock className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No training programs found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or check back later for new programs.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AthleteTraining;