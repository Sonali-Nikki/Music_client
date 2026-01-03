import api from "./axios.js";
import { BASE_URL } from "./api.JS";


// helper to get token
const getToken = () => localStorage.getItem("token");


//GET all playlists
export const getPlaylists = async () => {
  const res = await api.get("/playlists");
  return res.data;
};

// CREATE playlist
export const createPlaylist = async (name) => {
  const res = await api.post("/playlists", { name });
  return res.data;
};

// GET playlist by ID
export const getPlaylistById = async (id) => {
  const res = await api.get(`/playlists/${id}`);
  return res.data;
};

// ADD track to playlist
export const addTrackToPlaylist = async (playlistId, trackId) => {
  const res = await api.post(
    `/playlists/${playlistId}/tracks`,
    { trackId }
  );
  return res.data;
};

// REMOVE track from playlist
export const removeTrackFromPlaylist = async (playlistId, trackId) => {
  const res = await api.delete(
    `/playlists/${playlistId}/tracks/${trackId}`
  );
  return res.data;
};
