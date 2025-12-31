import { useEffect, useState } from "react";
import { searchAll } from "../api/search.js";
import useDebounce from "../hooks/useDebounce.js";
import { usePlayer } from "../context/PlayerContext.jsx";

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState({ tracks: [], podcasts: [] });
  const debouncedQuery = useDebounce(query);
  const { playTrack } = usePlayer();

  useEffect(() => {
    if (!debouncedQuery) {
      setResults({ tracks: [], podcasts: [] });
      return;
    }

    searchAll(debouncedQuery).then((res) => {
      setResults(res.data);
    });
  }, [debouncedQuery]);

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4">Search</h1>

      <input
        type="text"
        placeholder="Search songs or podcasts..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full bg-zinc-900 p-3 rounded mb-6 outline-none"
      />

      {/* Tracks */}
      {results.tracks.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-3">Songs</h2>
          <div className="space-y-3 mb-6">
            {results.tracks.map((track) => (
              <div
                key={track.id}
                onClick={() => playTrack(track)}
                className="flex items-center gap-4 bg-zinc-900 hover:bg-zinc-800 p-3 rounded cursor-pointer"
              >
                <img src={track.cover_url} className="w-12 h-12 rounded" />
                <div>
                  <p className="font-medium">{track.title}</p>
                  <p className="text-sm text-zinc-400">{track.artist}</p>
                </div>
              </div>
            ))}
          </div>
        </>
      )}

      {/* Podcasts */}
      {results.podcasts.length > 0 && (
        <>
          <h2 className="text-lg font-semibold mb-3">Podcasts</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {results.podcasts.map((pod) => (
              <div
                key={pod.id}
                className="bg-zinc-900 hover:bg-zinc-800 p-3 rounded cursor-pointer"
              >
                <img src={pod.cover_url} className="rounded mb-2" />
                <p className="font-medium">{pod.title}</p>
              </div>
            ))}
          </div>
        </>
      )}

      {debouncedQuery &&
        results.tracks.length === 0 &&
        results.podcasts.length === 0 && (
          <p className="text-zinc-400">No results found</p>
        )}
    </div>
  );
}
