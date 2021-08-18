import { Component, ElementRef, HostBinding, HostListener, OnInit} from '@angular/core';
import { Router } from '@angular/router';
import { CurrentMovieService } from '../routing-page/main-page/current-movie.service';
import { SideNavContents } from './SideNavContents.services';
import { HttpClient } from '@angular/common/http';
import { Movie } from '../routing-page/main-page/movie.model';
import { MovieDetailsService } from '../routing-page/main-page/movie-details.service';
import { ActivatedRoute } from '@angular/router';
import { RecentMovieService } from 'src/app/recent-movies.service';


@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: ['./side-nav.component.css']
})
export class SideNavComponent implements OnInit {
  status: boolean = false;
  closeOnClick: boolean = false;
  constructor(private sidebarContents : SideNavContents , private elRef:ElementRef , private router : Router){}
  ngOnInit(): void {
    console.log("From ng init")
  }

  @HostListener('document:click') close(){
    if(this.status === true && this.closeOnClick === false){
      this.closeOnClick = true;
      console.log("from hostlistener");
    }
    else if(this.closeOnClick === true){
      this.status = false;
      this.closeOnClick = false;
    }  
  }

  title : string[] = this.sidebarContents.sidenavContents;

  clickEvent(){
      this.status = this.status ? false : true;
  }  
  
  onClick(category : string){
    this.sidebarContents.changeCurrentPage(category);
    this.status = false;
  }
  
}
