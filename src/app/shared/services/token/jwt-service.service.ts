import { Injectable } from '@angular/core';
import {jwtDecode} from "jwt-decode";

@Injectable({
  providedIn: 'root'
})
export class JwtServiceService {

  constructor() { }

  isTokenValid(token: string): boolean {
    if (!token) {
      return false;
    }

    const decodedToken: any = this.decodeToken(token);
    if (!decodedToken) {
      return false;
    }

    const expiryDate = this.getExpiryDate(decodedToken);
    if (!expiryDate) {
      return false;
    }

    return expiryDate > new Date();
  }



  private decodeToken(token: string): any {
    try {
      return jwtDecode(token);
    } catch (error) {
      return null;
    }
  }

  private getExpiryDate(decodedToken: any): Date | null {
    if (!decodedToken || !decodedToken.exp) {
      return null;
    }

    const date = new Date(0);
    date.setUTCSeconds(decodedToken.exp);

    return date;
  }
}
