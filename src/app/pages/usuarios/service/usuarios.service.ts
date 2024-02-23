import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { EMPTY, Observable, catchError, map } from 'rxjs';
import { user } from 'src/app/shared/models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class UsuariosService {
  constructor(private http: HttpClient, private message: MatSnackBar, private route: Router) {}

  showMessage(msg: string, color: string) {
    this.message.open(msg, 'X', {
      duration: 5000,
      horizontalPosition: 'right',
      verticalPosition: 'bottom',
      panelClass: color,
    });
  }

  errorHandler(e: any): Observable<any> {
    if (e.status == 500) {
      this.showMessage('Erro Interno', 'error');
    } else if (e.status == 403) {
      this.route.navigate(['/login']);
      this.showMessage("Por favor, refaça o login", "warning")
    }
    return EMPTY;
  }

  listAllUsers(): Observable<user[]> {
    return this.http.get<user[]>(environment.url + '/users');
  }

  saveUser(formUser: user): Observable<any> {
    return this.http.post<user>(environment.url + '/users/register', formUser).pipe(
      map(
        () => {
          this.showMessage('Usuario Cadastrado', 'success');
        },
        catchError((e) => this.errorHandler(e))
      )
    );
  }

  updateUser(formUser: user, idUser: string): Observable<any> {
    return this.http
      .put<user>(environment.url + '/users/' + idUser, formUser)
      .pipe(
        map(
          () => {
            this.showMessage('Usuario Editado', 'warning');
          },
          catchError((e) => this.errorHandler(e))
        )
      );
  }

  deleteUser(idUser: string): Observable<any> {
    return this.http.delete(environment.url + '/users/' + idUser).pipe(
      map(
        () => {
          this.showMessage('Usuario Excluido', 'success');
        },
        catchError((e) => this.errorHandler(e))
      )
    );
  }
}
