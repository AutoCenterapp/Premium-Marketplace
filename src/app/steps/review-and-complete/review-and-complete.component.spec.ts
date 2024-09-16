import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReviewAndCompleteComponent } from './review-and-complete.component';

describe('ReviewAndCompleteComponent', () => {
  let component: ReviewAndCompleteComponent;
  let fixture: ComponentFixture<ReviewAndCompleteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ReviewAndCompleteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReviewAndCompleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
