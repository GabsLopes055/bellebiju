import { Component, Input } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
  selector: 'tgt-modal',
  standalone: true,
  imports: [],
  templateUrl: './modal.component.html',
  styleUrl: './modal.component.scss'
})
export class ModalComponent {

  @Input() witdhModal: string = '';

  constructor(
    private readonly modalService: ModalService
  ) {}


  close() {
    this.modalService.close()
  }
}
