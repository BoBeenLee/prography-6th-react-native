import axios from "axios";

import { ENV } from "src/configs/env";

export interface MoviesResponse {
  status: string;
  status_message: string;
  data: Data;
  "@meta": Meta;
}

export interface Data {
  movie_count: number;
  limit: number;
  page_number: number;
  movies: MovieItem[];
}

export interface MovieItem {
  id: number;
  url: string;
  imdb_code: string;
  title: string;
  title_english: string;
  title_long: string;
  slug: string;
  year: number;
  rating: number;
  runtime: number;
  genres: string[];
  summary: string;
  description_full: string;
  synopsis: string;
  yt_trailer_code: string;
  language: string;
  mpa_rating: string;
  background_image: string;
  background_image_original: string;
  small_cover_image: string;
  medium_cover_image: string;
  large_cover_image: string;
  state: string;
  torrents: Torrent[];
  date_uploaded: string;
  date_uploaded_unix: number;
}

export interface Torrent {
  url: string;
  hash: string;
  quality: string;
  type: string;
  seeds: number;
  peers: number;
  size: string;
  size_bytes: number;
  date_uploaded: string;
  date_uploaded_unix: number;
}

export interface Meta {
  server_time: number;
  server_timezone: string;
  api_version: number;
  execution_time: string;
}

// https://yts.mx/api/v2/list_movies.json?limit=50
export const movies = async (): Promise<MovieItem[]> => {
  const response = await axios.get(`${ENV.API_URL}/list_movies.json?limit=50`);
  return (response.data as MoviesResponse).data.movies;
};
