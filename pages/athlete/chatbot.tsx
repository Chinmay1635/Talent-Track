import dynamic from 'next/dynamic';

const AthleteChatbot = dynamic(() => import('../../src/components/Athlete/AthleteChatbot'), { ssr: false });

export default function AthleteChatbotPage() {
  return <AthleteChatbot />;
}
