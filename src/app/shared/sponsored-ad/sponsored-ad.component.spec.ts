import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SponsoredAdComponent } from './sponsored-ad.component';

describe('SponsoredAdComponent', () => {
  let component: SponsoredAdComponent;
  let fixture: ComponentFixture<SponsoredAdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SponsoredAdComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SponsoredAdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
