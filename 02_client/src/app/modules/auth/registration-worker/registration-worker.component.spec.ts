import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegistrationWorkerComponent } from './registration-worker.component';

describe('RegistrationWorkerComponent', () => {
  let component: RegistrationWorkerComponent;
  let fixture: ComponentFixture<RegistrationWorkerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RegistrationWorkerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegistrationWorkerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
