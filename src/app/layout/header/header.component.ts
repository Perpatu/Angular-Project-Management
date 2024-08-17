import {DOCUMENT} from "@angular/common";
import {AfterViewInit, Component, Inject, OnInit, Renderer2} from "@angular/core";
import {ConfigService} from "@config";
import {AuthService} from "@core";
import {Router} from '@angular/router';
import {UnsubscribeOnDestroyAdapter} from "@shared";
import {WebSocketService} from "@core/service/web-socket.service";
import {SharedService} from "@core/service/shared.service";

const document: any = window.document;

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.sass"],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit {
  public config: any = {};
  userRole: string;
  userId: any;
  homePage: string;
  userFullName: string;
  isNavbarCollapsed = true;
  notiData: any = [];
  notiQuantity: any;
  notification = false;
  theme: string;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    private websocketService: WebSocketService,
    private service: SharedService
  ) {
    super();
  }

  ngOnInit() {
    this.userId = this.authService.currentUserValue.id;
    this.config = this.configService.configData;
    this.userRole = this.authService.currentUserValue.role;
    this.wsConnections();
    this.loadNotifications();
    this.loadNotificationsQuantity();
    this.userFullName =
      this.authService.currentUserValue.first_name +
      " " +
      this.authService.currentUserValue.last_name;
    if (this.userRole === "Admin") {
      this.homePage = "admin/dashboard/main";
    } else if (this.userRole === "Client") {
      this.homePage = "client/dashboard";
    } else if (this.userRole === "Employee") {
      this.homePage = "employee/dashboard/main";
    } else {
      this.homePage = "admin/dashboard/main";
    }
  }


  goToProfile() {
    this.router.navigate(['admin/user/profile-user/', this.userId]);
  }

  getTheme() {
    this.theme = localStorage.getItem("theme");
  }

  wsConnections(): void {
    this.websocketService.connectProjectNoti().subscribe(
      message => {
        const messageObject = JSON.parse(message);
        this.notiData.push(messageObject.message.notification);
        this.loadNotificationsQuantity();
      },
      error => console.error('WebSocket error:', error)
    );

    this.websocketService.connectFileNoti().subscribe(
      message => {
        const messageObject = JSON.parse(message);
        console.log(messageObject)
        this.notiData.push(messageObject.message.notification);
        this.loadNotificationsQuantity();
      },
      error => console.error('WebSocket error:', error)
    );
  }

  loadNotifications() {
    this.service.getTaskNotifications().subscribe((dataFile: any) => {
      this.service.getProjectNotifications().subscribe((dataProject: any) => {
        this.notiData = [...dataFile, ...dataProject];
      })
    });
  }

  loadNotificationsQuantity() {
    this.service.getTaskNotificationsQuantity().subscribe((dataFile: any) => {
      this.service.getProjectNotificationsQuantity().subscribe((dataProject: any) => {
        this.notiQuantity = dataFile + dataProject;
        if (this.notiQuantity > 0) {
          this.notification = true;
        } else {
          this.notification = false;
        }
      })
    });
  }

  readNotification(event: Event, notiId: any) {
    event.preventDefault();
    event.stopPropagation();
    const value = {
      "read": true
    }
    const notification = this.notiData.find((noti: any) => noti.id === notiId);
    if (notification.file) {
      console.log('file')
      this.service.updateTaskNotifications(notiId, value).subscribe(() => {
        this.loadNotifications();
        this.loadNotificationsQuantity();
      });
    } else if (notification.project) {
      this.service.updateProjectNotifications(notiId, value).subscribe(() => {
        this.loadNotifications();
        this.loadNotificationsQuantity();
      });
    }
  }

  readAllNotification() {
    const value = {
      "read": true
    }
    this.notification = false;
    for (let i = 0; this.notiData.length > i; i++) {
      if (this.notiData[i].file) {
        this.service.updateTaskNotifications(this.notiData[i].id, value).subscribe();
      } else if (this.notiData[i].project) {
        this.service.updateProjectNotifications(this.notiData[i].id, value).subscribe();
      }
    }
    this.notiData = [];
  }

  ngAfterViewInit() {
    if (localStorage.getItem("theme")) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(this.document.body, localStorage.getItem("theme"));
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }

    if (localStorage.getItem("menuOption")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("menuOption")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "menu_" + this.config.layout.sidebar.backgroundColor
      );
    }

    if (localStorage.getItem("choose_logoheader")) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem("choose_logoheader")
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        "logo-" + this.config.layout.logo_bg_color
      );
    }

    if (localStorage.getItem("sidebar_status")) {
      if (localStorage.getItem("sidebar_status") === "close") {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      } else {
        this.renderer.removeClass(this.document.body, "side-closed");
        this.renderer.removeClass(this.document.body, "submenu-closed");
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.document.body, "side-closed");
        this.renderer.addClass(this.document.body, "submenu-closed");
      }
    }
  }

  callFullscreen() {
    if (
      !document.fullscreenElement &&
      !document.mozFullScreenElement &&
      !document.webkitFullscreenElement &&
      !document.msFullscreenElement
    ) {
      if (document.documentElement.requestFullscreen) {
        document.documentElement.requestFullscreen();
      } else if (document.documentElement.msRequestFullscreen) {
        document.documentElement.msRequestFullscreen();
      } else if (document.documentElement.mozRequestFullScreen) {
        document.documentElement.mozRequestFullScreen();
      } else if (document.documentElement.webkitRequestFullscreen) {
        document.documentElement.webkitRequestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen();
      }
    }
  }

  mobileMenuSidebarOpen(event: any, className: string) {
    const hasClass = event.target.classList.contains(className);
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }
  }

  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains("side-closed");
    if (hasClass) {
      this.renderer.removeClass(this.document.body, "side-closed");
      this.renderer.removeClass(this.document.body, "submenu-closed");
    } else {
      this.renderer.addClass(this.document.body, "side-closed");
      this.renderer.addClass(this.document.body, "submenu-closed");
    }
  }

  logout() {
    this.authService.logout();
  }
}
