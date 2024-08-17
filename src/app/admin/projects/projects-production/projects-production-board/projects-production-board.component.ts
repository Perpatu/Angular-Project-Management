import {Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {SharedService} from "@core/service/shared.service";
import {ActivatedRoute, Router} from '@angular/router';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {MatPaginator, PageEvent} from "@angular/material/paginator";
import {WebSocketService} from "@core/service/web-socket.service";

@Component({
  selector: 'app-projects-production-board',
  templateUrl: './projects-production-board.component.html',
  styleUrls: ['./projects-production-board.component.sass']
})
export class ProjectsProductionBoardComponent implements OnInit {
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild("paginator") paginator: MatPaginator;

  projects: any = [];
  status: string;
  dataSource: any = [];
  currentPage = 1;
  totalItems: number;
  pageSize = 20;
  pageSizeOptions: number[] = [20, 30, 50, 100];
  isWideScreen: boolean = window.innerWidth >= 960;
  modalRef: NgbModalRef;
  projectData: any;
  titleModal: string;
  projectAddEditModal: string;
  columns: string[] = ['number', 'order_number', 'name', 'client', 'start',
    'deadline', 'priority', 'progress', 'status', 'manager', 'options']


  constructor(
    private service: SharedService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
    private websocketService: WebSocketService,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isWideScreen = window.innerWidth >= 960;
  }

  public ngOnInit(): void {
    this.wsConnections();
    this.route.queryParams.subscribe((params: any) => {
      this.status = params.status;
      this.pageSize = params.page_size;
      this.currentPage = params.page_number;
      this.loadProjects();
    });
  }

  wsConnections(): void {
    this.websocketService.connectProjectData().subscribe({
      next: (message) => {
        const messageObject = JSON.parse(message)
        const projectObject = messageObject.message.project
        const action = messageObject.message.action
        const projectStatus = messageObject.message.project_status
        const paramsStatus = this.projectStatusWs(this.status)
        if (paramsStatus === projectStatus) {
          if (action === "create") {
            this.addProjectWs(projectObject);
          } else if (action === "update") {
            const projectId = projectObject.id
            this.updateProjectWs(projectId, projectObject)
          } else if (action === "delete") {
            this.deleteProjectWs(projectObject)
          }
        }
      },
      error: (err) => console.error(err)
    });
  }

  projectStatusWs(projectStatus: string): string {
    const statusSplit = projectStatus.split('_')
    if (statusSplit.length === 1) {
      projectStatus = statusSplit[0]
    } else {
      projectStatus = statusSplit[1]
    }
    return projectStatus;
  }

  addProjectWs(newProject: any) {
    this.projects.push(newProject);
    this.dataSource = new MatTableDataSource(this.projects);
    this.dataSource.sort = this.sort;
    this.totalItems = this.totalItems + 1;
  }

  deleteProjectWs(projectId: any) {
    const projectIndex = this.projects.findIndex((object: any) => object.id === projectId);
    this.projects.splice(projectIndex, 1);
    this.dataSource = new MatTableDataSource(this.projects);
    this.dataSource.sort = this.sort;
    this.totalItems = this.totalItems - 1;
  }

  updateProjectWs(projectId: any, projectData: any) {
    const projectIndex = this.projects.findIndex((object: any) => object.id === projectId);
    this.projects[projectIndex] = projectData
    this.dataSource = new MatTableDataSource(this.projects);
    this.dataSource.sort = this.sort;
    this.totalItems = this.totalItems - 1;
  }

  paramsStatus() {
    this.router.navigate([], {
      relativeTo: this.route,
      queryParams: {
        status: this.status,
        page_size: this.pageSize,
        page_number: this.currentPage
      },
      queryParamsHandling: 'merge'
    });
  }

  loadProjects() {
    this.service.getProjectsBoard(this.status, this.pageSize, this.currentPage).subscribe((data: any) => {
      this.projects = data.data;
      this.dataSource = new MatTableDataSource(this.projects);
      if (this.projects.length > 0) {
        this.dataSource.sort = this.sort;
      }
      this.totalItems = data.totalItems;
    })
  }

  onPageChange(event: PageEvent) {
    const pageSize = event.pageSize;
    const currentPage = event.pageIndex + 1;
    this.service.getProjectsBoard(this.status, pageSize, currentPage).subscribe((data: any) => {
      this.projects = data.data;
      this.dataSource = new MatTableDataSource(this.projects);
      this.dataSource.sort = this.sort;
      this.totalItems = data.totalItems;
    })
  }

  searchProject(searchValue: any) {
    this.service.searchProjectAuth(searchValue, this.status, this.pageSize, this.currentPage).subscribe((data: any) => {
      console.log(data)
      this.projects = data.data;
      this.dataSource = new MatTableDataSource(this.projects);
      this.dataSource.sort = this.sort;
      this.totalItems = data.totalItems;
    });
  }

  openAddProject(content: any) {
    this.titleModal = "Add Project";
    this.projectAddEditModal = "add";
    this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
  }

  openEditProject(content: any, project: any) {
    this.projectData = project;
    this.titleModal = "Edit Project";
    this.projectAddEditModal = "edit";
    this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
  }

  deleteProject(projectId: any) {
    this.service.deleteProject(projectId).subscribe(() => {
      this.loadProjects();
    });
  }
}
