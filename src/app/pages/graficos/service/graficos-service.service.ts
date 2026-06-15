import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';
import { ToastService } from 'src/app/shared/toast/toast.service';
import { ResumoResponse, ProdutoMaisVendido, ResumoPorCategoria } from 'src/app/shared/models/relatorios';

@Injectable({
  providedIn: 'root',
})
export class GraficosServiceService {
  private url = environment.url;

  constructor(
    private http: HttpClient,
    private toast: ToastService,
    private route: Router,
  ) {}

  getResumo(dataInicio: string, dataFim: string, idCategoria?: string): Observable<ResumoResponse> {
    let query = `?dataInicio=${dataInicio}&dataFim=${dataFim}`;
    if (idCategoria) query += `&idCategoria=${idCategoria}`;
    return this.http
      .get<ResumoResponse>(this.url + `/relatorios/resumo${query}`)
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  getProdutosMaisVendidos(dataInicio: string, dataFim: string, idCategoria?: string): Observable<ProdutoMaisVendido[]> {
    let query = `?dataInicio=${dataInicio}&dataFim=${dataFim}`;
    if (idCategoria) query += `&idCategoria=${idCategoria}`;
    return this.http
      .get<ProdutoMaisVendido[]>(this.url + `/relatorios/produtos-mais-vendidos${query}`)
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  getResumoPorCategoria(dataInicio: string, dataFim: string): Observable<ResumoPorCategoria[]> {
    return this.http
      .get<ResumoPorCategoria[]>(this.url + `/relatorios/resumo-por-categoria?dataInicio=${dataInicio}&dataFim=${dataFim}`)
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  private showMessage(msg: string, color: string) {
    this.toast.showMessage(msg, color);
  }

  private errorHandler(e: any): Observable<never> {
    switch (e.status) {
      case 403:
        this.route.navigate(['/login']);
        this.showMessage('Por favor, refaça o login', 'warning');
        break;
      case 404:
        this.showMessage('Dados não encontrados para o período', 'error');
        break;
      case 422:
        this.showMessage(e.error?.message ?? 'Período inválido', 'error');
        break;
      case 500:
        this.showMessage('Erro interno no servidor', 'error');
        break;
      default:
        this.showMessage('Ocorreu um erro inesperado', 'error');
    }
    return EMPTY;
  }
}
