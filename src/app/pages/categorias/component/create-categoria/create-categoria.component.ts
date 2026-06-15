import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { CategoriasService } from '../../service/categorias.service';

@Component({
  selector: 'app-create-categoria',
  templateUrl: './create-categoria.component.html',
  styleUrls: ['./create-categoria.component.scss'],
})
export class CreateCategoriaComponent {

  formGroup!: FormGroup;
  isLoading = false;

  constructor(
    private fb: FormBuilder,
    private dialog: MatDialog,
    private service: CategoriasService,
  ) {
    this.formGroup = this.fb.group({
      nomeCategoria: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  getError(): string {
    const ctrl = this.formGroup.get('nomeCategoria');
    if (ctrl?.hasError('required')) return 'Campo obrigatório';
    if (ctrl?.hasError('minlength')) return 'Mínimo 2 caracteres';
    return '';
  }

  save() {
    if (this.formGroup.invalid) return;
    this.isLoading = true;
    this.service.create(this.formGroup.value).subscribe({
      next: () => {
        this.isLoading = false;
        this.dialog.closeAll();
      },
      error: () => { this.isLoading = false; },
    });
  }
}
