import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneControlComponent } from './drone-control.component';

describe('DroneControlComponent', () => {
  let component: DroneControlComponent;
  let fixture: ComponentFixture<DroneControlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DroneControlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DroneControlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
