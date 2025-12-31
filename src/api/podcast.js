import api from "./axios";

export const getPodcasts = () => api.get("/podcasts");
export const getPodcastById = (id) => api.get(`/podcasts/${id}`);
