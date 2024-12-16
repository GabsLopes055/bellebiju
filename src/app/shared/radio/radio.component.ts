import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'tgt-radio',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './radio.component.html',
  styleUrl: './radio.component.scss',
})
export class RadioComponent implements OnInit{
  @Input() control = new FormControl();
  @Input() value: any;
  @Output() valueChange = new EventEmitter<any>();

  ngOnInit() {
    this.control.valueChanges.subscribe((value) => {
      if (value === this.value) {
        this.valueChange.emit(this.value);
      }
    });
  }
}
