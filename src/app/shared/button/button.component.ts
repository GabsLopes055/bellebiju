import { Component, HostListener, Input } from '@angular/core';

@Component({
  selector: 'tgt-button',
  standalone: true,
  imports: [],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss'
})
export class ButtonComponent {

  @Input() icon!:string;
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() fieldButton: 'outline' | 'field' = 'field';
  @Input() color: TypeColors = 'primary';
  @Input() disabled: boolean = false;
  @Input() border: boolean = true;
  @Input() size: 'small' | 'middle' = 'middle';
  @Input() type: 'submit' | 'button' = 'button';

  protected hover = false;

  @HostListener('mouseleave') onMouseLeave() {
    this.hover = false;
  }

  @HostListener('mouseenter') onMouseEnter() {
    this.hover = true;
  }


  colors: Colors = {
    primary: '#00E554',
    secundary: '#fdd325',
    warning: '',
    success: '',
    error: '#EE0D43'
  }

}
type TypeColors = 'primary' | 'secundary' | 'warning' | 'success' | 'error';

type Colors = {
  [key in TypeColors]: string;
}
