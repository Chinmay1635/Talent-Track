import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useUser } from '@clerk/nextjs';
import { useAuth } from '../src/context/AuthContext';
import LandingPage from '../src/components/LandingPage';
import Navbar from '../src/components/Layout/Navbar';

export default function Home() {
  const { user } = useAuth();
  const { user: clerkUser, isLoaded } = useUser();
  const router = useRouter();

  useEffect(() => {
    if (isLoaded && clerkUser) {
      router.push('/dashboard');
    }
  }, [clerkUser, isLoaded, router]);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      {!clerkUser && <LandingPage />}
    </div>
  );
}