import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoSignerComponent } from './co-signer.component';

describe('CoSignerComponent', () => {
  let component: CoSignerComponent;
  let fixture: ComponentFixture<CoSignerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoSignerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoSignerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
