import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainPageComponent } from './routing-page/main-page/main-page.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { ProfilePageComponent } from './header/profile-page/profile-page.component';
import { MovieDescComponent } from './routing-page/main-page/movie-desc/movie-desc.component';
import { HttpClientModule } from '@angular/common/http';
import { MovieDetailsService } from './routing-page/main-page/movie-details.service';
import { CurrentMovieService } from './routing-page/main-page/current-movie.service';
import { AlertsComponent } from './share/alerts/alerts.component';
import { LoadingIconComponent } from './share/loading-icon/loading-icon.component';
import { PlaceholderDirective } from './share/placeholder.directive';
import { LandingPageService } from './landing-page/landing-page.service';
import { FormsModule } from '@angular/forms';
import { ProfilePageService } from './header/profile-page/profile-page.service';
import { CommonModule } from '@angular/common';
import { RoutingPageComponent } from './routing-page/routing-page.component';
import { SpecificPageComponent } from './routing-page/main-page/specific-page/specific-page.component';
import { SideNavContents } from './side-nav/SideNavContents.services';


import { RecentMovieService } from './recent-movies.service';
import { NotificationsComponent } from './notifications/notifications.component';
import { WildRouteComponent } from './routing-page/wild-route/wild-route.component';
import { RouteDescService } from './route-desc.service';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LandingPageComponent,
    MainPageComponent,
    SideNavComponent,
    ProfilePageComponent,
    MovieDescComponent,
    AlertsComponent,
    LoadingIconComponent,
    PlaceholderDirective,
    SpecificPageComponent,
    RoutingPageComponent,
    NotificationsComponent,
    WildRouteComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  exports: [HeaderComponent],
  providers: [MovieDetailsService, CurrentMovieService , LandingPageService, ProfilePageService , SideNavContents, RecentMovieService,RouteDescService],
  bootstrap: [AppComponent]
})
export class AppModule { }
