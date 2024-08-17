import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectProductionDetailComponent} from './project-production-detail.component';

describe('ProjectProductionDetailComponent', () => {
  let component: ProjectProductionDetailComponent;
  let fixture: ComponentFixture<ProjectProductionDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectProductionDetailComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectProductionDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
