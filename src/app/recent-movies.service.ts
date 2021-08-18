import { Movie } from "./routing-page/main-page/movie.model";

export class RecentMovieService {
    movies: Movie[] = [];
    uniqueMovies = new Set(this.movies);

    onAddRecentMovie(movie: Movie){
        this.uniqueMovies.add(movie);
    }
    getMovies(){
        this.movies = Array.from(this.uniqueMovies);
        return this.movies;
    }
}




