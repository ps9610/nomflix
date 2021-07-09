import axios from "axios";

const api = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: "f3246bc737b712e6f569123620153030",
    language: "ko",
  },
});

export const moviesApi = {
  nowPlaying: () => api.get("movie/now_playing"),
  upcoming: () => api.get("movie/upcoming"),
  popular: () => api.get("movie/popular"),
  movieDetail: (id) =>
    api.get(`movie/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  keyword: (id) => api.get(`movie/${id}/keywords`),
  similar: (id) => api.get(`movie/${id}/similar`),
  search: (term) =>
    api.get("search/movie", {
      params: {
        query: decodeURIComponent(term),
      },
    }),
};

export const tvApi = {
  onTheAir: () => api.get("tv/on_the_air"),
  popular: () => api.get("tv/popular"),
  airingToday: () => api.get("tv/airing_today"),
  showDetail: (id) =>
    api.get(`tv/${id}`, {
      params: {
        append_to_response: "videos",
      },
    }),
  keyword: (id) => api.get(`tv/${id}/keywords`),
  similar: (id) => api.get(`movie/${id}/similar`),
  search: (term) =>
    api.get("search/tv", {
      params: {
        query: decodeURIComponent(term),
      },
    }),
};

export const trendApi = {
  trend: () => api.get(`trending/all/week`),
};
