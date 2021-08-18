import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { BehaviorSubject, throwError } from "rxjs";
import { catchError , tap } from 'rxjs/operators'
import { environment } from "src/environments/environment";
import { User } from "./user.model";


export interface AuthenticationResponseData{
    success : boolean;
    expires_at? : string;
    request_token? : string;
    session_id? : string;
    guest_session_id? : string;
}

@Injectable()

export class LandingPageService{

    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer : any;
    isGuestSession : boolean = false;

    constructor(private http : HttpClient,
        private router : Router){}
    
    isaGuest(){
        return this.isGuestSession;
    }

    guestSession(){
        this.isGuestSession = true;
        return this.http.get<AuthenticationResponseData>('https://api.themoviedb.org/3/authentication/guest_session/new?api_key='+environment.API_KEY)
        .pipe(catchError(this.handleError),tap(responseData =>{
            console.log(responseData.guest_session_id);
            localStorage.setItem('guest_session_id',responseData.guest_session_id);
        }))
    }

    requestForATokenAndAuthenticate(){
        this.http.get<AuthenticationResponseData>('https://api.themoviedb.org/3/authentication/token/new?api_key='+environment.API_KEY)
        .subscribe(respData=>{
           console.log(respData);
           localStorage.setItem('request_token',respData.request_token)
           this.router.navigate([]).then(result => {  window.open('https://www.themoviedb.org/authenticate/'+localStorage.getItem('request_token')+'/allow','_blank' ); });   
        })
    }

    loginSession(username : string , password : string){ 
        this.requestForATokenAndAuthenticate();
        return this.http.post<AuthenticationResponseData>('https://api.themoviedb.org/3/authentication/token/validate_with_login?api_key='+environment.API_KEY,{
            username : username,
            password : password,
            request_token : localStorage.getItem('request_token')
        })
        .pipe(catchError(this.handleError),tap(resp=>{
            this.handleAuthentication(resp.success,resp.expires_at,resp.request_token)
        })) 
    }

    createSession(){
        this.http.post<AuthenticationResponseData>('https://api.themoviedb.org/3/authentication/session/new?api_key='+environment.API_KEY,{
            request_token : localStorage.getItem('request_token')
        })
        .subscribe(respData =>{
            console.log("My session id : " + respData.session_id);
            localStorage.setItem('session_id',respData.session_id);     
        },
        err =>{
            console.log(err.status_message);
        })
    }
    
    getSessionId(){
        return localStorage.getItem('session_id');
    }

    getGuestSessionId(){
        return localStorage.getItem('guest_session_id');
    }

    private handleError(errorResponse : HttpErrorResponse){
        localStorage.setItem('errorResp',errorResponse.error.status_message)
        console.log(errorResponse.error.status_message)
        return throwError(errorResponse);
    }

    private handleAuthentication(success : boolean , expires_at? : string ,request_token? : string, session_id? : string){
        const expiresDate = new Date(expires_at);
        const expiresTime = expiresDate.getTime();
        const expirationDate = new Date(new Date().getTime() + expiresTime);
        const user = new User(request_token,expirationDate);
        this.user.next(user);
        localStorage.setItem('userData',JSON.stringify(user))
    }

    signOut(){
        this.http.delete('https://api.themoviedb.org/3/authentication/session?api_key=ABCD1234');
        this.user.next(null);
        this.router.navigate(['/landing-page']);
        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
        localStorage.removeItem('userData')
    }

}

