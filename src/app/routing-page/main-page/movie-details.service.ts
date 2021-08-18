import { Movie } from "./movie.model";

export class MovieDetailsService {
  API_KEY = 'api_key=52a748fa003fc8e0a9b3380266623814';
  BASE_URL = 'https://api.themoviedb.org/3';
  API_URL = this.BASE_URL;
  private upcomingMovies: Movie[] = [];
  private popularMovies: Movie[] = [];
  private topRatedMovies: Movie[] = [];
  private popularTvShows: Movie[] = [];
  private movies: Movie[];
  category: string;
  fetchMovies(category: string): Movie[]{
    if(category === 'popular'){
      if(this.popularMovies.length !== 0){
        return this.popularMovies;
      }
      this.category = 'popularity.desc&';
      this.API_URL = this.BASE_URL + '/discover/movie?sort_by='+ this.category +this.API_KEY;
      fetch(this.API_URL).then(res => res.json()).then(data => {
        //console.log(data);
        for(let movie of data.results){
          this.popularMovies.push(
            new Movie(
               movie.id,
               movie.overview,
               movie.poster_path,
               movie.vote_average,
               movie.title
            )
          );
        }
      });
      return this.popularMovies;
    }
    else if(category === 'upcoming'){
      if(this.upcomingMovies.length !== 0){
        return this.upcomingMovies;
      }
      this.category = 'release_date.desc&';
      this.API_URL = this.BASE_URL + '/discover/movie?sort_by='+ this.category +this.API_KEY;
      fetch(this.API_URL).then(res => res.json()).then(data => {
        //console.log(data);
        for(let movie of data.results){
          this.upcomingMovies.push(
            new Movie(
               movie.id,
               movie.overview,
               movie.poster_path,
               movie.vote_average,
               movie.title
            )
          );
        }
      });
      return this.upcomingMovies;
    }
    else if(category === 'top-rated'){
      if(this.topRatedMovies.length !== 0){
        return this.topRatedMovies;
      }
      this.category = 'vote_average.desc&';
      this.API_URL = this.BASE_URL + '/discover/movie?sort_by='+ this.category +this.API_KEY;
    fetch(this.API_URL).then(res => res.json()).then(data => {
        //console.log(data);
        for(let movie of data.results){
          this.topRatedMovies.push(
            new Movie(
               movie.id,
               movie.overview,
               movie.poster_path,
               movie.vote_average,
               movie.title
            )
          );
        }
      });
     return this.topRatedMovies;
    }
    else if(category === 'tv-shows'){
      if(this.popularTvShows.length !== 0){
        return this.popularTvShows;
      }
      this.category = 'popularity.desc&';
      this.API_URL = this.BASE_URL + '/discover/tv?sort_by='+ this.category +this.API_KEY;
    fetch(this.API_URL).then(res => res.json()).then(data => {
        //console.log(data);
        for(let movie of data.results){
          this.popularTvShows.push(
            new Movie(
               movie.id,
               movie.overview,
               movie.poster_path,
               movie.vote_average,
               movie.name
            )
          );
        }
      });
     return this.popularTvShows;
    }
  }
}