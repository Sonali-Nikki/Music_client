import api from "./axios";

export const searchAll = (query) =>
  api.get(`/search?q=${query}`);
