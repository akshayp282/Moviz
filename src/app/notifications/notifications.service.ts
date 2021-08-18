import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Movie } from "src/app/routing-page/main-page/movie.model";
import { environment } from "src/environments/environment";

export interface TrendingResponseData {
    page : number;
    results : [ { adult : boolean,
        backdrop_path : string,
        genre_ids : number[],
        id : number,
        original_language : string,
        original_title : string,
        overview : string,
        poster_path : string,
        release_date : string,
        title? : string,
        video : boolean,
        vote_average : number,
        vote_count : number,
        popularity : number,
        name? : string
    } ];
    total_pages : number;
    total_results : number;
}

@Injectable({providedIn : 'root'})

export class NotificationsService{

    constructor(private http : HttpClient){}

    getTrendingForWeek(){
        return this.http.get<TrendingResponseData>('https://api.themoviedb.org/3/trending/all/week?api_key='+environment.API_KEY);
    }

    getTrendingForDay(){
        return this.http.get<TrendingResponseData>('https://api.themoviedb.org/3/trending/all/day?api_key='+environment.API_KEY);
    }
}