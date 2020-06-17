import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { BranchSelectorComponent } from './branch-selector.component';
import { IpcService } from '../../services/electron/ipc.service';
import { PathInputModule } from '../path-field/path-field.module';

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
  let component: BranchSelectorComponent;
  let fixture: ComponentFixture<BranchSelectorComponent>;

  beforeEach(() => {
    const spiedIpcService = createSpyObject('IpcService', ['send']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        PathInputModule,
      ],
      declarations: [BranchSelectorComponent],
      providers: [
        { provide: IpcService, useValue: spiedIpcService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BranchSelectorComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
