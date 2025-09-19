import React from 'react';

interface ApplicationsListProps {
  applications: Array<{
    _id: string;
    coachId: { name: string; email: string };
    message?: string;
    status: string;
    createdAt: string;
  }>;
  onStatusChange?: (id: string, status: 'accepted' | 'rejected') => void;
}

const ApplicationsList: React.FC<ApplicationsListProps> = ({ applications, onStatusChange }) => {
  if (!applications.length) {
    return <div className="text-gray-500">No coach applications yet.</div>;
  }
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">Coach Applications</h3>
      <div className="space-y-2">
        {applications.map(app => (
          <div key={app._id} className="border rounded p-3 flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <div className="font-medium">Coach: {app.coachId?.name || '-'} ({app.coachId?.email || '-'})</div>
              {app.message && <div className="text-sm text-gray-600">Message: {app.message}</div>}
              <div className="text-xs text-gray-400">Applied: {new Date(app.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="mt-2 md:mt-0 flex gap-2 items-center">
              <span className={`px-2 py-1 rounded text-xs ${
                app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {app.status}
              </span>
              {app.status === 'pending' && onStatusChange && (
                <>
                  <button
                    className="bg-green-500 text-white px-2 py-1 rounded text-xs hover:bg-green-600"
                    onClick={() => onStatusChange(app._id, 'accepted')}
                  >Accept</button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600"
                    onClick={() => onStatusChange(app._id, 'rejected')}
                  >Reject</button>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ApplicationsList;
