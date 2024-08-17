import {Component, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '@core/service/shared.service';
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {MatSort} from '@angular/material/sort';


@Component({
  selector: 'app-client-projects',
  templateUrl: './client-projects.component.html',
  styleUrls: ['./client-projects.component.sass']
})
export class ClientProjectsComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  selectedStatus = "ACTIVE_PROJECT";
  clientName: string = this.router.url.split('/')[4];
  projectData: any = [];
  ProjectListArchive: any = [];
  dataSource: any = [];
  titleModal: string;
  projectAddEditModal = 'edit';
  displayedColumns = ['Project_number', 'Project_order_number', 'Project_name',
    'Project_client', 'Project_date_created', 'Project_end_date', 'Project_priority',
    'Project_progress', 'Project_status', 'User_created', 'Option'];

  constructor(
    private service: SharedService,
    private router: Router,
    private modalService: NgbModal
  ) {
  }

  ngOnInit(): void {
    //this.loadData();
  }

  /*loadData() {
      this.service.getProjectsActiveClient(this.clientName).subscribe((data) => {
          this.projectData = data;
          this.dataSource = new MatTableDataSource(this.projectData);
          this.dataSource.sort = this.sort;
      });
  }

  showProject() {
      if (this.selectedStatus === 'ACTIVE_PROJECT') {
          this.service.getProjectsActiveClient(this.clientName).subscribe(data => {
              this.projectData = data;
              this.dataSource = new MatTableDataSource(this.projectData);
              this.dataSource.sort = this.sort;
          });
      } else if (this.selectedStatus === 'END_PROJECT') {
          this.service.getProjectsCompletedClient(this.clientName).subscribe(data => {
              this.ProjectListArchive = data;
              this.dataSource = new MatTableDataSource(this.ProjectListArchive);
              this.dataSource.sort = this.sort;
          });
      }
  }

  FilterData(event: Event) {
      const filterValue = (event.target as HTMLInputElement).value;
      this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  openEditProject(content) {
      this.titleModal = "Edit project";
      this.projectAddEditModal = "edit";
      this.modalService.open(content, { centered: true, size: 'lg' });
  }

  deleteProject(item: any) {
      if (confirm('Are you sure you want to delete this project' + ' (' + item.project_number + ')')) {
          this.service.deleteProject(item.project_id).subscribe(() => {
              this.loadData();
          });
      }
  }*/

}
