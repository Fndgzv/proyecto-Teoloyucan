import { Component } from '@angular/core';
import { SettingsService } from './services/settings.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'front15';

  constructor(private settingsService: SettingsService) {
    this.settingsService.checkCurrentTheme();
  }
}
