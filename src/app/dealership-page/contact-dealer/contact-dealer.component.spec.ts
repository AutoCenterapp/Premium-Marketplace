import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactDealerComponent } from './contact-dealer.component';

describe('ContactDealerComponent', () => {
  let component: ContactDealerComponent;
  let fixture: ComponentFixture<ContactDealerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContactDealerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContactDealerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
