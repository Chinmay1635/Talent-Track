import React from 'react';
import { Users, Trophy, Calendar, Award, TrendingUp, Target, BookOpen, Star } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';
import Link from 'next/link';

const CoachLanding: React.FC = () => {
  const { user } = useAuth();
  const { coaches, athletes, tournaments, trainingPlans } = useData();

  const coach = coaches.find(c => c.userId === user?.id) || coaches[0];
  const myAthletes = athletes.filter(a => a.coachId === coach?.id);
  const upcomingTournaments = tournaments.filter(t => 
    t.status === 'upcoming' && 
    myAthletes.some(athlete => athlete.sport === t.sport)
  ).slice(0, 3);

  const recentActivities = [
    {
      id: 1,
      type: 'badge',
      message: 'Awarded "Fast Learner" badge to Sumit Phalke',
      time: '2 hours ago',
      icon: Award
    },
    {
      id: 2,
      type: 'training',
      message: 'Created new training plan for Boxing Fundamentals',
      time: '1 day ago',
      icon: BookOpen
    },
    {
      id: 3,
      type: 'progress',
      message: 'Updated progress metrics for 3 athletes',
      time: '2 days ago',
      icon: TrendingUp
    }
  ];

  const coachAchievements = [
    "8 years of professional coaching experience",
    "Trained 15+ state-level champions",
    "Specialized in technical boxing & fitness",
    "Former national boxing champion"
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Welcome Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome, Coach {coach?.name}! 🥊
          </h1>
          <p className="text-gray-600">Empowering athletes to reach their full potential</p>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">My Athletes</p>
                <p className="text-2xl font-bold text-blue-600">{myAthletes.length}</p>
              </div>
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <Users className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Training Plans</p>
                <p className="text-2xl font-bold text-green-600">{trainingPlans.length}</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <BookOpen className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Experience</p>
                <p className="text-2xl font-bold text-yellow-600">{coach?.experience}y</p>
              </div>
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <Star className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Sport</p>
                <p className="text-lg font-bold text-purple-600">{coach?.sport}</p>
              </div>
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Trophy className="h-6 w-6 text-purple-600" />
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
                  href="/coach/athletes"
                  className="flex items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors"
                >
                  <Users className="h-8 w-8 text-blue-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-blue-900">My Athletes</h3>
                    <p className="text-sm text-blue-700">Manage athletes</p>
                  </div>
                </Link>

                <Link 
                  href="/coach/training-plans"
                  className="flex items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors"
                >
                  <BookOpen className="h-8 w-8 text-green-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-green-900">Training Plans</h3>
                    <p className="text-sm text-green-700">Create & manage</p>
                  </div>
                </Link>

                <Link 
                  href="/coach/dashboard"
                  className="flex items-center p-4 bg-yellow-50 rounded-lg hover:bg-yellow-100 transition-colors"
                >
                  <Target className="h-8 w-8 text-yellow-600 mr-3" />
                  <div>
                    <h3 className="font-semibold text-yellow-900">Dashboard</h3>
                    <p className="text-sm text-yellow-700">Full overview</p>
                  </div>
                </Link>
              </div>
            </div>

            {/* Recent Activities */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <TrendingUp className="h-5 w-5 mr-2 text-green-600" />
                Recent Activities
              </h2>
              <div className="space-y-4">
                {recentActivities.map((activity) => (
                  <div key={activity.id} className="flex items-center space-x-4 p-4 bg-gray-50 rounded-lg">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <activity.icon className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="flex-1">
                      <p className="text-gray-900">{activity.message}</p>
                      <p className="text-sm text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Upcoming Training Sessions */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-purple-600" />
                Upcoming Tournaments (Your Athletes)
              </h2>
              <div className="space-y-4">
                {upcomingTournaments.map((tournament) => (
                  <div key={tournament.id} className="flex items-center justify-between p-4 bg-purple-50 rounded-lg">
                    <div>
                      <h3 className="font-semibold text-purple-900">{tournament.name}</h3>
                      <p className="text-sm text-purple-700">{tournament.sport} • {tournament.location}</p>
                      <p className="text-xs text-purple-600">
                        {new Date(tournament.startDate).toLocaleDateString()}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
                        {tournament.status}
                      </span>
                    </div>
                  </div>
                ))}
                {upcomingTournaments.length === 0 && (
                  <div className="text-center py-8">
                    <Calendar className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No upcoming tournaments for your athletes.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Coach Profile */}
            <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl shadow-sm p-6 border border-blue-200">
              <h2 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Award className="h-5 w-5 mr-2 text-blue-600" />
                Coach Profile
              </h2>
              <div className="text-center mb-4">
                <div className="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full mx-auto mb-3 flex items-center justify-center">
                  <Trophy className="h-10 w-10 text-white" />
                </div>
                <h3 className="font-bold text-gray-900">{coach?.name}</h3>
                <p className="text-blue-700 font-medium">{coach?.specialization}</p>
              </div>
              <div className="space-y-2">
                {coachAchievements.map((achievement, index) => (
                  <div key={index} className="flex items-start space-x-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    <p className="text-sm text-gray-700">{achievement}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Top Athletes */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Top Athletes</h2>
              <div className="space-y-3">
                {myAthletes.slice(0, 3).map((athlete) => (
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
                href="/coach/athletes"
                className="block text-center mt-4 text-blue-600 hover:text-blue-700 font-medium"
              >
                View All Athletes →
              </Link>
            </div>

            {/* Training Plans Summary */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">Training Plans</h2>
              <div className="space-y-3">
                {trainingPlans.slice(0, 2).map((plan) => (
                  <div key={plan.id} className="p-3 bg-green-50 rounded-lg">
                    <h3 className="font-medium text-green-900">{plan.title}</h3>
                    <p className="text-sm text-green-700">{plan.duration} weeks</p>
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-2 ${
                      plan.status === 'active' ? 'bg-green-100 text-green-800' :
                      plan.status === 'completed' ? 'bg-blue-100 text-blue-800' :
                      'bg-yellow-100 text-yellow-800'
                    }`}>
                      {plan.status}
                    </span>
                  </div>
                ))}
              </div>
              <Link 
                href="/coach/training-plans"
                className="block text-center mt-4 text-green-600 hover:text-green-700 font-medium"
              >
                Manage Plans →
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CoachLanding;