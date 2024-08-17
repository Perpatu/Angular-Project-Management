import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectsProductionBoardComponent} from './projects-production-board.component';

describe('ProjectsProductionBoardComponent', () => {
  let component: ProjectsProductionBoardComponent;
  let fixture: ComponentFixture<ProjectsProductionBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsProductionBoardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsProductionBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
