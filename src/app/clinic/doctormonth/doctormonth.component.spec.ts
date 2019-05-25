import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctormonthComponent } from './doctormonth.component';

describe('DoctormonthComponent', () => {
  let component: DoctormonthComponent;
  let fixture: ComponentFixture<DoctormonthComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctormonthComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctormonthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
