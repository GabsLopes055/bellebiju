import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'chips-selects',
  standalone: true,
  imports: [],
  templateUrl: './chips-selects.component.html',
  styleUrl: './chips-selects.component.scss',
})
export class ChipsSelectsComponent {
  @Input() color: TypeColors = 'primary';
  @Input() label: string = '';
  @Input() _clicked: boolean = false;
  @Input() mode: 'outline' | 'default' = 'default';
  @Output() clicked = new EventEmitter<any>();

  // protected _clicked = false;

  colors: Colors = {
    primary: '',
    warning: '',
    success: '',
    error: '',
    info: '',
  };

  deletarChip() {

  }

  clickAction() {
    this._clicked = !this._clicked;
    this.clicked.emit(this.label);
  }
}

type TypeColors = 'primary' | 'warning' | 'success' | 'error' | 'info';
type Colors = {
  [key in TypeColors]: string;
};
