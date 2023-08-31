import { Component } from '@angular/core';
import { UsuarioService } from '../../services/usuario.service';
import { Usuario } from '../../models/usuario.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {

  //Saber si es el masterUser
  public MasterUser = false

  public usuario: Usuario;
  public nombreCompleto;
  public nombreCompletoMaterno;

  constructor(private usuarioService: UsuarioService,
    private router: Router) {
    this.usuario = usuarioService.usuario;
    this.nombreCompleto = usuarioService.usuario.nombre + " " + usuarioService.usuario.paterno
    this.nombreCompletoMaterno = usuarioService.usuario.nombre + " " + usuarioService.usuario.paterno + " " + usuarioService.usuario.materno

    if (this.usuario.role == "MasterUser") {
      this.MasterUser = true
    }
  }


  logout() {
    this.usuarioService.logout();
  }

  buscar(termino: string) {

    if (termino.length === 0) {
      return;
    }

    this.router.navigateByUrl(`/dashboard/buscar/${termino}`);
  }

}
