import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectOfferComponent } from './select-offer.component';

describe('SelectOfferComponent', () => {
  let component: SelectOfferComponent;
  let fixture: ComponentFixture<SelectOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SelectOfferComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
