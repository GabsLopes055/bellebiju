import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Route, Router } from '@angular/router';
import { BehaviorSubject, EMPTY, Observable, catchError, map } from 'rxjs';
import { venda } from 'src/app/shared/models/venda';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class VendasService {

  private vendasModal!: venda[];
  public vendasPorData!: boolean

  constructor(private http: HttpClient, private message: MatSnackBar, private route: Router) {}

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
      // this.route.navigate(['/login']);
      // this.showMessage("Por favor, refaça o login", "warning")
    }
    return EMPTY;
  }

  createNewVenda(venda: venda): Observable<any> {
    return this.http.post<venda>(environment.url + '/vendas', venda).pipe(
      map((response) => {
        this.showMessage('Venda Cadastrada', 'success'),
          catchError((e) => this.errorHandler(e));
      })
    );
  }

  listAllVendas(): Observable<any> {
    return this.http.get<any>(environment.url + '/vendas').pipe(
      catchError((e) => this.errorHandler(e))
    );
  }

  deleteVenda(venda: venda): Observable<any> {
    return this.http.delete<any>(environment.url + "/vendas/" + venda.id).pipe(
      map((response) => response),
      catchError((e) => this.errorHandler(e))
    )
  }

  editarVenda(idvenda: string, venda: venda): Observable<any> {
    return this.http.put<any>(environment.url + "/vendas/" + idvenda, venda).pipe(
      map((response) => response),
      catchError((e) => this.errorHandler(e))
    )
  }

  pesquisarPorVenda(dataInicio: string, dataFim: string): Observable<venda[]> {
    return this.http.post<venda[]>(environment.url + "/vendas/" + dataInicio + "/" + dataFim, null).pipe(
      catchError((e) => this.errorHandler(e))
    )
  }

  getData() {
    return this.vendasModal;
  }

  setData(vendas: venda[]) {
    this.vendasModal = vendas;
  }


}
