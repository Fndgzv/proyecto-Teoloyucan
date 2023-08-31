import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class DependenciasService {

  constructor(private http: HttpClient) { }

  obtenerDependencias(): Observable<{ dependencias: { dependencia: string, _id: string }[] }> {
    return this.http.get<{ dependencias: { dependencia: string, _id: string }[] }>(`${base_url}/dependencias`);
}


}
