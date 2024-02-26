import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate } from '@angular/router';
import { Observable, interval, startWith, switchMap } from 'rxjs';
import { LoginService } from 'src/app/login/service/login.service';
import { SessionLoginComponent } from 'src/app/pages/session-login/session-login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {


  constructor(private authService: LoginService, private dialog: MatDialog) {

  }

  canActivate() {

    const expirationToken = this.authService.getExpirationToken();

    if(expirationToken) {

      const currentDate = new Date().getTime().toLocaleString();

      if (expirationToken < currentDate) {
        this.abrirModalSessao()
    }

    }


    return true;
  }

  abrirModalSessao() {
    this.dialog.open(SessionLoginComponent, {
      width: '100%',
      height: 'auto',
      disableClose: true,
    });
  }




}
