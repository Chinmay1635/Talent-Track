import React, { useEffect, useState } from 'react';
import { User } from '../../types';

interface CoachSelectDropdownProps {
  selectedCoachId: string;
  onSelect: (coachId: string) => void;
}

const CoachSelectDropdown: React.FC<CoachSelectDropdownProps> = ({ selectedCoachId, onSelect }) => {
  const [coaches, setCoaches] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCoaches = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await fetch('/api/user');
        if (!res.ok) throw new Error('Failed to fetch coaches');
        const data = await res.json();
        setCoaches(data);
      } catch (err: any) {
        setError(err.message || 'Error fetching coaches');
      } finally {
        setLoading(false);
      }
    };
    fetchCoaches();
  }, []);

  if (loading) return <div>Loading coaches...</div>;
  if (error) return <div className="text-red-500">{error}</div>;

  return (
    <select
      value={selectedCoachId}
      onChange={e => onSelect(e.target.value)}
      className="border rounded px-2 py-1 w-full"
    >
      <option value="">Select a coach</option>
      {coaches.map(coach => (
        <option key={coach._id} value={coach._id}>
          {coach.name} ({coach.email})
        </option>
      ))}
    </select>
  );
};

export default CoachSelectDropdown;
