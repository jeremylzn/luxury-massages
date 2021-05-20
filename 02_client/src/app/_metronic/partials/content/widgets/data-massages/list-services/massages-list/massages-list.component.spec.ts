import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MassagesListComponent } from './massages-list.component';

describe('MassagesListComponent', () => {
  let component: MassagesListComponent;
  let fixture: ComponentFixture<MassagesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MassagesListComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MassagesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
