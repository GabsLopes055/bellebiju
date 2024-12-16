import {Component, Input} from '@angular/core';
import {FormControl, ReactiveFormsModule} from "@angular/forms";

@Component({
  selector: 'tgt-avaliacao-stars',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './avaliacao-stars.component.html',
  styleUrl: './avaliacao-stars.component.scss'
})
export class AvaliacaoStarsComponent {
  @Input() control = new FormControl();
}
