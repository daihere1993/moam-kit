import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
} from '@angular/core';
import { IPCResponse, IPCMessage } from 'src/common/types';
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
export class PathInputComponent implements OnInit, OnDestroy, OnChanges {
  @Output() valueChange: EventEmitter<string> = new EventEmitter();

  @Input() placeholder: string;

  private _value: string;

  @Input('value')
  get value(): string {
    if (this._value) {
      return this._value;
    }
    return '';
  }

  set value(v: string) {
    if (v) {
      this._value = v;
    }
  }

  @Input() type: Type = Type.DIR;

  private get isDirectory(): boolean {
    return this.type === Type.DIR;
  }

  constructor(private ipcService: IpcService) {}

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes);
  }

  ngOnInit(): void {
    this.ipcService.on(IPCMessage.SELECT_PATH_RES, (event, res: IPCResponse) => {
      if (res.isSuccessed) {
        this.value = res.data[0] as string;
        this.valueChange.emit(this.value);
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
