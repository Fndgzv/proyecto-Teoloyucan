import { environment } from '../../environments/environment';

const base_url = environment.base_url;

interface _Dependencia {
    _id: string,
    dependencia: string
}

interface _Usuario {
    _id: string,
    nombre: string
}

export class Requisicion {

    constructor(
        public _id: string,
        public NoControlPres: string,
        public dependencia: _Dependencia,
        public usuario: _Usuario,
        
        // archivos
        public pdfSolicitudRequicision?: string,
        public pdfSuficienciaPresupuestal?: string,
        public pdfCotiza1?: string,
        public pdfCotiza2?: string,
        public pdfCotiza3?: string,
        public ExcelComparativo?: string,
        public pdfOrdenCompra?: string,
        public pdfContrato?: string,
        public ExcelContrato?:string,)
        {}

        get requisicionUrl() {

            if ( !this.pdfSolicitudRequicision ) {
                return `${ base_url }/upload/usuarios/no-image`;
            } else if ( this.pdfSolicitudRequicision.includes('https') ) {
                return this.pdfSolicitudRequicision;
            } else if ( this.pdfSolicitudRequicision ) {
                return `${ base_url }/descargas/requisiciones/${ this.pdfSolicitudRequicision }`;
            } else {
                return `${ base_url }/upload/usuarios/no-image`;
            }
        }

        get suficienciaUrl() {

            if ( !this.pdfSuficienciaPresupuestal ) {
                return `${ base_url }/upload/usuarios/no-image`;
            } else if ( this.pdfSuficienciaPresupuestal.includes('https') ) {
                return this.pdfSuficienciaPresupuestal;
            } else if ( this.pdfSuficienciaPresupuestal ) {
                return `${ base_url }/descargas/suficiencias/${ this.pdfSuficienciaPresupuestal }`;
            } else {
                return `${ base_url }/upload/usuarios/no-image`;
            }
        }

        get pdfCotiza1Url() {

            if ( !this.pdfCotiza1 ) {
                return `${ base_url }/upload/usuarios/no-image`;
            } else if ( this.pdfCotiza1.includes('https') ) {
                return this.pdfCotiza1;
            } else if ( this.pdfCotiza1 ) {
                return `${ base_url }/descargas/cotizaciones1/${ this.pdfCotiza1 }`;
            } else {
                return `${ base_url }/upload/usuarios/no-image`;
            }
        }

        get pdfCotiza2Url(){

            if ( !this.pdfCotiza2 ) {
                return `${ base_url }/upload/usuarios/no-image`;
            } else if ( this.pdfCotiza2.includes('https') ) {
                return this.pdfCotiza2;
            } else if ( this.pdfCotiza2 ) {
                return `${ base_url }/descargas/cotizaciones2/${ this.pdfCotiza2 }`;
            } else {
                return `${ base_url }/upload/usuarios/no-image`;
            }
        }

        get pdfCotiza3Url(){

            if ( !this.pdfCotiza3 ) {
                return `${ base_url }/upload/usuarios/no-image`;
            } else if ( this.pdfCotiza3.includes('https') ) {
                return this.pdfCotiza3;
            } else if ( this.pdfCotiza3 ) {
                return `${ base_url }/descargas/cotizaciones3/${ this.pdfCotiza3 }`;
            } else {
                return `${ base_url }/upload/usuarios/no-image`;
            }
        }

        get excelComparaURL() {

            if ( !this.ExcelComparativo ) {
                return `${ base_url }/upload/usuarios/no-image`;
            } else if ( this.ExcelComparativo.includes('https') ) {
                return this.ExcelComparativo;
            } else if ( this.ExcelComparativo ) {
                return `${ base_url }/descargas/excelComparativos/${ this.ExcelComparativo }`;
            } else {
                return `${ base_url }/upload/usuarios/no-image`;
            }
        }

        get ordenCompraUrl() {

            if ( !this.pdfOrdenCompra ) {
                return `${ base_url }/upload/usuarios/no-image`;
            } else if ( this.pdfOrdenCompra.includes('https') ) {
                return this.pdfOrdenCompra;
            } else if ( this.pdfOrdenCompra ) {
                return `${ base_url }/descargas/ordenesCompra/${ this.pdfOrdenCompra }`;
            } else {
                return `${ base_url }/upload/usuarios/no-image`;
            }
        }

        get pdfContratoUrl() {

            if ( !this.pdfContrato ) {
                return `${ base_url }/upload/usuarios/no-image`;
            } else if ( this.pdfContrato.includes('https') ) {
                return this.pdfContrato;
            } else if ( this.pdfContrato ) {
                return `${ base_url }/descargas/pdfContratos/${ this.pdfContrato }`;
            } else {
                return `${ base_url }/upload/usuarios/no-image`;
            }
        }

        get ExcelContratoUrl() {

            if ( !this.ExcelContrato ) {
                return `${ base_url }/upload/usuarios/no-image`;
            } else if ( this.ExcelContrato.includes('https') ) {
                return this.ExcelContrato;
            } else if ( this.ExcelContrato ) {
                return `${ base_url }/descargas/excelContratos/${ this.ExcelContrato }`;
            } else {
                return `${ base_url }/upload/usuarios/no-image`;
            }
        }
}
