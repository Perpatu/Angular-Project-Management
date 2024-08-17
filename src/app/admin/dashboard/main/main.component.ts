import {Component, OnInit} from "@angular/core";
import {SharedService} from "@core/service/shared.service";

@Component({
  selector: "app-main",
  templateUrl: "./main.component.html",
  styleUrls: ["./main.component.scss"],
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
    this.service.getDepartmentAdminStats().subscribe((data: any) => {
      this.departments = data;
    });
  }
}
