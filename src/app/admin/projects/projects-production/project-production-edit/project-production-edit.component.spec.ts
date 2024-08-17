import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectProductionEditComponent} from './project-production-edit.component';

describe('ProjectProductionEditComponent', () => {
  let component: ProjectProductionEditComponent;
  let fixture: ComponentFixture<ProjectProductionEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectProductionEditComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectProductionEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
