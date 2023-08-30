const API_KEY = "e08a6da350ae17b80b2a203ff78e7f16";
const BASE_PATH = "https://api.themoviedb.org/3";
const LANGUAGE = "language=ko";

//현재 상영중인 영화
export interface IGetMoviesResult {
  results: IMovie[];
}
export interface IMovie {
  id: number;
  backdrop_path: string; //배경 이미지
  genre_ids: number[]; //장르
  overview: string; //줄거리
  poster_path: string; //포스터 이미지
  title: string; //제목
  release_date: string; //개봉일
  vote_average: number; //평점
}
export function getMovies() {
  return fetch(
    `${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

//장르 목록
export interface IGenresArr {
  genres: IGenres[];
}
export interface IGenres {
  id: number;
  name: string;
}
export function getMoviesGenres() {
  return fetch(
    `${BASE_PATH}/genre/movie/list?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

export function getTvGenres() {
  return fetch(
    `${BASE_PATH}/genre/tv/list?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

//영화 상세 정보
//https://api.themoviedb.org/3/movie/667538?api_key=e08a6da350ae17b80b2a203ff78e7f16&language=ko
export interface IGetMovieDetail {
  id: number;
  backdrop_path: string; //bgImage
  genres: IGenres[]; //장르
  original_title: string; //원어
  overview: string; //줄거리
  vote_average: number; //별점
  poster_path: string; //포스터 이미지
  title: string; //제목
  tagline: string; //부재목
  release_date: string; //출시일
  runtime: number; //러닝타임
}
//한국어 버전
export function getMovieDetailKo(movieId: string) {
  return fetch(
    `${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}
//영어 버전
export function getMovieDetailEn(movieId: string) {
  return fetch(`${BASE_PATH}/movie/${movieId}?api_key=${API_KEY}`).then(
    (response) => response.json()
  );
}

//평점 높은 영화
export function getMovieTopRated() {
  return fetch(
    `${BASE_PATH}/movie/top_rated?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

//인기 영화
export function getMoviePopular() {
  return fetch(
    `${BASE_PATH}/movie/popular?api_key=${API_KEY}&${LANGUAGE}`
  ).then((response) => response.json());
}

//TV
export interface ITvResult{
  results: ITvData[];
}
interface ITvData {
  id: number;
  backdrop_path: string; //bgImage
  first_air_date: string; //첫 방송 날짜
  genre_ids: IGenres[]; //장르
  name: string; //프로그램 이름
  origin_country: string[]; //원산지 국가
  original_language: string; //원어
  original_name: string; //원어 프로그램 이름
  overview: string; //줄거리
  poster_path: string; //포스터 이미지
  vote_average: number; //별점
}

//오늘 방송
//https://api.themoviedb.org/3/tv/airing_today?api_key=e08a6da350ae17b80b2a203ff78e7f16&language=ko
//인기 시리즈
//https://api.themoviedb.org/3/tv/popular?api_key=e08a6da350ae17b80b2a203ff78e7f16&language=ko
//방송중인 시리즈
//https://api.themoviedb.org/3/tv/on_the_air?api_key=e08a6da350ae17b80b2a203ff78e7f16&language=ko
//베스트 시리즈
//https://api.themoviedb.org/3/tv/top_rated?api_key=e08a6da350ae17b80b2a203ff78e7f16&language=ko



//https://api.themoviedb.org/3/search/multi?api_key=e08a6da350ae17b80b2a203ff78e7f16&query=Star&include_adult=false&language=ko&page=1
//검색
export interface ISearchResult {
  results: ISearchData[];
}
export interface ISearchData {
  backdrop_path: string; //배경 이미지
  id: number;
  title: string; //movie : 제목
  name: string; //TV : 프로그램 이름
  original_language: string; //원어
  original_title: string; //movie :원어 제목
  original_name: string; //TV : 원어 프로그램 이름
  overview: string; //줄거리
  poster_path: string; //포스터 이미지
  media_type: string; //tV or movie
  genre_ids: IGenres[]; //장르
  release_date: string; //movie : 개봉일
  first_air_date: string; //TV : 첫 방송 날짜
  vote_average: number; //별점
  vote_count: number; //좋아요 수
  origin_country: string[]; //원산지 국가
}

export function getSearch(query: string) {
  return fetch(
    `${BASE_PATH}/search/multi?api_key=${API_KEY}&${LANGUAGE}&query=${query}&include_adult=false&language=ko&page=1`
  ).then((response) => response.json());
}
