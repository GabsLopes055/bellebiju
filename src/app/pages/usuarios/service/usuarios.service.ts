import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { user } from 'src/app/shared/models/user';
import { PaginaResponse } from 'src/app/shared/models/pagina-response';
import { environment } from 'src/environments/environment.development';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {

  constructor(private http: HttpClient, private toast: ToastService, private route: Router) {}

  showMessage(msg: string, color: string) {
    this.toast.showMessage(msg, color);
  }

  private errorHandler(e: any): Observable<any> {
    switch (e.status) {
      case 403:
        this.route.navigate(['/login']);
        this.showMessage('Por favor, refaça o login', 'warning');
        break;
      case 404:
        this.showMessage('Usuário não encontrado', 'error');
        break;
      case 409:
        this.showMessage('Username já está em uso', 'error');
        break;
      case 422:
        this.showMessage(e.error?.message ?? 'Dados inválidos', 'error');
        break;
      case 500:
        this.showMessage('Erro interno no servidor', 'error');
        break;
      default:
        this.showMessage('Ocorreu um erro inesperado', 'error');
    }
    return EMPTY;
  }

  listAllUsers(): Observable<user[]> {
    return this.http.get<PaginaResponse<user>>(environment.url + '/users?tamanho=500').pipe(
      map((r) => r.conteudo),
      catchError((e) => this.errorHandler(e))
    );
  }

  saveUser(formUser: user): Observable<any> {
    return this.http.post<user>(environment.url + '/users/register', formUser).pipe(
      map(() => this.showMessage('Usuário Cadastrado', 'success')),
      catchError((e) => this.errorHandler(e))
    );
  }

  updateUser(formUser: user, idUser: string): Observable<any> {
    return this.http.put<user>(environment.url + '/users/' + idUser, formUser).pipe(
      map(() => this.showMessage('Usuário Editado', 'warning')),
      catchError((e) => this.errorHandler(e))
    );
  }

  deleteUser(idUser: string): Observable<any> {
    return this.http.delete(environment.url + '/users/' + idUser).pipe(
      map(() => this.showMessage('Usuário Excluído', 'success')),
      catchError((e) => this.errorHandler(e))
    );
  }
}
