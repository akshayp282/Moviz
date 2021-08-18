import { Movie } from "./movie.model";

export class CurrentMovieService {
    public id: number;
    public title: string;
    public overview: string;
    public poster_path: string;
    public vote_average: number;
    private IMG_URL = 'https://image.tmdb.org/t/p/w500';

    setMovieParams(movie: Movie){
        this.id = movie.id;
        this.title = movie.title;
        this.overview = movie.overview;
        this.poster_path = movie.poster_path;
        this.vote_average = movie.vote_average;
    }
}