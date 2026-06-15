import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { categoria } from 'src/app/shared/models/categoria';
import { CategoriasService } from '../../service/categorias.service';

@Component({
  selector: 'app-edit-categoria',
  templateUrl: './edit-categoria.component.html',
  styleUrls: ['./edit-categoria.component.scss'],
})
export class EditCategoriaComponent {

  formGroup!: FormGroup;
  isLoading = false;
  confirmDelete = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: CategoriasService,
    @Inject(MAT_DIALOG_DATA) public data: { categoria: categoria },
  ) {
    this.formGroup = this.fb.group({
      nomeCategoria: [data.categoria.nomeCategoria, [Validators.required, Validators.minLength(2)]],
    });
  }

  getError(): string {
    const ctrl = this.formGroup.get('nomeCategoria');
    if (ctrl?.hasError('required')) return 'Campo obrigatório';
    if (ctrl?.hasError('minlength')) return 'Mínimo 2 caracteres';
    return '';
  }

  update() {
    if (this.formGroup.invalid) return;
    this.isLoading = true;
    this.service.update(this.data.categoria.idCategoria, this.formGroup.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialog.closeAll();
      },
      error: () => { this.isLoading = false; },
    });
  }

  delete() {
    this.isLoading = true;
    this.service.delete(this.data.categoria.idCategoria).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialog.closeAll();
      },
      error: () => { this.isLoading = false; },
    });
  }
}
