import React, { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import { motion, useInView } from 'framer-motion';
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
  Zap,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  Sparkles
} from 'lucide-react';



// Animation variants
const fadeIn = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.7, ease: "easeOut" }
};

const staggerChildren = {
  animate: {
    transition: {
      staggerChildren: 0.15
    }
  }
};

const LandingPage: React.FC = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const sectionRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null)
  ];

  // React Hooks must be called at component level, not inside callbacks
  const inView0 = useInView(sectionRefs[0], { once: true, margin: "-20%" });
  const inView1 = useInView(sectionRefs[1], { once: true, margin: "-20%" });
  const inView2 = useInView(sectionRefs[2], { once: true, margin: "-20%" });
  const inView3 = useInView(sectionRefs[3], { once: true, margin: "-20%" });
  const inView4 = useInView(sectionRefs[4], { once: true, margin: "-20%" });
  const inViewEffects = [inView0, inView1, inView2, inView3, inView4];


  return (
    <div className="min-h-screen bg-white text-gray-900 relative overflow-hidden">
      {/* Hero Section */}
      <section className="pt-16 pb-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50 relative">
        {/* Background image with light overlay */}
        <div className="fixed inset-0 z-0 overflow-hidden">
          <div
            className="absolute inset-0 bg-cover bg-center opacity-20"
            style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')" }}
          ></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial="initial"
            animate="animate"
            variants={staggerChildren}
            className="text-center"
          >
            <motion.div
              variants={fadeIn}
              className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-medium mb-8 shadow-lg border border-blue-500"
            >
              <Sparkles className="h-4 w-4 mr-2" />
              🏆 TalentTrack Platform
            </motion.div>

            <motion.h1
              variants={fadeIn}
              className="text-4xl md:text-6xl font-bold mb-6 leading-tight"
            >
              Connecting Sports
              <span className="text-blue-600"> Talent</span> with
              <span className="text-orange-500"> Opportunities</span>
            </motion.h1>

            <motion.p
              variants={fadeIn}
              className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto leading-relaxed"
            >
              A unified platform bridging the gap between talented athletes, sports academies,
              coaches, and sponsors. Empowering athletes from all backgrounds to reach their full potential.
            </motion.p>

            <motion.div
              variants={fadeIn}
              className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
            >
              <Link
                href="/sign-up"
                className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center shadow-md border border-blue-500"
              >
                <span className="relative z-10 flex items-center">
                  <Play className="h-5 w-5 mr-2" />
                  Get Started
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>

              <Link
                href="/sign-in"
                className="group relative border-2 border-blue-500 text-gray-700 px-8 py-4 rounded-lg font-semibold transition-all duration-300 hover:border-blue-600 hover:text-blue-600"
              >
                <span className="relative z-10">Sign In</span>
                <div className="absolute inset-0 bg-blue-50 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div
              variants={fadeIn}
              className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto"
            >
              {[
                { value: "1M+", label: "Athletes Targeted", color: "text-blue-600" },
                { value: "10K+", label: "Academies", color: "text-orange-500" },
                { value: "5K+", label: "Tournaments", color: "text-green-500" },
                { value: "100+", label: "Sponsors", color: "text-purple-500" },
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="text-center p-4 bg-white rounded-xl border border-blue-200 hover:border-blue-300 transition-all duration-300 shadow-sm hover:shadow-md"
                >
                  <div className={`text-3xl font-bold ${stat.color} mb-2`}>{stat.value}</div>
                  <div className="text-gray-600 font-medium">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>



      {/* Features Section */}
      <section ref={sectionRefs[2]} className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inViewEffects[2] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Features for <span className="text-blue-600">Every Stakeholder</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Comprehensive tools designed for athletes, academies, coaches, and sponsors
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inViewEffects[2] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid md:grid-cols-2 lg:grid-cols-4 gap-8"
          >
            {/* Athletes */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-blue-200"
            >
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4 border border-blue-200">
                <User className="h-6 w-6 text-blue-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">For Athletes</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-500 mr-3" /> Create verified profile</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-500 mr-3" /> Find nearby academies</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-500 mr-3" /> Join tournaments</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-500 mr-3" /> Earn badges & levels</li>
              </ul>
            </motion.div>

            {/* Academies */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-blue-200"
            >
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4 border border-green-200">
                <Building className="h-6 w-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">For Academies</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /> List facilities</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /> Manage athletes</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /> Host tournaments</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-green-500 mr-3" /> Assign coaches</li>
              </ul>
            </motion.div>

            {/* Coaches */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white !opacity-100 p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-blue-200"
            >
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4 border border-yellow-200">
                <Target className="h-6 w-6 text-yellow-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">For Coaches</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-yellow-500 mr-3" /> Track performance</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-yellow-500 mr-3" /> Create training plans</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-yellow-500 mr-3" /> Manage athletes</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-yellow-500 mr-3" /> Award achievements</li>
              </ul>
            </motion.div>

            {/* Sponsors */}
            <motion.div
              whileHover={{ y: -10 }}
              className="bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 border border-blue-200"
            >
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4 border border-purple-200">
                <Briefcase className="h-6 w-6 text-purple-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-4">For Sponsors</h3>
              <ul className="text-gray-600 space-y-3">
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-purple-500 mr-3" /> Discover talent</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-purple-500 mr-3" /> Direct connection</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-purple-500 mr-3" /> View achievements</li>
                <li className="flex items-center"><CheckCircle className="h-5 w-5 text-purple-500 mr-3" /> Track investments</li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Gamification Section */}
      <section ref={sectionRefs[3]} className="py-20 bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inViewEffects[3] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              <span className="text-blue-600">Gamification</span> System
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Motivate athletes with badges, levels, and achievements
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inViewEffects[3] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="grid md:grid-cols-3 gap-8"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition-all duration-300 border border-blue-200"
            >
              <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-yellow-200">
                <Medal className="h-8 w-8 text-yellow-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Achievement Badges</h3>
              <p className="text-gray-600">Earn badges for tournaments, training milestones, and performance goals</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: -2 }}
              className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition-all duration-300 border border-blue-200"
            >
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-purple-200">
                <Trophy className="h-8 w-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Leaderboards</h3>
              <p className="text-gray-600">Compete with peers and climb sport-specific rankings</p>
            </motion.div>

            <motion.div
              whileHover={{ scale: 1.05, rotate: 2 }}
              className="bg-white p-8 rounded-xl shadow-sm text-center hover:shadow-md transition-all duration-300 border border-blue-200"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 border border-green-200">
                <Star className="h-8 w-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Level System</h3>
              <p className="text-gray-600">Progress through levels as you improve and achieve goals</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section ref={sectionRefs[4]} className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={inViewEffects[4] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="text-3xl md:text-4xl font-bold mb-6"
          >
            Ready to Transform <span className="text-blue-400">Sports in India</span>?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 40 }}
            animate={inViewEffects[4] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto"
          >
            Join the movement to create equal opportunities for all athletes,
            regardless of their background or location.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={inViewEffects[4] ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Link
              href="/sign-up"
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-md border border-blue-500"
            >
              <span className="relative z-10">Join as Athlete</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/sign-up"
              className="group relative bg-gradient-to-r from-orange-600 to-orange-700 text-white px-8 py-4 rounded-lg font-semibold hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 shadow-md border border-orange-500"
            >
              <span className="relative z-10">Register Academy</span>
              <div className="absolute inset-0 bg-gradient-to-r from-orange-700 to-orange-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            <Link
              href="/sign-up"
              className="group relative border-2 border-blue-500 text-white px-8 py-4 rounded-lg font-semibold transition-all duration-300 transform hover:-translate-y-1 hover:border-blue-400"
            >
              <span className="relative z-10">Become Sponsor</span>
              <div className="absolute inset-0 bg-gray-800 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={inViewEffects[4] ? { opacity: 1 } : {}}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="text-gray-400"
          >
            <p>Built for TalentTrack • Empowering Sports Excellence</p>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-12 border-t border-blue-800">
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