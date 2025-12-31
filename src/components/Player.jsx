import { usePlayer } from "../context/PlayerContext.jsx";

export default function Player() {
  const {
    currentTrack,
    isPlaying,
    togglePlay,
    progress,
    duration,
    seek,
  } = usePlayer();

  if (!currentTrack) return null;

  return (
    <div className="fixed bottom-0 left-60 right-0 bg-zinc-900 border-t border-zinc-800 p-3">
      <div className="flex items-center gap-4">
        {/* Track Info */}
        <img
          src={currentTrack.cover_url}
          className="w-12 h-12 rounded"
        />
        <div className="flex-1">
          <p className="font-medium">{currentTrack.title}</p>
          <p className="text-sm text-zinc-400">
            {currentTrack.artist}
          </p>
        </div>

        {/* Controls */}
        <button
          onClick={togglePlay}
          className="text-white text-xl"
        >
          {isPlaying ? "⏸" : "▶️"}
        </button>
      </div>

      {/* Seek Bar */}
      <input
        type="range"
        min="0"
        max={duration || 0}
        value={progress}
        onChange={(e) => seek(e.target.value)}
        className="w-full mt-2"
      />
    </div>
  );
}
