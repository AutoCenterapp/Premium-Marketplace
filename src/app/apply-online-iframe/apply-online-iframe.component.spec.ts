import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyOnlineIframeComponent } from './apply-online-iframe.component';

describe('ApplyOnlineIframeComponent', () => {
  let component: ApplyOnlineIframeComponent;
  let fixture: ComponentFixture<ApplyOnlineIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyOnlineIframeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyOnlineIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
