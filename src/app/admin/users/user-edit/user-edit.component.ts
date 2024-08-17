import {Component, Input, OnInit} from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SharedService} from "@core/service/shared.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {ActivatedRoute, Router} from '@angular/router';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from "@core";


@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.sass']
})
export class UserEditComponent implements OnInit {

  @Input() userData: any;
  @Input() modalRef: any;
  userEditForm: UntypedFormGroup;
  departments: any;
  roles: string[] = ['Admin', 'Employee'];

  constructor(
    private fb: UntypedFormBuilder,
    private service: SharedService,
    private router: Router,
    private snackBar: MatSnackBar,
    private route: ActivatedRoute,
    private cookieService: CookieService,
    private auth: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.loadDepartments()
    this.userEditForm = this.fb.group({
      first_name: [this.userData.first_name],
      last_name: [this.userData.last_name],
      username: [this.userData.username],
      password: ['', [Validators.minLength(4)]],
      address: [this.userData.address, [Validators.maxLength(255)]],
      phone_number: [this.userData.phone_number, [Validators.maxLength(12)]],
      role: [this.userData.role],
      email: [this.userData.email,
        [Validators.email],
      ],
      departments: [this.userData.departments,],
    });
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
    if (this.userEditForm.value.password != '') {
      console.log(this.userEditForm.value)
      this.service.updateUser(this.userEditForm.value, this.userData.id).subscribe(() => {
        const message = `User (${this.userEditForm.value.username}) password has been updated`;
        this.modalRef.close()
        this.infoSnackBar(message, 'ok');
        if (this.userData.id === this.auth.currentUserValue.id) {
          this.cookieService.delete('user');
          this.cookieService.delete('auth');
          this.router.navigateByUrl('/');
        }
      });
    } else {
      delete this.userEditForm.value.password;
      this.service.updateUser(this.userEditForm.value, this.userData.id).subscribe(() => {
        const message = `User (${this.userEditForm.value.username}) has been updated`;
        this.infoSnackBar(message, 'ok');
        this.modalRef.close()
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([], {
            relativeTo: this.route
          });
        });
      });
    }
  }
}
