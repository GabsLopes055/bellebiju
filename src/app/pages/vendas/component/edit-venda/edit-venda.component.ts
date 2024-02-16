import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { venda } from 'src/app/shared/models/venda';
import { VendasService } from '../../service/vendas.service';

@Component({
  selector: 'app-edit-venda',
  templateUrl: './edit-venda.component.html',
  styleUrls: ['./edit-venda.component.scss']
})
export class EditVendaComponent {

  formGroup: FormGroup;

  constructor(
    @Inject(MAT_DIALOG_DATA) private venda: {venda: venda},
    private formBuilder: FormBuilder,
    private dialog: MatDialog,
    private service: VendasService
  ) {
    this.formGroup = this.formBuilder.group({
      nomeProduto: [this.venda.venda.nomeProduto, [Validators.required, Validators.minLength(3)]],
      preco: [this.venda.venda.preco, [Validators.required, Validators.minLength(3)]],
      quantidade: [this.venda.venda.quantidade, [Validators.required, Validators.minLength(3)]],
      total: [this.venda.venda.total, [Validators.required, Validators.minLength(3)]],
      formaPagamento: [this.venda.venda.formaPagamento, [Validators.required, Validators.minLength(3)]],
    });
    this.formGroup.controls['preco'].valueChanges.subscribe(() => this.calcularTotal());
    this.formGroup.controls['quantidade'].valueChanges.subscribe(() => this.calcularTotal());
  }

  calcularTotal() {
    const preco = this.formGroup.controls['preco'].value;
    const quantidade = this.formGroup.controls['quantidade'].value;

    const total = preco * quantidade;

    // Atualize o valor do controle 'total' no formulário
    this.formGroup.controls['total'].setValue(total);
  }

  getErrorMessage() {
    return 'Campo não pode ser vazio';
  }

  editarVenda() {
    this.service.editarVenda(this.venda.venda.id, this.formGroup.value).subscribe((response) => {});
    this.dialog.closeAll();
    this.service.showMessage('Venda Editada !', 'warning');
  }

}
