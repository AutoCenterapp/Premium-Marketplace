import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealershipCardComponent } from './dealership-card.component';

describe('DealershipCardComponent', () => {
  let component: DealershipCardComponent;
  let fixture: ComponentFixture<DealershipCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealershipCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealershipCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
