import React, { useEffect, useState } from "react";

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      setError(null);
  
      try {
        const videoName = "abc.mp4";
        const response = await fetch(`http://localhost:5000/api/auth/video-stream?name=${encodeURIComponent(videoName)}`, {
          method: "GET",
        });
  
        if (!response.ok) {
          const errorText = await response.text();
          throw new Error(`Failed to load video: ${errorText}`);
        }
  
        const blob = await response.blob();
        const url = URL.createObjectURL(blob);
        setVideoUrl(url);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
  
    fetchVideo();
  }, []);
  

  return (
    <div className="video-container">
      <h2>Watch Video</h2>
      {loading && <p>Loading video...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {videoUrl && (
        <video
          controls
          width="640"
          height="360"
          src={videoUrl}
          style={{ borderRadius: "8px", boxShadow: "0 0 10px rgba(0,0,0,0.2)" }}
        />
      )}
    </div>
  );
};

export default VideoPlayer;
