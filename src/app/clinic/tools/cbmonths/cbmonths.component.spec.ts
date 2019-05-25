import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CbmonthsComponent } from './cbmonths.component';

describe('CbmonthsComponent', () => {
  let component: CbmonthsComponent;
  let fixture: ComponentFixture<CbmonthsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CbmonthsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CbmonthsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
