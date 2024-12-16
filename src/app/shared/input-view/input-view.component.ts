import {Component, Input} from '@angular/core';
import {NgxMaskDirective, NgxMaskPipe} from "ngx-mask";

@Component({
  selector: 'tgt-input-view',
  standalone: true,
  imports: [
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './input-view.component.html',
  styleUrl: './input-view.component.scss'
})
export class InputViewComponent {
  @Input() label: string = '';
  @Input() value: any;
  @Input() mask: string = '';
}
