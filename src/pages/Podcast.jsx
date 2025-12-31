import { useEffect, useState } from "react";
import { getPodcasts } from "../api/podcast.js";
import { Link } from "react-router-dom";

export default function Podcasts() {
  const [podcasts, setPodcasts] = useState([]);

  useEffect(() => {
    getPodcasts().then((res) => setPodcasts(res.data));
  }, []);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-6">Podcasts</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {podcasts.map((pod) => (
          <Link
            key={pod.id}
            to={`/podcasts/${pod.id}`}
            className="bg-zinc-900 hover:bg-zinc-800 p-3 rounded"
          >
            <img
              src={pod.cover_url}
              className="rounded mb-2"
            />
            <p className="font-medium">{pod.title}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
