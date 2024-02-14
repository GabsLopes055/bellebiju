import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { venda } from 'src/app/shared/models/venda';

@Component({
  selector: 'app-edit-venda',
  templateUrl: './edit-venda.component.html',
  styleUrls: ['./edit-venda.component.scss']
})
export class EditVendaComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) private venda: {venda: venda}
  ) {
    console.log(venda)
  }

}
