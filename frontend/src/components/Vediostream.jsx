import React, { useState, useEffect } from 'react';

function VideoStream({ apiUrl }) {
  const [videoUrl, setVideoUrl] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchVideoUrl = async () => {
      setError(''); 
      setVideoUrl(''); 
      try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

       
        if (data && data.videoUrl) {
          setVideoUrl(data.videoUrl);
        } else {
          setError('Invalid API response: "videoUrl" not found.');
        }
      } catch (error) {
        console.error('Error fetching video URL:', error);
        setError('Failed to load video.');
      }
    };

    fetchVideoUrl();
  }, [apiUrl]);

  return (
    <div className="video-stream-container">
      {error && <div className="error-message">{error}</div>}
      {videoUrl && (
        <div className="video-player">
          <video src={videoUrl} controls width="100%" height="auto"></video>
        </div>
      )}
      {!videoUrl && !error && <div>Loading video...</div>}
    </div>
  );
}

export default VideoStream;