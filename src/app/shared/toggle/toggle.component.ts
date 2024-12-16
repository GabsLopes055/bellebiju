import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {Component, EventEmitter, Input, Output} from '@angular/core';
import {TooltipDirective} from "../directives/tooltip.directive";

@Component({
  selector: 'tgt-toggle',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule, TooltipDirective],
  templateUrl: './toggle.component.html',
  styleUrl: './toggle.component.scss'
})
export class ToggleComponent {
 @Input() isChecked: boolean = false;
 @Input() icon = '';
 @Input() disabled!: boolean;
 @Input() label = '';
 @Input() control!: FormControl;

 @Output() changeToggle = new EventEmitter();

 change() {
  if(!this.disabled) {
    this.isChecked = !this.isChecked;
    this.control.setValue(this.isChecked)
    this.changeToggle.emit(this.isChecked);
  }
 }
}
