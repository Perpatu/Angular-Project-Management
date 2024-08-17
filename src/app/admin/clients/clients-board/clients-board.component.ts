import {Component, HostListener, OnInit, ViewChild} from "@angular/core";
import {MatSort} from "@angular/material/sort";
import {MatTableDataSource} from '@angular/material/table';
import {SharedService} from "@core/service/shared.service";
import {MatSnackBar} from '@angular/material/snack-bar';
import {NgbModal, NgbModalRef} from "@ng-bootstrap/ng-bootstrap";

@Component({
  selector: 'app-clients-board',
  templateUrl: './clients-board.component.html',
  styleUrls: ['./clients-board.component.sass']
})
export class ClientsBoardComponent implements OnInit {

  @ViewChild(MatSort) sort: MatSort;

  columns = [];
  clients: any = [];
  dataSource: any = [];
  titleModal: string;
  clientData: any;
  modalRef: NgbModalRef;
  isWideScreen: boolean = window.innerWidth >= 960;

  constructor(
    private service: SharedService,
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

  infoSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 5000,
    });
  }

  loadData() {
    this.service.getClients().subscribe((data) => {
      this.clients = data;
      this.dataSource = new MatTableDataSource(this.clients);
      this.dataSource.sort = this.sort;
    });
  }

  loadColumns() {
    this.service.getClientColumns().subscribe((data: any) => {
      this.columns = data;
    })
  }

  searchClient(query: any) {
    this.service.searchClient(query).subscribe((data: any) => {
      this.clients = data;
      this.dataSource = new MatTableDataSource(this.clients);
      this.dataSource.sort = this.sort;
    });
  }

  addClient(content: any) {
    this.titleModal = 'Add a new Client';
    this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
  }

  editClient(content: any, client: any) {
    this.clientData = client;
    this.titleModal = 'Edit Client';
    this.modalRef = this.modalService.open(content, {centered: true, size: 'lg'});
  }

  deleteClient(clientId: any) {
    this.service.deleteClient(clientId).subscribe(() => {
      this.loadData();
    });
  }

}
