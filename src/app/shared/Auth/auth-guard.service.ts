import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { LoginService } from 'src/app/login/service/login.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {

  constructor(private authService: LoginService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot,state: RouterStateSnapshot): boolean {

    if(this.authService.isLoggedIn()) {
      return true;
    }

    this.router.navigate(['/login']);
    this.authService.showMessage("Por favor, refaça o login", "warning")
    return false;
  }
}
