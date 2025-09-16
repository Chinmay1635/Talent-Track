import { Athlete, Coach, Academy, Tournament, Badge, TrainingPlan, Exercise } from '../types';
import { Sponsor, TrainingProvider, TrainingProgram, AthleteProgress, TournamentWinner } from '../types';

export const sampleBadges: Badge[] = [
  {
    id: '1',
    name: 'State Champion',
    description: 'Won a state-level championship',
    icon: '🏆',
    category: 'achievement',
    rarity: 'epic'
  },
  {
    id: '2',
    name: 'Fitness Star',
    description: 'Completed 100 training sessions',
    icon: '⭐',
    category: 'skill',
    rarity: 'rare'
  },
  {
    id: '3',
    name: 'Fast Learner',
    description: 'Mastered 5 new techniques in a month',
    icon: '🚀',
    category: 'skill',
    rarity: 'rare'
  },
  {
    id: '4',
    name: 'Team Player',
    description: 'Participated in 10 team events',
    icon: '🤝',
    category: 'participation',
    rarity: 'common'
  },
  {
    id: '5',
    name: 'Dedication Award',
    description: 'Perfect attendance for 6 months',
    icon: '💪',
    category: 'special',
    rarity: 'legendary'
  }
];

export const sampleAthletes: Athlete[] = [
  {
    id: '1',
    userId: 'user-athlete-1',
    name: 'Sumit Phalke',
    sport: 'Boxing',
    region: 'Mumbai',
    level: 'Intermediate',
    badges: [sampleBadges[0], sampleBadges[1]],
    academyId: '1',
    coachId: '1',
    age: 22,
    bio: 'Passionate boxer from Mumbai with dreams of representing India in international competitions.'
  },
  {
    id: '2',
    userId: 'user-athlete-2',
    name: 'Priya Singh',
    sport: 'Badminton',
    region: 'Maharashtra',
    level: 'Pro',
    badges: [sampleBadges[0], sampleBadges[2], sampleBadges[4]],
    academyId: '2',
    coachId: '2',
    age: 19,
    bio: 'Rising badminton star with multiple state championships under her belt.'
  },
  {
    id: '3',
    userId: 'user-athlete-3',
    name: 'Arjun Patel',
    sport: 'Cricket',
    region: 'Gujarat',
    level: 'Beginner',
    badges: [sampleBadges[3]],
    academyId: '3',
    age: 16,
    bio: 'Young cricket enthusiast looking to make it to the state team.'
  }
];

export const sampleCoaches: Coach[] = [
  {
    id: '1',
    userId: 'user-coach-1',
    name: 'Anita Sharma',
    sport: 'Boxing',
    experience: 8,
    academyId: '1',
    bio: 'Former national boxing champion with 8 years of coaching experience.',
    specialization: 'Technical Boxing & Fitness'
  },
  {
    id: '2',
    userId: 'user-coach-2',
    name: 'Rajesh Verma',
    sport: 'Badminton',
    experience: 12,
    academyId: '2',
    bio: 'International badminton coach with expertise in singles and doubles play.',
    specialization: 'Advanced Techniques & Strategy'
  },
  {
    id: '3',
    userId: 'user-coach-3',
    name: 'Suresh Raina',
    sport: 'Cricket',
    experience: 15,
    academyId: '3',
    bio: 'Former state cricket player turned coach, specializing in batting techniques.',
    specialization: 'Batting & Mental Conditioning'
  }
];

export const sampleAcademies: Academy[] = [
  {
    id: '1',
    userId: 'user-academy-1',
    name: 'Mumbai Boxing Academy',
    location: 'Panvel, Mumbai',
    city: 'Panvel',
    state: 'Mumbai',
    sports: ['Boxing', 'Kickboxing'],
    description: 'Premier boxing academy in Mumbai focused on developing grassroots talent.',
    facilities: ['Boxing Ring', 'Heavy Bags', 'Speed Bags', 'Fitness Center'],
    establishedYear: 2015,
    contactEmail: 'info@Mumbaiboxing.com',
    contactPhone: '+91-9876543210'
  },
  {
    id: '2',
    userId: 'user-academy-2',
    name: 'Maharashtra Badminton Center',
    location: 'Mumbai, Maharashtra',
    city: 'Mumbai',
    state: 'Maharashtra',
    sports: ['Badminton'],
    description: 'State-of-the-art badminton facility with international standard courts.',
    facilities: ['8 Badminton Courts', 'Fitness Center', 'Video Analysis Room'],
    establishedYear: 2010,
    contactEmail: 'contact@mhbadminton.com',
    contactPhone: '+91-9876543211'
  },
  {
    id: '3',
    userId: 'user-academy-3',
    name: 'Gujarat Cricket Academy',
    location: 'Ahmedabad, Gujarat',
    city: 'Ahmedabad',
    state: 'Gujarat',
    sports: ['Cricket'],
    description: 'Comprehensive cricket training academy with focus on all-round development.',
    facilities: ['Cricket Ground', 'Indoor Nets', 'Bowling Machine', 'Gym'],
    establishedYear: 2008,
    contactEmail: 'admin@gujaratcricket.com',
    contactPhone: '+91-9876543212'
  }
];

export const sampleTournaments: Tournament[] = [
  {
    id: '1',
    name: 'Mumbai State Boxing Championship',
    sport: 'Boxing',
    location: 'Panvel, Mumbai',
    startDate: '2025-02-15',
    endDate: '2025-02-17',
    registrationDeadline: '2025-02-10',
    maxParticipants: 64,
    currentParticipants: 32,
    academyId: '1',
    academyName: 'Mumbai Boxing Academy',
    description: 'Annual state-level boxing championship for all weight categories.',
    eligibilityLevel: 'All',
    prizePool: '₹50,000',
    status: 'upcoming'
  },
  {
    id: '2',
    name: 'Mumbai Open Badminton Tournament',
    sport: 'Badminton',
    location: 'Mumbai, Maharashtra',
    startDate: '2025-03-01',
    endDate: '2025-03-03',
    registrationDeadline: '2025-02-25',
    maxParticipants: 128,
    currentParticipants: 89,
    academyId: '2',
    academyName: 'Maharashtra Badminton Center',
    description: 'Open tournament for singles and doubles categories.',
    eligibilityLevel: 'Intermediate',
    prizePool: '₹1,00,000',
    status: 'upcoming'
  },
  {
    id: '3',
    name: 'Gujarat Junior Cricket League',
    sport: 'Cricket',
    location: 'Ahmedabad, Gujarat',
    startDate: '2025-01-20',
    endDate: '2025-01-25',
    registrationDeadline: '2025-01-15',
    maxParticipants: 16,
    currentParticipants: 16,
    academyId: '3',
    academyName: 'Gujarat Cricket Academy',
    description: 'T20 format league for junior players under 18.',
    eligibilityLevel: 'Beginner',
    prizePool: '₹25,000',
    status: 'completed'
  }
];

export const sampleExercises: Exercise[] = [
  {
    id: '1',
    name: 'Shadow Boxing',
    description: 'Practice boxing combinations without a partner',
    sets: 3,
    duration: 3,
    restTime: 60,
    completed: false
  },
  {
    id: '2',
    name: 'Heavy Bag Training',
    description: 'Power punching on heavy bag',
    sets: 5,
    duration: 2,
    restTime: 90,
    completed: false
  },
  {
    id: '3',
    name: 'Footwork Drills',
    description: 'Agility and movement training',
    duration: 15,
    completed: false
  }
];

export const sampleTrainingPlans: TrainingPlan[] = [
  {
    id: '1',
    athleteId: '1',
    coachId: '1',
    title: 'Boxing Fundamentals - Week 1',
    description: 'Focus on basic punching techniques and footwork',
    exercises: sampleExercises,
    duration: 4,
    createdAt: '2025-01-01',
    status: 'active'
  }
];

export const sampleSponsors: Sponsor[] = [
  {
    id: '1',
    userId: 'user-sponsor-1',
    name: 'SportsTech India',
    company: 'SportsTech India Pvt Ltd',
    industry: 'Sports Technology',
    budget: '₹5,00,000',
    sponsoredTournaments: ['1', '2'],
    contactEmail: 'sponsor@sportstech.com',
    description: 'Leading sports technology company supporting grassroots sports development.',
    logo: 'https://images.pexels.com/photos/163064/play-stone-network-networked-interactive-163064.jpeg'
  },
  {
    id: '2',
    userId: 'user-sponsor-2',
    name: 'FitLife Corporation',
    company: 'FitLife Corp',
    industry: 'Health & Fitness',
    budget: '₹3,00,000',
    sponsoredTournaments: ['3'],
    contactEmail: 'partnerships@fitlife.com',
    description: 'Promoting healthy lifestyle and supporting young athletes across India.'
  },
  {
    id: '3',
    userId: 'user-sponsor-3',
    name: 'Champion Sports',
    company: 'Champion Sports Equipment',
    industry: 'Sports Equipment',
    budget: '₹2,00,000',
    sponsoredTournaments: ['1'],
    contactEmail: 'support@championsports.com',
    description: 'Premium sports equipment manufacturer supporting athletic excellence.'
  }
];

export const sampleTrainingProviders: TrainingProvider[] = [
  {
    id: '1',
    userId: 'user-trainer-1',
    name: 'Rajesh Fitness Pro',
    specialization: 'Strength & Conditioning',
    experience: 8,
    location: 'Mumbai, Maharashtra',
    contactEmail: 'rajesh@fitnesspro.com',
    bio: 'Certified strength and conditioning specialist with 8 years of experience training professional athletes.'
  },
  {
    id: '2',
    userId: 'user-trainer-2',
    name: 'Priya Sports Academy',
    specialization: 'Technical Skills Training',
    experience: 12,
    location: 'Bangalore, Karnataka',
    contactEmail: 'info@priyasports.com',
    bio: 'Specialized in technical skills development for various sports with focus on precision and technique.'
  },
  {
    id: '3',
    userId: 'user-trainer-3',
    name: 'Elite Performance Center',
    specialization: 'Mental Conditioning',
    experience: 6,
    location: 'Delhi, NCR',
    contactEmail: 'contact@eliteperformance.com',
    bio: 'Sports psychology and mental conditioning experts helping athletes achieve peak performance.'
  }
];

export const sampleTrainingPrograms: TrainingProgram[] = [
  {
    id: '1',
    providerId: '1',
    providerName: 'Rajesh Fitness Pro',
    title: 'Advanced Strength Training for Athletes',
    description: 'Comprehensive strength and conditioning program designed for competitive athletes.',
    sport: 'General Fitness',
    duration: 12,
    fees: '₹15,000',
    location: 'Mumbai, Maharashtra',
    maxParticipants: 20,
    currentParticipants: 12,
    startDate: '2025-02-01',
    schedule: 'Mon, Wed, Fri - 6:00 AM to 8:00 AM',
    level: 'Intermediate'
  },
  {
    id: '2',
    providerId: '2',
    providerName: 'Priya Sports Academy',
    title: 'Badminton Technical Mastery',
    description: 'Focus on advanced badminton techniques, footwork, and shot precision.',
    sport: 'Badminton',
    duration: 8,
    fees: '₹12,000',
    location: 'Bangalore, Karnataka',
    maxParticipants: 15,
    currentParticipants: 8,
    startDate: '2025-02-15',
    schedule: 'Tue, Thu, Sat - 5:00 PM to 7:00 PM',
    level: 'Pro'
  },
  {
    id: '3',
    providerId: '3',
    providerName: 'Elite Performance Center',
    title: 'Mental Toughness for Competitors',
    description: 'Develop mental resilience, focus, and competitive mindset for tournaments.',
    sport: 'Mental Training',
    duration: 6,
    fees: '₹8,000',
    location: 'Delhi, NCR',
    maxParticipants: 25,
    currentParticipants: 18,
    startDate: '2025-01-20',
    schedule: 'Weekends - 10:00 AM to 12:00 PM',
    level: 'All'
  }
];

export const sampleAthleteProgress: AthleteProgress[] = [
  {
    id: '1',
    athleteId: '1', // Sumit Phalke
    coachId: '1', // Anita Sharma
    speedImprovement: 15.5,
    accuracyImprovement: 22.3,
    lastTournamentPosition: 2,
    lastUpdated: '2025-01-10',
    notes: 'Excellent progress in footwork and punch accuracy. Ready for advanced training.'
  },
  {
    id: '2',
    athleteId: '2', // Priya Singh
    coachId: '2', // Rajesh Verma
    speedImprovement: 28.7,
    accuracyImprovement: 35.2,
    lastTournamentPosition: 1,
    lastUpdated: '2025-01-08',
    notes: 'Outstanding performance in recent tournaments. Consistent winner.'
  },
  {
    id: '3',
    athleteId: '3', // Arjun Patel
    coachId: '3', // Suresh Raina
    speedImprovement: 8.2,
    accuracyImprovement: 12.1,
    lastTournamentPosition: 5,
    lastUpdated: '2025-01-12',
    notes: 'Good improvement in batting technique. Needs more practice on bowling.'
  }
];

export const sampleTournamentWinners: TournamentWinner[] = [
  {
    tournamentId: '1',
    athleteId: '1', // Sumit Phalke
    position: 2,
    prize: '₹25,000',
    sponsorId: '1' // SportsTech India
  },
  {
    tournamentId: '2',
    athleteId: '2', // Priya Singh
    position: 1,
    prize: '₹50,000',
    sponsorId: '1' // SportsTech India
  },
  {
    tournamentId: '3',
    athleteId: '3', // Arjun Patel
    position: 3,
    prize: '₹10,000',
    sponsorId: '2' // FitLife Corporation
  }
];