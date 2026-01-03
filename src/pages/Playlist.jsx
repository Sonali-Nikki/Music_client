import { useEffect, useState } from "react";
import { createPlaylist, getPlaylists } from "../api/playlist.js";
import { Link } from "react-router-dom";

export default function Playlists() {
  const [playlists, setPlaylists] = useState([]);
  const [name, setName] = useState("");

  const token = localStorage.getItem("token");

  const loadPlaylists = async () => {
    try {
      const res = await getPlaylists();
      setPlaylists(res.data);
    } catch (err) {
      console.error(err);
      alert("Please login again");
    }
  };

  const handleCreate = async () => {
    if (!name) return;
    await createPlaylist(name);
    setName("");
    loadPlaylists();
  };

  useEffect(() => {
    if (token) loadPlaylists();
  }, []);

  if (!token) {
    return (
      <p className="p-6 text-white">
        Please login to view playlists
      </p>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-xl text-white mb-4">Your Playlists</h1>

      <div className="flex gap-2 mb-6">
        <input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Playlist name"
          className="bg-zinc-800 p-2 rounded text-white"
        />
        <button
          onClick={handleCreate}
          className="bg-green-500 px-4 rounded"
        >
          Create
        </button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {playlists.map((pl) => (
          <Link
            key={pl.id}
            to={`/playlists/${pl.id}`}
            className="bg-zinc-900 p-4 rounded hover:bg-zinc-800"
          >
            <h3 className="text-white">{pl.name}</h3>
            <p className="text-gray-400 text-sm">
              {pl.tracks_count || 0} tracks
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}
