import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PathInputComponent } from './path-field.component';

describe('PathInputComponent', () => {
  let component: PathInputComponent;
  let fixture: ComponentFixture<PathInputComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PathInputComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PathInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
