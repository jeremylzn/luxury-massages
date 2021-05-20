import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerWidget3Component } from './scheduler-widget3.component';

describe('SchedulerWidget3Component', () => {
  let component: SchedulerWidget3Component;
  let fixture: ComponentFixture<SchedulerWidget3Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerWidget3Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerWidget3Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
