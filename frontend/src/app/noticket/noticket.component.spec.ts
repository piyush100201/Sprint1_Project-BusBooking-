import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoticketComponent } from './noticket.component';

describe('NoticketComponent', () => {
  let component: NoticketComponent;
  let fixture: ComponentFixture<NoticketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NoticketComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NoticketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
