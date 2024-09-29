import {Component, HostListener, OnInit} from '@angular/core';
import {SharedService} from '@core/service/shared.service';
import {MatTableDataSource} from '@angular/material/table';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";
import {MatSnackBar} from '@angular/material/snack-bar';


@Component({
  selector: 'app-departments-management',
  templateUrl: './departments-management.component.html',
  styleUrls: ['./departments-management.component.sass']
})
export class DepartmentsManagementComponent implements OnInit {

  dataSource: any = [];
  departments: any = [];
  departmentData: any = [];
  columns: string[] = ['name', 'order', 'options'];
  modalRef: NgbModalRef;
  isWideScreen: boolean = window.innerWidth >= 960;

  constructor(
    private service: SharedService,
    private modalService: NgbModal,
    private snackBar: MatSnackBar,
  ) {
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any): void {
    this.isWideScreen = window.innerWidth >= 960;
  }

  ngOnInit(): void {
    this.loadData();
  }

  infoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 10000,
    });
  }

  loadData() {
    this.service.getAdminDepartmentList().subscribe((data: any) => {
      this.departments = data;
      this.dataSource = new MatTableDataSource(this.departments);
    });
  }

  openAddDepartment(content: any) {
    this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
  }

  editDepartment(content: any, department: any) {
    this.departmentData = department;
    this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
  }

  deleteDepartment(depId: any, depName: any) {
    this.service.deleteDepartment(depId).subscribe(() => {
      const message = `(${depName}) has been deleted from departments`;
      this.infoSnackBar(message, 'ok');
      this.loadData();
    });
  }
}
