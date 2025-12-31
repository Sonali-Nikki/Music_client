import api from "./axios";

export const uploadTrack = (payload) =>
  api.post("/admin/upload", payload);
