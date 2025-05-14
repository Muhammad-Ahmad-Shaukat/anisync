import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { io } from 'socket.io-client';
import '../../components/VideoSComponent/VideoPlayer.css';

const socket = io('http://localhost:5000');

const WatchTogether = () => {
  const { animeId } = useParams();
  const navigate = useNavigate();
  const videoRef = useRef(null);
  const location = useLocation();
  const [episodes, setEpisodes] = useState([]);
  const [selectedEpisode, setSelectedEpisode] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [loadingEpisodes, setLoadingEpisodes] = useState(true);
  const [errorEpisodes, setErrorEpisodes] = useState(null);
  const [loadingVideo, setLoadingVideo] = useState(false);
  const [errorVideo, setErrorVideo] = useState(null);
  const [isHost, setIsHost] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    const hostState = location.state?.host === true;
    const hostStorage = sessionStorage.getItem('isHost') === 'true';
    setIsHost(hostState || hostStorage);
  }, [location]);

  useEffect(() => {
    const hostFlag = sessionStorage.getItem('isHost') === 'true';
    setIsHost(hostFlag);

    socket.emit('join-room', { roomId: animeId, isHost: hostFlag });

    if (!hostFlag) {
      socket.emit('request-sync', { roomId: animeId });
    }

    const handleSyncVideo = (event) => {
      const video = videoRef.current;
      if (!video) return;

      switch (event.type) {
        case 'play':
          video.play().catch(e => console.error('Play failed:', e));
          setIsPlaying(true);
          break;
        case 'pause':
          video.pause();
          setIsPlaying(false);
          break;
        case 'seek':
          video.currentTime = event.time;
          break;
        default:
          break;
      }
    };

    const handleSyncEpisode = (episode) => {
      setSelectedEpisode(episode);
    };

    const handleSyncStatus = (status) => {
      const video = videoRef.current;
      if (!video) return;
      
      setSelectedEpisode(status.episode);
      setTimeout(() => {
        video.currentTime = status.time;
        if (status.isPlaying) {
          video.play().catch(e => console.error('Play failed:', e));
          setIsPlaying(true);
        } else {
          video.pause();
          setIsPlaying(false);
        }
      }, 500);
    };

    const handleSessionEnded = () => {
      alert('The host has ended the session.');
      navigate('/');
    };

    socket.on('sync-video', handleSyncVideo);
    socket.on('sync-episode', handleSyncEpisode);
    socket.on('sync-status', handleSyncStatus);
    socket.on('session-ended', handleSessionEnded);

    return () => {
      socket.off('sync-video', handleSyncVideo);
      socket.off('sync-episode', handleSyncEpisode);
      socket.off('sync-status', handleSyncStatus);
      socket.off('session-ended', handleSessionEnded);
      socket.emit('leave-room', { roomId: animeId });
    };
  }, [animeId, navigate]);

  useEffect(() => {
    const fetchEpisodes = async () => {
      if (!animeId) {
        setErrorEpisodes('Anime ID not provided.');
        setLoadingEpisodes(false);
        return;
      }

      setLoadingEpisodes(true);
      setErrorEpisodes(null);

      try {
        const response = await fetch('http://localhost:5000/api/auth/fetchepisodes', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ animeId }),
        });

        const data = await response.json();

        if (!response.ok) {
          throw new Error(data.message || 'Failed to fetch episodes.');
        }

        setEpisodes(data.episodes || []);
        setSelectedEpisode(data.episodes?.[0] || null);
      } catch (err) {
        setErrorEpisodes(err.message);
      } finally {
        setLoadingEpisodes(false);
      }
    };

    fetchEpisodes();
  }, [animeId]);

  useEffect(() => {
    const fetchVideoUrl = async () => {
      if (!selectedEpisode || !selectedEpisode.videoName) {
        setErrorVideo('No video source found for this episode.');
        return;
      }

      setLoadingVideo(true);
      setErrorVideo(null);

      try {
        const key = encodeURIComponent(selectedEpisode.videoName);
        const streamUrl = `http://localhost:5000/api/auth/video-stream?url=${key}`;
        setVideoUrl(streamUrl);
      } catch (error) {
        console.error('Error fetching video URL:', error);
        setErrorVideo('Could not load video.');
      } finally {
        setLoadingVideo(false);
      }
    };

    fetchVideoUrl();
  }, [selectedEpisode]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !selectedEpisode) return;

    const savedTime = localStorage.getItem(`progress-${selectedEpisode.id}`);
    if (savedTime) video.currentTime = parseFloat(savedTime);

    const saveProgress = () => {
      localStorage.setItem(`progress-${selectedEpisode.id}`, video.currentTime.toString());
    };

    video.addEventListener('timeupdate', saveProgress);
    return () => video.removeEventListener('timeupdate', saveProgress);
  }, [videoUrl, selectedEpisode]);

  // Handle episode ending
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleEnded = () => {
      const index = episodes.findIndex((ep) => ep.id === selectedEpisode?.id);
      const next = episodes[index + 1];
      if (next) {
        setSelectedEpisode(next);
        if (isHost) {
          socket.emit('change-episode', { roomId: animeId, episode: next });
        }
      }
    };

    video.addEventListener('ended', handleEnded);
    return () => video.removeEventListener('ended', handleEnded);
  }, [episodes, selectedEpisode, isHost, animeId]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT') return; 
      switch (e.key.toLowerCase()) {
        case 'arrowright':
          handleSkip(10);
          break;
        case 'arrowleft':
          handleSkip(-10);
          break;
        case 'f':
          handleFullscreen();
          break;
        case 'i':
          handlePiP();
          break;
        case ' ':
          e.preventDefault();
          togglePlayPause();
          break;
        case 'k':
          e.preventDefault();
          togglePlayPause();
          break;
        default:
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !isHost) return;

    const handlePlayEvent = () => handlePlay();
    const handlePauseEvent = () => handlePause();

    video.addEventListener('play', handlePlayEvent);
    video.addEventListener('pause', handlePauseEvent);

    return () => {
      video.removeEventListener('play', handlePlayEvent);
      video.removeEventListener('pause', handlePauseEvent);
    };
  }, [isHost]);

  const handleEpisodeClick = useCallback(
    (episode) => {
      setSelectedEpisode(episode);
      if (isHost) {
        socket.emit('change-episode', { roomId: animeId, episode });
      }
    },
    [animeId, isHost]
  );

  const handleSkip = (seconds) => {
    const video = videoRef.current;
    if (video) {
      video.currentTime += seconds;
      if (isHost) {
        socket.emit('video-event', {
          roomId: animeId,
          event: { type: 'seek', time: video.currentTime },
        });
      }
    }
  };

  const handleFullscreen = () => {
    const video = videoRef.current;
    if (!video) return;

    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      video.requestFullscreen().catch(err => {
        console.error('Fullscreen error:', err);
      });
    }
  };

  const handlePiP = async () => {
    try {
      if (document.pictureInPictureElement) {
        await document.exitPictureInPicture();
      } else if (videoRef.current) {
        await videoRef.current.requestPictureInPicture();
      }
    } catch (e) {
      console.error('PiP error', e);
    }
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => {
        if (isHost) handlePlay();
      }).catch(e => console.error('Play failed:', e));
    } else {
      video.pause();
      if (isHost) handlePause();
    }
  };

  const handlePlay = useCallback(() => {
    const video = videoRef.current;
    if (isHost && video) {
      socket.emit('video-event', {
        roomId: animeId,
        event: { type: 'play', time: video.currentTime },
      });
      setIsPlaying(true);
    }
  }, [isHost, animeId]);

  const handlePause = useCallback(() => {
    const video = videoRef.current;
    if (isHost && video) {
      socket.emit('video-event', {
        roomId: animeId,
        event: { type: 'pause', time: video.currentTime },
      });
      setIsPlaying(false);
    }
  }, [isHost, animeId]);

  const handleEndSession = () => {
    if (isHost) {
      socket.emit('cancel-session', { roomId: animeId });
    }
  };

  return (
    <div className="video-episode-container">
      <div className="episodes-list">
        {loadingEpisodes ? (
          <div className="loading-screen">Loading episodes...</div>
        ) : errorEpisodes ? (
          <div className="error-screen">{errorEpisodes}</div>
        ) : episodes.length === 0 ? (
          <div className="error-screen">No episodes found.</div>
        ) : (
          episodes.map((episode) => (
            <div
              key={episode.id}
              className={`episode-item ${selectedEpisode?.id === episode.id ? "active" : ""}`}
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
          <div className="player-wrapper">
            <video 
              ref={videoRef} 
              src={videoUrl} 
              controls 
              className="video-player"
              onClick={togglePlayPause}
            />
            <div className="custom-controls">
              <button onClick={() => handleSkip(-10)}>⏪ 10s</button>
              <button onClick={togglePlayPause}>
                {isPlaying ? '⏸ Pause' : '▶ Play'}
              </button>
              <button onClick={handleFullscreen}>⛶ Fullscreen (F)</button>
              <button onClick={handlePiP}>📺 Mini (I)</button>
              <button onClick={() => handleSkip(10)}>10s ⏩</button>
              {isHost && (
                <button onClick={handleEndSession} className="end-session-btn">
                  End Session
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default WatchTogether;