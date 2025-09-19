import React from 'react';
import Link from 'next/link';

const FloatingChatbotButton: React.FC = () => (
  <Link
    href="/athlete/chatbot"
    className="fixed bottom-8 right-8 z-50"
    title="Chat with Talent Track AI"
    style={{ textDecoration: 'none' }}
  >
    <div
      className="w-20 h-20 rounded-full flex flex-col items-center justify-center shadow-xl hover:scale-105 transition-transform cursor-pointer border-4 border-blue-600 bg-white"
      style={{
        backgroundImage: 'url(/talent-track-logo.png)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative',
      }}
    >
      <span
        className="absolute bottom-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-blue-600 bg-opacity-90 text-white text-xs font-bold rounded-full shadow-md"
        style={{
          whiteSpace: 'nowrap',
          fontFamily: 'inherit',
          letterSpacing: '0.5px',
        }}
      >
        TalentTrack AI
      </span>
    </div>
  </Link>
);

export default FloatingChatbotButton;
