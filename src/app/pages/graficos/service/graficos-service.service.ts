import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class GraficosServiceService {
  private url = environment.url;

  constructor(
    private http: HttpClient,
    private message: MatSnackBar,
    private route: Router,
  ) {}

  gerarGraficoPizza(dataInicio: string, dataFim: string): Observable<any> {
    return this.http
      .post<any>(this.url + '/graficos/gerarGraficoPizza', { dataInicio, dataFim })
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  gerarGraficoTotalVendas(dataInicio: string, dataFim: string): Observable<any> {
    return this.http
      .post<any>(this.url + '/graficos/gerarGraficoTotalVendas', { dataInicio, dataFim })
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  private showMessage(msg: string, color: string) {
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
}
