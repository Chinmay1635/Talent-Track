import React from 'react';
import { Building, Users, Trophy, Award, MapPin, Calendar, Star, TrendingUp } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Link from 'next/link';

const AcademyLanding: React.FC = () => {
  const { user } = useAuth();
  const { academies, athletes, coaches, tournaments } = useData();

  const academy = academies.find(a => a.userId === user?.id) || academies[0];
  const academyAthletes = athletes.filter(a => a.academyId === academy?.id);
  const academyCoaches = coaches.filter(c => c.academyId === academy?.id);
  const academyTournaments = tournaments.filter(t => t.academyId === academy?.id);

  const recentAchievements = [
    {
      id: 1,
      title: "State Championship Winner",
      description: "Sumit Phalke won the Mumbai State Boxing Championship",
      date: "2025-01-08",
      type: "tournament"
    },
    {
      id: 2,
      title: "New Coach Joined",
      description: "Anita Sharma joined as Senior Boxing Coach",
      date: "2025-01-05",
      type: "staff"
    },
    {
      id: 3,
      title: "Facility Upgrade",
      description: "New heavy bags and training equipment installed",
      date: "2025-01-03",
      type: "facility"
    }
  ];

  const ongoingPrograms = [
    {
      id: 1,
      name: "Junior Boxing Program",
      participants: 25,
      duration: "6 months",
      level: "Beginner to Intermediate"
    },
    {
      id: 2,
      name: "Advanced Training Camp",
      participants: 12,
      duration: "3 months",
      level: "Pro"
    },
    {
      id: 3,
      name: "Fitness & Conditioning",
      participants: 40,
      duration: "Ongoing",
      level: "All Levels"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome to {academy?.name}! 🏫
          </h1>
          <p className="text-gray-600">Nurturing champions and building sporting excellence</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Athletes</p>
                <p className="text-2xl font-bold text-blue-600">{academyAthletes.length}</p>
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
                <p className="text-2xl font-bold text-green-600">{academyCoaches.length}</p>
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
                <p className="text-2xl font-bold text-yellow-600">{academyTournaments.length}</p>
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
                <p className="text-2xl font-bold text-purple-600">{academy?.sports.length}</p>
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
            {/* Quick Actions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link 
                  href="/academy/athletes"
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-blue-900">Athletes</h3>
                    <p className="text-sm text-blue-700">Manage athletes</p>
                  </div>
                </Link>

                <Link 
                  href="/academy/coaches"
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <Award className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-green-900">Coaches</h3>
                    <p className="text-sm text-green-700">Manage coaches</p>
                  </div>
                </Link>

                <Link 
                  href="/academy/tournaments"
                  className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <Trophy className="h-8 w-8 text-yellow-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-yellow-900">Tournaments</h3>
                    <p className="text-sm text-yellow-700">Host events</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Achievements */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Recent Achievements
              </h2>
              <div className="space-y-4">
                {recentAchievements.map((achievement) => (
                  <div key={achievement.id} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      achievement.type === 'tournament' ? 'bg-yellow-100' :
                      achievement.type === 'staff' ? 'bg-green-100' :
                      'bg-blue-100'
                    }`}>
                      {achievement.type === 'tournament' ? <Trophy className="h-5 w-5 text-yellow-600" /> :
                       achievement.type === 'staff' ? <Award className="h-5 w-5 text-green-600" /> :
                       <Building className="h-5 w-5 text-blue-600" />}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{achievement.title}</h3>
                      <p className="text-sm text-gray-600">{achievement.description}</p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(achievement.date).toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ongoing Programs */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                Ongoing Programs
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {ongoingPrograms.map((program) => (
                  <div key={program.id} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-semibold text-gray-900 mb-2">{program.name}</h3>
                    <div className="space-y-2 text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="h-4 w-4 mr-2" />
                        <span>{program.participants} participants</span>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 mr-2" />
                        <span>{program.duration}</span>
                      </div>
                      <div className="flex items-center">
                        <Star className="h-4 w-4 mr-2" />
                        <span>{program.level}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Academy Profile */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm p-6 border border-blue-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Building className="h-5 w-5 mr-2 text-blue-600" />
                Academy Profile
              </h2>
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Building className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">{academy?.name}</h3>
                <div className="flex items-center justify-center text-blue-700 mt-1">
                  <MapPin className="h-4 w-4 mr-1" />
                  <span className="text-sm">{academy?.location}</span>
                </div>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Established</p>
                  <p className="text-gray-900">{academy?.establishedYear}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Sports Offered</p>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {academy?.sports.map((sport) => (
                      <span key={sport} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {sport}
                      </span>
                    ))}
                  </div>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Contact</p>
                  <p className="text-sm text-gray-900">{academy?.contactEmail}</p>
                  <p className="text-sm text-gray-900">{academy?.contactPhone}</p>
                </div>
              </div>
            </div>

            {/* Top Athletes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Top Athletes</h2>
              <div className="space-y-3">
                {academyAthletes.slice(0, 3).map((athlete) => (
                  <div key={athlete.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-medium text-gray-900">{athlete.name}</h3>
                      <p className="text-sm text-gray-600">{athlete.sport} • {athlete.level}</p>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-yellow-600">
                        <Award className="h-4 w-4 mr-1" />
                        <span className="font-semibold">{athlete.badges.length}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                href="/academy/athletes"
                className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                View All Athletes →
              </Link>
            </div>

            {/* Facilities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Facilities</h2>
              <div className="space-y-2">
                {academy?.facilities?.map((facility, index) => (
                  <div key={index} className="flex items-center text-sm text-gray-600">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                    {facility}
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tournaments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Upcoming Tournaments</h2>
              <div className="space-y-3">
                {academyTournaments.filter(t => t.status === 'upcoming').slice(0, 2).map((tournament) => (
                  <div key={tournament.id} className="p-3 bg-yellow-50 rounded-lg">
                    <h3 className="font-medium text-yellow-900">{tournament.name}</h3>
                    <p className="text-sm text-yellow-700">{tournament.sport}</p>
                    <p className="text-xs text-yellow-600">
                      {new Date(tournament.startDate).toLocaleDateString()}
                    </p>
                  </div>
                ))}
              </div>
              <Link 
                href="/academy/tournaments"
                className="block text-center mt-4 text-yellow-600 hover:text-yellow-700 font-medium"
              >
                Manage Tournaments →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AcademyLanding;