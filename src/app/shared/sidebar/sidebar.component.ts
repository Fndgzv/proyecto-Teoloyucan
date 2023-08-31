import { Component, OnInit } from '@angular/core';
import { SidebarService } from '../../services/sidebar.service';
import { UsuarioService } from '../../services/usuario.service';

import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  usuario!: Usuario;
  nombreCompleto!: any;
  nombreCompletoMaterno!: any;
  menu!: any

  constructor(private sidebarService: SidebarService,
    private usuarioService: UsuarioService) {
    

  }

  ngOnInit(): void {
    this.menu = this.sidebarService.menu
    this.usuario = this.usuarioService.usuario;
    this.nombreCompleto = this.usuarioService.usuario.nombre + " " + this.usuarioService.usuario.paterno
    this.nombreCompletoMaterno = this.usuarioService.usuario.nombre + " " + this.usuarioService.usuario.paterno + " " + this.usuarioService.usuario.materno
  }

  logout() {
    this.usuarioService.logout();
  }

}
