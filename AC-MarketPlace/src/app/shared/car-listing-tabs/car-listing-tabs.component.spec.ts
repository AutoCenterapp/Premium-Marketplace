import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarListingTabsComponent } from './car-listing-tabs.component';

describe('CarListingTabsComponent', () => {
  let component: CarListingTabsComponent;
  let fixture: ComponentFixture<CarListingTabsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarListingTabsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarListingTabsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
