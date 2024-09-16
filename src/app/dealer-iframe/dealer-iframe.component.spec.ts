import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealerIframeComponent } from './dealer-iframe.component';

describe('DealerIframeComponent', () => {
  let component: DealerIframeComponent;
  let fixture: ComponentFixture<DealerIframeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealerIframeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealerIframeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
