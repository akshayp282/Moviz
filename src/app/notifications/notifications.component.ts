import { Component, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentMovieService } from 'src/app/routing-page/main-page/current-movie.service';
import { Movie } from 'src/app/routing-page/main-page/movie.model';
import { RecentMovieService } from '../recent-movies.service';
import { NotificationsService, TrendingResponseData } from './notifications.service';

@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
export class NotificationsComponent implements OnInit{

  weekTrending : Movie[] = [];
  dayTrending : Movie[] = [];
  select  : string; 

  constructor(private notificationsService : NotificationsService,
    private currentMovieService : CurrentMovieService,
    private router : Router,
    private route : ActivatedRoute,
    private recentMovieService: RecentMovieService){}

  ngOnInit() : void{
    this.route.queryParams
      .subscribe(params => {
        this.select = params.select;
        if(this.select === 'day'){
          this.loadTrendingMoviesForTheDay();
        }else{
          this.loadTrendingMoviesForTheWeek();
        }
      })
  }

  loadTrendingMoviesForTheWeek(){
    this.notificationsService.getTrendingForWeek()
    .subscribe(resp =>{
      for(let movie of resp.results){
          this.weekTrending.push(
            new Movie(
               movie.id,
               movie.overview,
               movie.poster_path,
               movie.vote_average,
               movie.title,
               movie.name
            )
          );
        }
    })
  }

  loadTrendingMoviesForTheDay(){
    this.notificationsService.getTrendingForDay()
    .subscribe(resp =>{
      for(let movie of resp.results){
          this.dayTrending.push(
            new Movie(
               movie.id,
               movie.overview,
               movie.poster_path,
               movie.vote_average,
               movie.title,
               movie.name
            )
          );
        }
    })
  }

  onSelectMovie(movie: Movie){
    this.currentMovieService.setMovieParams(movie);
    this.recentMovieService.onAddRecentMovie(movie);
    this.router.navigate(['routing-page/movie-desc']);
  }

  backclick(){
    this.router.navigate(['routing-page/main-page']);
  }

}
