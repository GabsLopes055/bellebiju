import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { venda } from 'src/app/shared/models/venda';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class VendasService {
  constructor(
    private http: HttpClient,
    private message: MatSnackBar,
    private route: Router,
  ) {}

  showMessage(msg: string, color: string) {
    this.message.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: color,
    });
  }

  private errorHandler(e: any): Observable<never> {
    if (e.status === 500) {
      this.showMessage('Erro Interno', 'error');
    } else if (e.status === 403) {
      this.route.navigate(['/login']);
      this.showMessage('Por favor, refaça o login', 'warning');
    }
    return EMPTY;
  }

  listAllVendas(): Observable<venda[]> {
    return this.http
      .get<venda[]>(environment.url + '/vendas')
      .pipe(catchError((e) => this.errorHandler(e)));
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
