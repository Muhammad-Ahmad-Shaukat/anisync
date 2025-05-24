import React, { useEffect, useRef, useState, useCallback } from "react";
import "./VideoPlayer.css";

import CommentSection from "../comments/CommentsSection";

const VideoPlayer = ({ anime }) => {
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState();
  const [videoUrl, setVideoUrl] = useState(null);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);
  const [errorEpisodes, setErrorEpisodes] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [errorVideo, setErrorVideo] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!anime || !anime._id) {
        setErrorEpisodes("Anime ID not provided.");
        setLoadingEpisodes(false);
        return;
      }

      setLoadingEpisodes(true);
      setErrorEpisodes(null);

      try {
        const response = await fetch("http://localhost:5000/api/auth/fetchepisodes", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ animeId: anime._id }),
        });

        const data = await response.json();
        if (!response.ok) {
          console.error("Error fetching episodes:", data); 
          throw new Error(data.message || "Failed to fetch episodes.");
        }

        setEpisodes(data.episodes || []);
        setSelectedEpisode(data.episodes?.[0] || null);
      } catch (err) {
        setErrorEpisodes(err.message);
      } finally {
        setLoadingEpisodes(false);
      }
    };

    console.log("Anime prop:", anime); 
    fetchEpisodes();
  }, [anime]);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      if (!selectedEpisode || !selectedEpisode.videoName) {
        setErrorVideo("No video source found for this episode.");
        return;
      }

      setLoadingVideo(true);
      setErrorVideo(null);

      try {
        const key = encodeURIComponent(selectedEpisode.videoName);
        const streamUrl = `http://localhost:5000/api/auth/video-stream?url=${key}`;
        setVideoUrl(streamUrl);
      } catch (error) {
        console.error("Error fetching video URL:", error);  
        setErrorVideo("Could not load video.");
      } finally {
        setLoadingVideo(false);
      }
    };

    console.log("Selected Episode:", selectedEpisode);  
    fetchVideoUrl();
  }, [selectedEpisode]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video || !selectedEpisode) return;

    const savedTime = localStorage.getItem(`progress-${selectedEpisode._id}`);
    if (savedTime) {
      video.currentTime = parseFloat(savedTime);
    }

    const saveProgress = () => {
      localStorage.setItem(`progress-${selectedEpisode._id}`, video.currentTime.toString());
    };

    video.addEventListener("timeupdate", saveProgress);
    return () => video.removeEventListener("timeupdate", saveProgress);
  }, [videoUrl, selectedEpisode]);
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      const index = episodes.findIndex((ep) => ep._id === selectedEpisode?._id);
      const next = episodes[index + 1];
      if (next) {
        setSelectedEpisode(next);
      }
    };

    video.addEventListener("ended", handleEnded);
    return () => video.removeEventListener("ended", handleEnded);
  }, [episodes, selectedEpisode]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      switch (e.key.toLowerCase()) {
        case "arrowright":
          handleSkip(10);
          break;
        case "arrowleft":
          handleSkip(-10);
          break;
        case "i":
          break;
        default:
          break;
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleEpisodeClick = useCallback((episode) => {
    setSelectedEpisode(episode);
  }, []);

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
      } else if (videoRef.current) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (e) {
      console.error("PiP error", e);
    }
  };

  return (
    <><div className="video-episode-container">
      <div className="episodes-list">
        {loadingEpisodes ? (
          <div className="loading-screen">Loading episodes...</div>
        ) : errorEpisodes ? (
          <div className="error-screen">{errorEpisodes}</div>
        ) : episodes.length === 0 ? (
          <div className="error-screen">No episodes found.</div>
        ) : (
          episodes.map((episode, index) => (
            <div
              key={episode._id || `episode-${index}`}
              className={`episode-item ${selectedEpisode?._id === episode._id ? "active" : ""}`}
              onClick={() => handleEpisodeClick(episode)}
            >
              <div className="episode-info">
                Episode {episode.episode_number} - {episode.title}
              </div>
            </div>
          ))
        )}
      </div>

      <div className="player-area">
        {loadingVideo ? (
          <div className="loading-screen">Loading video...</div>
        ) : errorVideo ? (
          <div className="error-screen">{errorVideo}</div>
        ) : (
          <>
            <div className="player-wrapper">
              <video ref={videoRef} src={videoUrl} controls className="video-player" />
              <div className="custom-controls">
                <button onClick={() => handleSkip(-10)}>⏪ 10s</button>
                <button onClick={handleFullscreen}>⛶ Fullscreen (F)</button>
                <button onClick={handlePiP}>📺 Mini (I)</button>
                <button onClick={() => handleSkip(10)}>10s ⏩</button>
              </div>
            </div>           
          </>
        )}
      </div>
      
    </div>
        <div className="Divcomments">
               {!loadingEpisodes && selectedEpisode && (
              <CommentSection key={selectedEpisode.id} anime = {anime} episodeId={selectedEpisode.id} />
            )}
            </div>
    </>
    
  );
};

export default VideoPlayer;
