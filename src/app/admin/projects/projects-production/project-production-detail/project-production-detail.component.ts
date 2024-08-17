import {Component, HostListener, OnInit, ViewChild} from '@angular/core';
import {Router} from '@angular/router';
import {SharedService} from '@core/service/shared.service';
import {AuthService} from '@core';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {MatTableDataSource} from '@angular/material/table';
import {MatSort} from '@angular/material/sort';
import {UntypedFormBuilder, UntypedFormGroup, Validators} from "@angular/forms";
import {WebSocketService} from "@core/service/web-socket.service";


@Component({
  selector: 'app-project-production-detail',
  templateUrl: './project-production-detail.component.html',
  styleUrls: ['./project-production-detail.component.sass']
})
export class ProjectProductionDetailComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;

  commentFileForm: UntypedFormGroup;
  projectId: string = this.router.url.split('/')[4];
  project: any = [];
  fileId: any;
  productManage: any = [];
  filesProduction: any = [];
  filesSecretariat: any = [];
  dataSourceManage: any = [];
  dataSourceProduction: any = [];
  dataSourceSecretariat: any = [];
  manager: string;
  client: string;
  columnsManage: any = [];
  columnsProduction: any = [];
  columnsSecretariat: any = ['view', 'name', 'options'];
  showManage: boolean = false;
  departmentsManage: any = [];
  departmentsProduction: any = [];
  department: any;
  pathFile: string;
  isWideScreen: boolean = window.innerWidth >= 960;
  modalRef: NgbModalRef;
  destiny: string;
  task: any;


  constructor(
    private service: SharedService,
    private router: Router,
    private modalService: NgbModal,
    private auth: AuthService,
    private fb: UntypedFormBuilder,
    private websocketService: WebSocketService,
  ) {
  }

  ngOnInit(): void {
    this.wsConnections();
    this.loadColumns();
    this.loadProjectData();
    this.loadForms();
  }

  wsConnections(): void {
    this.websocketService.connectFileProject().subscribe({
      next: (message) => {
        const messageObject = JSON.parse(message);
        const messageType = messageObject.message.type;
        if (messageType === 'task') {
          const fileId = messageObject.message.file.id;
          const tasksData = messageObject.message.file.tasks;
          const deps_id = messageObject.message.dep_id;
          const projectData = messageObject.message.project;
          this.refreshTask(fileId, tasksData, deps_id);
          this.refreshProjectProgress(projectData);
        } else if (messageType === 'comment_add') {
          const commentFile = messageObject.message.comment;
          this.addFileComments(commentFile);
        } else if (messageType === 'comment_delete') {
          const commentFile = messageObject.message.comment;
          this.deleteFileComments(commentFile);
        } else if (messageType === 'file_delete') {
          const file = messageObject.message.file;
          this.deleteFiles(file);
        }
      },
      error: (err) => {
        console.error('WebSocket error:', err);
      }
    });
  }

  refreshTask(fileId: any, newTasksData: any, dep_id: any) {
    try {
      const fileIndex = this.filesProduction.findIndex((obj: any) => obj.id === fileId);
      this.filesProduction[fileIndex].tasks = newTasksData;
      this.filesProduction[fileIndex].dep_id = dep_id;

    } catch (error) {
      console.error('WebSocket error:', error)
    }
  }

  refreshProjectProgress(project: any) {
    this.project.progress = project.progress;
    this.project.status = project.status;
  }

  deleteFileComments(comment: any) {
    const fileIndex = this.filesProduction.findIndex((obj: any) => obj.id === comment.file);
    this.filesProduction[fileIndex].comments = this.filesProduction[fileIndex].comments.filter((com: any) => com.id !== comment.id);
  }

  addFileComments(comment: any) {
    const fileIndex = this.filesProduction.findIndex((obj: any) => obj.id === comment.file);
    this.filesProduction[fileIndex].comments.push(comment);
  }

  deleteFiles(file: any) {
    const fileProductionIndex = this.filesProduction.findIndex((obj: any) => obj.id === file.id);
    const fileManageIndex = this.productManage.findIndex((obj: any) => obj.id === file.id);
    this.filesProduction.splice(fileProductionIndex, 1);
    this.productManage.splice(fileManageIndex, 1);
    this.dataSourceManage = new MatTableDataSource(this.productManage);
    this.dataSourceManage.sort = this.sort;
    this.dataSourceProduction = new MatTableDataSource(this.filesProduction);
    this.dataSourceProduction.sort = this.sort;
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isWideScreen = window.innerWidth >= 960;
  }

  loadForms() {
    this.commentFileForm = this.fb.group({
      user: [Validators.required],
      file: [Validators.required],
      text: ['', [Validators.minLength(1)]]
    });
  }

  loadProjectData() {
    this.service.getProjectDetail(this.projectId).subscribe((data: any) => {
      this.project = data;
      this.manager = data.manager.name;
      this.client = data.client.name;
      this.productManage = data.files;
      this.dataSourceManage = new MatTableDataSource(this.productManage);
      this.dataSourceManage.sort = this.sort;
      this.filesProduction = data.files.map((file: any) => ({
        ...file,
        expand: false
      }));
      this.dataSourceProduction = new MatTableDataSource(this.filesProduction);
      this.dataSourceProduction.sort = this.sort;
      this.filesSecretariat = data.documents;
      this.dataSourceSecretariat = new MatTableDataSource(this.filesSecretariat);
    })
  }

  loadColumns() {
    this.service.getProductionFilePtojectColumns().subscribe((data: any) => {
      this.columnsManage = data.manage_columns;
      this.departmentsManage = data.departments;
      this.columnsProduction = data.production_columns;
      this.departmentsProduction = data.departments;
    })
  }

  deleteProductionFile(fileId: any) {
    this.service.deleteProductionFile(fileId).subscribe(() => {
      this.loadProjectData()
    });
  }

  deleteDocumentFile(fileId: any) {
    this.service.deleteDocumentFile(fileId).subscribe();
  }

  toogleManage() {
    this.showManage = !this.showManage;
  }

  expandCommentForm(element: any) {
    element.expand = !element.expand;
  }

  addFileComment(fileId: any) {
    this.commentFileForm.value.user = this.auth.currentUserValue.id;
    this.commentFileForm.value.file = fileId;
    this.service.addProductionFileComment(this.commentFileForm.value).subscribe();
  }

  deleteFileComment(commentId: any) {
    this.service.deleteProductionFileComment(commentId).subscribe();
  }


  updateTask(project: any, id: any, field: any, status: any) {
    let currentDate: Date = new Date();
    const update = {
      'project': project
    }
    if (field === 'start' && status) {
      update['real_start_date'] = currentDate;
    } else if (field === 'paused' && status) {
      update['paused_date'] = currentDate;
    } else if (field === 'end' && status) {
      update['real_end_date'] = currentDate;
    }
    update[field] = status;
    this.service.updateTask(id, update).subscribe();
  }

  openPdfFile(content: any, path: any) {
    this.pathFile = path;
    this.modalService.open(content, {centered: true, size: 'xl'});
  }

  openUploadFiles(content: any, destiny: string) {
    this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
    this.destiny = destiny;
  }

  openAddTask(content: any, department: any, file: any) {
    this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
    this.department = department;
    this.fileId = file;
  }

  openManageTask(content: any, department: any, tasks: any) {
    this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
    const taskObject = tasks.find((obj: any) => obj.department === department);
    this.task = taskObject;
  }

}
