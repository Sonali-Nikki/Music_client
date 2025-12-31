import { NavLink } from "react-router-dom";

const navItem =
  "flex items-center gap-3 px-4 py-2 rounded-md text-sm font-medium transition";
const activeItem = "bg-zinc-800 text-white";
const inactiveItem = "text-zinc-400 hover:text-white hover:bg-zinc-800";

export default function Sidebar() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <aside className="w-60 bg-zinc-900 h-screen fixed left-0 top-0 p-4">
      {/* Logo */}
      <h1 className="text-white text-xl font-bold mb-6">🎵 Musicify</h1>

      {/* Navigation */}
      <nav className="flex flex-col gap-2">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeItem : inactiveItem}`
          }
        >
          🏠 Home
        </NavLink>

        <NavLink
          to="/playlists"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeItem : inactiveItem}`
          }
        >
          📚 Playlists
        </NavLink>

        <NavLink
          to="/liked"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeItem : inactiveItem}`
          }
        >
          ❤️ Liked Songs
        </NavLink>

        <NavLink
          to="/search"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeItem : inactiveItem}`
          }
        >
          🔍 Search
        </NavLink>

        <NavLink
          to="/recent"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeItem : inactiveItem}`
          }
        >
          🕒 Recently Played
        </NavLink>

        <NavLink
          to="/podcasts"
          className={({ isActive }) =>
            `${navItem} ${isActive ? activeItem : inactiveItem}`
          }
        >
          🎙 Podcasts
        </NavLink>
      </nav>

      {/* ADMIN ONLY */}
      {user?.role === "admin" && (
        <NavLink to="/admin" className="block text-green-400">
          ⬆️ Upload
        </NavLink>
      )}
    </aside>
  );
}
