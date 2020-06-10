import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RTSPStreamerComponent } from './rtspstreamer.component';

describe('RTSPStreamerComponent', () => {
  let component: RTSPStreamerComponent;
  let fixture: ComponentFixture<RTSPStreamerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RTSPStreamerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RTSPStreamerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
