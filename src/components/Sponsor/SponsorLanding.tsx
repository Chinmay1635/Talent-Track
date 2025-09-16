import React from 'react';
import { DollarSign, Trophy, Users, Target, TrendingUp, Award, Star, Calendar } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Link from 'next/link';

const SponsorLanding: React.FC = () => {
  const { user } = useAuth();
  const { sponsors, tournaments, athletes, tournamentWinners } = useData();

  const sponsor = sponsors.find(s => s.userId === user?.id) || sponsors[0];
  const sponsoredTournaments = tournaments.filter(t => sponsor?.sponsoredTournaments.includes(t.id));
  const topAthletes = athletes.filter(a => a.badges.length > 0).sort((a, b) => b.badges.length - a.badges.length).slice(0, 6);

  const sponsorshipBenefits = [
    {
      title: "Brand Visibility",
      description: "Get your brand noticed by thousands of sports enthusiasts",
      icon: Target,
      color: "bg-blue-100 text-blue-600"
    },
    {
      title: "Talent Discovery",
      description: "Identify and support promising athletes early in their careers",
      icon: Star,
      color: "bg-yellow-100 text-yellow-600"
    },
    {
      title: "Community Impact",
      description: "Make a positive difference in grassroots sports development",
      icon: Users,
      color: "bg-green-100 text-green-600"
    },
    {
      title: "ROI Tracking",
      description: "Monitor your sponsorship impact with detailed analytics",
      icon: TrendingUp,
      color: "bg-purple-100 text-purple-600"
    }
  ];

  const featuredTournaments = tournaments.filter(t => t.status === 'upcoming').slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, {sponsor?.name}! 💼
          </h1>
          <p className="text-gray-600">Empowering sports talent through strategic sponsorship</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total Budget</p>
                <p className="text-2xl font-bold text-green-600">{sponsor?.budget}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <DollarSign className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sponsored Tournaments</p>
                <p className="text-2xl font-bold text-blue-600">{sponsoredTournaments.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Athletes Supported</p>
                <p className="text-2xl font-bold text-yellow-600">
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
                <p className="text-lg font-bold text-purple-600">{sponsor?.industry}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Target className="h-6 w-6 text-purple-600" />
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
                  href="/sponsor/discover-athletes"
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-blue-900">Discover Athletes</h3>
                    <p className="text-sm text-blue-700">Find talent</p>
                  </div>
                </Link>

                <Link 
                  href="/sponsor/top-performers"
                  className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <Star className="h-8 w-8 text-yellow-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-yellow-900">Top Performers</h3>
                    <p className="text-sm text-yellow-700">View winners</p>
                  </div>
                </Link>

                <Link 
                  href="/sponsor/dashboard"
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <Trophy className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-green-900">Dashboard</h3>
                    <p className="text-sm text-green-700">Full overview</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Sponsorship Benefits */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Target className="h-5 w-5 mr-2 text-blue-600" />
                Sponsorship Benefits
              </h2>
              <div className="grid md:grid-cols-2 gap-4">
                {sponsorshipBenefits.map((benefit) => (
                  <div key={benefit.title} className="flex items-start space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${benefit.color}`}>
                      <benefit.icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{benefit.title}</h3>
                      <p className="text-sm text-gray-600">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Tournaments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Trophy className="h-5 w-5 mr-2 text-yellow-600" />
                Featured Tournaments
              </h2>
              <div className="space-y-4">
                {featuredTournaments.map((tournament) => (
                  <div key={tournament.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-yellow-900">{tournament.name}</h3>
                      <p className="text-sm text-yellow-700">{tournament.sport} • {tournament.location}</p>
                      <div className="flex items-center text-xs text-yellow-600 mt-1">
                        <Calendar className="h-3 w-3 mr-1" />
                        <span>{new Date(tournament.startDate).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm font-semibold text-green-600">{tournament.prizePool || 'TBD'}</div>
                      <div className="text-xs text-gray-500">{tournament.currentParticipants} participants</div>
                      <Link 
                        href="/sponsor/dashboard"
                        className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                      >
                        Sponsor Now
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Sponsor Profile */}
            <div className="bg-gradient-to-br from-green-50 to-blue-50 rounded-xl shadow-sm p-6 border border-green-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <DollarSign className="h-5 w-5 mr-2 text-green-600" />
                Sponsor Profile
              </h2>
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-blue-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <DollarSign className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">{sponsor?.name}</h3>
                <p className="text-green-700 font-medium">{sponsor?.company}</p>
              </div>
              <div className="space-y-3">
                <div>
                  <p className="text-sm font-medium text-gray-700">Industry</p>
                  <p className="text-gray-900">{sponsor?.industry}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Budget</p>
                  <p className="text-green-600 font-semibold">{sponsor?.budget}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-700">Contact</p>
                  <p className="text-sm text-gray-900">{sponsor?.contactEmail}</p>
                </div>
              </div>
            </div>

            {/* Top Athletes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Featured Athletes</h2>
              <div className="space-y-3">
                {topAthletes.slice(0, 4).map((athlete) => (
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
                      <p className="text-xs text-gray-500">badges</p>
                    </div>
                  </div>
                ))}
              </div>
              <Link 
                href="/sponsor/discover-athletes"
                className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                Discover More Athletes →
              </Link>
            </div>

            {/* My Sponsored Tournaments */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">My Sponsorships</h2>
              <div className="space-y-3">
                {sponsoredTournaments.slice(0, 3).map((tournament) => (
                  <div key={tournament.id} className="p-3 bg-blue-50 rounded-lg">
                    <h3 className="font-medium text-blue-900">{tournament.name}</h3>
                    <p className="text-sm text-blue-700">{tournament.sport}</p>
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
                    <p className="text-gray-500 text-sm">No sponsorships yet.</p>
                  </div>
                )}
              </div>
              <Link 
                href="/sponsor/dashboard"
                className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                View All Sponsorships →
              </Link>
            </div>

            {/* Impact Metrics */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Impact Metrics</h2>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Athletes Supported</span>
                  <span className="font-semibold text-blue-600">
                    {tournamentWinners.filter(w => sponsor?.sponsoredTournaments.includes(w.tournamentId)).length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Tournaments Sponsored</span>
                  <span className="font-semibold text-green-600">{sponsoredTournaments.length}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Total Investment</span>
                  <span className="font-semibold text-purple-600">{sponsor?.budget}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SponsorLanding;