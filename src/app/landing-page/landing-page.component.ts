import { Component, ComponentFactoryResolver, OnDestroy, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AlertsComponent } from '../share/alerts/alerts.component';
import { PlaceholderDirective } from '../share/placeholder.directive';
import { LandingPageService } from './landing-page.service';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})

export class LandingPageComponent implements OnDestroy{

  isLoginMode : boolean = true;
  isLoading : boolean = false;
  error : string = null;
  private subscription : Subscription;
  @ViewChild(PlaceholderDirective,{static : false}) alertHost : PlaceholderDirective;

  constructor(private router : Router,
    private landingPageService : LandingPageService,
    private compFactoryResolver : ComponentFactoryResolver) { }

  onSwitchMode(){
    this.isLoginMode = !this.isLoginMode;
  }

  onGuestSession(){
    this.isLoginMode = false;
    this.isLoading = true;
    this.landingPageService.guestSession()
      .subscribe(responseData => {
        this.isLoading = false;
        this.isLoading = false;
        console.log(responseData);
        this.router.navigate(['routing-page/main-page']);
      },
      errorMessage => {
        this.isLoading = false;
        this.isLoading = false;
        console.log(errorMessage);
        this.error = errorMessage;
        this.alert(errorMessage);
     })
  }

  onSubmit(form : NgForm){
    if(!form.valid){
      return;
    }

    const username = form.value.username;
    const password = form.value.password;
    this.isLoading = true;

    if(this.isLoginMode){
      this.landingPageService.loginSession(username,password)
      .subscribe(responseData => {
        this.isLoading = false;
        console.log(responseData);
        this.router.navigate(['/routing-page']);
        this.landingPageService.createSession();
      },
      errorMessage => {
        this.isLoading = false;
        console.log(errorMessage);
        this.alert(localStorage.getItem('errorResp'));
      })
    }
  }

  private alert(message : string){
    const alertCompFactory = this.compFactoryResolver.resolveComponentFactory(AlertsComponent);
    const hostViewContRef = this.alertHost.viewContainerRef;
    hostViewContRef.clear();
    const compRef = hostViewContRef.createComponent(alertCompFactory);
    compRef.instance.message = message;
    compRef.instance.compName = 'authenticate';
    this.subscription = compRef.instance.close.subscribe(() => {
      this.subscription.unsubscribe();
      hostViewContRef.clear();
    })
  }

  ngOnDestroy(){
    if(this.subscription){
      this.subscription.unsubscribe();
    }
    localStorage.removeItem('errorResp');
  }

}


