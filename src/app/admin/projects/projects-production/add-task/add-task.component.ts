import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {SharedService} from '@core/service/shared.service';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';
import {AuthService} from '@core';


@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent implements OnInit {

  @ViewChild('picker') picker: any;
  @Input() modalRef: any;
  @Input() department: any;
  @Input() file: any;
  @Input() project: any;
  users: any = [];

  taskAddForm: UntypedFormGroup;


  constructor(
    private service: SharedService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private auth: AuthService,
  ) {
  }

  ngOnInit(): void {
    this.loadsUser();
    this.loadsForms();
  }

  loadsForms() {
    this.taskAddForm = this.fb.group({
      manager: [this.auth.currentUserValue.id],
      file: [this.file, [Validators.required]],
      department: [this.department, [Validators.required]],
      project: [this.project, [Validators.required]],
      users: ["", [Validators.required]],
      planned_start_date: ["", [Validators.required]],
      planned_end_date: ["", [Validators.required]]
    });
  }

  loadsUser() {
    this.service.getAssignedEmployee(this.department).subscribe((data: any) => {
      this.users = data;
    })
  }

  addTask() {
    this.service.addTask(this.taskAddForm.value).subscribe(() => {
      this.modalRef.close();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([], {
          relativeTo: this.route,
        });
      });
    });
  }
}
