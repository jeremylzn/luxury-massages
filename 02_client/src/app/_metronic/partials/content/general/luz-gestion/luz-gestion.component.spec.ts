import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LuzGestionComponent } from './luz-gestion.component';

describe('LuzGestionComponent', () => {
  let component: LuzGestionComponent;
  let fixture: ComponentFixture<LuzGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LuzGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LuzGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
