import Sidebar from "./Sidebar.jsx";
import Player from "./Player.jsx";
export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="ml-60 flex-1 bg-black min-h-screen text-white p-6">
        {children}
      </main>
        <Player />
    </div>
  );
}
