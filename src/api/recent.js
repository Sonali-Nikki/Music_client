import api from "./axios";

export const saveRecentlyPlayed = (trackId, lastPosition) =>
  api.post("/recently-played", { trackId, lastPosition });



export const getRecentlyPlayed = () =>
  api.get("/recently-played");