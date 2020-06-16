import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  NbDialogService,
  NbInputModule,
  NbFormFieldModule,
  NbButtonModule,
  NbIconModule,
  NbSelectModule,
  NbCardModule,
  NbDialogModule,
} from '@nebular/theme';
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
    const spiedDialogService = createSpyObject('NbDialogService', ['open']);

    TestBed.configureTestingModule({
      imports: [
        CommonModule,
        FormsModule,
        PathInputModule,
        NbInputModule,
        NbFormFieldModule,
        NbButtonModule,
        NbIconModule,
        NbSelectModule,
        NbCardModule,
        NbDialogModule.forChild({ closeOnBackdropClick: false }),
      ],
      declarations: [BranchSelectorComponent],
      providers: [
        { provide: NbDialogService, useValue: spiedDialogService },
        { provide: IpcService, useValue: spiedIpcService },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(BranchSelectorComponent);
    component = fixture.componentInstance;

    TestBed.inject(NbDialogService);
    TestBed.inject(IpcService);

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
