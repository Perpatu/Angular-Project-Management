import {Component, Input, OnInit} from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SharedService} from '@core/service/shared.service';
import {ActivatedRoute, Router} from '@angular/router';


@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  animations: [
    trigger("inOutAnimation", [
      transition(":enter", [
        style({background: "red"}),
        animate("1s ease-out", style({})),
      ]),
    ]),
  ],
  styleUrls: ['./client-edit.component.sass']
})
export class ClientEditComponent implements OnInit {

  @Input() clientData: any;
  @Input() modalRef: any;
  clientUpdateForm: UntypedFormGroup;

  constructor(
    private fb: UntypedFormBuilder,
    private service: SharedService,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.clientUpdateForm = this.fb.group({
      name: [this.clientData.name],
      phone_number: [this.clientData.phone_number],
      email: [
        this.clientData.email,
        [Validators.email],
      ],
      address: [this.clientData.address],
      color: [this.clientData.color]
    });
  }

  onSubmit() {
    this.service.updateClient(this.clientData.id, this.clientUpdateForm.value).subscribe(() => {
      this.modalRef.close();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([], {
          relativeTo: this.route
        });
      });
    });
  }

}
