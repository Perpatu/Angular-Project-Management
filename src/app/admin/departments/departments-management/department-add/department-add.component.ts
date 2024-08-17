import {Component, Input} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SharedService} from '@core/service/shared.service';
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-department-add',
  templateUrl: './department-add.component.html',
  styleUrls: ['./department-add.component.sass']
})
export class DepartmentAddComponent {

  @Input() modalRef: any;
  departmentAddForm: UntypedFormGroup;

  constructor(
    private service: SharedService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar,
  ) {
    this.departmentAddForm = this.fb.group({
      name: ['', [Validators.required]],
      order: ['', [Validators.required]],
    });
  }

  infoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  onSubmit() {
    this.service.addDepartment(this.departmentAddForm.value).subscribe(() => {
      this.modalRef.close();
      const message = `(${this.departmentAddForm.value.name}) has been added to departments`;
      this.infoSnackBar(message, 'ok');
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([], {
          relativeTo: this.route
        });
      });
    })
  }
}
