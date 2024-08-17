import {Component, ElementRef, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '@core/service/shared.service';
import {AuthService} from '@core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {MatPaginator} from "@angular/material/paginator";
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-secretariat-detail',
  templateUrl: './project-secretariat-detail.component.html',
  styleUrls: ['./project-secretariat-detail.component.sass']
})
export class ProjectSecretariatDetailComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild('comDiv') comDiv!: ElementRef;
  @ViewChild('paginator') paginator: MatPaginator;

  commentFileForm: UntypedFormGroup;
  projectId: string = this.router.url.split('/')[4];
  project: any = [];
  filesManage: any = [];
  filesProduction: any = [];
  filesSecretariat: any = [];
  dataSourceManage: any = [];
  dataSourceProduction: any = [];
  dataSourceSecretariat: any = [];
  manager: string;
  client: string;
  columnsSecretariat: any = ['view', 'name', 'options'];
  showManage: boolean = false;
  pathFile: string;
  isWideScreen: boolean = window.innerWidth >= 960;
  modalRef: NgbModalRef;

  constructor(
    private service: SharedService,
    private router: Router,
    private modalService: NgbModal,
    private auth: AuthService,
    private fb: UntypedFormBuilder,
    private snackBar: MatSnackBar
  ) {
  }

  ngOnInit(): void {
    this.loadProjectData();
    this.loadForms();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isWideScreen = window.innerWidth >= 960;
  }

  loadForms() {
    this.commentFileForm = this.fb.group({
      user: [Validators.required],
      file: [Validators.required],
      text: ['', Validators.required]
    });
  }

  loadProjectData() {
    this.service.getProjectSecretariatDetail(this.projectId).subscribe((data: any) => {
      this.project = data;
      this.manager = data.manager.name;
      this.client = data.client.name;
      this.filesSecretariat = data.documents;
      this.dataSourceSecretariat = new MatTableDataSource(this.filesSecretariat);
    })

  }

  deleteDocumentFile(fileId: any) {
    this.service.deleteDocumentFile(fileId).subscribe(() => {
      this.loadProjectData()
    });
  }

  toogleManage() {
    this.showManage = !this.showManage;
  }

  openPdfFile(content: any, path: any) {
    this.pathFile = path;
    this.modalService.open(content, {centered: true, size: 'xl'});
  }

  openUploadFiles(content: any, destiny: string) {
    this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});

  }

}
