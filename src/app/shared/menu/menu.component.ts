import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { MenuService } from './menu.service';
import { DividerComponent } from '../divider/divider.component';
import { ButtonComponent } from '../button/button.component';
import { TooltipDirective } from '../directives/tooltip.directive';

@Component({
  selector: 'menu',
  standalone: true,
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
  imports: [
    CommonModule,
    RouterLink,
    DividerComponent,
    ButtonComponent,
    TooltipDirective,
    RouterModule,
  ],
})
export class MenuComponent implements OnInit {
  isOpen = true;

  menu: Menu[] = [];

  constructor(private service: MenuService) {
    this.service._menu.subscribe((menu) => (this.menu = menu));
  }

  ngOnInit(): void {}

  openClose() {
    this.isOpen = !this.isOpen;
  }
}

export interface Menu {
  icon: string;
  label: string;
  route: string;
  checked: boolean;
}
