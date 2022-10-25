import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuselectComponent } from './buselect.component';

describe('BuselectComponent', () => {
  let component: BuselectComponent;
  let fixture: ComponentFixture<BuselectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuselectComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BuselectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
