import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RcaedaComponent } from './rcaeda.component';

describe('RcaedaComponent', () => {
  let component: RcaedaComponent;
  let fixture: ComponentFixture<RcaedaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RcaedaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RcaedaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
