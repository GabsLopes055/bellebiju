import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CanActivate } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';
import { SessionLoginComponent } from 'src/app/pages/session-login/session-login.component';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private authService: LoginService, private dialog: MatDialog) {}

  canActivate() {
    if (this.authService.isLoggedIn()) {
      // this.abrirModalSessao();
      return true;
    }
    this.abrirModalSessao();
    return false;
  }

  abrirModalSessao() {
    this.dialog.open(SessionLoginComponent, {
      width: '100%',
      height: 'auto',
      disableClose: true,
    });
  }
}
