import { HttpBackend, HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Observable, map, catchError, EMPTY } from 'rxjs';
import { login } from 'src/app/shared/models/login';
import { user } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  token: string = '';
  url = environment.url;
  isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private message: MatSnackBar
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
    } else if (e.status == 403) {
      this.showMessage('Não foi possível validar o token. Por favor, refaça o login', 'error');
    }
    return EMPTY;
  }

  isAuthentication(login: login): Observable<any> {
    return this.http.post<any>(this.url + '/authentication/login', login).pipe(
      map(
        (response) => this.setToken(response),
        (this.isAuthenticated = true)
      ),
      catchError((e) => this.errorHandler(e))
    );
  }

  isLogout() {
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  setToken(token: any): void {
    this.token = token.token;
  }

  getToken(): any {
    return this.token;
  }

}
