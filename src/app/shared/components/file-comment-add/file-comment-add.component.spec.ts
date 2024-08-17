import {ComponentFixture, TestBed} from '@angular/core/testing';

import {FileCommentAddComponent} from './file-comment-add.component';

describe('FileCommentAddComponent', () => {
  let component: FileCommentAddComponent;
  let fixture: ComponentFixture<FileCommentAddComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FileCommentAddComponent]
    })
      .compileComponents();

    fixture = TestBed.createComponent(FileCommentAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
