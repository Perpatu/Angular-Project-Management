import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "@core";
import {SharedService} from "@core/service/shared.service";
import {UnsubscribeOnDestroyAdapter} from "@shared";
import {CookieService} from 'ngx-cookie-service';

@Component({
  selector: "app-signin",
  templateUrl: "./signin.component.html",
  styleUrls: ["./signin.component.scss"],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = "";
  hide = true;
  User: any = [];

  constructor(
    private service: SharedService,
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService,
    private cookieService: CookieService,
  ) {
    super();
  }

  get f() {
    return this.authForm.controls;
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ["", Validators.required],
      password: ["", Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = "";
    if (this.authForm.invalid) {
      this.error = "Password and Username are incorrect";
      return;
    } else {
      this.subs.sink = this.authService
        .login(this.f['username'].value, this.f['password'].value)
        .subscribe(
          (res) => {
            if (res) {
              this.service.getUserCurrent().subscribe(
                (user) => {
                  this.cookieService.set('user', JSON.stringify(user));
                  const role = user['role'];
                  if (role === 'All' || role === 'Admin') {
                    this.router.navigate(['/admin/dashboard/main']);
                  } else if (role === 'Employee') {
                    this.router.navigate(['/employee/dashboard/main']);
                  } else {
                    this.router.navigate(['/authentication/signin']);
                  }
                  this.loading = false;
                },
                (error) => {
                  console.error(error);
                  this.loading = false;
                }
              );
            } else {
              this.error = 'Invalid Login';
            }
          },
          (error) => {
            this.error = error.error.detail;
            this.submitted = false;
            this.loading = false;
          }
        );

    }
  }


}
