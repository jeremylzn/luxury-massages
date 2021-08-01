import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GalleryGestionComponent } from './gallery-gestion.component';

describe('GalleryGestionComponent', () => {
  let component: GalleryGestionComponent;
  let fixture: ComponentFixture<GalleryGestionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GalleryGestionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GalleryGestionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
