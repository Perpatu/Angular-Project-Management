import {Component, Input, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {SharedService} from '@core/service/shared.service';
import {MatTableDataSource} from '@angular/material/table';
import {AuthService} from '@core';

@Component({
  selector: 'app-files-upload',
  templateUrl: './files-upload.component.html',
  styleUrls: ['./files-upload.component.sass']
})
export class FilesUploadComponent implements OnInit {

  @Input() project: any;
  @Input() destiny: string;
  @Input() modalRef: any;
  upload = false;
  progress = 0;
  myFiles: any[] = [];
  dataSource: any = [];
  columns: string[] = ['name']
  departments: any[] = [];
  selectedFiles: any[] = [];

  constructor(
    private router: Router,
    private auth: AuthService,
    private service: SharedService,
    private route: ActivatedRoute
  ) {
  }

  ngOnInit(): void {

  }

  onFilesSelected(event: any) {
    this.selectedFiles = event.target.files;
    for (let i = 0; i < this.selectedFiles.length; i++) {
      this.myFiles.push(this.selectedFiles[i]);
    }
    this.dataSource = new MatTableDataSource(this.myFiles);
  }


  uploadFiles() {
    if (this.selectedFiles) {
      let formData = new FormData();
      for (let i = 0; i < this.selectedFiles.length; i++) {
        formData.append('file', this.selectedFiles[i]);
        formData.append('project', this.project.id);
        formData.append('user', this.auth.currentUserValue.id.toString());
      }
      if (this.destiny === "Production") {
        this.service.uploadProductionFiles(formData).subscribe({
          next: (response) => {
            this.modalRef.close();
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([], {
                relativeTo: this.route,
              });
            });
          },
          error: (err) => console.error(err)
        })
      } else {
        console.log(this.project.id);
        this.service.uploadDocumentFiles(formData).subscribe({
          next: (response) => {
            this.modalRef.close();
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([], {
                relativeTo: this.route,
              });
            });
          },
          error: (err) => console.error(err)
        })
      }
    }
  }
}
