import {NavigationEnd, Router} from "@angular/router";
import {DOCUMENT} from "@angular/common";
import {Component, ElementRef, HostListener, Inject, OnDestroy, OnInit, Renderer2} from "@angular/core";
import {ROUTES} from "./sidebar-items";
import {AuthService} from "@core";
import {SharedService} from "@core/service/shared.service";

@Component({
  selector: "app-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ["./sidebar.component.sass"],
})

export class SidebarComponent implements OnInit, OnDestroy {
  public sidebarItems: any[];
  public innerHeight: any;
  public bodyTag: any;
  listMaxHeight: string;
  listMaxWidth: string;
  userFullName: string;
  userImg: string;
  userType: string;
  headerHeight = 60;
  currentRoute: string;
  departments: any = [];
  routerObj = null;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private authService: AuthService,
    private router: Router,
    private service: SharedService
  ) {
    const body = this.elementRef.nativeElement.closest("body");
    this.routerObj = this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        // close sidebar on mobile screen after menu select
        this.renderer.removeClass(this.document.body, "overlay-open");
      }
    });
  }

  @HostListener("window:resize", ["$event"])
  windowResizecall(event) {
    this.setMenuHeight();
    this.checkStatuForResize(false);
  }

  @HostListener("document:mousedown", ["$event"])
  onGlobalClick(event): void {
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.renderer.removeClass(this.document.body, "overlay-open");
    }
  }

  callToggleMenu(event: any, length: any) {
    if (length > 0) {
      const parentElement = event.target.closest("li");
      const activeClass = parentElement.classList.contains("active");

      if (activeClass) {
        this.renderer.removeClass(parentElement, "active");
      } else {
        this.renderer.addClass(parentElement, "active");
      }
    }
  }

  ngOnInit() {
    if (this.authService.currentUserValue) {
      const userRole = this.authService.currentUserValue.role;
      this.userFullName =
        this.authService.currentUserValue.first_name +
        " " +
        this.authService.currentUserValue.last_name;

      this.sidebarItems = ROUTES.filter(
        (x) => x.role.indexOf(userRole) !== -1 || x.role.indexOf("All") !== -1
      );
      if (userRole === 'Admin') {
        this.userType = 'Admin';
      } else if (userRole === 'Client') {
        this.userType = 'Client';
      } else if (userRole === 'Employee') {
        this.userType = 'Employee';
      } else {
        this.userType = 'Admin';
      }
    }

    this.addDepartments();
    this.initLeftSidebar();
    this.bodyTag = this.document.body;
  }

  addDepartments() {
    if (this.authService.currentUserValue.role === "Admin") {
      this.service.getAdminDepartmentList().subscribe((data: any) => {
        this.departments = data;
        let submenuObj: any = []
        const item = this.sidebarItems.find((x: any) => x.title === 'Departments')
        item.submenu = [item.submenu[0]];
        for (let i = 0; this.departments.length > i; i++) {
          let obj = {
            path: "admin/department/department-detail",
            title: this.departments[i].name,
            id: this.departments[i].id,
            iconType: "",
            icon: "",
            class: "",
            groupTitle: false,
            badge: "",
            badgeClass: "",
            role: [''],
            submenu: [],
          }
          submenuObj.push(obj)
        }
        item.submenu.push(...submenuObj);
      })
    } else {
      this.service.getAuthDepartmentList().subscribe((data: any) => {
        this.departments = data;
        let submenuObj: any = []
        const item = this.sidebarItems.find((x: any) => x.title === 'Departments')
        for (let i = 0; this.departments.length > i; i++) {
          const obj = {
            path: "employee/department/department-detail/",
            title: this.departments[i].name,
            id: this.departments[i].id,
            iconType: "",
            icon: "",
            class: "",
            groupTitle: false,
            badge: "",
            badgeClass: "",
            role: [''],
            submenu: [],
          }
          submenuObj.push(obj)
        }
        item.submenu.push(...submenuObj);
      })
    }
  }


  ngOnDestroy() {
    this.routerObj.unsubscribe();
  }

  initLeftSidebar() {
    const _this = this;
    // Set menu height
    _this.setMenuHeight();
    _this.checkStatuForResize(true);
  }

  setMenuHeight() {
    this.innerHeight = window.innerHeight;
    const height = this.innerHeight - this.headerHeight;
    this.listMaxHeight = height + "";
    this.listMaxWidth = "500px";
  }

  isOpen() {
    return this.bodyTag.classList.contains("overlay-open");
  }

  checkStatuForResize(firstTime) {
    if (window.innerWidth < 1170) {
      this.renderer.addClass(this.document.body, "ls-closed");
    } else {
      this.renderer.removeClass(this.document.body, "ls-closed");
    }
  }

  mouseHover(e) {
    const body = this.elementRef.nativeElement.closest("body");
    if (body.classList.contains("submenu-closed")) {
      this.renderer.addClass(this.document.body, "side-closed-hover");
      this.renderer.removeClass(this.document.body, "submenu-closed");
    }
  }

  mouseOut(e) {
    const body = this.elementRef.nativeElement.closest("body");
    if (body.classList.contains("side-closed-hover")) {
      this.renderer.removeClass(this.document.body, "side-closed-hover");
      this.renderer.addClass(this.document.body, "submenu-closed");
    }
  }

  logout() {
    this.authService.logout();
  }
}
