import React from 'react';

interface ApplyButtonProps {
  coachId: string;
  academyId: string;
  onApplied?: () => void;
}

const ApplyButton: React.FC<ApplyButtonProps> = ({ coachId, academyId, onApplied }) => {
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [message, setMessage] = React.useState('');
  const [applied, setApplied] = React.useState(false);

  const handleApply = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ coachId, academyId, message }),
      });
      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Failed to apply');
      } else {
        setApplied(true);
        if (onApplied) onApplied();
      }
    } catch (err) {
      setError('Network error');
    }
    setLoading(false);
  };

  if (applied) {
    return <button className="bg-gray-300 text-gray-600 px-4 py-2 rounded" disabled>Applied</button>;
  }

  return (
    <div className="flex flex-col gap-2">
      <textarea
        className="border rounded p-2 text-sm"
        placeholder="Optional message to academy"
        value={message}
        onChange={e => setMessage(e.target.value)}
        rows={2}
      />
      <button
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
        onClick={handleApply}
        disabled={loading}
      >
        {loading ? 'Applying...' : 'Apply to Academy'}
      </button>
      {error && <span className="text-red-500 text-xs">{error}</span>}
    </div>
  );
};

export default ApplyButton;
