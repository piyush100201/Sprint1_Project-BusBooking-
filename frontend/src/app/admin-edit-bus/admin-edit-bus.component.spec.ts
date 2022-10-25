import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEditBusComponent } from './admin-edit-bus.component';

describe('AdminEditBusComponent', () => {
  let component: AdminEditBusComponent;
  let fixture: ComponentFixture<AdminEditBusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEditBusComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminEditBusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
