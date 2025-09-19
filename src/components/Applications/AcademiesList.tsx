import React from 'react';

interface Academy {
  _id: string;
  name: string;
  location?: string;
  sports?: string[];
}

interface AcademiesListProps {
  academies: Academy[];
  hasActiveApplication: boolean;
  onApply: (academyId: string, message: string) => void;
}

const AcademiesList: React.FC<AcademiesListProps> = ({ academies, hasActiveApplication, onApply }) => {
  const [message, setMessage] = React.useState<{ [id: string]: string }>({});
  const [applyingId, setApplyingId] = React.useState<string | null>(null);

  return (
    <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">Academies</h2>
      <div className="space-y-4">
        {academies.map(academy => (
          <div key={academy._id} className="border border-gray-200 rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <div className="font-medium">{academy.name}</div>
              {academy.location && <div className="text-sm text-gray-600">{academy.location}</div>}
              {academy.sports && (
                <div className="flex flex-wrap gap-1 mt-1">
                  {academy.sports.map(sport => (
                    <span key={sport} className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">{sport}</span>
                  ))}
                </div>
              )}
            </div>
            <div className="mt-2 md:mt-0 flex flex-col items-end gap-2">
              <textarea
                className="border rounded p-2 text-sm mb-2"
                placeholder="Optional message to academy"
                value={message[academy._id] || ''}
                onChange={e => setMessage(m => ({ ...m, [academy._id]: e.target.value }))}
                rows={2}
                disabled={hasActiveApplication}
              />
              <button
                className={`bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50 ${hasActiveApplication ? 'cursor-not-allowed' : ''}`}
                disabled={hasActiveApplication || applyingId === academy._id}
                onClick={() => {
                  setApplyingId(academy._id);
                  onApply(academy._id, message[academy._id] || '');
                  setTimeout(() => setApplyingId(null), 1000);
                }}
              >
                {hasActiveApplication ? 'Already Applied' : applyingId === academy._id ? 'Applying...' : 'Apply'}
              </button>
            </div>
          </div>
        ))}
        {academies.length === 0 && <div className="text-gray-500">No academies available.</div>}
      </div>
    </div>
  );
};

export default AcademiesList;
