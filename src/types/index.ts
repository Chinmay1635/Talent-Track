export interface User {
  _id: string;
  email: string;
  name: string;
  role: 'athlete' | 'coach' | 'academy' | 'sponsor';
  createdAt: string;
}

export interface Athlete {
  id: string;
  userId: string;
  name: string;
  sport: string;
  region: string;
  level: 'Beginner' | 'Intermediate' | 'Pro';
  badges: Badge[];
  academyId?: string;
  coachId?: string;
  profileImage?: string;
  age?: number;
  bio?: string;
}

export interface Coach {
  id: string;
  userId: string;
  name: string;
  sport: string;
  experience: number;
  academyId?: string;
  profileImage?: string;
  bio?: string;
  specialization?: string;
}

export interface Academy {
  _id: string;
  userId: string;
  name: string;
  location: string;
  city: string;
  state: string;
  sports: string[];
  description?: string;
  facilities?: string[];
  establishedYear?: number;
  contactEmail?: string;
  contactPhone?: string;
  profileImage?: string;
}

export interface Tournament {
  id: string;
  name: string;
  sport: string;
  location: string;
  startDate: string;
  endDate: string;
  registrationDeadline: string;
  maxParticipants: number;
  currentParticipants: number;
  academyId: string;
  academyName: string;
  description?: string;
  eligibilityLevel: 'Beginner' | 'Intermediate' | 'Pro' | 'All';
  prizePool?: string;
  status: 'upcoming' | 'ongoing' | 'completed';
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  category: 'achievement' | 'skill' | 'participation' | 'special';
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface TrainingPlan {
  id: string;
  athleteId: string;
  coachId: string;
  title: string;
  description: string;
  exercises: Exercise[];
  duration: number; // in weeks
  createdAt: string;
  status: 'active' | 'completed' | 'paused';
}

export interface Exercise {
  id: string;
  name: string;
  description: string;
  sets?: number;
  reps?: number;
  duration?: number; // in minutes
  restTime?: number; // in seconds
  completed: boolean;
}

export interface Notification {
  id: string;
  userId: string;
  title: string;
  message: string;
  type: 'tournament' | 'assignment' | 'badge' | 'general';
  read: boolean;
  createdAt: string;
}

export interface TournamentRegistration {
  id: string;
  tournamentId: string;
  athleteId: string;
  registeredAt: string;
  status: 'registered' | 'confirmed' | 'cancelled';
}

export interface Sponsor {
  id: string;
  userId: string;
  name: string;
  company: string;
  industry: string;
  budget: string;
  sponsoredTournaments: string[];
  contactEmail: string;
  description?: string;
  logo?: string;
}

export interface TrainingProvider {
  id: string;
  userId: string;
  name: string;
  specialization: string;
  experience: number;
  location: string;
  contactEmail: string;
  bio?: string;
}

export interface TrainingProgram {
  id: string;
  providerId: string;
  providerName: string;
  title: string;
  description: string;
  sport: string;
  duration: number; // in weeks
  fees: string;
  location: string;
  maxParticipants: number;
  currentParticipants: number;
  startDate: string;
  schedule: string; // e.g., "Mon, Wed, Fri - 6:00 AM"
  level: 'Beginner' | 'Intermediate' | 'Pro' | 'All';
}

export interface AthleteProgress {
  id: string;
  athleteId: string;
  coachId: string;
  speedImprovement: number; // percentage
  accuracyImprovement: number; // percentage
  lastTournamentPosition: number;
  lastUpdated: string;
  notes?: string;
}

export interface TournamentWinner {
  tournamentId: string;
  athleteId: string;
  position: number; // 1 for winner, 2 for runner-up, etc.
  prize?: string;
  sponsorId?: string;
}