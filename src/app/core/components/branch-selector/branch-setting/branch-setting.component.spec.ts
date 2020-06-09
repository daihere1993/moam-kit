import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchSettingComponent } from './branch-setting.component';

describe('BranchSettingComponent', () => {
  let component: BranchSettingComponent;
  let fixture: ComponentFixture<BranchSettingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchSettingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchSettingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
