import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FullScreenViewerComponent } from './full-screen-viewer.component';

describe('FullScreenViewerComponent', () => {
  let component: FullScreenViewerComponent;
  let fixture: ComponentFixture<FullScreenViewerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FullScreenViewerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FullScreenViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
