import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarGlobalFilterComponent } from './car-global-filter.component';

describe('CarGlobalSearchFilterComponent', () => {
  let component: CarGlobalFilterComponent;
  let fixture: ComponentFixture<CarGlobalFilterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarGlobalFilterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarGlobalFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
