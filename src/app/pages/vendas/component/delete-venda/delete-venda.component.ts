import { Component } from '@angular/core';

@Component({
  selector: 'app-delete-venda',
  templateUrl: './delete-venda.component.html',
  styleUrls: ['./delete-venda.component.scss'],
})
export class DeleteVendaComponent {
  deleteVenda() {
    alert("criar o endpoint para excluir venda")
  }
}
