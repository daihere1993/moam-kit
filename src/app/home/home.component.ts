import { Component, OnInit } from '@angular/core';
import { ElectronService } from '../core/services';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  constructor(private electronService: ElectronService) {}

  ngOnInit(): void {
    this.electronService.ipcRenderer.on('syncCode-reply', (event, ret) => {
      if (ret === 0) {
        console.log('done');
      } else {
        console.log(ret);
      }
    });
  }

  public toSyncCode(): void {
    this.electronService.ipcRenderer.send('to-syncCode');
  }
}
