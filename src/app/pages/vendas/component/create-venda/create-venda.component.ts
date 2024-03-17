import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VendasService } from '../../service/vendas.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-create-venda',
  templateUrl: './create-venda.component.html',
  styleUrls: ['./create-venda.component.scss'],
})
export class CreateVendaComponent {
  totalVenda: number = 6;
  formGroup!: FormGroup;

  constructor(private fb: FormBuilder, private service: VendasService, private dialog: MatDialog) {
    this.formGroup = this.fb.group({
      nomeProduto: ['', [Validators.required, Validators.minLength(3)]],
      preco: ['', [Validators.required, Validators.minLength(3)]],
      quantidade: ['', [Validators.required, Validators.minLength(3)]],
      total: ['', [Validators.required, Validators.minLength(3)]],
      formaPagamento: ['', [Validators.required, Validators.minLength(3)]],
    });

    // this.formGroup.controls['preco'].valueChanges.subscribe(() => this.calcularTotal());
    // this.formGroup.controls['quantidade'].valueChanges.subscribe(() => this.calcularTotal());
  }

  // calcularTotal() {
  //   const preco = this.formGroup.controls['preco'].value;
  //   const quantidade = this.formGroup.controls['quantidade'].value;

  //   const total = preco * quantidade;

  //   // Atualize o valor do controle 'total' no formulário
  //   this.formGroup.controls['total'].setValue(total);
  // }

  getErrorMessage() {
    return 'Campo não pode ser vazio';
  }

  salvarVenda() {
    this.formGroup.controls['total'].setValue(parseFloat(this.formGroup.controls['total'].value))

    this.service.createNewVenda(this.formGroup.value).subscribe((response) => {
      this.service.showMessage("Venda Cadastrada", "success")
    });

    this.dialog.closeAll();
    this.formGroup.reset()
  }


}
