import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DealershipsComponent } from './dealerships.component';

describe('DealershipsComponent', () => {
  let component: DealershipsComponent;
  let fixture: ComponentFixture<DealershipsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DealershipsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DealershipsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
