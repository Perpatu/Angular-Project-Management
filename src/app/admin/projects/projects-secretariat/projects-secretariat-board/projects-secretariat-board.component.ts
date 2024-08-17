import {Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {SharedService} from "@core/service/shared.service";
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {ActivatedRoute, Router} from '@angular/router';
import {MatPaginator, PageEvent} from "@angular/material/paginator";

@Component({
  selector: 'app-projects-secretariat-board',
  templateUrl: './projects-secretariat-board.component.html',
  styleUrls: ['./projects-secretariat-board.component.sass']
})

export class ProjectsSecretariatBoardComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('paginator') paginator: MatPaginator;

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
  projectAddEditModal: string;
  columns: string[] = ['number', 'order_number', 'name', 'client', 'start',
    'deadline', 'progress', 'status', 'manager', 'options']


  constructor(
    private service: SharedService,
    private route: ActivatedRoute,
    private modalService: NgbModal,
    private router: Router,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isWideScreen = window.innerWidth >= 960;
  }

  public ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      this.status = params.status;
      this.loadProjects();
    });
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
    this.service.getProjectsSecretariatBoard(this.status, this.pageSize, this.currentPage).subscribe((data: any) => {
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
    this.service.getProjectsSecretariatBoard(this.status, pageSize, currentPage).subscribe((data: any) => {
      this.projects = data.data;
      this.dataSource = new MatTableDataSource(this.projects);
      this.dataSource.sort = this.sort;
      this.totalItems = data.files.totalItems;
    })
  }

  searchProject(searchValue: any) {
    this.service.searchProjectSecretariat(searchValue, this.status).subscribe((data: any) => {

      this.projects = data;
      this.dataSource = new MatTableDataSource(this.projects);
      this.dataSource.sort = this.sort;
    });
  }

  openEditProject(content: any, project: any) {
    this.projectData = project;
    this.projectAddEditModal = "edit";
    this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
  }

}
