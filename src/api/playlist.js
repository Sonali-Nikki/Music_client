import api from "./axios";
import { BASE_URL } from "./api";


// helper to get token
const getToken = () => localStorage.getItem("token");

export const getPlaylists = async () => {
  return axios.get(`${BASE_URL}/playlists`, {
    headers: {
      Authorization: `Bearer ${getToken()}`,
    },
  });
};

export const createPlaylist = async (name) => {
  return axios.post(
    `${BASE_URL}/playlists`,
    { name },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const getPlaylistById = (id) =>
  api.get(`/playlists/${id}`);

export const addTrackToPlaylist = async (playlistId, trackId) => {
  return axios.post(
    `${BASE_URL}/playlists/${playlistId}/tracks`,
    { trackId },
    {
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    }
  );
};

export const removeTrackFromPlaylist = (playlistId, trackId) =>
  api.delete(`/playlists/${playlistId}/tracks/${trackId}`);
