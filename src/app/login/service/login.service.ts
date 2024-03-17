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
  private expirationToken!: null | string

  constructor(private http: HttpClient, private message: MatSnackBar) {
    this.isAuthenticated = !!localStorage.getItem(this.TOKEN_KEY);
  }

  showMessage(msg: string, color: string) {
    this.message.open(msg, 'x', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: color,
    });
  }

  errorHandler(e: any): Observable<any> {
    if (e.status == 400) {
      this.showMessage(e.error, 'error');
    } else if (e.status == 404) {
      this.showMessage('Usuário não encontrado', 'error');
    } else if (e.status == 403) {
      this.showMessage(
        'Não foi possível validar o token. Por favor, refaça o login',
        'error'
      );
    }
    return EMPTY;
  }

  isAuthentication(login: login): Observable<any> {
    return this.http.post<any>(this.url + '/authentication/login', login).pipe(
      map((response) => {
        this.setToken(response.token);
        this.isAuthenticated = true;
      }),
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

    const expiration = new Date().getTime() + 1800000;

    localStorage.setItem("expirationToken", expiration.toLocaleString())
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getExpirationToken(): string | null {
    return localStorage.getItem("expirationToken");
  }
}
