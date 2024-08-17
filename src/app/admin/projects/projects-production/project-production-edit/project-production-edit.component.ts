import {Component, Input, OnInit} from "@angular/core";
import {UntypedFormBuilder, UntypedFormGroup} from "@angular/forms";
import {SharedService} from "@core/service/shared.service";
import {ActivatedRoute, Router} from '@angular/router';
import {format} from 'date-fns';


@Component({
  selector: 'app-project-production-edit',
  templateUrl: './project-production-edit.component.html',
  styleUrls: ['./project-production-edit.component.sass']
})
export class ProjectProductionEditComponent implements OnInit {

  @Input() projectData: any;
  @Input() modalRef: any;
  adminList: any = [];
  clients: any = [];
  updateForm: UntypedFormGroup;
  users: any;
  priority: string[] = ['High', 'Normal', 'Low'];
  status: string[] = ['In design', 'Started', 'Completed', 'Suspended'];
  currentPage = 1;
  pageSize = 20;
  params: any;

  constructor(
    private service: SharedService,
    private fb: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
  ) {
  }

  ngOnInit(): void {
    this.loadClients();
    this.loadAdmins();
    this.updateForm = this.fb.group({
      name: [this.projectData.name],
      number: [this.projectData.number],
      priority: [this.projectData.priority],
      client: [this.projectData.client.id],
      deadline: [this.projectData.deadline],
      start: [this.projectData.start],
      order_number: [this.projectData.order_number],
      status: [this.projectData.status],
      manager: [this.projectData.manager.id],
    });
    this.route.queryParams.subscribe((params: any) => {
      this.params = params;
    });
  }


  loadAdmins() {
    this.service.getUsersAdmin().subscribe(data => {
      this.adminList = data;
    });
  }

  loadClients() {
    this.service.getClients().subscribe(data => {
      this.clients = data;
    });
  }

  updateProject() {
    this.updateForm.value.start = format(new Date(this.updateForm.value.start), 'yyyy-MM-dd');
    this.updateForm.value.deadline = format(new Date(this.updateForm.value.deadline), 'yyyy-MM-dd');
    this.service.updateProject(this.projectData.id, this.updateForm.value,).subscribe(() => {
      this.modalRef.close();
      this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate([], {
          relativeTo: this.route,
          queryParams: {status: this.params.status, page_size: this.pageSize, page_number: this.currentPage},
          queryParamsHandling: 'merge'
        });
      });
    });
  }

}


