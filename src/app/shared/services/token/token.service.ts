import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import {JwtServiceService} from "./jwt-service.service";
import {MenuService} from "../../menu/menu.service";

@Injectable({
  providedIn: 'root'
})
export class TokenService {

  constructor(
    private readonly route: Router,
    private readonly jwtService: JwtServiceService,
    private readonly menuService: MenuService
  ) { }

  public async isLogin(): Promise<boolean> {

    const token = await window.sessionStorage.getItem('token');
    const isValid = this.jwtService.isTokenValid(token as string);
    if(isValid) {
      return true;
    }else {
      window.sessionStorage.removeItem('token');
      this.route.navigate(['login']);
      this.menuService._menu.next([]);
      return false;
    }

  }
}
