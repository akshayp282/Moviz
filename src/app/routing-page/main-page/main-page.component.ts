import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Movie } from './movie.model';
import { MovieDetailsService } from './movie-details.service';
import { CurrentMovieService } from './current-movie.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RecentMovieService } from 'src/app/recent-movies.service';
import { SideNavContents } from 'src/app/side-nav/SideNavContents.services';
import { HeaderService } from 'src/app/header/header.service';
import { RouteDescService } from 'src/app/route-desc.service';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnDestroy, OnInit {
  constructor(private http: HttpClient, private movieDetailsService: MovieDetailsService,
    private currentMovieService: CurrentMovieService, private router: Router,
    private recentMovieService: RecentMovieService , private sidenavContents : SideNavContents,
    private headerService : HeaderService,private routeDescService:RouteDescService) { }
  popularMovies: Movie[] = [];
  upcomingMovies: Movie[] = [];
  topRatedMovies: Movie[] = [];
  popularTvShows: Movie[] = [];
  movieName : string;
  searchedMovies : Movie[] = [];
  allMovies : Movie[] = [];
  implementingSearch : boolean = false;
  movieNames : string[] = [];
  currentPage = this.sidenavContents.currentPage;

  ngOnInit(){
    this.loadPopularMovies();
    this.loadUpcomingMovies();
    this.loadTopRatedMovies();
    this.loadTvShows();
    this.loadSearchedMovies();
    this.implementingSearch = this.headerService.getIsSearching();
  }

  loadPopularMovies() {
    this.popularMovies = this.movieDetailsService.fetchMovies('popular');
  }
  loadUpcomingMovies() {
    this.upcomingMovies = this.movieDetailsService.fetchMovies('upcoming');
  }
  loadTopRatedMovies() {
    this.topRatedMovies = this.movieDetailsService.fetchMovies('top-rated');
  }
  loadTvShows() {
    this.popularTvShows = this.movieDetailsService.fetchMovies('tv-shows');
  }
  loadSearchedMovies(){
    for(let a of this.popularMovies){
      this.allMovies.push(a);
    }
    for(let b of this.upcomingMovies){
      this.allMovies.push(b);
    } 
    for(let c of this.topRatedMovies){
      this.allMovies.push(c);
    }
    this.movieName = this.headerService.getMovieName();
    this.searchedMovies= this.allMovies.filter(movies =>{
      return movies.title.includes(this.movieName)
    })
    this.searchedMovies= this.searchedMovies.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []); 
  }

  onViewMore(category:string){
    this.router.navigate(['routing-page/specific/'+category]);
  }

  onSelectMovie(movie: Movie): void {
    this.currentMovieService.setMovieParams(movie);
    this.recentMovieService.onAddRecentMovie(movie);
    this.routeDescService.onAddPath('routing-page/main-page');
    this.router.navigate(['routing-page/movie-desc']);
  }

  onBack(){
    window.location.reload();
  }

  ngOnDestroy(){
    this.implementingSearch = false;
  }

}
