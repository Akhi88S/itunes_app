import { BehaviorSubject } from "rxjs";
export const oAuthToken = new BehaviorSubject("");
export const setOAuthToken = (val) => oAuthToken.next(val);
export const oAuthToken$ = oAuthToken.asObservable();
export const getOAuthToken = () => oAuthToken.getValue();

export const navigateToMainPage = new BehaviorSubject(false);
export const setNavigateToMainPage = (val) => navigateToMainPage.next(val);
export const navigateToMainPage$ = navigateToMainPage.asObservable();

const TOKEN_URL = "https://accounts.spotify.com/api/token";

let cache = new Map();

var c_id = process.env.REACT_APP_C_ID;
var ct_id = process.env.REACT_APP_CT_ID;
navigateToMainPage$.subscribe((isNavigate) => {
  if (isNavigate) {
    cache.clear();
    setNavigateToMainPage(false);
  }
});

export const getToken = async () => {
  let myHeaders = new Headers();
  myHeaders.append("Authorization", `Basic ${btoa(c_id + ":" + ct_id)}`);
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");

  var urlencoded = new URLSearchParams();
  urlencoded.append("grant_type", "client_credentials");

  const requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  let res = await fetch(TOKEN_URL, requestOptions);
  res = await res.json();
  setOAuthToken(res?.access_token);
  return res;
};

const API_URL = `https://api.spotify.com/v1`;

const apiConfig = {
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
  },
  json: true,
  resolveWithFullResponse: true,
  timeout: 10000,
};

const market = `US`;
const cacheTimer = 1000 * 60 * 5;

export const getTracks = () => {
  const cacheValue = cache.get("getTracks");
  if (cacheValue?.data && Date.now() - cacheValue?.lastAccessAt < cacheTimer) {
    return Promise.resolve(cacheValue?.data);
  }
  return fetch(
    `${API_URL}/recommendations?limit=50&seed_artists=1uNFoZAHBGtllmzznpCI3s&seed_genres=classical&seed_tracks=3Dukyn15RlALh1JDtQRqO0`,
    {
      ...apiConfig,
      headers: {
        ...apiConfig.headers,
        Authorization: `Bearer ${getOAuthToken() || ""}`,
      },
      method: "GET",
    }
  )
    .then((data) => data.json())
    .then((data) => {
      const { tracks } = data;
      const filteredTracks = tracks.filter((track) =>
        track?.preview_url ? true : false
      );
      cache.set("getTracks", {
        data: filteredTracks,
        lastAccessAt: Date.now(),
      });
      return Promise.resolve(filteredTracks);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

const artistIds = [
  "6eUKZXaKkcviH0Ku9w2n3V",
  "6M2wZ9GZgrQXHCFfjv46we",
  "7n2wHs1TKAczGzO7Dd2rGr",
  "1l8Fu6IkuTP0U5QetQJ5Xt",
  "4Rxn7Im3LGfyRkY2FlHhWi",
  "6KImCVD70vtIoJWnq6nGn3",
  "3Nrfpe0tUJi4K4DXYWgMUX",
  "4GvEc3ANtPPjt1ZJllr5Zl",
  "1INuLZXjjVbcJRyWvD1iSq",
  "6UbmqUEgjLA6jAcXwbM1Z9",
  "7lXgbtBDcCRbfc5f8FhGUL",
  "5pUo3fmmHT8bhCyHE52hA6",
  "1o2NpYGqHiCq7FoiYdyd1x",
  "0C8ZW7ezQVs4URX5aX7Kqx",
  "2ddxtfC0oS8LoktXUHE7YL",
  "04abdnqPQe2N4fjztDea6z",
  "7gbmX8SsfjEjxDMzBi1ZOL",
  "0ZED1XzwlLHW4ZaG4lOT6m",
  "0kkxsdcaWmWU2yWAqclDh4",
  "2Hjj68yyUPiC0HKEOigcEp",
];
const getAllArtistsIds = () => {
  let allIds = ``;
  for (let index = artistIds.length - 1; index >= 0; index--) {
    let currRandomIndex = Math.floor(Math.random() * (index + 1));

    allIds += artistIds[currRandomIndex] + ",";

    let temp = artistIds[index];
    artistIds[index] = artistIds[currRandomIndex];
    artistIds[currRandomIndex] = temp;
  }
  allIds = allIds.slice(0, allIds.length - 1);
  return allIds;
};
export const getArtists = () => {
  const cacheValue = cache.get("getArtists");
  if (cacheValue?.data && Date.now() - cacheValue?.lastAccessAt < cacheTimer) {
    return Promise.resolve(cacheValue?.data);
  }
  return fetch(`${API_URL}/artists?ids=${getAllArtistsIds()}`, {
    ...apiConfig,
    headers: {
      ...apiConfig.headers,
      Authorization: `Bearer ${getOAuthToken() || ""}`,
    },
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => {
      const { artists } = data;
      cache.set("getArtists", {
        data: artists,
        lastAccessAt: Date.now(),
      });
      return Promise.resolve(artists);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getArtistTracks = (id) => {
  const cacheValue = cache.get(`getArtistTracks_${id}`);
  if (cacheValue?.data && Date.now() - cacheValue?.lastAccessAt < cacheTimer) {
    return Promise.resolve(cacheValue?.data);
  }
  return fetch(`${API_URL}/artists/${id}/top-tracks?market=${market}`, {
    ...apiConfig,
    headers: {
      ...apiConfig.headers,
      Authorization: `Bearer ${getOAuthToken() || ""}`,
    },
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => {
      const { tracks } = data;
      const filteredTracks = tracks.filter((track) =>
        track?.preview_url ? true : false
      );
      cache.set(`getArtistTracks_${id}`, {
        data: filteredTracks,
        lastAccessAt: Date.now(),
      });
      return Promise.resolve(filteredTracks);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};

export const getSearchData = (val) => {
  const cacheValue = cache.get(`getSearchData_${val}`);
  if (cacheValue?.data && Date.now() - cacheValue?.lastAccessAt < cacheTimer) {
    return Promise.resolve(cacheValue?.data);
  }
  return fetch(`${API_URL}/search?q=${val}&type=track&limit=50`, {
    ...apiConfig,
    headers: {
      ...apiConfig.headers,
      Authorization: `Bearer ${getOAuthToken() || ""}`,
    },
    method: "GET",
  })
    .then((data) => data.json())
    .then((data) => {
      let { tracks } = data;
      tracks = tracks?.items;
      const filteredTracks = tracks.filter((track) =>
        track?.preview_url ? true : false
      );
      cache.set(`getSearchData_${val}`, {
        data: filteredTracks,
        lastAccessAt: Date.now(),
      });
      return Promise.resolve(filteredTracks);
    })
    .catch((err) => {
      return Promise.reject(err);
    });
};
