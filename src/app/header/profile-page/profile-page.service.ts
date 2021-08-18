import { HttpClient, HttpErrorResponse } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from "src/environments/environment";
import { throwError } from "rxjs";
import { catchError , tap } from 'rxjs/operators'
import { ProfileModel } from "./profile.model";
// import { profile } from "console";
 
export interface AccountDetailsResponse{
 avtar : { gravatar : {hash : string }} ;
 id : number;
 iso_639_1 : string;
 iso_3166_1 : string;
 name : string;
 include_adult : true;
 username : string;
}
 
@Injectable()
 
export class ProfilePageService{
 
 constructor(private http : HttpClient){}
 
 getAccountDetails(){
  return this.http.get<AccountDetailsResponse>('https://api.themoviedb.org/3/account?api_key='+environment.API_KEY+'&session_id='+localStorage.getItem('session_id'))
 .pipe(catchError(this.errorHandler))
}
 
 private errorHandler(errResp : HttpErrorResponse){
 console.log(errResp.error.status_message)
 return throwError(errResp);
 }
}