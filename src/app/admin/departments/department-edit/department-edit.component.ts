import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {SharedService} from '@core/service/shared.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-department-edit',
  templateUrl: './department-edit.component.html',
  styleUrls: ['./department-edit.component.scss']
})
export class DepartmentEditComponent implements OnInit {

  @Input() modalRef: any;
  @Input() department: any;
  departmentUpdateForm: UntypedFormGroup;

  constructor(
    private service: SharedService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.departmentUpdateForm = this.fb.group({
      name: [this.department.name],
      order: [this.department.order]
    });
  }

  onSubmit() {
    this.service.updateDepartment(this.department.id, this.departmentUpdateForm.value).subscribe(() => {
      this.modalRef.close();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([], {
          relativeTo: this.route
        });
      });
    })
  }

}
