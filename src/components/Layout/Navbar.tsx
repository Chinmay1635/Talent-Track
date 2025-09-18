import React, { useState } from 'react';
import Link from 'next/link';
import { Trophy, Bell, User, LogOut, Menu, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

const Navbar: React.FC = () => {
  const { user } = useAuth();
  const { notifications } = useData();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  const unreadNotifications = Array.isArray(notifications)
  ? notifications.filter(n => !n.read && n.userId === user?._id)
    : [];

  const getRoleBasedLinks = () => {
    if (!user) return [];

    switch (user.role) {
      case 'athlete':
        return [
          { href: '/athlete/profile', label: 'My Profile' },
          { href: '/athlete/academies', label: 'Find Academies' },
          { href: '/athlete/tournaments', label: 'Tournaments' },
          { href: '/athlete/training', label: 'Training' }
        ];
      case 'coach':
        return [
          { href: '/coach/dashboard', label: 'Dashboard' },
          { href: '/coach/athletes', label: 'My Athletes' },
          { href: '/coach/training-plans', label: 'Training Plans' }
        ];
      case 'academy':
        return [
          { href: '/academy/dashboard', label: 'Dashboard' },
          { href: '/academy/athletes', label: 'Athletes' },
          { href: '/academy/coaches', label: 'Coaches' },
          { href: '/academy/tournaments', label: 'Tournaments' }
        ];
      case 'sponsor':
        return [
          { href: '/sponsor/dashboard', label: 'Dashboard' },
          { href: '/sponsor/athletes', label: 'Discover Athletes' }
        ];
      default:
        return [];
    }
  };

  const roleLinks = getRoleBasedLinks();

  return (
    <nav className="bg-white shadow-sm border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Trophy className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TalentTrack</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {user && roleLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <>
                {/* Notifications */}
                <div className="relative">
                  <button
                    onClick={() => setShowNotifications(!showNotifications)}
                    className="relative p-2 text-gray-600 hover:text-blue-600 transition-colors"
                  >
                    <Bell className="h-5 w-5" />
                    {unreadNotifications.length > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                        {unreadNotifications.length}
                      </span>
                    )}
                  </button>

                  {/* Notifications Dropdown */}
                  {showNotifications && (
                    <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
                      <div className="p-4 border-b border-gray-200">
                        <h3 className="font-semibold text-gray-900">Notifications</h3>
                      </div>
                      <div className="max-h-64 overflow-y-auto">
                        {unreadNotifications.length > 0 ? (
                          unreadNotifications.slice(0, 5).map((notification) => (
                            <div key={notification.id} className="p-4 border-b border-gray-100 hover:bg-gray-50">
                              <h4 className="font-medium text-gray-900 text-sm">{notification.title}</h4>
                              <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
                              <p className="text-gray-400 text-xs mt-2">
                                {new Date(notification.createdAt).toLocaleDateString()}
                              </p>
                            </div>
                          ))
                        ) : (
                          <div className="p-4 text-center text-gray-500">
                            No new notifications
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* User Menu */}
                <div className="flex items-center space-x-2">
                  <div className="hidden md:block text-right">
                    <p className="text-sm font-medium text-gray-900">{user.name}</p>
                    <p className="text-xs text-gray-500 capitalize">{user.role}</p>
                  </div>
                  <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                    <User className="h-4 w-4 text-blue-600" />
                  </div>
                    <button
                      className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                      title="Logout"
                      onClick={async () => {
                        await fetch('/api/auth/logout', { method: 'POST', credentials: 'include' });
                        window.location.href = '/sign-in';
                      }}
                    >
                      <LogOut className="h-4 w-4" />
                    </button>
                </div>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link
                  href="/sign-in"
                  className="text-gray-700 hover:text-blue-600 transition-colors font-medium"
                >
                  Sign In
                </Link>
                <Link
                  href="/sign-up"
                  className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors font-medium"
                >
                  Sign Up
                </Link>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              className="md:hidden p-2"
              onClick={() => setShowMobileMenu(!showMobileMenu)}
            >
              {showMobileMenu ? (
                <X className="h-5 w-5 text-gray-600" />
              ) : (
                <Menu className="h-5 w-5 text-gray-600" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {showMobileMenu && (
          <div className="md:hidden border-t border-gray-200 py-4">
            <div className="space-y-2">
              {user && roleLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                  onClick={() => setShowMobileMenu(false)}
                >
                  {link.label}
                </Link>
              ))}
              {!user && (
                <>
                  <Link
                    href="/sign-in"
                    className="block px-4 py-2 text-gray-700 hover:bg-gray-50 rounded-lg"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/sign-up"
                    className="block px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 mx-4"
                    onClick={() => setShowMobileMenu(false)}
                  >
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;