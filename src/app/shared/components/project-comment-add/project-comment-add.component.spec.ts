import {ComponentFixture, TestBed} from '@angular/core/testing';

import {ProjectCommentAddComponent} from './project-comment-add.component';

describe('ProjectCommentAddComponent', () => {
  let component: ProjectCommentAddComponent;
  let fixture: ComponentFixture<ProjectCommentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ProjectCommentAddComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(ProjectCommentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
