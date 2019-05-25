import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DoctorpayComponent } from './doctorpay.component';

describe('DoctorpayComponent', () => {
  let component: DoctorpayComponent;
  let fixture: ComponentFixture<DoctorpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DoctorpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DoctorpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
