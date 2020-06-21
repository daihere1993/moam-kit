import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Component } from '@angular/core';
import { BranchInfo } from 'src/common/types';

import {
  NzModalService,
  NzSelectModule,
  NzIconModule,
  NzDividerModule,
  NzButtonModule,
} from 'ng-zorro-antd';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { BranchSelectorComponent } from './branch-selector.component';
import { IpcService } from '../../services/electron/ipc.service';

function createSpyObject(
  basename: string,
  methodNames: string[],
): { [key: string]: jest.Mock<any> } {
  const obj: { [key: string]: jest.Mock<any> } = {};
  for (const methodName of methodNames) {
    obj[methodName] = jest.fn();
  }
  return obj;
}

describe('BranchSelectorComponent', () => {
  let component: TestBranchSelectorComponent;
  let fixture: ComponentFixture<TestBranchSelectorComponent>;

  beforeEach(() => {
    const spiedIpcService = createSpyObject('IpcService', ['send']);
    const spiedModalService = createSpyObject('NzModalService', ['create']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        BrowserAnimationsModule,
        FormsModule,
        NzButtonModule,
        NzSelectModule,
        NzIconModule,
        NzDividerModule,
      ],
      declarations: [BranchSelectorComponent, TestBranchSelectorComponent],
      providers: [
        { provide: IpcService, useValue: spiedIpcService },
        { provide: NzModalService, useValue: spiedModalService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(TestBranchSelectorComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

@Component({
  template: `
    <branch-selector
      [branches]="branches"
      ([value])="(value)"
      [disabled]="disabled"
    ></branch-selector>
  `,
})
class TestBranchSelectorComponent {
  branches: BranchInfo[] = [
    {
      name: 'name',
      pcDir: 'pcDir',
      serverDir: 'serverDir',
    },
  ];
  value: BranchInfo;
  disabled: true;
}
