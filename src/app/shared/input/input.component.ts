import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from '@angular/core';
import { AbstractControl, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxMaskDirective, NgxMaskPipe } from 'ngx-mask';

@Component({
  selector: 'tgt-input',
  standalone: true,
  imports: [
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe
  ],
  templateUrl: './input.component.html',
  styleUrl: './input.component.scss'
})
export class InputComponent implements OnChanges {
  @Input() type: 'text' | 'email' | 'password' | 'number' | 'date' = 'text';
  @Input() label: string = '';
  @Input() control: FormControl = new FormControl();
  @Input() mask: string = '';
  @Input() readonly: boolean = false;
  @Input() placeholder: string = '';

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['control'] && this.control.value && this.type === 'date') {
      this.control.setValue(this.formatDate(this.control.value));
    }
  }

  private formatDate(dateString: string): string {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const formattedDate = `${date.getFullYear()}-${this.padNumber(date.getMonth() + 1)}-${this.padNumber(date.getDate())}`;
      return formattedDate;
    }
    return '';
  }

  private padNumber(num: number): string {
    return num.toString().padStart(2, '0');
  }
}
