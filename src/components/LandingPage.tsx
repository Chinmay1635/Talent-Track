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

// Image carousel data
const carouselImages = [
  {
    id: 2,
    src: "https://images.unsplash.com/photo-1552667466-07770ae110d0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    alt: "Sports academy facility"
  },
  {
    id: 3,
    src: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80",
    alt: "Team sports competition"
  },
  {
    id: 4,
    src: "https://images.unsplash.com/photo-1516466723877-e4ec1d736c8a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=874&q=80",
    alt: "Athlete receiving award"
  }
];

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

  const inViewEffects = sectionRefs.map(ref => useInView(ref, { once: true, margin: "-20%" }));

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === carouselImages.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? carouselImages.length - 1 : prevIndex - 1
    );
  };

  const toggleVideoPlay = () => {
    if (videoRef.current) {
      if (isVideoPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsVideoPlaying(!isVideoPlaying);
    }
  };

  return (
    <div className="min-h-screen text-white relative overflow-hidden">
      {/* Static background image */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80')" }}
        ></div>
        
        {/* Dark overlay for better text contrast */}
        <div className="absolute inset-0 bg-blue-900/80"></div>
        
        {/* Animated floating elements */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-700/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 50, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/3 right-1/3 w-80 h-80 bg-blue-600/10 rounded-full blur-3xl"
          animate={{
            scale: [1.2, 1, 1.2],
            x: [0, -40, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.div 
          className="absolute top-2/3 left-1/2 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 60, 0],
            y: [0, -70, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center relative pt-20 pb-24">
          <div className="absolute inset-0 bg-gradient-to-b from-blue-900/50 via-blue-800/40 to-blue-900/50"></div>
          
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
            <motion.div 
              initial="initial"
              animate="animate"
              variants={staggerChildren}
              className="text-center"
            >
              <motion.div 
                variants={fadeIn}
                className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-full text-sm font-medium mb-8 border border-blue-500/30 shadow-lg"
              >
                <Sparkles className="h-4 w-4 mr-2" /> 
                🏆 TalentTrack Platform
              </motion.div>
              
              <motion.h1 
                variants={fadeIn}
                className="text-5xl md:text-7xl font-bold mb-8 leading-tight"
              >
                Connecting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400">Sports Talent</span> <br />
                With <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">Opportunities</span>
              </motion.h1>
              
              <motion.p 
                variants={fadeIn}
                className="text-xl md:text-2xl text-blue-100 mb-12 max-w-4xl mx-auto leading-relaxed"
              >
                A revolutionary platform bridging the gap between talented athletes, sports academies, 
                coaches, and sponsors. Empowering athletes from all backgrounds to reach their full potential.
              </motion.p>
              
              <motion.div 
                variants={fadeIn}
                className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
              >
                <Link 
                  href="/sign-up"
                  className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 flex items-center justify-center shadow-lg"
                >
                  <span className="relative z-10 flex items-center">
                    <Play className="h-6 w-6 mr-3" />
                    Get Started Now
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
                
                <Link 
                  href="/sign-in"
                  className="group relative border-2 border-blue-400/40 text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 backdrop-blur-sm hover:border-blue-300 hover:text-blue-300"
                >
                  <span className="relative z-10">Sign In</span>
                  <div className="absolute inset-0 bg-blue-700/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </Link>
              </motion.div>

              {/* Stats */}
              <motion.div 
                variants={fadeIn}
                className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto"
              >
                {[
                  { value: "1M+", label: "Athletes Targeted", color: "from-blue-300 to-blue-400" },
                  { value: "10K+", label: "Academies", color: "from-blue-400 to-blue-300" },
                  { value: "5K+", label: "Tournaments", color: "from-blue-500 to-blue-400" },
                  { value: "100+", label: "Sponsors", color: "from-blue-600 to-blue-500" },
                ].map((stat, index) => (
                  <motion.div 
                    key={index} 
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="text-center p-6 bg-blue-900/30 backdrop-blur-md rounded-2xl border border-blue-700/30 hover:border-blue-500 transition-all duration-500 shadow-lg"
                  >
                    <div className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r ${stat.color} mb-3`}>{stat.value}</div>
                    <div className="text-blue-200 font-medium">{stat.label}</div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator */}
          <motion.div 
            className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-6 h-10 border-2 border-blue-400 rounded-full flex justify-center">
              <motion.div 
                className="w-1 h-3 bg-blue-400 rounded-full mt-2"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
          </motion.div>
        </section>

        {/* Video Showcase Section */}
        <section ref={sectionRefs[0]} className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={inViewEffects[0] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Transforming <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400">Sports Careers</span>
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
                Discover how TalentTrack is revolutionizing the sports industry with cutting-edge technology
              </p>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={inViewEffects[0] ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="relative bg-gradient-to-br from-blue-900/40 to-blue-800/40 rounded-3xl overflow-hidden shadow-2xl border border-blue-700/30 backdrop-blur-sm"
            >
              <div className="relative aspect-video flex items-center justify-center">
                {!isVideoPlaying && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-t from-blue-900/70 to-blue-800/40 z-10"></div>
                    <button 
                      onClick={toggleVideoPlay}
                      className="absolute z-20 bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6 rounded-full hover:shadow-2xl transition-all duration-300 transform hover:scale-110 shadow-lg"
                    >
                      <Play className="h-12 w-12 fill-current" />
                    </button>
                  </>
                )}
                
                <video 
                  ref={videoRef}
                  className="w-full h-full object-cover"
                  poster="https://images.unsplash.com/photo-1549060279-7e168fce7090?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80"
                  onEnded={() => setIsVideoPlaying(false)}
                >
                  <source src="https://player.vimeo.com/external/370331493.sd.mp4?s=ada720b5a8dcdabfcfbea8cf821429c19eccf734&profile_id=139&oauth2_token_id=57447761" type="video/mp4" />
                </video>
                
                {isVideoPlaying && (
                  <button 
                    onClick={toggleVideoPlay}
                    className="absolute bottom-6 right-6 z-20 bg-blue-900/70 text-white p-3 rounded-full hover:bg-blue-800 transition-all duration-300 backdrop-blur-sm"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                  </button>
                )}
              </div>
              
              <div className="p-8">
                <h3 className="text-2xl font-bold mb-4">The Future of Sports Talent Management</h3>
                <p className="text-blue-200">
                  Our platform combines advanced technology with deep sports industry knowledge to create opportunities for athletes at all levels. 
                  Watch how we're changing the game for thousands of athletes worldwide.
                </p>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Features Section */}
        <section ref={sectionRefs[2]} className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={inViewEffects[2] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                Features for <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-400">Every Stakeholder</span>
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
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
                className="bg-blue-900/30 backdrop-blur-md p-8 rounded-2xl border border-blue-700/30 hover:border-blue-500 transition-all duration-500 shadow-lg"
              >
                <div className="w-16 h-16 bg-blue-700/30 rounded-2xl flex items-center justify-center mb-6">
                  <User className="h-8 w-8 text-blue-300" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">For Athletes</h3>
                <ul className="text-blue-200 space-y-3">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-300 mr-3" /> Create verified profile</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-300 mr-3" /> Find nearby academies</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-300 mr-3" /> Join tournaments</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-300 mr-3" /> Earn badges & levels</li>
                </ul>
              </motion.div>

              {/* Academies */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-blue-900/30 backdrop-blur-md p-8 rounded-2xl border border-blue-600/30 hover:border-blue-500 transition-all duration-500 shadow-lg"
              >
                <div className="w-16 h-16 bg-blue-600/30 rounded-2xl flex items-center justify-center mb-6">
                  <Building className="h-8 w-8 text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">For Academies</h3>
                <ul className="text-blue-200 space-y-3">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-400 mr-3" /> List facilities</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-400 mr-3" /> Manage athletes</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-400 mr-3" /> Host tournaments</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-400 mr-3" /> Assign coaches</li>
                </ul>
              </motion.div>

              {/* Coaches */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-blue-900/30 backdrop-blur-md p-8 rounded-2xl border border-blue-700/30 hover:border-blue-600 transition-all duration-500 shadow-lg"
              >
                <div className="w-16 h-16 bg-blue-700/30 rounded-2xl flex items-center justify-center mb-6">
                  <Target className="h-8 w-8 text-blue-500" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">For Coaches</h3>
                <ul className="text-blue-200 space-y-3">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-500 mr-3" /> Track performance</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-500 mr-3" /> Create training plans</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-500 mr-3" /> Manage athletes</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-500 mr-3" /> Award achievements</li>
                </ul>
              </motion.div>

              {/* Sponsors */}
              <motion.div 
                whileHover={{ y: -10 }}
                className="bg-blue-900/30 backdrop-blur-md p-8 rounded-2xl border border-blue-800/30 hover:border-blue-700 transition-all duration-500 shadow-lg"
              >
                <div className="w-16 h-16 bg-blue-800/30 rounded-2xl flex items-center justify-center mb-6">
                  <Briefcase className="h-8 w-8 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">For Sponsors</h3>
                <ul className="text-blue-200 space-y-3">
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-600 mr-3" /> Discover talent</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-600 mr-3" /> Direct connection</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-600 mr-3" /> View achievements</li>
                  <li className="flex items-center"><CheckCircle className="h-5 w-5 text-blue-600 mr-3" /> Track investments</li>
                </ul>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* Gamification Section */}
        <section ref={sectionRefs[3]} className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={inViewEffects[3] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-center mb-20"
            >
              <h2 className="text-4xl md:text-5xl font-bold mb-6">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">Gamification</span> System
              </h2>
              <p className="text-xl text-blue-200 max-w-3xl mx-auto">
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
                className="bg-blue-900/30 backdrop-blur-md p-10 rounded-2xl border border-blue-500/30 hover:border-blue-400 transition-all duration-500 text-center shadow-lg"
              >
                <div className="w-20 h-20 bg-blue-500/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-500/30">
                  <Medal className="h-10 w-10 text-blue-300" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Achievement Badges</h3>
                <p className="text-blue-200">Earn badges for tournaments, training milestones, and performance goals</p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05, rotate: -2 }}
                className="bg-blue-900/30 backdrop-blur-md p-10 rounded-2xl border border-blue-600/30 hover:border-blue-500 transition-all duration-500 text-center shadow-lg"
              >
                <div className="w-20 h-20 bg-blue-600/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-600/30">
                  <Trophy className="h-10 w-10 text-blue-400" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Leaderboards</h3>
                <p className="text-blue-200">Compete with peers and climb sport-specific rankings</p>
              </motion.div>

              <motion.div 
                whileHover={{ scale: 1.05, rotate: 2 }}
                className="bg-blue-900/30 backdrop-blur-md p-10 rounded-2xl border border-blue-700/30 hover:border-blue-600 transition-all duration-500 text-center shadow-lg"
              >
                <div className="w-20 h-20 bg-blue-700/20 rounded-2xl flex items-center justify-center mx-auto mb-6 border border-blue-700/30">
                  <Star className="h-10 w-10 text-blue-500" />
                </div>
                <h3 className="text-2xl font-bold mb-4 text-white">Level System</h3>
                <p className="text-blue-200">Progress through levels as you improve and achieve goals</p>
              </motion.div>
            </motion.div>
          </div>
        </section>

        {/* CTA Section */}
        <section ref={sectionRefs[4]} className="py-24 relative">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <motion.h2 
              initial={{ opacity: 0, y: 40 }}
              animate={inViewEffects[4] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7 }}
              className="text-4xl md:text-5xl font-bold mb-6 text-white"
            >
              Ready to Transform <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-blue-300">Sports in India</span>?
            </motion.h2>
            <motion.p 
              initial={{ opacity: 0, y: 40 }}
              animate={inViewEffects[4] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="text-xl text-blue-200 mb-12 max-w-3xl mx-auto"
            >
              Join the movement to create equal opportunities for all athletes, 
              regardless of their background or location.
            </motion.p>
            
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={inViewEffects[4] ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.2 }}
              className="flex flex-col sm:flex-row gap-6 justify-center mb-16"
            >
              <Link 
                href="/sign-up"
                className="group relative bg-gradient-to-r from-blue-600 to-blue-700 text-white px-10 py-5 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg"
              >
                <span className="relative z-10">Join as Athlete</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-700 to-blue-800 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/sign-up"
                className="group relative bg-gradient-to-r from-blue-700 to-blue-800 text-white px-10 py-5 rounded-xl font-semibold hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 shadow-lg"
              >
                <span className="relative z-10">Register Academy</span>
                <div className="absolute inset-0 bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
              <Link 
                href="/sign-up"
                className="group relative border-2 border-blue-400/40 text-white px-10 py-5 rounded-xl font-semibold transition-all duration-300 transform hover:-translate-y-2 backdrop-blur-sm hover:border-blue-300"
              >
                <span className="relative z-10">Become Sponsor</span>
                <div className="absolute inset-0 bg-blue-700/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </Link>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0 }}
              animate={inViewEffects[4] ? { opacity: 1 } : {}}
              transition={{ duration: 0.7, delay: 0.3 }}
              className="text-blue-300"
            >
              <p>Built for TalentTrack • Empowering Sports Excellence</p>
            </motion.div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-blue-900/95 py-16 text-white border-t border-blue-700/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <div className="flex items-center space-x-3 mb-6 md:mb-0">
                <div className="p-2 bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl">
                  <Trophy className="h-8 w-8 text-white" />
                </div>
                <span className="text-2xl font-bold">TalentTrack</span>
              </div>
              
              <div className="text-blue-300 text-center md:text-right">
                <p>© 2025 TalentTrack. Building the future of sports in India.</p>
                <p className="text-sm mt-2">Designed with passion for sports and technology</p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default LandingPage;