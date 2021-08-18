import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RouteDescService } from 'src/app/route-desc.service';
import { CurrentMovieService } from '../current-movie.service';
import { Movie } from '../movie.model';

@Component({
  selector: 'app-movie-desc',
  templateUrl: './movie-desc.component.html',
  styleUrls: ['./movie-desc.component.css']
})
export class MovieDescComponent implements OnInit {
  path:String ='routing-page/main-page';
  constructor(private currentMovieService:CurrentMovieService,private router:Router,private routeDescService:RouteDescService) { }

  id:number;
  title:string;
  overview:string;
  poster_path:string;
  vote_average:number;
  
  ngOnInit(): void {
    this.path=this.routeDescService.getPath();
    this.id=this.currentMovieService.id;
    this.title=this.currentMovieService.title;
    this.overview=this.currentMovieService.overview;
    this.poster_path=this.currentMovieService.poster_path;
    this.vote_average=this.currentMovieService.vote_average;
    
  }
  onBack()
  {
    this.router.navigate([this.path]);
  }

}
