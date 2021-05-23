import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SchedulerWidgetWeekComponent } from './scheduler-widget-week.component';

describe('SchedulerWidgetWeekComponent', () => {
  let component: SchedulerWidgetWeekComponent;
  let fixture: ComponentFixture<SchedulerWidgetWeekComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SchedulerWidgetWeekComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SchedulerWidgetWeekComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
