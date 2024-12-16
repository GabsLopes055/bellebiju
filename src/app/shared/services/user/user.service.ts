import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../../../models/authentication.interface';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  usuario = new BehaviorSubject<User | undefined>(undefined);
  usuarioInstance!: User;
  constructor() {}

  get user(): User | null {

    const token = window.sessionStorage.getItem('token');

    if (token) {
      const tokenPayload = token.split('.')[1];
      const payload = JSON.parse(atob(tokenPayload));
      // console.log(payload)
      const usuario: User = payload['usuario'];
      return usuario;
    }
    return null;
  }
}
