import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestDemoPageComponent } from './request-demo-page.component';

describe('RequestDemoPageComponent', () => {
  let component: RequestDemoPageComponent;
  let fixture: ComponentFixture<RequestDemoPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RequestDemoPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RequestDemoPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
