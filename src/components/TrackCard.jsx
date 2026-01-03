import { useEffect, useState } from "react";
import { BASE_URL } from "../api/api.js";
import { addTrackToPlaylist, getPlaylists } from "../api/playlist.js";
import { usePlayer } from "../context/PlayerContext";

export default function TrackCard() {
  const [tracks, setTracks] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [selectedPlaylist, setSelectedPlaylist] = useState("");
  const { setCurrentTrack } = usePlayer();

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetch(`${BASE_URL}/songs`)
      .then((res) => res.json())
      .then(setTracks);
  }, []);

  useEffect(() => {
    if (!token) return;
    getPlaylists().then((res) => {
      setPlaylists(res.data);
      if (res.data.length) setSelectedPlaylist(res.data[0].id);
    });
  }, []);

  const handleAdd = async (track) => {
    if (!token) return alert("Login required");
    await addTrackToPlaylist(selectedPlaylist, track.id);
    alert("Track added to playlist");
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6">
      {tracks.map((track) => (
        <div key={track.id} className="bg-zinc-900 p-3 rounded">
          <img src={track.cover} className="rounded mb-2" />
          <h3 className="text-white">{track.title}</h3>
          <p className="text-gray-400">{track.artist}</p>

          <audio
            controls
            src={track.audio_url}
            className="w-full mt-2"
            onPlay={() => setCurrentTrack(track)}
          />

          {token && (
            <>
              <select
                className="w-full mt-2 p-1 rounded"
                value={selectedPlaylist}
                onChange={(e) => setSelectedPlaylist(e.target.value)}
              >
                {playlists.map((pl) => (
                  <option key={pl.id} value={pl.id}>
                    {pl.name}
                  </option>
                ))}
              </select>

              <button
                onClick={() => handleAdd(track)}
                className="text-green-400 mt-2 text-sm"
              >
                + Add to Playlist
              </button>
            </>
          )}
        </div>
      ))}
    </div>
  );
}
