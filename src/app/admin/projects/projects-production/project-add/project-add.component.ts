import {Component, Input, OnInit} from '@angular/core';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {SharedService} from '@core/service/shared.service';
import {Router} from '@angular/router';
import {AuthService} from '@core';
import {format} from 'date-fns';

@Component({
  selector: 'app-project-add',
  templateUrl: './project-add.component.html',
  styleUrls: ['./project-add.component.sass']
})
export class ProjectAddComponent implements OnInit {

  @Input() modalRef: any;
  clients: any = [];
  projectAddForm: UntypedFormGroup;
  users: any;
  priority: string[] = ['High', 'Normal', 'Low'];
  status: string[] = ['In design', 'Started', 'Completed', 'Suspended'];

  constructor(
    private service: SharedService,
    private fb: UntypedFormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.projectAddForm = this.fb.group({
      name: ["", [Validators.required]],
      number: ["", [Validators.required]],
      order_number: [""],
      priority: ["", [Validators.required]],
      client: ["", [Validators.required]],
      start: ["", [Validators.required]],
      deadline: ["", [Validators.required]],
      status: ["In design", [Validators.required]],
      manager: [this.auth.currentUserValue.id]
    });
  }

  ngOnInit(): void {
    this.loadClients();
  }

  loadClients() {
    this.service.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  addProject() {
    console.log(this.projectAddForm.value)
    this.projectAddForm.value.start = format(new Date(this.projectAddForm.value.start), 'yyyy-MM-dd');
    this.projectAddForm.value.deadline = format(new Date(this.projectAddForm.value.deadline), 'yyyy-MM-dd');
    this.service.addProject(this.projectAddForm.value).subscribe((res: any) => {
      this.modalRef.close();
      this.router.navigate(['admin/project-production/detail', res.id]);
    });
  }
}
