import { useEffect, useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useData } from '../../context/DataContext';

interface Video {
  _id: string;
  title: string;
  videoId: string;
  videoUrl: string;
  description?: string;
  createdAt: string;
  coach: {
    _id: string;
    name: string;
  };
}

export default function AthleteSupport() {
  const { user } = useAuth();
  const { athletes } = useData();
  const [videos, setVideos] = useState<Video[]>([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchVideos = async () => {
      try {
        setLoading(true);
        // Find athlete object for current user
        const athlete = athletes.find(a => a.userId === user?._id);
        const coachId = athlete?.coachId;
        if (!coachId) {
          setError('No coach assigned.');
          setLoading(false);
          return;
        }
        const response = await fetch(`/api/precautionVideos?coachId=${coachId}`, {
          method: 'GET',
          credentials: 'include', // Automatically sends cookies (including token)
          headers: {
            'Content-Type': 'application/json'
          }
        });
        const data = await response.json();
        if (data.success) {
          setVideos(data.data);
        } else {
          setError(data.error || 'Failed to load videos');
        }
      } catch (error) {
        setError('Failed to load videos');
      } finally {
        setLoading(false);
      }
    };
    if (user?.role === 'athlete') {
      fetchVideos();
    }
  }, [user, athletes]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Support: Injury Prevention Videos</h1>
      {loading ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">Loading videos...</h3>
        </div>
      ) : error ? (
        <div className="text-red-600 bg-red-50 p-3 rounded-lg">{error}</div>
      ) : videos.length === 0 ? (
        <div className="text-center py-12 bg-white rounded-xl shadow-md">
          <h3 className="text-xl font-semibold text-gray-700 mb-2">No videos available</h3>
          <p className="text-gray-500">Your coach hasn&apos;t added any precaution videos yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {videos.map(video => (
            <div key={video._id} className="bg-white rounded-xl shadow-md overflow-hidden">
              <div className="relative pb-[56.25%] h-0">
                <iframe
                  className="absolute top-0 left-0 w-full h-full"
                  src={`https://www.youtube.com/embed/${video.videoId}`}
                  title="YouTube video player"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="p-4">
                <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
                <p className="text-sm text-gray-500">Added by: {video.coach?.name}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
