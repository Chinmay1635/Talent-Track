import React from 'react';
import { Trophy, Calendar, Star, TrendingUp, Users, Award, Play, MapPin } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Link from 'next/link';

const AthleteDashboard: React.FC = () => {
  const { user } = useAuth();
  const { athletes, tournaments, trainingPrograms, badges } = useData();

  const athlete = athletes.find(a => a.userId === user?.id) || athletes[0];
  const upcomingTournaments = tournaments.filter(t => t.status === 'upcoming').slice(0, 3);
  const recentNews = [
    {
      id: 1,
      title: "India Wins Gold in Asian Boxing Championship",
      summary: "Indian boxers dominate the championship with 5 gold medals",
      date: "2025-01-10",
      category: "Boxing"
    },
    {
      id: 2,
      title: "New Sports Academy Opens in Rural Mumbai",
      summary: "State-of-the-art facility to train 500+ athletes annually",
      date: "2025-01-08",
      category: "General"
    },
    {
      id: 3,
      title: "Badminton Training Camp Announced",
      summary: "National level coaching camp for promising players",
      date: "2025-01-05",
      category: "Badminton"
    }
  ];

  const athleteOfMonth = {
    name: "Priya Singh",
    sport: "Badminton",
    achievements: "3 State Championships, 1 National Medal",
    image: "https://images.pexels.com/photos/8007513/pexels-photo-8007513.jpeg?auto=compress&cs=tinysrgb&w=400",
    quote: "Hard work and dedication are the keys to success in sports."
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {athlete?.name}! 🏆
          </h1>
          <p className="text-gray-600">Ready to achieve your sports goals today?</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Current Level</p>
                <p className="text-2xl font-bold text-blue-600">{athlete?.level}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Badges Earned</p>
                <p className="text-2xl font-bold text-yellow-600">{athlete?.badges.length}</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Award className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sport</p>
                <p className="text-lg font-bold text-green-600">{athlete?.sport}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Region</p>
                <p className="text-lg font-bold text-purple-600">{athlete?.region}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <MapPin className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Quick Access Links */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6">Quick Actions</h2>
              <div className="grid md:grid-cols-3 gap-4">
                <Link 
                  href="/athlete/profile"
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-blue-900">My Profile</h3>
                    <p className="text-sm text-blue-700">View & edit profile</p>
                  </div>
                </Link>

                <Link 
                  href="/athlete/training"
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <TrendingUp className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-green-900">Training</h3>
                    <p className="text-sm text-green-700">View progress</p>
                  </div>
                </Link>

                <Link 
                  href="/athlete/tournaments"
                  className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <Trophy className="h-8 w-8 text-yellow-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-yellow-900">Tournaments</h3>
                    <p className="text-sm text-yellow-700">Join competitions</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Sports News */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Play className="h-5 w-5 mr-2 text-blue-600" />
                Recent Sports News
              </h2>
              <div className="space-y-4">
                {recentNews.map((news) => (
                  <div key={news.id} className="border-l-4 border-blue-500 pl-4 py-2">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-gray-900">{news.title}</h3>
                      <span className="text-xs text-gray-500">{new Date(news.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{news.summary}</p>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                      {news.category}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Tournaments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-green-600" />
                Upcoming Tournaments
              </h2>
              <div className="space-y-4">
                {upcomingTournaments.map((tournament) => (
                  <div key={tournament.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-gray-900">{tournament.name}</h3>
                      <p className="text-sm text-gray-600">{tournament.sport} • {tournament.location}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(tournament.startDate).toLocaleDateString()} - Registration deadline: {new Date(tournament.registrationDeadline).toLocaleDateString()}
                      </p>
                    </div>
                    <Link 
                      href="/athlete/tournaments"
                      className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors text-sm"
                    >
                      Register
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Athlete of the Month */}
            <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-xl shadow-sm p-6 border border-yellow-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Star className="h-5 w-5 mr-2 text-yellow-600" />
                Athlete of the Month
              </h2>
              <div className="text-center">
                <div className="w-20 h-20 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full mx-auto mb-4 flex items-center justify-center">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-gray-900 text-lg">{athleteOfMonth.name}</h3>
                <p className="text-yellow-700 font-medium mb-2">{athleteOfMonth.sport}</p>
                <p className="text-sm text-gray-600 mb-3">{athleteOfMonth.achievements}</p>
                <blockquote className="text-sm italic text-gray-700 border-l-2 border-yellow-400 pl-3">
                  "{athleteOfMonth.quote}"
                </blockquote>
              </div>
            </div>

            {/* My Badges */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">My Latest Badges</h2>
              <div className="space-y-3">
                {athlete?.badges.slice(0, 3).map((badge) => (
                  <div key={badge.id} className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
                    <div className="text-2xl">{badge.icon}</div>
                    <div>
                      <h3 className="font-medium text-gray-900">{badge.name}</h3>
                      <p className="text-sm text-gray-600">{badge.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                href="/athlete/profile"
                className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                View All Badges →
              </Link>
            </div>

            {/* Training Programs */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Available Training</h2>
              <div className="space-y-3">
                {trainingPrograms.slice(0, 2).map((program) => (
                  <div key={program.id} className="p-3 bg-green-50 rounded-lg">
                    <h3 className="font-medium text-green-900">{program.title}</h3>
                    <p className="text-sm text-green-700">{program.providerName}</p>
                    <p className="text-sm text-green-600">{program.fees} • {program.duration} weeks</p>
                  </div>
                ))}
              </div>
              <Link 
                href="/athlete/training"
                className="block text-center mt-4 text-green-600 hover:text-green-700 font-medium"
              >
                Explore Training →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AthleteDashboard;