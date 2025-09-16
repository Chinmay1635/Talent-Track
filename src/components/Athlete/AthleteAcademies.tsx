import React, { useState } from 'react';
import { MapPin, Star, Users, Trophy, Search, Filter, Building, Phone, Mail } from 'lucide-react';
import { useData } from '../../context/DataContext';

const AthleteAcademies: React.FC = () => {
  const { academies } = useData();
  const [searchTerm, setSearchTerm] = useState('');
  const [sportFilter, setSportFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  const filteredAcademies = academies.filter(academy => {
    const matchesSearch = academy.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         academy.location.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSport = sportFilter === 'all' || academy.sports.includes(sportFilter);
    const matchesLocation = locationFilter === 'all' || academy.state === locationFilter;
    
    return matchesSearch && matchesSport && matchesLocation;
  });

  const uniqueSports = [...new Set(academies.flatMap(a => a.sports))];
  const uniqueStates = [...new Set(academies.map(a => a.state))];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Find Academies</h1>
          <p className="text-gray-600">Discover sports academies near you and join the best training programs</p>
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
                  placeholder="Search academies by name or location..."
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

            {/* Location Filter */}
            <div className="md:w-48">
              <select
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              >
                <option value="all">All States</option>
                {uniqueStates.map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Academy Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAcademies.map((academy) => (
            <div key={academy.id} className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-lg font-bold text-gray-900 mb-1">{academy.name}</h3>
                    <div className="flex items-center text-gray-600 mb-2">
                      <MapPin className="h-4 w-4 mr-1" />
                      <span className="text-sm">{academy.location}</span>
                    </div>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Building className="h-6 w-6 text-blue-600" />
                  </div>
                </div>

                {/* Sports Offered */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Sports Offered:</h4>
                  <div className="flex flex-wrap gap-1">
                    {academy.sports.map((sport) => (
                      <span key={sport} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Facilities */}
                {academy.facilities && academy.facilities.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-sm font-medium text-gray-700 mb-2">Facilities:</h4>
                    <div className="text-sm text-gray-600">
                      {academy.facilities.slice(0, 3).map((facility, index) => (
                        <div key={index} className="flex items-center">
                          <div className="w-1 h-1 bg-gray-400 rounded-full mr-2"></div>
                          {facility}
                        </div>
                      ))}
                      {academy.facilities.length > 3 && (
                        <div className="text-xs text-gray-500 mt-1">
                          +{academy.facilities.length - 3} more facilities
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Description */}
                {academy.description && (
                  <p className="text-sm text-gray-600 mb-4 line-clamp-2">{academy.description}</p>
                )}

                {/* Established Year */}
                {academy.establishedYear && (
                  <div className="flex items-center text-sm text-gray-600 mb-4">
                    <Trophy className="h-4 w-4 mr-1" />
                    <span>Established {academy.establishedYear}</span>
                  </div>
                )}

                {/* Contact Info */}
                <div className="border-t border-gray-200 pt-4">
                  <div className="flex items-center justify-between text-sm">
                    {academy.contactEmail && (
                      <div className="flex items-center text-gray-600">
                        <Mail className="h-4 w-4 mr-1" />
                        <span className="truncate">{academy.contactEmail}</span>
                      </div>
                    )}
                    {academy.contactPhone && (
                      <div className="flex items-center text-gray-600">
                        <Phone className="h-4 w-4 mr-1" />
                        <span>{academy.contactPhone}</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <div className="mt-4">
                  <button className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium">
                    Contact Academy
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {filteredAcademies.length === 0 && (
          <div className="text-center py-12">
            <Building className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No academies found</h3>
            <p className="text-gray-500">Try adjusting your search criteria or check back later for new academies.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AthleteAcademies;