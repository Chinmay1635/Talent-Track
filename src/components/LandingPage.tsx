import React from 'react';
import Link from 'next/link';
import { 
  Trophy, 
  Users, 
  MapPin, 
  Star, 
  Award, 
  Target,
  CheckCircle,
  User,
  Building,
  Briefcase,
  Heart,
  Play,
  Calendar,
  Medal,
  Zap
} from 'lucide-react';

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="inline-flex items-center px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-6">
              🏆 TalentTrack Platform
            </div>
            
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Connecting Sports 
              <span className="text-blue-600"> Talent</span> with 
              <span className="text-orange-500"> Opportunities</span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed">
              A unified platform bridging the gap between talented athletes, sports academies, 
              coaches, and sponsors. Empowering athletes from all backgrounds to reach their full potential.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <Link 
                href="/sign-up"
                className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors flex items-center justify-center"
              >
                <Play className="h-5 w-5 mr-2" />
                Get Started
              </Link>
              <Link 
                href="/sign-in"
                className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-lg font-semibold hover:border-blue-600 hover:text-blue-600 transition-colors"
              >
                Sign In
              </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600 mb-2">1M+</div>
                <div className="text-gray-600">Athletes Targeted</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-orange-500 mb-2">10K+</div>
                <div className="text-gray-600">Academies</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-green-500 mb-2">5K+</div>
                <div className="text-gray-600">Tournaments</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-500 mb-2">100+</div>
                <div className="text-gray-600">Sponsors</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Features for Every Stakeholder
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed for athletes, academies, coaches, and sponsors
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Athletes */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">For Athletes</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Create verified profile</li>
                <li>• Find nearby academies</li>
                <li>• Join tournaments</li>
                <li>• Earn badges & levels</li>
              </ul>
            </div>

            {/* Academies */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Building className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">For Academies</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• List facilities</li>
                <li>• Manage athletes</li>
                <li>• Host tournaments</li>
                <li>• Assign coaches</li>
              </ul>
            </div>

            {/* Coaches */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">For Coaches</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Track performance</li>
                <li>• Create training plans</li>
                <li>• Manage athletes</li>
                <li>• Award achievements</li>
              </ul>
            </div>

            {/* Sponsors */}
            <div className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">For Sponsors</h3>
              <ul className="text-gray-600 space-y-2 text-sm">
                <li>• Discover talent</li>
                <li>• Direct connection</li>
                <li>• View achievements</li>
                <li>• Track investments</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Gamification Section */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Gamification System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Motivate athletes with badges, levels, and achievements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Medal className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Achievement Badges</h3>
              <p className="text-gray-600">Earn badges for tournaments, training milestones, and performance goals</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Leaderboards</h3>
              <p className="text-gray-600">Compete with peers and climb sport-specific rankings</p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm text-center">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Level System</h3>
              <p className="text-gray-600">Progress through levels as you improve and achieve goals</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Sports in India?
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Join the movement to create equal opportunities for all athletes, 
            regardless of their background or location.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Link 
              href="/sign-up"
              className="bg-blue-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
            >
              Join as Athlete
            </Link>
            <Link 
              href="/sign-up"
              className="bg-orange-600 text-white px-8 py-4 rounded-lg font-semibold hover:bg-orange-700 transition-colors"
            >
              Register Academy
            </Link>
            <Link 
              href="/sign-up"
              className="border-2 border-gray-600 text-white px-8 py-4 rounded-lg font-semibold hover:border-white transition-colors"
            >
              Become Sponsor
            </Link>
          </div>

          <div className="text-gray-400">
            <p>Built for TalentTrack • Empowering Sports Excellence</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <Trophy className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold">TalentTrack</span>
            </div>
            
            <div className="text-gray-400">
              © 2025 TalentTrack. Building the future of sports in India.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;