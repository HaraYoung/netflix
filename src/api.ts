const API_KEY = "e08a6da350ae17b80b2a203ff78e7f16";
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie{
    id: number;
    backdrop_path: string;
    poster_path: string;
    title: string;
    overview: string;
}

export interface IGetMoviesResult{
    dates: {
        maximum: string;
        minimum: string;
    };
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export function getMovies() {
  return fetch(`${BASE_PATH}/movie/now_playing?api_key=${API_KEY}&language=ko`).then(
    (response) => response.json()
  );
}
