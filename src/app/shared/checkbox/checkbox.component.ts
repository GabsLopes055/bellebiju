import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'tgt-checkbox',
  standalone: true,
  imports: [],
  templateUrl: './checkbox.component.html',
  styleUrl: './checkbox.component.scss'
})
export class CheckboxComponent {

  @Input() checked = false;
  @Output() checkedChange = new EventEmitter<boolean>();

  onChange(event: any) {
    const input = event.target as HTMLInputElement;
    this.checked = input.checked;
    this.checkedChange.emit(this.checked);
  }
}
