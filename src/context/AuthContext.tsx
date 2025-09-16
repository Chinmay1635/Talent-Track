import React, { createContext, useContext, useEffect, useState } from 'react';
import { useUser } from '@clerk/nextjs';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { user: clerkUser, isLoaded } = useUser();

  useEffect(() => {
    if (isLoaded) {
      if (clerkUser) {
        // Convert Clerk user to our User type
        const talentTrackUser: User = {
          id: clerkUser.id, // Clerk user id
          clerkUserId: clerkUser.id, // For Prisma
          email: clerkUser.emailAddresses[0]?.emailAddress || '',
          name: clerkUser.firstName ? `${clerkUser.firstName} ${clerkUser.lastName || ''}`.trim() : clerkUser.emailAddresses[0]?.emailAddress || '',
          role: (clerkUser.publicMetadata?.role as 'athlete' | 'coach' | 'academy' | 'sponsor') || 'athlete',
          createdAt: clerkUser.createdAt?.toISOString() || new Date().toISOString()
        };
        setUser(talentTrackUser);
      } else {
        setUser(null);
      }
      setLoading(false);
    }
  }, [clerkUser, isLoaded]);

  return (
    <AuthContext.Provider value={{ user, loading }}>
      {children}
    </AuthContext.Provider>
  );
};