import {ComponentFixture, TestBed} from '@angular/core/testing';

import {DepartmentEditComponent} from './department-edit.component';

describe('DepartmentEditComponent', () => {
  let component: DepartmentEditComponent;
  let fixture: ComponentFixture<DepartmentEditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepartmentEditComponent]
    });
    fixture = TestBed.createComponent(DepartmentEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
