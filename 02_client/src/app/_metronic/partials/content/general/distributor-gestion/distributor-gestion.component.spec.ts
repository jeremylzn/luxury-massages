import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributorGestionComponent } from './distributor-gestion.component';

describe('DistributorGestionComponent', () => {
  let component: DistributorGestionComponent;
  let fixture: ComponentFixture<DistributorGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DistributorGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DistributorGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
