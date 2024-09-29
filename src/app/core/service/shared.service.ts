import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {CookieService} from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class SharedService {

  readonly APIUrlUser = "http://localhost:8000/api/user/";
  readonly APIUrlProject = "http://localhost:8000/api/project/";
  readonly APIUrlFileProduction = "http://localhost:8000/api/file-production/";
  readonly APIUrlFileDocument = "http://localhost:8000/api/file-document/";
  readonly APIUrlDepartment = "http://localhost:8000/api/department/";
  readonly APIUrlClient = "http://localhost:8000/api/client/";

  csrftoken = this.cookieService.get('csrftoken');

  constructor(
    private http: HttpClient,
    private cookieService: CookieService
  ) {
  }

  authHeaders() {
    const headers = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Token ' + this.cookieService.get('auth'),
        'X-CSRFToken': this.cookieService.get('csrftoken')
      })
    };
    return headers;
  }

  /* USER */

  register(value: any) {
    return this.http.post(this.APIUrlUser + 'create/', value, this.authHeaders());
  }

  login(value: any) {
    return this.http.post<any>(this.APIUrlUser + 'token/', value);
  }

  getUserCurrent() {
    return this.http.get(this.APIUrlUser + 'manage/', this.authHeaders());
  }

  getUsersColumns() {
    return this.http.get(this.APIUrlUser + 'columns/', this.authHeaders());
  }

  searchUser(query: string) {
    const params = new URLSearchParams();
    params.set('q', query);
    return this.http.get(this.APIUrlUser + 'search/?' + params.toString(), this.authHeaders());
  }

  getAllUsers() {
    return this.http.get(this.APIUrlUser, this.authHeaders());
  }

  getAssignedEmployee(depId: string) {
    const params = new URLSearchParams();
    params.set('dep_id', depId);
    return this.http.get(this.APIUrlUser + 'assigned-employee/?' + params.toString(), this.authHeaders());
  }

  getUsersAdmin() {
    return this.http.get(this.APIUrlUser + 'admin/', this.authHeaders());
  }

  deleteUser(userId: any) {
    return this.http.delete(this.APIUrlUser + 'manage/' + userId + '/', this.authHeaders());
  }

  updateUser(value: any, userId: any) {
    return this.http.patch(this.APIUrlUser + 'manage/' + userId + '/', value, this.authHeaders());
  }

  /* USER */

  /* PROJECT */
  addProject(value: any) {
    return this.http.post(this.APIUrlProject + 'production/', value, this.authHeaders());
  }

  updateProject(projectId: any, value: any) {
    return this.http.patch(this.APIUrlProject + 'production/' + projectId + '/', value, this.authHeaders());
  }

  deleteProject(projectId: any) {
    return this.http.delete(this.APIUrlProject + 'production/' + projectId + '/', this.authHeaders());
  }

  getProjectDetail(projectId: any) {
    return this.http.get(this.APIUrlProject + 'production/' + projectId + '/', this.authHeaders());
  }

  getProjectSecretariatDetail(projectId: any) {
    return this.http.get(this.APIUrlProject + 'secretariat/' + projectId + '/', this.authHeaders());
  }

  getProjectsBoard(status: string, page_size: any, page_number: any) {
    const params = new URLSearchParams();
    params.set('status', status);
    params.set('page_size', page_size);
    params.set('page_number', page_number);
    return this.http.get(this.APIUrlProject + 'production/board/?' + params.toString(), this.authHeaders())
  }

  getProjectsAuthBoard(status: string) {
    const params = new URLSearchParams();
    params.set('status', status);
    return this.http.get(this.APIUrlProject + 'admin/status/?' + params.toString(), this.authHeaders())
}

  getProjectsSecretariatBoard(status: string, page_size: any, page_number: any) {
    const params = new URLSearchParams();
    params.set('status', status);
    params.set('page_size', page_size);
    params.set('page_number', page_number);
    return this.http.get(this.APIUrlProject + 'secretariat/board/?' + params.toString(), this.authHeaders())
  }

  searchProjectAuth(search: any, status: any, page_size: any, page_number: any) {
    const params = new URLSearchParams();
    params.set('status', status);
    params.set('search', search);
    params.set('page_size', page_size);
    params.set('page_number', page_number);
    return this.http.get(this.APIUrlProject + 'production/search/?' + params.toString(), this.authHeaders());
  }

  searchProjectSecretariat(search: any, status: any) {
    const params = new URLSearchParams();
    params.set('status', status);
    params.set('search', search);
    return this.http.get(this.APIUrlProject + 'secretariat/search/?' + params.toString(), this.authHeaders());
  }

  getProjectNotifications() {
    return this.http.get(this.APIUrlProject + 'notification/', this.authHeaders());
  }

  updateProjectNotifications(notiId: any, value: any) {
    return this.http.patch(this.APIUrlProject + 'notification/' + notiId + '/', value, this.authHeaders());
  }

  getProjectNotificationsQuantity() {
    return this.http.get(this.APIUrlProject + 'notification/quantity/', this.authHeaders());
  }

  /* PROJECT */

  /* FILES */
  uploadProductionFiles(formData: FormData) {
    return this.http.post(this.APIUrlFileProduction + 'admin/', formData, {
      headers: {
        'Authorization': 'Token ' + this.cookieService.get('auth'),
        'X-CSRFToken': this.cookieService.get('csrftoken')
      },
    });
  }

  uploadDocumentFiles(formData: FormData) {
    return this.http.post(this.APIUrlFileDocument + 'admin/', formData, {
      headers: {
        'Authorization': 'Token ' + this.cookieService.get('auth'),
        'X-CSRFToken': this.cookieService.get('csrftoken')
      },
    });
  }

  deleteProductionFile(fileId: any) {
    return this.http.delete(this.APIUrlFileProduction + 'admin/' + fileId + '/', this.authHeaders());
  }

  deleteDocumentFile(fileId: any) {
    return this.http.delete(this.APIUrlFileDocument + 'admin/' + fileId + '/', this.authHeaders());
  }

  addProductionFileComment(value: any) {
    return this.http.post(this.APIUrlFileProduction + 'comments/', value, this.authHeaders());
  }

  deleteProductionFileComment(commentId: any) {
    return this.http.delete(this.APIUrlFileProduction + 'comments/' + commentId + '/', this.authHeaders());
  }

  addTask(value: any) {
    return this.http.post(this.APIUrlFileProduction + 'task/', value, this.authHeaders());
  }

  updateTask(taskId: any, value: any) {
    return this.http.patch(this.APIUrlFileProduction + 'task/' + taskId + '/', value, this.authHeaders());
  }

  deleteTask(taskId: any) {
    return this.http.delete(this.APIUrlFileProduction + 'task/' + taskId + '/', this.authHeaders());
  }

  getProductionFilePtojectColumns() {
    return this.http.get(this.APIUrlFileProduction + 'admin/columns-project/', this.authHeaders());
  }

  getTaskDepartmentAdmin(depId: any, status: any, pageSize: any, pageNumber: any) {
    const params = new URLSearchParams();
    params.set('dep_id', depId);
    params.set('status', status);
    params.set('page_size', pageSize);
    params.set('page_number', pageNumber);
    return this.http.get(this.APIUrlFileProduction + 'admin/department/?' + params.toString(), this.authHeaders());
  }

  getTaskDepartmentAuth(depId: any, status: any, pageSize: any, pageNumber: any) {
    const params = new URLSearchParams();
    params.set('dep_id', depId);
    params.set('status', status);
    params.set('page_size', pageSize);
    params.set('page_number', pageNumber);
    return this.http.get(this.APIUrlFileProduction + 'auth/department/?' + params.toString(), this.authHeaders());
  }

  searchProductionFiles(depId: any, status: string, query: string) {
    const params = new URLSearchParams();
    params.set('dep_id', depId);
    params.set('status', status);
    params.set('search', query);
    return this.http.get(this.APIUrlFileProduction + 'auth/department/search/?' + params.toString(), this.authHeaders());
  }

  getTaskNotifications() {
    return this.http.get(this.APIUrlFileProduction + 'noti/', this.authHeaders());
  }

  updateTaskNotifications(notiId: any, value: any) {
    return this.http.patch(this.APIUrlFileProduction + 'noti/' + notiId + '/', value, this.authHeaders());
  }

  getTaskNotificationsQuantity() {
    return this.http.get(this.APIUrlFileProduction + 'noti/quantity/', this.authHeaders());
  }

  getUserCalendar(userId: any) {
    const params = new URLSearchParams();
    params.set('user_id', userId);
    return this.http.get(this.APIUrlFileProduction + 'queue-logic/calendar/?' + params.toString(), this.authHeaders());
  }




  /* FILES */

  /* DEPARTMENTS */
  addDepartment(value: any) {
    return this.http.post(this.APIUrlDepartment + 'admin/', value, this.authHeaders());
  }

  deleteDepartment(depId: any) {
    return this.http.delete(this.APIUrlDepartment + 'admin/' + depId + '/', this.authHeaders());
  }

  updateDepartment(depId: any, value: any) {
    return this.http.patch(this.APIUrlDepartment + 'admin/' + depId + '/', value, this.authHeaders());
  }

  getAuthDepartmentList() {
    return this.http.get(this.APIUrlDepartment + 'auth/', this.authHeaders());
  }

  getAdminDepartmentList() {
    return this.http.get(this.APIUrlDepartment + 'admin/', this.authHeaders());
  }

  getDepartmentAdminStats() {
    return this.http.get(this.APIUrlDepartment + 'admin/stats/', this.authHeaders());
  }

  getDepartmentStats() {
    return this.http.get(this.APIUrlDepartment + 'auth/stats/', this.authHeaders());
  }

  /* DEPARTMENTS */


  /* CLIENTS */
  addClient(value: any) {
    return this.http.post(this.APIUrlClient + 'admin/', value, this.authHeaders());
  }

  updateClient(clientId: any, value: any) {
    return this.http.patch(this.APIUrlClient + 'admin/' + clientId + '/', value, this.authHeaders());
  }

  deleteClient(clientId: any) {
    return this.http.delete(this.APIUrlClient + 'admin/' + clientId + '/', this.authHeaders());
  }

  getClientColumns() {
    return this.http.get(this.APIUrlClient + 'admin/columns/', this.authHeaders());
  }

  getClients() {
    return this.http.get(this.APIUrlClient + 'admin/', this.authHeaders());
  }

  searchClient(query: string) {
    const params = new URLSearchParams();
    params.set('q', query);
    return this.http.get(this.APIUrlClient + 'admin/search/?' + params.toString(), this.authHeaders());
  }

  /* CLIENTS */
}
