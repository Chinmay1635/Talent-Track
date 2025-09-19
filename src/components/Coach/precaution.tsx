import { useState } from 'react';

interface Video {
  id: string;
  title: string;
  url: string;
}

export default function YouTubeEmbedder() {
  const [videos, setVideos] = useState<Video[]>([]);
  const [videoUrl, setVideoUrl] = useState('');
  const [videoTitle, setVideoTitle] = useState('');
  const [error, setError] = useState('');

  // Extract YouTube video ID from URL
  const getYouTubeId = (url: string): string | null => {
    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return (match && match[2].length === 11) ? match[2] : null;
  };

  const handleAddVideo = () => {
    setError('');
    
    if (!videoUrl) {
      setError('Please enter a YouTube URL');
      return;
    }

    if (!videoTitle) {
      setError('Please enter a video title');
      return;
    }

    const videoId = getYouTubeId(videoUrl);
    
    if (!videoId) {
      setError('Please enter a valid YouTube URL');
      return;
    }

    // Check if video already exists
    if (videos.some(video => video.id === videoId)) {
      setError('This video has already been added');
      return;
    }

    const newVideo: Video = {
      id: videoId,
      title: videoTitle,
      url: videoUrl
    };

    setVideos([...videos, newVideo]);
    setVideoUrl('');
    setVideoTitle('');
  };

  const handleRemoveVideo = (id: string) => {
    setVideos(videos.filter(video => video.id !== id));
  };

  const handleClearAll = () => {
    setVideos([]);
    setError('');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-3">Prevention Video </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Add YouTube videos with custom titles to create a collection of embedded videos.
          </p>
        </header>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <h2 className="text-xl font-semibold mb-4">Add YouTube Videos</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div>
              <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-700 mb-1">
                YouTube URL *
              </label>
              <input
                type="text"
                id="videoUrl"
                placeholder="Paste YouTube URL here..."
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
            
            <div>
              <label htmlFor="videoTitle" className="block text-sm font-medium text-gray-700 mb-1">
                Video Title *
              </label>
              <input
                type="text"
                id="videoTitle"
                placeholder="Enter a title for this video..."
                value={videoTitle}
                onChange={(e) => setVideoTitle(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 mb-4">
            <button
              onClick={handleAddVideo}
              disabled={!videoUrl || !videoTitle}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Add Video
            </button>
            {videos.length > 0 && (
              <button
                onClick={handleClearAll}
                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
              >
                Clear All
              </button>
            )}
          </div>

          {error && (
            <div className="text-red-600 bg-red-50 p-3 rounded-lg">
              {error}
            </div>
          )}

          <p className="text-sm text-gray-500 mt-4">
            Example URL: https://www.youtube.com/watch?v=dQw4w9WgXcQ
          </p>
        </div>

        {videos.length > 0 ? (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              {videos.map(video => (
                <div key={video.id} className="bg-white rounded-xl shadow-md overflow-hidden">
                  <div className="relative pb-[56.25%] h-0">
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title="YouTube video player"
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    ></iframe>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-lg mb-2 line-clamp-2">{video.title}</h3>
                    <button
                      onClick={() => handleRemoveVideo(video.id)}
                      className="text-red-600 hover:text-red-800 text-sm font-medium"
                    >
                      Remove Video
                    </button>
                  </div>
                </div>
              ))}
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-xl font-semibold mb-4">Injury Prevention Video Suggestions</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-medium text-lg text-blue-800 mb-2">Warm-up & Stretching</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Dynamic stretching routines</li>
                    <li>Pre-workout warm-up exercises</li>
                    <li>Sport-specific warm-ups</li>
                  </ul>
                </div>
                <div>
                  <h3 className="font-medium text-lg text-blue-800 mb-2">Strength & Conditioning</h3>
                  <ul className="list-disc pl-5 space-y-1">
                    <li>Core strengthening exercises</li>
                    <li>Balance and stability training</li>
                    <li>Proper lifting techniques</li>
                  </ul>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="text-center py-12 bg-white rounded-xl shadow-md">
            <svg className="w-16 h-16 text-gray-400 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"></path>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <h3 className="text-xl font-semibold text-gray-700 mb-2">No videos added yet</h3>
            <p className="text-gray-500">Add a YouTube URL and title above to get started</p>
          </div>
        )}

      </div>

      <style jsx global>{`
        body {
          margin: 0;
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </div>
  );
}