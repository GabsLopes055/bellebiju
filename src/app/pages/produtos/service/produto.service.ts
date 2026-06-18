import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { produto } from 'src/app/shared/models/produto.model';
import { PaginaResponse } from 'src/app/shared/models/pagina-response';
import { environment } from 'src/environments/environment.development';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(
    private toast: ToastService,
    private route: Router,
    private http: HttpClient
  ) {}

  url = environment.url;

  showMessage(msg: string, color: string) {
    this.toast.showMessage(msg, color);
  }

  errorHandler(e: any): Observable<any> {
    switch (e.status) {
      case 403:
        this.route.navigate(['/login']);
        this.showMessage('Por favor, refaça o login', 'warning');
        break;
      case 404:
        this.showMessage('Produto não encontrado', 'error');
        break;
      case 409:
        this.showMessage('Produto já cadastrado', 'error');
        break;
      case 422:
        this.showMessage(e.error?.message ?? 'Estoque insuficiente', 'error');
        break;
      case 500:
        this.showMessage('Erro interno no servidor', 'error');
        break;
      default:
        this.showMessage('Ocorreu um erro inesperado', 'error');
    }
    return EMPTY;
  }

  listAllProducts(): Observable<produto[]> {
    return this.http.get<any>(this.url + '/produto?tamanho=500').pipe(
      map((r) => Array.isArray(r) ? r : (r.conteudo ?? [])),
      catchError((error) => this.errorHandler(error))
    );
  }

  buscarPorNome(nome: string): Observable<produto[]> {
    return this.http.get<produto[]>(this.url + '/produto/buscar?nome=' + encodeURIComponent(nome)).pipe(
      catchError((error) => this.errorHandler(error))
    );
  }

  getEstoqueBaixo(): Observable<produto[]> {
    return this.http.get<produto[]>(this.url + '/produto/estoque-baixo').pipe(
      catchError((error) => this.errorHandler(error))
    );
  }

  getProdutoById(idProduto: string): Observable<produto> {
    return this.http.get<produto>(this.url + '/produto/' + idProduto).pipe(
      catchError((error) => this.errorHandler(error))
    );
  }

  createProduto(form: Partial<produto> & { idCategoria?: string | null }): Observable<produto> {
    return this.http.post<produto>(this.url + '/produto', form).pipe(
      map((response) => {
        this.showMessage('Produto Cadastrado', 'success');
        return response;
      }),
      catchError((error) => this.errorHandler(error))
    );
  }

  updateProduto(idProduto: string, form: Partial<produto> & { idCategoria?: string | null }): Observable<produto> {
    return this.http.put<produto>(this.url + '/produto/' + idProduto, form).pipe(
      map((response) => {
        this.showMessage('Produto Editado', 'warning');
        return response;
      }),
      catchError((error) => this.errorHandler(error))
    );
  }

  deleteProduto(idProduto: string): Observable<any> {
    return this.http.delete(this.url + '/produto/' + idProduto).pipe(
      map(() => this.showMessage('Produto Excluído', 'success')),
      catchError((error) => this.errorHandler(error))
    );
  }

  ajustarEstoque(idProduto: string, quantidade: number): Observable<produto> {
    return this.http.patch<produto>(this.url + '/produto/' + idProduto + '/estoque', { quantidade }).pipe(
      map((response) => {
        this.showMessage('Estoque atualizado', 'success');
        return response;
      }),
      catchError((error) => this.errorHandler(error))
    );
  }
}
