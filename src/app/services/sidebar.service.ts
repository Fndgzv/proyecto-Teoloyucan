import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SidebarService {

  public menu = [];

  cargarMenu() {
    const menuGuardado = localStorage.getItem('menu');
    if (menuGuardado !== null) {
      this.menu = JSON.parse(menuGuardado);
    } else {
      this.menu = [];
    }
  }


}
