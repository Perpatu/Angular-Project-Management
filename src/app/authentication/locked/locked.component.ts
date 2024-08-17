import {Component, OnInit} from "@angular/core";
import {Router} from "@angular/router";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {AuthService} from "@core";


@Component({
  selector: "app-locked",
  templateUrl: "./locked.component.html",
  styleUrls: ["./locked.component.scss"],
})
export class LockedComponent implements OnInit {
  authForm: UntypedFormGroup;
  submitted = false;
  userImg: string;
  userFullName: string;
  hide = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
  }

  get f() {
    return this.authForm.controls;
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      password: ["", Validators.required],
    });

    this.userFullName =
      this.authService.currentUserValue.first_name +
      " " +
      this.authService.currentUserValue.last_name;
  }

  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      const role = this.authService.currentUserValue.role;
      if (role === 'All' || role === 'Admin') {
        this.router.navigate(["/admin/dashboard/main"]);
      } else if (role === 'Employee') {
        this.router.navigate(["/employee/dashboard"]);
      } else if (role === 'Client') {
        this.router.navigate(["/client/dashboard"]);
      } else {
        this.router.navigate(["/authentication/signin"]);
      }
    }
  }
}
