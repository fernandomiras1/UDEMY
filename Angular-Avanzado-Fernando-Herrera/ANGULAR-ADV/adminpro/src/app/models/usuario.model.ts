
export class Usuario {
    // El orden es muy importante. cuando tengamos que deficin esta clase.
    constructor(
        public nombre: string,
        public email: string,
        public password: string,
        public img?: string,
        public role?: string,
        public google?: boolean,
        public _id?: string
    ) {}

}
