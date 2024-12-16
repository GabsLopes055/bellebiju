import { MenuService } from './../menu/menu.service';
import { Component } from '@angular/core';
import { ButtonComponent } from '../button/button.component';
import { NavbarService } from './navbar.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { UserService } from '../services/user/user.service';
import { PerfilComponent } from '../perfil/perfil.component';
import { TooltipDirective } from '../directives/tooltip.directive';
import { Menu } from '../menu/menu.component';
import { AbrirCameraComponent } from "../../private/admin/pages/alunos/components/cadastrar-aluno/components/abrir-camera/abrir-camera.component";

@Component({
  selector: 'navbar',
  standalone: true,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
  imports: [
    ButtonComponent,
    CommonModule,
    RouterLink,
    PerfilComponent,
    TooltipDirective,
    RouterLinkActive,
    AbrirCameraComponent
],
})
export class NavbarComponent {

  isOpen = true;
  menu: Menu[] = []
  isMenu = false;
  isDetail = false;
  title: any = '';
  isViajar = this.service.showBtnViajar;
  nameUser: string | undefined = '';

  constructor(
    private readonly service: NavbarService,
    private readonly userService: UserService,
    private readonly router: Router,
    private readonly menuService: MenuService
  ) {
    this.title = service.title;
    const usuario = this.userService.user;
    const firstName = usuario?.firstName.split(' ')[0];
    this.nameUser = firstName;
    this.menuService._menu.subscribe(menu => this.menu = menu);
    // console.log(usuario)
  }

  showHideDetail() {
    this.isDetail = !this.isDetail;
  }

  visualizarPerfil() {
    this.router.navigate(['/admin/perfil'])
    this.showHideDetail();
  }

  abrirMenu() {
    this.isMenu = !this.isMenu;
    console.log(this.isMenu)
  }

  logout() {
    window.sessionStorage.removeItem('token');
    this.isDetail = false;
    this.router.navigate(['/login']);
    this.menuService._menu.next([]);
  }
}
