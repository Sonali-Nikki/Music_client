import { useEffect, useState } from "react";
import { getRecentlyPlayed } from "../api/recent.js";
import { usePlayer } from "../context/PlayerContext.jsx";

export default function RecentlyPlayed() {
  const [tracks, setTracks] = useState([]);
  const { playTrack } = usePlayer();

  useEffect(() => {
    getRecentlyPlayed().then((res) => {
      setTracks(res.data);
    });
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Recently Played</h1>

      {tracks.length === 0 && (
        <p className="text-zinc-400">No recently played tracks</p>
      )}

      <div className="space-y-3">
        {tracks.map((item) => (
          <div
            key={item.id}
            onClick={() =>
              playTrack({
                ...item.track,
                startTime: item.last_position,
              })
            }
            className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 p-3 rounded cursor-pointer"
          >
            <img
              src={item.track.cover_url}
              className="w-14 h-14 rounded"
            />

            <div className="flex-1">
              <p className="font-medium">{item.track.title}</p>
              <p className="text-sm text-zinc-400">
                {item.track.artist}
              </p>
            </div>

            <span className="text-xs text-zinc-400">
              {Math.floor(item.last_position)} sec
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
