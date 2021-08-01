import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SmsGestionComponent } from './sms-gestion.component';

describe('SmsGestionComponent', () => {
  let component: SmsGestionComponent;
  let fixture: ComponentFixture<SmsGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SmsGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SmsGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
