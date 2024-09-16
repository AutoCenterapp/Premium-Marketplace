import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FvrtCarCardComponent } from './fvrt-car-card.component';

describe('FvrtCarCardComponent', () => {
  let component: FvrtCarCardComponent;
  let fixture: ComponentFixture<FvrtCarCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FvrtCarCardComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FvrtCarCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
