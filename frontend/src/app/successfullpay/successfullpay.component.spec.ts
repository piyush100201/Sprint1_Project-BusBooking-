import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuccessfullpayComponent } from './successfullpay.component';

describe('SuccessfullpayComponent', () => {
  let component: SuccessfullpayComponent;
  let fixture: ComponentFixture<SuccessfullpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuccessfullpayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SuccessfullpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
