import { Injectable } from "@angular/core";
import { Router } from "@angular/router";

@Injectable()

export class SideNavContents{
    sidenavContents : string[] = ['Home','upcoming','top-rated','popular','tv-shows','Recently Watched'];
    constructor(private router : Router){}
    currentPage : string = 'Home';
    
    changeCurrentPage(category : string){
        this.currentPage = category;
        if(this.currentPage === 'Home'){
            this.router.navigate(['../routing-page/main-page']);
        }
        else{
            this.router.navigate(['../routing-page/specific/'+this.currentPage]);
        }
    }
}