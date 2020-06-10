import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HubMonitoringComponent } from './hub-monitoring.component';

describe('HubMonitoringComponent', () => {
  let component: HubMonitoringComponent;
  let fixture: ComponentFixture<HubMonitoringComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HubMonitoringComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HubMonitoringComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
