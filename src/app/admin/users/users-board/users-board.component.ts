import {Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from '@angular/material/table';
import {SharedService} from "@core/service/shared.service";
import {AuthService} from "@core";
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";


@Component({
  selector: 'app-users-board',
  templateUrl: './users-board.component.html',
  styleUrls: ['./users-board.component.sass']
})

export class UsersBoardComponent implements OnInit {

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  columns: string[] = [];
  users: any = [];
  userData: any = [];
  userDataUpdate: any = [];
  dataSource: any = [];
  modalTitle: string;
  isWideScreen: boolean = window.innerWidth >= 960;
  modalRef: NgbModalRef;

  constructor(
    private service: SharedService,
    private auth: AuthService,
    private modalService: NgbModal,
    public snackBar: MatSnackBar
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isWideScreen = window.innerWidth >= 960;
  }

  ngOnInit() {
    this.loadColumns();
    this.loadData();
  }

  refresh() {
    this.loadData();
  }

  loadColumns() {
    this.service.getUsersColumns().subscribe((data: any) => {
      this.columns = data;
    })
  }

  loadData() {
    this.service.getAllUsers().subscribe((data: any) => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
    })
  }

  searchUser(query: any) {
    this.service.searchUser(query).subscribe((data: any) => {
      this.users = data;
      this.dataSource = new MatTableDataSource(this.users);
      this.dataSource.sort = this.sort;
    });
  }

  addUser(content: any) {
    this.modalTitle = 'Add a new employee';
    this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
  }

  editUser(content: any, user: any) {
    const depsId = [];
    this.userDataUpdate = user;
    for (const department of this.userDataUpdate.departments) {
      depsId.push(department.id);
    }
    this.userDataUpdate.departments = depsId;
    this.modalTitle = "Edit User";
    this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
  }

  infoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  deleteUser(id: number) {
    if (this.auth.currentUserValue.id === id) {
      this.infoSnackBar('You cannot delete an account you are logged in to!!!', 'ok');
    } else {
      this.service.deleteUser(id).subscribe(() => {
        this.loadData();
        this.infoSnackBar('User deleted successfully', 'ok');
      });
    }
  }

}
