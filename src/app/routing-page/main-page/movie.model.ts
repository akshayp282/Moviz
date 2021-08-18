export class Movie {
    public id: number;
    public title?: string;
    public overview: string;
    public poster_path: string;
    public vote_average: number;
    public name? : string;
    private IMG_URL = 'https://image.tmdb.org/t/p/w500';
    constructor(id: number, overview: string, poster_path: string, vote_average: number, title?: string, name? : string){
        this.id = id;
        this.title = title;
        this.overview = overview;
        this.name = name;
        if(poster_path === null){
            this.poster_path = 'https://qph.fs.quoracdn.net/main-qimg-e978932284c48daeb3cce7076d28f9d2';
        }
        else{
            this.poster_path = this.IMG_URL + poster_path;
        }
        this.vote_average = vote_average;
    }
}