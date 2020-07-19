import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from '@angular/core';
import { IPCResponse, IPCMessage } from '@moam-kit/types';
import { IpcService } from '../../services/electron/ipc.service';

enum Type {
  DIR = 'dir',
  FILE = 'file',
}

@Component({
  selector: 'path-field',
  templateUrl: './path-field.component.html',
  styleUrls: ['./path-field.component.scss'],
  providers: [IpcService],
})
export class PathInputComponent implements OnInit, OnDestroy {
  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  @Input('value') value: string;

  @Input() type: Type = Type.DIR;

  private get isDirectory(): boolean {
    return this.type === Type.DIR;
  }

  public setValue(value: string) {
    this.value = value;
    this.valueChange.emit(value);
  }

  constructor(private ipcService: IpcService) {}

  ngOnInit(): void {
    this.ipcService.on(IPCMessage.SELECT_PATH_RES, (event, res: IPCResponse) => {
      if (res.isSuccessed) {
        const value = res.data[0];
        this.setValue(value);
      }
    });
  }

  ngOnDestroy(): void {
    this.ipcService.destroy();
  }

  public toSelectPath(e: Event): void {
    this.ipcService.send<{ isDirectory: boolean }>(IPCMessage.SELECT_PATH_REQ, {
      data: { isDirectory: this.isDirectory },
    });
    e.stopPropagation();
  }
}
