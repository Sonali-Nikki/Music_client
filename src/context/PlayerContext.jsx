import { createContext, useContext, useEffect, useRef, useState } from "react";
import { saveRecentlyPlayed } from "../api/recent.js";

const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const [currentTrack, setCurrentTrack] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);

const playTrack = async (track) => {
  if (!track) return;

  if (currentTrack?.id !== track.id) {
    audioRef.current.src = track.audio_url;
    audioRef.current.currentTime = track.startTime || 0;
    setCurrentTrack(track);
  }

  await audioRef.current.play();
  setIsPlaying(true);
};

  const togglePlay = async () => {
    if (!currentTrack) return;
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      await audioRef.current.play();
      setIsPlaying(true);
    }
  };

  const seek = (value) => {
    audioRef.current.currentTime = value;
    setProgress(value);
  };

  // Track time
  useEffect(() => {
    const audio = audioRef.current;

    const updateTime = () => setProgress(audio.currentTime);
    const setMeta = () => setDuration(audio.duration || 0);

    audio.addEventListener("timeupdate", updateTime);
    audio.addEventListener("loadedmetadata", setMeta);

    return () => {
      audio.removeEventListener("timeupdate", updateTime);
      audio.removeEventListener("loadedmetadata", setMeta);
    };
  }, []);

  // Save progress when paused or changed
  useEffect(() => {
    return () => {
      if (currentTrack) {
        saveRecentlyPlayed(currentTrack.id, progress);
      }
    };
  }, [currentTrack, progress]);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        isPlaying,
        playTrack,
        togglePlay,
        progress,
        duration,
        seek,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
