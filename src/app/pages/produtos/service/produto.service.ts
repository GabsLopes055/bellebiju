import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { produto } from 'src/app/shared/models/produto.model';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class ProdutoService {
  constructor(
    private message: MatSnackBar,
    private route: Router,
    private http: HttpClient
  ) {}

  url = environment.url;

  showMessage(msg: string, color: string) {
    this.message.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'top',
      panelClass: color,
    });
  }

  errorHandler(e: any): Observable<any> {
    if (e.status == 404) {
      this.showMessage('Produto não encontrado', 'error');
    } else if (e.status == 403) {
      this.route.navigate(['/login']);
      this.showMessage('Por favor, refaça o login', 'warning');
    }
    return EMPTY;
  }

  listAllProducts(): Observable<produto[]> {
    return this.http.get<produto[]>(this.url + "/produto").pipe(
      map((response) => response),
      catchError((error) => this.errorHandler(error))
    );
  }
}
