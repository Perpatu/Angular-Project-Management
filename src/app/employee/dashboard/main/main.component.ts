import {Component, OnInit} from "@angular/core";
import {SharedService} from "@core/service/shared.service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.sass']
})
export class MainComponent implements OnInit {

  departments: any = [];

  constructor(
    private service: SharedService,
  ) {
  }

  ngOnInit() {
    this.loadDepartmentsData();
  }

  loadDepartmentsData() {
    this.service.getDepartmentStats().subscribe((data: any) => {
      this.departments = data;
    });
  }

}
