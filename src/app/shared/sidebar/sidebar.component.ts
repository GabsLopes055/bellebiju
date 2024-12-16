import { SidebarService } from './sidebar.service';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'sidebar',
  standalone: true,
  imports: [],
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {
  @Input() title: string = '';

  constructor(
    private readonly service: SidebarService
  ) {}

  close() {
    this.service.closeSide();
  }
}
