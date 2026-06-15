import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map, catchError, EMPTY } from 'rxjs';
import { login } from 'src/app/shared/models/login';
import { environment } from 'src/environments/environment.development';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class LoginService {

  private readonly TOKEN_KEY = 'authToken';
  url = environment.url;
  private isAuthenticated = false;

  constructor(private http: HttpClient, private toast: ToastService) {
    this.isAuthenticated = !!localStorage.getItem(this.TOKEN_KEY);
  }

  showMessage(msg: string, color: string) {
    this.toast.showMessage(msg, color);
  }

  errorHandler(e: any): Observable<any> {
    switch (e.status) {
      case 400:
        this.showMessage(e.error?.message ?? 'Dados inválidos', 'error');
        break;
      case 403:
        this.showMessage('Senha incorreta ou sem permissão', 'error');
        break;
      case 404:
        this.showMessage('Usuário não encontrado', 'error');
        break;
      case 409:
        this.showMessage('Username já está em uso', 'error');
        break;
      default:
        this.showMessage('Ocorreu um erro inesperado', 'error');
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

  refreshToken(): Observable<any> {
    return this.http.post<any>(this.url + '/authentication/refresh', null).pipe(
      map((response) => {
        this.setToken(response.token);
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
    localStorage.setItem('expirationToken', expiration.toString());
    localStorage.setItem(this.TOKEN_KEY, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getExpirationToken(): string | null {
    return localStorage.getItem('expirationToken');
  }
}
