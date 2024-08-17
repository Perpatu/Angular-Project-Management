import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DepartmentsManagementComponent} from './departments-management.component';

describe('DepartmentsManagementComponent', () => {
  let component: DepartmentsManagementComponent;
  let fixture: ComponentFixture<DepartmentsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DepartmentsManagementComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(DepartmentsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
