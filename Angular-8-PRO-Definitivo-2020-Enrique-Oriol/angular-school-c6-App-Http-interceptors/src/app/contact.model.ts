export class Contact{
    constructor(
        public id:number,
        public name:string,
        public picture:string,
        public phones:ContactPhoneI[],
        public email:string,
        public address:string,
        public pictureFile?:File
    ){ }
}

export interface ContactPhoneI{
    type:PhoneType;
    number:number;
}

export enum PhoneType{
    mobile = 'mobile',
    home = 'home',
    work = 'work'
}
