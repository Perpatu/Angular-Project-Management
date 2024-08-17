import {Component, Input, OnInit} from '@angular/core';
import {SharedService} from '@core/service/shared.service';
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-manage-task',
  templateUrl: './manage-task.component.html',
  styleUrls: ['./manage-task.component.scss']
})

export class ManageTaskComponent implements OnInit {

  @Input() modalRef: any;
  @Input() task: any;
  users: any = [];

  taskUpdateForm: UntypedFormGroup;


  constructor(
    private service: SharedService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }


  ngOnInit(): void {
    this.userEdit();
    this.loadsUser();
    this.loadsForms();
  }

  userEdit() {
    if (typeof this.task.users[0] === 'object') {
      const usersId = [];
      for (const user of this.task.users) {
        usersId.push(user.id);
      }
      this.task.users = usersId;
    }
  }


  loadsForms() {
    this.taskUpdateForm = this.fb.group({
      users: [this.task.users,],
      planned_start_date: [this.task.planned_start_date,],
      planned_end_date: [this.task.planned_end_date,],
      test: [this.task.test,],
    });
  }

  loadsUser() {
    this.service.getAssignedEmployee(this.task.department).subscribe((data: any) => {
      this.users = data;
    })
  }

  updateTask() {
    this.service.updateTask(this.task.id, this.taskUpdateForm.value).subscribe(() => {
      this.modalRef.close();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([], {
          relativeTo: this.route,
        });
      });
    });
  }

  deleteTask() {
    this.service.deleteTask(this.task.id).subscribe(() => {
      this.modalRef.close();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([], {
          relativeTo: this.route,
        });
      });
    })
  }
}
