import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstimationCalculatorComponent } from './estimation-calculator.component';

describe('EstimationCalculatorComponent', () => {
  let component: EstimationCalculatorComponent;
  let fixture: ComponentFixture<EstimationCalculatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EstimationCalculatorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EstimationCalculatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
