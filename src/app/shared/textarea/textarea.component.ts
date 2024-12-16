import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';

@Component({
  selector: 'tgt-textarea',
  standalone: true,
    imports: [
        NgxMaskDirective,
        ReactiveFormsModule
    ],
  templateUrl: './textarea.component.html',
  styleUrl: './textarea.component.scss'
})
export class TextareaComponent {
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() readonly: boolean = false;
  @Input() linhas: number = 10;
  @Input() placeholder: string = '';

}
