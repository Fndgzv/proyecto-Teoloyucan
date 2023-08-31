import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  private getLinkTheme() {
    return document.querySelector('#theme');
  }

  private loadThemeFromLocalStorage() {
    const url = localStorage.getItem('theme') || './assets/css/colors/purple-dark.css';
    const linkTheme = this.getLinkTheme();
    linkTheme?.setAttribute('href', url);
    this.checkCurrentTheme();
  }

  public initTheme() {
    this.loadThemeFromLocalStorage();
  }

  public changeTheme(theme: string): Promise<void> {
    const url = `./assets/css/colors/${theme}.css`;
    const linkTheme = this.getLinkTheme();
    linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    this.checkCurrentTheme();
    return Promise.resolve();
  }

  public checkCurrentTheme() {
    const links = document.querySelectorAll('.selector');
    const linkTheme = this.getLinkTheme();

    links.forEach(elem => {
      elem.classList.remove('working');
      const btnTheme = elem.getAttribute('data-theme');
      const btnThemeUrl = `./assets/css/colors/${btnTheme}.css`;
      const currentTheme = linkTheme?.getAttribute('href');

      if (btnThemeUrl === currentTheme) {
        elem.classList.add('working');
      }
    });
  }
}