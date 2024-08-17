import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SharedService} from '@core/service/shared.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.sass']
})

export class UserAddComponent implements OnInit {

  @Input() modalRef: any;
  userForm: UntypedFormGroup;
  departments: any;
  roles: string[] = ['Admin', 'Employee'];

  constructor(
    private fb: UntypedFormBuilder,
    private service: SharedService,
    private snackBar: MatSnackBar,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.userForm = this.fb.group({
      first_name: ["", [Validators.required]],
      last_name: ["", [Validators.required]],
      username: ["", [Validators.required]],
      email: ["", [Validators.required, Validators.email]],
      phone_number: ["", [Validators.maxLength(12)]],
      address: ["", [Validators.maxLength(255)]],
      password: ["", [Validators.required, Validators.minLength(4)]],
      role: ["", [Validators.required]],
      departments: ["", [Validators.required]]
    });
  }

  ngOnInit() {
    this.loadDepartments()
  }

  loadDepartments() {
    this.service.getAdminDepartmentList().subscribe((data: any) => {
      this.departments = data;
    })
  }

  infoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  onSubmit() {
    this.service.register(this.userForm.value).subscribe(() => {
      this.modalRef.close();
      const message = `User (${this.userForm.value.username}) has been added`;
      this.infoSnackBar(message, 'ok');
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([], {
          relativeTo: this.route
        });
      });
    })
  }
}
