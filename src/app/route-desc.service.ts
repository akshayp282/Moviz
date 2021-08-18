export class RouteDescService {
    path:String;

    onAddPath(getpath:String){
        this.path=getpath;
        console.log(this.path);
    }
    getPath(){
        return this.path;
    }
}