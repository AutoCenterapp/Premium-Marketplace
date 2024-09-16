import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CompleteSolutionsComponent } from './complete-solutions.component';

describe('CompleteSolutionsComponent', () => {
  let component: CompleteSolutionsComponent;
  let fixture: ComponentFixture<CompleteSolutionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CompleteSolutionsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CompleteSolutionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
