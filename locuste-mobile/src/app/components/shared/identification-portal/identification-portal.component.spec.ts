import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdentificationPortalComponent } from './identification-portal.component';

describe('IdentificationPortalComponent', () => {
  let component: IdentificationPortalComponent;
  let fixture: ComponentFixture<IdentificationPortalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdentificationPortalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdentificationPortalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
