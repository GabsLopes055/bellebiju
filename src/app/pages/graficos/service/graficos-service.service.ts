import { datasForGraficos } from './../../../shared/models/datasForGraficos';
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
  constructor(
    private http: HttpClient,
    private message: MatSnackBar,
    private route: Router
  ) {}

  url = environment.url;

  private dadosGraficoPizza: any
  private dadosGraficoTotalVendas: any

  showMessage(msg: string, color: string) {
    this.message.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: color,
    });
  }

  errorHandler(e: any): Observable<any> {
    if (e.status == 500) {
      this.showMessage('Erro Interno', 'error');
    } else if (e.status == 403) {
      this.route.navigate(['/login']);
      this.showMessage('Por favor, refaça o login', 'warning');
    }
    return EMPTY;
  }

  gerarGraficoPizza(dataInicio: any, dataFim: any): Observable<any> {

    const datasForGraficos = { dataInicio, dataFim };

    return this.http
      .post<any>(this.url + '/graficos/gerarGraficoPizza', datasForGraficos)
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  gerarGraficoTotalVendas(dataInicio: any, dataFim: any): Observable<any> {

    const datasForGraficos = { dataInicio, dataFim };

    return this.http
      .post<any>(this.url + '/graficos/gerarGraficoTotalVendas', datasForGraficos)
      .pipe(catchError((e) => this.errorHandler(e)));
  }

  public setDadosGraficoPizza(dados: any) {
    this.dadosGraficoPizza = dados
  }

  public getDadosGraficosPizza() : any {
    return this.dadosGraficoPizza;
  }

  public setDadosGraficoTotalVendas(dados: any) {
    this.dadosGraficoTotalVendas = dados
  }

  public getDadosGraficosTotalVendas() : any {
    return this.dadosGraficoTotalVendas;
  }
}
