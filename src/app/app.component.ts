import { Component } from '@angular/core';
import { ElectronService } from './core/services';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'moam-kit';

  constructor(private electronService: ElectronService) {}

  public onClick(): void {
    const { ipcRenderer } = this.electronService;
    ipcRenderer.send('to-test');
  }
}
