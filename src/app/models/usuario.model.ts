import { environment } from '../../environments/environment';

const base_url = environment.base_url;

export class Usuario {

    constructor(
        public id_estado: string,
        public id_municipio: string,
        public id_role: string,
        public nombre: string,
        public paterno: string,
        public materno: string,
        public email: string,
        public password?: string,
        public img?: string,
        public google?: boolean,
        public role?: string,
        public uid?: string,
    ) {}

    get imagenUrl() {

        if ( !this.img ) {
            return `${ base_url }/upload/usuarios/no-image`;
        } else if ( this.img.includes('https') ) {
            return this.img;
        } else if ( this.img ) {
            return `${ base_url }/upload/usuarios/${ this.img }`;
        } else {
            return `${ base_url }/upload/usuarios/no-image`;
        }
    }
}

