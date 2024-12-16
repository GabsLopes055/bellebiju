import { Component, Input } from '@angular/core';

@Component({
  selector: 'tgt-table',
  standalone: true,
  imports: [],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {

  @Input() headers: string[] = [];
}
