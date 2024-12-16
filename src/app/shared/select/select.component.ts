import {
  Component,
  EventEmitter,
  Input,
  input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { DividerComponent } from '../divider/divider.component';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'tgt-select',
  standalone: true,
  templateUrl: './select.component.html',
  styleUrl: './select.component.scss',
  imports: [DividerComponent],
})
export class SelectComponent implements OnChanges {
  isOpenModal = false;

  @Input() label: string = '';
  @Input() options: OptionSelect[] = [];
  @Input() valueOptionSelected: OptionSelect = {label: '', value: ''};
  @Input() control: FormControl = new FormControl();
  @Input() icon: string = 'arrow_drop_down';
  @Input() size: 'small' | 'middle' = 'middle';
  @Input() border: boolean = true;
  @Output() changeValue = new EventEmitter();

  ngOnChanges(changes: SimpleChanges) {
    if (changes['control'] && this.control.value) {
      const selectedOption = this.options.find(
        (option) => option.value === this.control.value
      );
      if (selectedOption) {
        this.label = selectedOption.label;
      }
    }
  }

  openModal() {
    this.isOpenModal = !this.isOpenModal;
  }

  optionSelect(option: OptionSelect) {
    // this.label = option.label;
    this.valueOptionSelected = option;
    this.isOpenModal = false;
    this.control.setValue(option.value);
    this.changeValue.emit(this.control.value);
  }
}
export interface OptionSelect {
  label: string;
  value: any;
}
