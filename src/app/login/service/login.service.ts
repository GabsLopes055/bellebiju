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

  private readonly TOKEN_KEY = 'authToken';
  url = environment.url;
  private isAuthenticated = false;

  constructor(
    private http: HttpClient,
    private message: MatSnackBar
  ) {
    this.isAuthenticated = !!localStorage.getItem(this.TOKEN_KEY);
  }

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
        (response) => {
          this.setToken(response.token);
          this.isAuthenticated = true;
        }
      ),
      catchError((e) => this.errorHandler(e))
    );
  }

  isLogout() {
    localStorage.removeItem(this.TOKEN_KEY);
    this.isAuthenticated = false;
  }

  isLoggedIn(): boolean {
    return this.isAuthenticated;
  }

  private setToken(token: string): void {
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

}
