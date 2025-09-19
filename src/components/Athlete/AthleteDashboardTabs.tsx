import React from 'react';
import { useRouter } from 'next/router';

const tabs = [
  { name: 'Dashboard', route: '/athlete/dashboard' },
  { name: 'Profile', route: '/athlete/profile' },
  { name: 'Tournaments', route: '/athlete/tournaments' },
  { name: 'Support', route: '/athlete/support' },
  { name: 'Chatbot', route: '/athlete/chatbot' },
];

const AthleteDashboardTabs: React.FC<{ activeTab?: string }> = ({ activeTab }) => {
  const router = useRouter();
  return (
    <div className="flex gap-4 border-b border-gray-200 mb-6">
      {tabs.map(tab => (
        <button
          key={tab.name}
          className={`py-2 px-4 font-semibold border-b-2 transition-colors ${
            activeTab === tab.name ? 'border-blue-500 text-blue-600' : 'border-transparent text-gray-600 hover:text-blue-500'
          }`}
          onClick={() => router.push(tab.route)}
        >
          {tab.name}
        </button>
      ))}
    </div>
  );
};

export default AthleteDashboardTabs;
