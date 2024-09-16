import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarDetailsLeftSideComponent } from './car-details-right-side.component';

describe('CarDetailsLeftSideComponent', () => {
  let component: CarDetailsLeftSideComponent;
  let fixture: ComponentFixture<CarDetailsLeftSideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarDetailsLeftSideComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarDetailsLeftSideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
