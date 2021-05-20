import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdvertisingGestionComponent } from './advertising-gestion.component';

describe('AdvertisingGestionComponent', () => {
  let component: AdvertisingGestionComponent;
  let fixture: ComponentFixture<AdvertisingGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdvertisingGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdvertisingGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
