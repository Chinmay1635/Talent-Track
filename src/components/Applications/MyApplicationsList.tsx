import React from 'react';

interface MyApplicationsListProps {
  applications: Array<{
    _id: string;
    academyId: { name: string };
    message?: string;
    status: string;
    createdAt: string;
  }>;
}

const MyApplicationsList: React.FC<MyApplicationsListProps> = ({ applications }) => {
  if (!applications.length) {
    return <div className="text-gray-500">No applications yet.</div>;
  }
  return (
    <div className="mt-4">
      <h3 className="text-lg font-semibold mb-2">My Applications</h3>
      <div className="space-y-2">
        {applications.map(app => (
          <div key={app._id} className="border rounded p-3 flex flex-col md:flex-row md:items-center justify-between">
            <div>
              <div className="font-medium">Academy: {app.academyId?.name || '-'}</div>
              {app.message && <div className="text-sm text-gray-600">Message: {app.message}</div>}
              <div className="text-xs text-gray-400">Applied: {new Date(app.createdAt).toLocaleDateString()}</div>
            </div>
            <div className="mt-2 md:mt-0">
              <span className={`px-2 py-1 rounded text-xs ${
                app.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                app.status === 'accepted' ? 'bg-green-100 text-green-800' :
                'bg-red-100 text-red-800'
              }`}>
                {app.status}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyApplicationsList;
