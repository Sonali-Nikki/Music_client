import { useEffect, useState } from "react";
import { getLikedTracks, unlikeTrack } from "../api/liked.js";
import { usePlayer } from "../context/PlayerContext";

export default function Liked() {
  const [tracks, setTracks] = useState([]);
  const { playTrack } = usePlayer();

  const loadLiked = async () => {
    const res = await getLikedTracks();
    setTracks(res.data);
  };

  const handleUnlike = async (id) => {
    await unlikeTrack(id);
    loadLiked();
  };

  useEffect(() => {
    loadLiked();
  }, []);

  if (!tracks.length) {
    return (
      <div className="text-center text-zinc-400 mt-20">
        No liked songs yet 💔
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Liked Songs</h1>

      <div className="space-y-3">
        {tracks.map((track, index) => (
          <div
            key={track.id}
            className="flex items-center justify-between bg-zinc-900 p-3 rounded hover:bg-zinc-800"
          >
            <div
              className="flex items-center gap-4 cursor-pointer"
              onClick={() => playTrack(track)}
            >
              <span className="text-zinc-400 w-6">{index + 1}</span>
              <img
                src={track.cover_url}
                className="w-12 h-12 rounded"
              />
              <div>
                <p className="font-medium">{track.title}</p>
                <p className="text-sm text-zinc-400">
                  {track.artist}
                </p>
              </div>
            </div>

            <button
              onClick={() => handleUnlike(track.id)}
              className="text-red-400 hover:text-red-500"
            >
              ❌
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
