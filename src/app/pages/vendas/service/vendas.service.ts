import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { venda } from 'src/app/shared/models/venda';
import { PaginaResponse } from 'src/app/shared/models/pagina-response';
import { environment } from 'src/environments/environment.development';
import { ToastService } from 'src/app/shared/toast/toast.service';

@Injectable({
  providedIn: 'root',
})
export class VendasService {
  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private route: Router,
  ) {}

  showMessage(msg: string, color: string) {
    this.toast.showMessage(msg, color);
  }

  private errorHandler(e: any): Observable<never> {
    switch (e.status) {
      case 403:
        this.route.navigate(['/login']);
        this.showMessage('Por favor, refaça o login', 'warning');
        break;
      case 404:
        this.showMessage('Venda não encontrada', 'error');
        break;
      case 409:
        this.showMessage('Conflito de dados', 'error');
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

  listAllVendas(): Observable<venda[]> {
    return this.http
      .get<PaginaResponse<venda>>(environment.url + '/vendas?tamanho=500')
      .pipe(
        map((r) => r.conteudo),
        catchError((e) => this.errorHandler(e))
      );
  }

  createNewVenda(venda: Partial<venda>): Observable<venda> {
    return this.http
      .post<venda>(environment.url + '/vendas', venda)
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  editarVenda(idvenda: string, venda: Partial<venda>): Observable<venda> {
    return this.http
      .put<venda>(environment.url + '/vendas/' + idvenda, venda)
      .pipe(
        map((response) => response),
        catchError((e) => this.errorHandler(e)),
      );
  }

  deleteVenda(venda: venda): Observable<any> {
    return this.http
      .delete<any>(environment.url + '/vendas/' + venda.id)
      .pipe(
        map((response) => response),
        catchError((e) => this.errorHandler(e)),
      );
  }

  pesquisarPorVenda(dataInicio: string, dataFim: string): Observable<venda[]> {
    return this.http
      .post<venda[]>(environment.url + '/vendas/' + dataInicio + '/' + dataFim, null)
      .pipe(catchError((e) => this.errorHandler(e)));
  }
}
