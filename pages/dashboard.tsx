
import { useRouter } from "next/router";
import { useEffect } from "react";
import Navbar from "../src/components/Layout/Navbar";
import { useAuth } from "../src/context/AuthContext";


export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();


  useEffect(() => {
    if (!loading && user) {
      // Get user role from user object or default to athlete
      const userRole = user.role || 'athlete';
      // Redirect to role-specific dashboard
      switch (userRole) {
        case 'athlete':
          router.push('/athlete/dashboard');
          break;
        case 'coach':
          router.push('/coach/dashboard');
          break;
        case 'academy':
          router.push('/academy/dashboard');
          break;
        case 'sponsor':
          router.push('/sponsor/dashboard');
          break;
        default:
          router.push('/athlete/dashboard');
      }
    }
  }, [user, loading, router]);


  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            Welcome, {user?.name || user?.email}!
          </h1>
          <p className="text-gray-600">Redirecting to your dashboard...</p>
        </div>
      </div>
    </div>
  );
}