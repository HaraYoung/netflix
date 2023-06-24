const API_KEY = "e08a6da350ae17b80b2a203ff78e7f16";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE = 'language=ko'

export interface IMovie {
  id: number;
  backdrop_path: string;
  poster_path: string;
  title: string;
  overview: string;
  genre_ids: number[];
}
interface IGenres {
  id: number;
  name: string;
}

export interface IGetMoviesResult {
  dates: {
    maximum: string;
    minimum: string;
  };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}
export interface IGetMoviesGenres {
  genres: IGenres[];
}

//https://api.themoviedb.org/3/movie/667538?api_key=e08a6da350ae17b80b2a203ff78e7f16&language=ko
export interface IGetMovieDetails {
  id: number;
  backdrop_path: string;  //bgImage
  genres: IGenres[];  //장르
  original_language: string;  //원어
  overview : string;  //줄거리
  popularity :number; //별점
  poster_path: string;  //포스터 이미지
  title:string; //제목
  tagline: string;  //부재목
  release_date: string; //출시일
}

export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

export function getMoviesGenres() {
  return fetch(
    `${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

export function getMovieDetail(movieId : string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}
