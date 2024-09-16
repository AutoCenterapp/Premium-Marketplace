import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListingFilterComponent } from './car-listing-filter.component';

describe('CarListingSearchFilterComponent', () => {
  let component: CarListingFilterComponent;
  let fixture: ComponentFixture<CarListingFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarListingFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarListingFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
