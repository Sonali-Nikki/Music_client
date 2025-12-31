import api from "./axios";

export const getPlaylists = () => api.get("/playlists");

export const createPlaylist = (name) =>
  api.post("/playlists", { name });

export const getPlaylistById = (id) =>
  api.get(`/playlists/${id}`);

export const addTrackToPlaylist = (playlistId, trackId) =>
  api.post(`/playlists/${playlistId}/tracks`, { trackId });

export const removeTrackFromPlaylist = (playlistId, trackId) =>
  api.delete(`/playlists/${playlistId}/tracks/${trackId}`);
