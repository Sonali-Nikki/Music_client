import api from "./axios";

export const getTracks = () => api.get("/tracks");
