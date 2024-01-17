import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, catchError, EMPTY } from 'rxjs';
import { login } from 'src/app/shared/models/login';
import { user } from 'src/app/shared/models/user';
import { PermissionUser } from 'src/app/shared/userLogged/permissionUser.service';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  url = environment.url;
  isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private message: MatSnackBar,
    private permission: PermissionUser
  ) {}

  showMessage(msg: string, color: string) {
    this.message.open(msg, '', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: color,
    });
  }

  errorHandler(e: any): Observable<any> {
    if (e.status == 401) {
      this.showMessage('Senha incorreta', 'warning');
    } else if (e.status == 404) {
      this.showMessage('Usuário não encontrado', 'error');
    }
    return EMPTY;
  }

  isAuthentication(login: login): Observable<user> {
    return this.http.post<user>(this.url + '/authentication', login, {responseType: 'json'}).pipe(
      map(
        (response) => this.setInformationsLocalStorage(response),
        (this.isAuthenticated = true)
      ),
      catchError((e) => this.errorHandler(e))
    );
  }

  isLogout() {
    this.isAuthenticated = false;
    this.permission.setUserPermissions('');
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  setInformationsLocalStorage(user: user) {
    this.permission.setUserPermissions(user.roles)
    localStorage.setItem('user', JSON.stringify(user));
  }


}
