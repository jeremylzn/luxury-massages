import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShedulerWidget2Component } from './sheduler-widget2.component';

describe('ShedulerWidget2Component', () => {
  let component: ShedulerWidget2Component;
  let fixture: ComponentFixture<ShedulerWidget2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShedulerWidget2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShedulerWidget2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
