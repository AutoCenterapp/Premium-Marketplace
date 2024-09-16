import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GetQualifiedComponent } from './get-qualified.component';

describe('GetQualifiedComponent', () => {
  let component: GetQualifiedComponent;
  let fixture: ComponentFixture<GetQualifiedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetQualifiedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GetQualifiedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
