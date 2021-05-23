import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WorkerGestionComponent } from './worker-gestion.component';

describe('WorkerGestionComponent', () => {
  let component: WorkerGestionComponent;
  let fixture: ComponentFixture<WorkerGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WorkerGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WorkerGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
