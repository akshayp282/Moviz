import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { ProfilePageComponent } from './header/profile-page/profile-page.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { MainPageComponent } from './routing-page/main-page/main-page.component';
import { MovieDescComponent } from './routing-page/main-page/movie-desc/movie-desc.component';
import { RoutingPageComponent } from './routing-page/routing-page.component';
import { SpecificPageComponent } from './routing-page/main-page/specific-page/specific-page.component';
import { NotificationsComponent } from './notifications/notifications.component';
import { WildRouteComponent } from './routing-page/wild-route/wild-route.component';

const routes: Routes = [
  {path : '' , redirectTo : '/landing-page' , pathMatch : 'full'},
  {path : 'landing-page' , component : LandingPageComponent},
  {path : 'header' , component : HeaderComponent},
  {path: 'routing-page' , component: RoutingPageComponent,
    children:[
      {path : 'profile' , component : ProfilePageComponent},
      {path:'main-page', component: MainPageComponent},
      {path: 'movie-desc', component: MovieDescComponent},
      {path : 'search-results' , component : MainPageComponent , children : [
        {path : ':count' , component : MainPageComponent}
      ]},
      {path: 'specific/:category', component: SpecificPageComponent},
      {path : 'search-result' , component : MainPageComponent , children : [
        {path : ':count' , component : MainPageComponent}
      ]},
      {path : 'notifications' , component : NotificationsComponent , children : [
          {path: 'movie-desc', component: MovieDescComponent}
      ]}
    ]
  },
  {path : 'movie-desc', component: MovieDescComponent},
  {path: 'not-found', component: WildRouteComponent},
  {path : '**', redirectTo: '/not-found'}
]

@NgModule({
  imports: [RouterModule.forRoot(routes,{ onSameUrlNavigation: 'reload' })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
