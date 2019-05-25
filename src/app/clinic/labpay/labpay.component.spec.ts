import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LabpayComponent } from './labpay.component';

describe('LabpayComponent', () => {
  let component: LabpayComponent;
  let fixture: ComponentFixture<LabpayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LabpayComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LabpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
