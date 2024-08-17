import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectsSecretariatBoardComponent} from './projects-secretariat-board.component';

describe('ProjectsSecretariatBoardComponent', () => {
  let component: ProjectsSecretariatBoardComponent;
  let fixture: ComponentFixture<ProjectsSecretariatBoardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectsSecretariatBoardComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectsSecretariatBoardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
