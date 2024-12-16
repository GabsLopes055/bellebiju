import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../services/user/user.service';
import { Menu } from './menu.component';

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  _menu = new BehaviorSubject<Menu[]>([]);

  constructor(private readonly userService: UserService) {
    // if(this.userService.user) {
    // console.log(this.userService.)
    this.updateMenu();
    // }
  }

  setMenu(menu: Menu[]) {
    this._menu.next(menu);
  }

  setSelected(menu?: Menu) {
    let lista: Menu[] = [];

    this._menu.subscribe((menu) => (lista = menu));

    lista = lista.map((item) => {
      if (item.checked) {
        item.checked = false;
      }
      if (menu && item.label == menu.label) {
        item.checked = true;
      }
      return item;
    });
    this._menu.next(lista);
  }

  updateMenu() {
    this._menu.next([
      {
        icon: 'school',
        label: 'Escola',
        route: '/admin/escola',
        checked: false,
      },
      {
        icon: 'meeting_room',
        label: 'Turmas',
        route: '/admin/turmas',
        checked: false,
      },
      {
        icon: 'badge',
        label: 'Colaboradores',
        route: '/admin/colaboradores',
        checked: false,
      },
      {
        icon: 'school',
        label: 'Alunos',
        route: '/admin/alunos',
        checked: false,
      },
      {
        icon: 'nest_cam_wired_stand',
        label: 'Central',
        route: '/admin/central',
        checked: false,
      },
    ]);
  }

  // if(usuario != null && (usuario.role == Role.ADMIN || usuario.role == Role.MANAGER)) {
  //   this._menu.next([
  //     {icon: 'dashboard', label: 'Dashboard', route: '/admin/dashboard', checked: false},
  //     {icon: 'luggage', label: 'Viajar', route: '/admin/viajar', checked: false},
  //     {icon: 'date_range', label: 'Reservas', route: '/admin/reservas', checked: false},
  //     {icon: 'calculate', label: 'Central de Custo', route: '/admin/central-custo', checked: false},
  //     {icon: 'person_4', label: 'Integrantes', route: '/admin/viajantes', checked: false},
  //     {icon: 'settings', label: 'Configurações', route: '/admin/settings', checked: false},
  //   ])
  // }

  // if(usuario != null && usuario.role == Role.USER) {
  //   this._menu.next([
  //     {icon: 'luggage', label: 'Viajar', route: '/admin/viajar', checked: false},
  //     {icon: 'date_range', label: 'Reservas', route: '/admin/reservas', checked: false},
  //     {icon: 'person_4', label: 'Viajantes', route: '/admin/viajantes', checked: false},
  //   ])
  // }
}
