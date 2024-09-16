import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SearchAgainstQueryComponent } from './search-against-query.component';

describe('SearchAgainstQueryComponent', () => {
  let component: SearchAgainstQueryComponent;
  let fixture: ComponentFixture<SearchAgainstQueryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SearchAgainstQueryComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SearchAgainstQueryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
