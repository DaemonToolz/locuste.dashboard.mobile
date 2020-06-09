import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DroneConsoleComponent } from './drone-console.component';

describe('DroneConsoleComponent', () => {
  let component: DroneConsoleComponent;
  let fixture: ComponentFixture<DroneConsoleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DroneConsoleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DroneConsoleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
