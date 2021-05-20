import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerWidget1Component } from './scheduler-widget1.component';

describe('SchedulerWidget1Component', () => {
  let component: SchedulerWidget1Component;
  let fixture: ComponentFixture<SchedulerWidget1Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerWidget1Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerWidget1Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
