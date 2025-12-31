import { usePlayer } from "../context/PlayerContext";
import { addTrackToPlaylist } from "../api/playlist.js";

export default function TrackCard({ track }) {
  const addToPlaylist = async (playlistId) => {
    await addTrackToPlaylist(playlistId, track.id);
  };

  return (
    <div className="bg-zinc-900 p-3 rounded">
      {/* existing UI */}

      <button
        onClick={() => addToPlaylist("PLAYLIST_ID")}
        className="text-sm text-green-400 mt-2"
      >
        + Add to Playlist
      </button>
    </div>
  );
}

