import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehcileTypesComponent } from './vehcile-types.component';

describe('VehcileTypesComponent', () => {
  let component: VehcileTypesComponent;
  let fixture: ComponentFixture<VehcileTypesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehcileTypesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VehcileTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
