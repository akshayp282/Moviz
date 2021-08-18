export class User{

    constructor(
        public request_token,
        public _tokenExpiratinDate : Date){}

    get token(){
        if(!this._tokenExpiratinDate || new Date() > this._tokenExpiratinDate){
            return null;
        }
        return this.request_token;
    }
}
