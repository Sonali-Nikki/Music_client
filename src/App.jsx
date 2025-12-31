import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Playlists from "./pages/Playlist";
import PlaylistDetail from "./pages/PlaylistDetail";
import Layout from "./components/Layout";
import Liked from "./pages/Liked";
import RecentlyPlayed from "./pages/RecentlyPlayed";
import Search from "./pages/Search";
import AdminRoute from "./components/AdminRoutes";
import AdminUpload from "./pages/AdminUpload";
import Podcasts from "./pages/Podcast";
import PodcastDetail from "./pages/PodcastDetail";

export default function App() {
  return (
    <div className="min-h-screen bg-blue text-white">
      <Routes>
        <Route
          path="/"
          element={
            <Layout>
              <Home />
            </Layout>
          }
        />
        <Route
          path="/playlists"
          element={
            <Layout>
              <Playlists />
            </Layout>
          }
        />

        <Route
          path="/playlists/:id"
          element={
            <Layout>
              <PlaylistDetail />
            </Layout>
          }
        />
        <Route
          path="/liked"
          element={
            <Layout>
              <Liked />
            </Layout>
          }
        />

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <AdminUpload />
            </AdminRoute>
          }
        />

        <Route
          path="/recent"
          element={
            <Layout>
              <RecentlyPlayed />
            </Layout>
          }
        />
        <Route
          path="/search"
          element={
            <Layout>
              <Search />
            </Layout>
          }
        />
        <Route
          path="/podcasts"
          element={
            <Layout>
              <Podcasts />
            </Layout>
          }
        />
        <Route
          path="/podcasts/:id"
          element={
            <Layout>
              <PodcastDetail />
            </Layout>
          }
        />
      </Routes>
    </div>
  );
}
