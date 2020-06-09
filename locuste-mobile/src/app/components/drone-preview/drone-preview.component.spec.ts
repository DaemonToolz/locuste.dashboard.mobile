import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DronePreviewComponent } from './drone-preview.component';

describe('DronePreviewComponent', () => {
  let component: DronePreviewComponent;
  let fixture: ComponentFixture<DronePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DronePreviewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DronePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
