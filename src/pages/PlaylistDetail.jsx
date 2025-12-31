import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPlaylistById, removeTrackFromPlaylist } from "../api/playlist.js";
import { usePlayer } from "../context/PlayerContext.jsx";

export default function PlaylistDetail() {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const { playTrack } = usePlayer();

  const loadPlaylist = async () => {
    const res = await getPlaylistById(id);
    setPlaylist(res.data);
  };

  const removeTrack = async (trackId) => {
    await removeTrackFromPlaylist(id, trackId);
    loadPlaylist();
  };

  useEffect(() => {
    loadPlaylist();
  }, []);

  if (!playlist) return null;

  return (
    <div className="p-6">
      <h1 className="text-2xl text-white mb-6">{playlist.name}</h1>

      {playlist.tracks.map((track) => (
        <div
          key={track.id}
          className="flex items-center justify-between bg-zinc-900 p-3 rounded mb-2"
        >
          <div
            onClick={() => playTrack(track)}
            className="cursor-pointer"
          >
            <p className="text-white">{track.title}</p>
            <p className="text-gray-400 text-sm">{track.artist}</p>
          </div>

          <button
            onClick={() => removeTrack(track.id)}
            className="text-red-400"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}
