export class ProfileModel{

    constructor(public id : number,
        public iso_639_1 : string,
        public iso_3166_1 : string,
        public name : string,
        public include_adult : true,
        public username : string){}

}