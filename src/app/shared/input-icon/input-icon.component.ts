import { Component, Input } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'tgt-input-icon',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './input-icon.component.html',
  styleUrl: './input-icon.component.scss'
})
export class InputIconComponent {

  isFocused!: boolean;
  isSelect!: boolean;

  @Input() error: boolean = false;
  @Input() type!: string;
  @Input() disabled!: boolean;
  @Input() icon!: string;
  @Input() placeholder: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() mask: string = '';
  @Input() iconPosition: 'left' | 'right' = 'left';
  @Input() backGround: string = '';
  @Input() border!: boolean;

  validarValor() {
    if(this.control.value  != '') {
      this.error = false;
    } else {
      this.error = true;
    }
  }
}
