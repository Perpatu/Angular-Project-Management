import {Component, Input} from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SharedService} from "@core/service/shared.service";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-client-add',
  templateUrl: './client-add.component.html',
  styleUrls: ['./client-add.component.sass']
})
export class ClientAddComponent {

  @Input() modalRef: any;
  clientAddForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
    this.clientAddForm = this.fb.group({
      name: ["", [Validators.required]],
      phone_number: [""],
      email: [""],
      address: [""],
      color: ["#3788D8"]
    });
  }

  onSubmit() {
    this.service.addClient(this.clientAddForm.value).subscribe(() => {
      this.modalRef.close();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([], {
          relativeTo: this.route
        });
      });
    });
  }
}
