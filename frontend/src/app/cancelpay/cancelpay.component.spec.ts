import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CancelpayComponent } from './cancelpay.component';

describe('CancelpayComponent', () => {
  let component: CancelpayComponent;
  let fixture: ComponentFixture<CancelpayComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CancelpayComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CancelpayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
