import { useEffect, useState } from "react";
import { getTracks } from "../api/track.js";
import TrackCard from "../components/TrackCard.jsx";

export default function Home() {
  const [tracks, setTracks] = useState([]);

  useEffect(() => {
    getTracks().then((res) => setTracks(res.data));
  }, []);

  return (
    <div className="p-4 grid grid-cols-2 md:grid-cols-4 gap-4">
      <h1 className="text-3xl font-bold">Home</h1>
      <p className="text-zinc-400 mt-2">
        Welcome to your music streaming app 🎧
      </p>
      {tracks.map((track) => (
        <TrackCard key={track.id} track={track} />
      ))}
    </div>
  );
}
