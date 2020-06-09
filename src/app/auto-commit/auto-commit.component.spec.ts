import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutoCommitComponent } from './auto-commit.component';

describe('AutoCommitComponent', () => {
  let component: AutoCommitComponent;
  let fixture: ComponentFixture<AutoCommitComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutoCommitComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutoCommitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
