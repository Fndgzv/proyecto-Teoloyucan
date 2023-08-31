import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Requisicion } from '../models/requisicion.model';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})


export class RequisicionesService {
  

  constructor(private http: HttpClient) {}

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }


  obtenerRequisiciones(): Observable<string[]> {
    return this.http.get<string[]>(`${base_url}/requisiciones`);
 }

 crearRequisicion(NoControlPres:String, dependencia:string){
  const url = `${ base_url }/requisiciones`;
  return this.http.post(url, {NoControlPres, dependencia},this.headers);
}

actualizarRequisicion(NoControlPres:string, dependencia:string, _id:string) {
  const url = `${ base_url }/requisiciones/${ _id }`;
  return this.http.put(url, {NoControlPres,dependencia},this.headers);
}

borrarRequisicion( _id:string ){
  const url = `${ base_url }/requisiciones/${ _id }`;
  return this.http.delete(url,this.headers);
}

 async grabarpdfSolicitudRequicision(id: string, archivo: File,
        tipo: 'requisiciones' | 'suficiencias' | 'cotizaciones1' | 'cotizaciones2' | 'cotizaciones3' |
              'excelComparativos' | 'ordenesCompra' | 'excelContratos' | 'pdfContratos'){

      try {
        const url = `${base_url}/descargas/${tipo}/${id}`;
        const formData: FormData = new FormData();
        formData.append('archivo', archivo);

        const resp = await fetch(url, {
          method: 'PUT',
          headers: {
            'x-token': localStorage.getItem('token') || ''
          },
          body: formData
        });
        const data = await resp.json()

        return;


      } catch (error) {

        console.log(error);
        return false
      }

}
}
