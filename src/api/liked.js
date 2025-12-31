import api from "./axios";

export const getLikedTracks = () => api.get("/liked");

export const unlikeTrack = (trackId) =>
  api.delete(`/liked/${trackId}`);
