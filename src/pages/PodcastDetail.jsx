import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getPodcastById } from "../api/podcast.js";
import { usePlayer } from "../context/PlayerContext";

export default function PodcastDetail() {
  const { id } = useParams();
  const [podcast, setPodcast] = useState(null);
  const { playTrack } = usePlayer();

  useEffect(() => {
    getPodcastById(id).then((res) => setPodcast(res.data));
  }, [id]);

  if (!podcast) return null;

  return (
    <div>
      <div className="flex gap-6 mb-6">
        <img
          src={podcast.cover_url}
          className="w-40 h-40 rounded"
        />
        <div>
          <h1 className="text-3xl font-bold">{podcast.title}</h1>
          <p className="text-zinc-400 mt-2">
            {podcast.description}
          </p>
        </div>
      </div>

      <h2 className="text-xl font-semibold mb-4">Episodes</h2>

      <div className="space-y-3">
        {podcast.episodes.map((ep) => (
          <div
            key={ep.id}
            onClick={() =>
              playTrack({
                ...ep,
                cover_url: podcast.cover_url,
                artist: podcast.title,
              })
            }
            className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 p-3 rounded cursor-pointer"
          >
            <div className="flex-1">
              <p className="font-medium">{ep.title}</p>
              <p className="text-sm text-zinc-400">
                {Math.floor(ep.duration / 60)} min
              </p>
            </div>
            <span>▶️</span>
          </div>
        ))}
      </div>
    </div>
  );
}
