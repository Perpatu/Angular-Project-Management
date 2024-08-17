import {Component, OnInit} from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SharedService} from "@core/service/shared.service";
import {ActivatedRoute, Router} from '@angular/router';
import {MatSnackBar} from '@angular/material/snack-bar';
import {CookieService} from 'ngx-cookie-service';
import {AuthService} from "@core";


@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.sass']
})
export class UserProfileComponent implements OnInit {

  user: any = [];
  userEditForm: UntypedFormGroup;
  roles: string[] = ['Admin', 'Employee'];

  constructor(
    private fb: UntypedFormBuilder,
    private service: SharedService,
    private auth: AuthService,
    private router: Router,
    private route: ActivatedRoute,
    public snackBar: MatSnackBar,
    private cookieService: CookieService,
  ) {

  }

  ngOnInit(): void {
    this.loadUserData();
    this.loadForm();
  }

  loadUserData() {
    this.service.getUserCurrent().subscribe((data: unknown) => {
      this.user = data;
    });
  }

  loadForm() {
    this.user = this.auth.currentUserValue;
    this.userEditForm = this.fb.group({
      first_name: [this.user.first_name],
      last_name: [this.user.last_name],
      username: [this.user.username],
      password: ['', Validators.minLength(4)],
      address: [this.user.address, [Validators.maxLength(255)]],
      phone_number: [this.user.phone_number, [Validators.maxLength(12)]],
      role: [this.user.role],
      email: [this.user.email,
        [Validators.email],
      ],
    });
  }

  infoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  onSubmit() {
    if (this.userEditForm.value.password != '') {
      this.service.updateUser(this.userEditForm.value, this.user.id).subscribe(() => {
        const message = `User (${this.userEditForm.value.username}) password has been updated`;
        this.infoSnackBar(message, 'ok');
        if (this.user.id === this.auth.currentUserValue.id) {
          this.cookieService.delete('user');
          this.cookieService.delete('auth');
          this.router.navigateByUrl('/');
        }
      });
    } else {
      delete this.userEditForm.value.password;
      this.service.updateUser(this.userEditForm.value, this.user.id).subscribe(() => {
        const message = `User (${this.userEditForm.value.username}) has been updated`;
        this.infoSnackBar(message, 'ok');
        this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
          this.router.navigate([], {
            relativeTo: this.route
          });
        });
      });
    }
  }
}
