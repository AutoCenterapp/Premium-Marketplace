import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApplyOnlineFormComponent } from './apply-online-form.component';

describe('ApplyOnlineFormComponent', () => {
  let component: ApplyOnlineFormComponent;
  let fixture: ComponentFixture<ApplyOnlineFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApplyOnlineFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ApplyOnlineFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
