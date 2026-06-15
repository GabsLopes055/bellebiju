import { Component, OnDestroy, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { categoria } from 'src/app/shared/models/categoria';
import { CategoriasService } from '../../service/categorias.service';
import { CreateCategoriaComponent } from '../create-categoria/create-categoria.component';
import { EditCategoriaComponent } from '../edit-categoria/edit-categoria.component';

@Component({
  selector: 'app-listar-categorias',
  templateUrl: './listar-categorias.component.html',
  styleUrls: ['./listar-categorias.component.scss'],
})
export class ListarCategoriasComponent implements OnInit, OnDestroy {

  allCategorias: categoria[] = [];
  displayed: categoria[] = [];
  filterText = '';
  isLoading = false;

  private dialogSub!: Subscription;

  constructor(
    private service: CategoriasService,
    private dialog: MatDialog,
  ) {}

  ngOnInit() {
    this.dialogSub = this.dialog.afterAllClosed.subscribe(() => this.listAll());
    this.listAll();
  }

  listAll() {
    this.isLoading = true;
    this.service.listAll().subscribe({
      next: (data) => {
        this.allCategorias = data ?? [];
        this.updateDisplay();
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; },
    });
  }

  updateDisplay() {
    const term = this.filterText.toLowerCase().trim();
    this.displayed = term
      ? this.allCategorias.filter(c => c.nomeCategoria.toLowerCase().includes(term))
      : [...this.allCategorias];
  }

  openCreate() {
    this.dialog.open(CreateCategoriaComponent, { width: '420px', maxWidth: '95vw' });
  }

  openEdit(cat: categoria) {
    this.dialog.open(EditCategoriaComponent, {
      width: '420px',
      maxWidth: '95vw',
      data: { categoria: cat },
    });
  }

  ngOnDestroy() {
    this.dialogSub?.unsubscribe();
  }
}
