import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Usuario } from '../models/usuario.model';
import { Router } from '@angular/router';

const base_url = environment.base_url;

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  usuario!: Usuario;

  constructor(private http: HttpClient, private router: Router) {

  }

  get token(): string {
    return localStorage.getItem('token') || '';
  }

  get role(): string {
    if (this.usuario && this.usuario.role) {
      return this.usuario.role;
    }
    return '';
  }

  get uid(): string {
    return this.usuario.uid || '';
  }

  get headers() {
    return {
      headers: {
        'x-token': this.token
      }
    }
  }

  login(formData: any) {

    return this.http.post(`${base_url}/login`, formData)
      .pipe(
        tap((resp: any) => {
          this.guardarLocalStorage(resp.token, resp.menu);
        })
      );

  }


  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('menu');
    this.router.navigateByUrl('/login');
  }



  guardarLocalStorage(token: string, menu: any) {

    localStorage.setItem('token', token);
    localStorage.setItem('menu', JSON.stringify(menu));

  }

  validarToken(): Observable<any> {

    return this.http.get(`${base_url}/login/renew`, {
      headers: {
        'x-token': this.token
      }
    }).pipe(
      map((resp: any) => {
        const { id_estado, id_municipio, email, google, id_role, nombre, paterno, materno, role, img = '', uid } = resp.usuario;
        this.usuario = new Usuario(id_estado, id_municipio, id_role, nombre, paterno, materno, email, '', img, google, role, uid);

        this.guardarLocalStorage(resp.token, resp.menu);

        return true;
      }),
      catchError(error => of(false))
    );

  }

  actualizarPerfil(data: { email: string, nombre: string, role?: string }) {
    data = {
      ...data,
      role: this.usuario.role || ''
    }

    return this.http.put(`${base_url}/usuarios/${this.uid}`, data, this.headers);

  }
}
