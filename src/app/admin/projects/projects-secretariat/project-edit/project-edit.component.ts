import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {SharedService} from '@core/service/shared.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-project-edit',
  templateUrl: './project-edit.component.html',
  styleUrls: ['./project-edit.component.sass']
})
export class ProjectEditComponent implements OnInit {

  @Input() projectData: any;
  @Input() modalRef: any;
  updateForm: UntypedFormGroup;
  params: any;

  constructor(
    private service: SharedService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.updateForm = this.fb.group({
      invoiced: [this.projectData.invoiced],
    });
    this.route.queryParams.subscribe((params: any) => {
      this.params = params;
    });
  }

  onSubmit() {
    this.service.updateProject(this.projectData.id, this.updateForm.value).subscribe(() => {
      this.modalRef.close();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {status: this.params.status},
          queryParamsHandling: 'merge'
        });
      });
    });
  }

}
