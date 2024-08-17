import {Injectable} from "@angular/core";
import {SharedService} from "./shared.service";
import {Router} from "@angular/router";
import {map} from "rxjs/operators";
import {User} from "../models/user";
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: "root",
})
export class AuthService {

  constructor(
    private service: SharedService,
    private cookieService: CookieService,
    private router: Router,
  ) {
  }

  public get currentUserValue(): User {
    return JSON.parse(this.cookieService.get("user"));
  }

  public get role() {
    return this.cookieService.get("role");
  }

  login(username: string, password: string) {
    const dataLogin = {'username': username, 'password': password}
    return this.service.login(dataLogin).pipe(map((data: any) => {
        this.cookieService.set("auth", data.token);
        localStorage.setItem('tableShowSecretariat', 'false');
        localStorage.setItem('tableShow', 'false');
        return data
      })
    );
  }

  logout() {
    localStorage.removeItem("pdfjs.history");
    this.cookieService.delete('user');
    this.cookieService.delete('auth');
    this.router.navigateByUrl('/');
  }
}
