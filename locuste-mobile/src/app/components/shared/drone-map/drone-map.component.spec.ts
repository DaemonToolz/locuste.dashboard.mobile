import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneMapComponent } from './drone-map.component';

describe('DroneMapComponent', () => {
  let component: DroneMapComponent;
  let fixture: ComponentFixture<DroneMapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DroneMapComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DroneMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
