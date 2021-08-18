import { Injectable } from "@angular/core";

@Injectable({providedIn : 'root'})

export class HeaderService{
    movie : string;
    isSearching : boolean;
   
    setMovieName(movieName : string){
       movieName.charAt(0).toUpperCase();      
        this.movie = movieName 
    }
    getMovieName(){
        return this.movie;
    }
    getIsSearching(){
        return this.isSearching;
    }
}