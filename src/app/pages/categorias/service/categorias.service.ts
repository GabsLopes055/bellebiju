import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { categoria } from 'src/app/shared/models/categoria';
import { environment } from 'src/environments/environment.development';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class CategoriasService {

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private route: Router,
  ) {}

  private showMessage(msg: string, color: string) {
    this.toast.showMessage(msg, color);
  }

  private errorHandler(e: any): Observable<any> {
    switch (e.status) {
      case 403:
        this.route.navigate(['/login']);
        this.showMessage('Por favor, refaça o login', 'warning');
        break;
      case 404:
        this.showMessage('Categoria não encontrada', 'error');
        break;
      case 409:
        this.showMessage('Categoria já cadastrada', 'error');
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

  listAll(): Observable<categoria[]> {
    return this.http.get<categoria[]>(environment.url + '/categoria').pipe(
      catchError((e) => this.errorHandler(e))
    );
  }

  create(form: Pick<categoria, 'nomeCategoria'>): Observable<categoria> {
    return this.http.post<categoria>(environment.url + '/categoria', form).pipe(
      map((res) => {
        this.showMessage('Categoria criada', 'success');
        return res;
      }),
      catchError((e) => this.errorHandler(e))
    );
  }

  update(idCategoria: string, form: Pick<categoria, 'nomeCategoria'>): Observable<categoria> {
    return this.http.put<categoria>(environment.url + '/categoria/' + idCategoria, form).pipe(
      map((res) => {
        this.showMessage('Categoria atualizada', 'warning');
        return res;
      }),
      catchError((e) => this.errorHandler(e))
    );
  }

  delete(idCategoria: string): Observable<any> {
    return this.http.delete(environment.url + '/categoria/' + idCategoria).pipe(
      map(() => this.showMessage('Categoria excluída', 'success')),
      catchError((e) => this.errorHandler(e))
    );
  }
}
