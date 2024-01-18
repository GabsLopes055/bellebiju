import { Injectable } from '@angular/core';
import { user } from 'src/app/shared/models/user';

@Injectable({
  providedIn: 'root',
})
export class MyInformationsService {

  user: user;

  constructor() {
    this.user = JSON.parse(localStorage.getItem('user') || '{}');
  }
}
