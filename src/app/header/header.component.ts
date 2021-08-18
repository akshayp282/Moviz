import { Component, ComponentFactoryResolver, OnDestroy , Output,EventEmitter, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { LandingPageService } from '../landing-page/landing-page.service';
import { AlertsComponent } from '../share/alerts/alerts.component';
import { PlaceholderDirective } from '../share/placeholder.directive';
import { SideNavContents } from '../side-nav/SideNavContents.services';
import { HeaderService } from './header.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})

export class HeaderComponent implements OnDestroy{

  private subscription : Subscription;
  @ViewChild(PlaceholderDirective,{static : false}) alertHost : PlaceholderDirective;
  @ViewChild('f',{static : true}) searchForm : NgForm;
  searchMovie ='';
  first = true;
  count=0;

  constructor(private landingPageService : LandingPageService,
    private compFactoryResolver : ComponentFactoryResolver,
    private router : Router,
    private route : ActivatedRoute,
    private headerService : HeaderService) { }

  isGuestMode(){
    return this.landingPageService.isaGuest();
  }

  searchThis(){
    this.headerService.isSearching = true;
    this.headerService.setMovieName(this.searchMovie);
    if(this.first){
      this.first=false;
      this.router.navigate(['routing-page/search-result/'+(++this.count)]);
    }
    else{
      this.first=true;
      this.router.navigate(['routing-page/search-results/'+(++this.count)])
    }
    if(this.searchMovie === ''){
      window.location.reload();
    }
  }

  onConfirmation(){
    const alertCompFactory = this.compFactoryResolver.resolveComponentFactory(AlertsComponent);
    const hostViewContRef = this.alertHost.viewContainerRef;
    hostViewContRef.clear();
    const compRef = hostViewContRef.createComponent(alertCompFactory);
    compRef.instance.message = "Are you sure you want to Sign out ? ";
    compRef.instance.compName = 'header';
    this.subscription = compRef.instance.close.subscribe(() => {
      this.subscription.unsubscribe();
      hostViewContRef.clear();
    })
  }
  
  onSignIn(){
   this.router.navigate(['/landing-page']);
   this.landingPageService.isGuestSession = false;
   console.log("IS A GUEST ? : "+this.landingPageService.isaGuest());
  }

  onTrendingWeek(){
    this.router.navigate(['notifications'], {
      relativeTo: this.route,
      queryParams: {
        select : 'week'
      },
      queryParamsHandling: 'merge'
    })
  }

  onTrendingDay(){
    this.router.navigate(['notifications'], {
      relativeTo: this.route,
      queryParams: {
        select : 'day'
      },
      queryParamsHandling: 'merge'
    })
  }

  myProfile(){
    this.router.navigate(['routing-page/profile']);
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    this.headerService.isSearching = false;
    this.count = 0;
  }

}


