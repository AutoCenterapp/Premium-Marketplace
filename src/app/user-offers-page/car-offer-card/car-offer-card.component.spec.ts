import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarOfferCardComponent } from './car-offer-card.component';

describe('CarOfferCardComponent', () => {
  let component: CarOfferCardComponent;
  let fixture: ComponentFixture<CarOfferCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarOfferCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarOfferCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
