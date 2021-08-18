import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Params, Router } from '@angular/router';
import { RecentMovieService } from 'src/app/recent-movies.service';
import { RouteDescService } from 'src/app/route-desc.service';
import { CurrentMovieService } from '../current-movie.service';
import { MovieDetailsService } from '../movie-details.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-specific-page',
  templateUrl: './specific-page.component.html',
  styleUrls: ['./specific-page.component.css']
})
export class SpecificPageComponent implements OnInit {
  
  constructor(private http: HttpClient, private movieDetailsService: MovieDetailsService,
    private currentMovieService: CurrentMovieService, private router: Router,
    private route: ActivatedRoute , private recentMovies : RecentMovieService,private routeDescService:RouteDescService) {}

  noMovies = false;
  movies: Movie[] = [];
  category: string;
  ngOnInit() {
    this.route.params.subscribe(
      (data: Params) => {
        this.category = data.category;
        if(this.category !== 'Recently Watched')
          this.movies = this.movieDetailsService.fetchMovies(this.category);
        else{
          this.movies = this.recentMovies.getMovies();
        }
        this.noMovies = this.movies.length > 0 ? false : true;
      }
    );
  }

  onSelectMovie(movie: Movie): void {
    this.currentMovieService.setMovieParams(movie);
    this.recentMovies.onAddRecentMovie(movie);
    this.routeDescService.onAddPath('routing-page/specific/'+this.category);
    this.router.navigate(['routing-page/movie-desc']);
  }

  backclick(){
    this.router.navigate(['routing-page/main-page']);
  }
}
