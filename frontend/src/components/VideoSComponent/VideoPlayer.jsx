import React, { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import "./VideoPlayer.css";

const VideoPlayer = () => {
  // State for episodes (replace dummy API call with your real API if needed)
  const [episodes, setEpisodes] = useState([]);
  // Selected episode object
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  // Video URL blob (fetched from API)
  const [videoUrl, setVideoUrl] = useState(null);
  // Loading and error states for episodes and video
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);
  const [errorEpisodes, setErrorEpisodes] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [errorVideo, setErrorVideo] = useState(null);

  const videoRef = useRef(null);
  const location = useLocation();

  // Fetch the list of episodes from your API (dummy data is used here for illustration)
  useEffect(() => {
    const fetchEpisodes = async () => {
      setLoadingEpisodes(true);
      setErrorEpisodes(null);
      try {
        // Replace this dummy data with an actual API call.
        const dummyEpisodes = [
          { id: 1, title: "Episode 1: The Beginning", videoName: "episode1.mp4" },
          { id: 2, title: "Episode 2: The Continuation", videoName: "episode2.mp4" },
          { id: 3, title: "Episode 3: The Climax", videoName: "episode3.mp4" },
          { id: 4, title: "Episode 4: The Finale", videoName: "episode4.mp4" },
        ];
        setEpisodes(dummyEpisodes);
        // Automatically select the first episode
        setSelectedEpisode(dummyEpisodes[0]);
        fetchEpisodeVideo(dummyEpisodes[0]);
      } catch (err) {
        setErrorEpisodes("Failed to load episodes.");
      } finally {
        setLoadingEpisodes(false);
      }
    };

    fetchEpisodes();
  }, []);

  // Function to fetch video blob from API using a given episode's videoName
  const fetchEpisodeVideo = async (episode) => {
    setLoadingVideo(true);
    setErrorVideo(null);
    try {
      const response = await fetch(
        `http://localhost:5173/anime/Nobody`
      );
      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to load video: ${errorText}`);
      }
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      setVideoUrl(url);
    } catch (e) {
      setErrorVideo(e.message);
    } finally {
      setLoadingVideo(false);
    }
  };

  // When an episode is clicked, update the state and fetch its video
  const handleEpisodeClick = (episode) => {
    setSelectedEpisode(episode);
    fetchEpisodeVideo(episode);
  };

  // Standard video control functions
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
        await document.exitPictureInPicture();
      } else {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (e) {
      console.error("PiP error", e);
    }
  };

  // Keyboard shortcuts for video control
  useEffect(() => {
    const handleKeyDown = (e) => {
      const video = videoRef.current;
      if (!video) return;
      switch (e.key.toLowerCase()) {
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
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="video-episode-container">
      {/* Left Sidebar: Episodes List */}
      <div className="episodes-list">
        {loadingEpisodes ? (
          <div className="loading-screen">
            <div className="waves">
              <div className="wave wave1"></div>
              <div className="wave wave2"></div>
              <div className="wave wave3"></div>
            </div>
          </div>
        ) : errorEpisodes ? (
          <div className="error-screen">
            <p>{errorEpisodes}</p>
          </div>
        ) : (
          episodes.map((episode) => (
            <div
              key={episode.id}
              className={`episode-item ${
                selectedEpisode && selectedEpisode.id === episode.id ? "active" : ""
              }`}
              onClick={() => handleEpisodeClick(episode)}
            >
              <div className="episode-number">Episode {episode.id}</div>
              <div className="episode-title">{episode.title}</div>
            </div>
          ))
        )}
      </div>

      {/* Right Side: Video Player Area */}
      <div className="player-area">
        {loadingVideo ? (
          <div className="loading-screen">
            <div className="waves">
              <div className="wave wave1"></div>
              <div className="wave wave2"></div>
              <div className="wave wave3"></div>
            </div>
          </div>
        ) : errorVideo ? (
          <div className="error-screen">
            <p>Error: {errorVideo}</p>
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
    </div>
  );
};

export default VideoPlayer;
