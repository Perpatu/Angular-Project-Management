import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '@core/service/shared.service';
import {AuthService} from '@core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";


@Component({
  selector: 'app-file-comment-add',
  templateUrl: './file-comment-add.component.html',
  styleUrls: ['./file-comment-add.component.sass']
})
export class FileCommentAddComponent implements OnInit {

  @Input() fileId: any;
  commentForm: UntypedFormGroup;

  constructor(
    private service: SharedService,
    private auth: AuthService,
    private fb: UntypedFormBuilder,
  ) {
  }

  ngOnInit(): void {
    this.commentForm = this.fb.group({
      user: [this.auth.currentUserValue.id],
      file: [this.fileId],
      text: ['']
    });
  }

  addComment() {
    this.service.addProductionFileComment(this.commentForm.value).subscribe(() => {
      window.location.reload();
    });
  }

}
