import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  const [videoUrl, setVideoUrl] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const videoRef = useRef();
  const location = useLocation();

  // Optional: Extract video name from URL like /video/abc
  // const pathParts = location.pathname.split("/");
  // const videoNameFromUrl = pathParts[pathParts.length - 1];
  // const videoName = `${videoNameFromUrl}.mp4`;

  // Hardcoded for now:
  const videoName = "abc.mp4";

  useEffect(() => {
    const fetchVideo = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:5000/api/auth/video-stream?name=${encodeURIComponent(videoName)}`
        );
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
  }, [videoName]);

  const handleSkip = (seconds) => {
    const video = videoRef.current;
    if (video) video.currentTime += seconds;
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (video.requestFullscreen) video.requestFullscreen();
  };

  const handlePiP = async () => {
    try {
      if (document.pictureInPictureElement) {
        document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (e) {
      console.error("PiP error", e);
    }
  };

  const handleKeyDown = (e) => {
    const video = videoRef.current;
    if (!video) return;

    switch (e.key.toLowerCase()) {
      case "k":
        video.paused ? video.play() : video.pause();
        break;
      case "m":
        video.muted = !video.muted;
        break;
      case "arrowright":
        handleSkip(10);
        break;
      case "arrowleft":
        handleSkip(-10);
        break;
      case "f":
        handleFullscreen();
        break;
      case "i":
        handlePiP();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="video-container">
      {loading ? (
        <div className="loading-screen">
          <div className="waves">
            <div className="wave wave1"></div>
            <div className="wave wave2"></div>
            <div className="wave wave3"></div>
          </div>
        </div>
      ) : error ? (
        <div className="error-screen">
          <p>Error: {error}</p>
        </div>
      ) : (
        <div className="player-wrapper">
          <video ref={videoRef} src={videoUrl} controls className="video-player" />
          <div className="custom-controls">
            <button onClick={() => handleSkip(-10)}>⏪ 10s</button>
            <button onClick={handleFullscreen}>⛶ Fullscreen (F)</button>
            <button onClick={handlePiP}>📺 Mini (I)</button>
            <button onClick={() => handleSkip(10)}>10s ⏩</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VideoPlayer;