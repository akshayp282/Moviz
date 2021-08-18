import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecentMovieService } from 'src/app/recent-movies.service';
import { RouteDescService } from 'src/app/route-desc.service';
import { CurrentMovieService } from 'src/app/routing-page/main-page/current-movie.service';
import { Movie } from 'src/app/routing-page/main-page/movie.model';
import { ProfilePageService } from './profile-page.service';
import { ProfileModel } from './profile.model';

@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.css']
})
export class ProfilePageComponent implements OnInit  {
    profile_info:ProfileModel;
    movies: Movie[];
  constructor(private profilePageService : ProfilePageService, private router : Router, 
    private recentMovieService : RecentMovieService, private currentMovieService : CurrentMovieService,private routeDescService:RouteDescService) { }

    
  ngOnInit(){
    this.profilePageService.getAccountDetails().subscribe(response=>{
      
       this.profile_info =new ProfileModel(response.id,response.iso_639_1,response.iso_3166_1,response.name,response.include_adult,response.username);
         console.log(this.profile_info);
      });
    this.movies = this.recentMovieService.getMovies();
  }
  backclick(){
    this.router.navigate(['/routing-page/main-page']);
  }
  onSelectMovie(movie: Movie): void {
    this.currentMovieService.setMovieParams(movie);
    this.routeDescService.onAddPath('routing-page/profile');
    this.router.navigate(['routing-page/movie-desc']);
  }

}

