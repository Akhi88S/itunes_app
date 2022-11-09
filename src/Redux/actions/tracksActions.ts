import { types } from "../types";

const API_URL = `https://itunes.apple.com/us/rss`;

//caching
let cache = new Map();
const cacheTimer = 1000 * 60 * 5;

export const getTracks = () => {
  return async (dispatch: any) => {
    const cacheValue = cache.get("getTracks");
    if (
      cacheValue?.data &&
      Date.now() - cacheValue?.lastAccessAt < cacheTimer
    ) {
      return Promise.resolve(cacheValue?.data);
    }
    return fetch(`${API_URL}/topalbums/limit=100/json`, {
      method: "GET",
    })
      .then((data) => data.json())
      .then((data) => {
        const { feed } = data;
        const filteredTracks = feed?.entry;
        let categories = filteredTracks.map(
          (track: any) => track.category?.attributes?.term
        );
        cache.set("getTracks", {
          data: filteredTracks,
          lastAccessAt: Date.now(),
        });
        dispatch({
          type: types.GET_TRACKS,
          payload: filteredTracks,
        });
        dispatch({
          type: types.GET_INITIAL_TRACKS_DATA,
          payload: filteredTracks,
        });

        categories = Array.from(new Set(categories));
        dispatch({
          type: types.GET_CATEGORIES,
          payload: categories,
        });
        return Promise.resolve(filteredTracks);
      })
      .catch((err) => {
        return Promise.reject(err);
      });
  };
};
