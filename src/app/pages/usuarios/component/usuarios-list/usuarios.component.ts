import { Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UsuariosService } from '../../service/usuarios.service';
import { user } from 'src/app/shared/models/user';
import { UsuariosCreatedComponent } from '../usuarios-created/usuarios-created.component';
import { UsuariosEditComponent } from '../usuarios-edit/usuarios-edit.component';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styleUrls: ['./usuarios.component.scss'],
})
export class UsuariosComponent implements OnDestroy {

  // ─── Dados ───────────────────────────────────────────────────────────────
  allUsers: user[]       = [];
  displayedUsers: user[] = [];
  isLoading              = true;

  // ─── Estado da tabela ────────────────────────────────────────────────────
  filterText  = '';
  sortField   = '';
  sortDir: 'asc' | 'desc' = 'asc';
  page        = 1;
  pageSize    = 10;
  totalFiltered = 0;

  private dialogCloseSub = this.dialog.afterAllClosed.subscribe(() => this.listAllUsers());

  constructor(private service: UsuariosService, private dialog: MatDialog) {
    this.listAllUsers();
  }

  // ─── Carga ───────────────────────────────────────────────────────────────
  listAllUsers() {
    this.isLoading = true;
    this.service.listAllUsers().subscribe({
      next: (data) => {
        this.allUsers = data ?? [];
        this.page = 1;
        this.updateDisplay();
        this.isLoading = false;
      },
      error: () => { this.isLoading = false; },
    });
  }

  // ─── Filtro + Ordenação + Paginação ──────────────────────────────────────
  private updateDisplay() {
    const term = this.filterText.trim().toLowerCase();
    let result = term
      ? this.allUsers.filter(u =>
          u.nome.toLowerCase().includes(term) ||
          u.username.toLowerCase().includes(term))
      : [...this.allUsers];

    if (this.sortField) {
      result.sort((a, b) => {
        const va: any = this.sortField === 'createdAt'
          ? new Date((a as any).createdAt).getTime()
          : (a as any)[this.sortField] ?? '';
        const vb: any = this.sortField === 'createdAt'
          ? new Date((b as any).createdAt).getTime()
          : (b as any)[this.sortField] ?? '';
        if (va < vb) return this.sortDir === 'asc' ? -1 : 1;
        if (va > vb) return this.sortDir === 'asc' ? 1 : -1;
        return 0;
      });
    }

    this.totalFiltered = result.length;
    const start = (this.page - 1) * this.pageSize;
    this.displayedUsers = result.slice(start, start + this.pageSize);
  }

  applyFilter(event: Event) {
    this.filterText = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.updateDisplay();
  }

  sortBy(field: string) {
    this.sortDir = this.sortField === field && this.sortDir === 'asc' ? 'desc' : 'asc';
    this.sortField = field;
    this.updateDisplay();
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) return 'unfold_more';
    return this.sortDir === 'asc' ? 'arrow_upward' : 'arrow_downward';
  }

  goToPage(p: number) {
    if (p < 1 || p > this.totalPages) return;
    this.page = p;
    this.updateDisplay();
  }

  onPageSizeChange(event: Event) {
    this.pageSize = +(event.target as HTMLSelectElement).value;
    this.page = 1;
    this.updateDisplay();
  }

  // ─── Getters ─────────────────────────────────────────────────────────────
  get totalPages(): number {
    return Math.max(1, Math.ceil(this.totalFiltered / this.pageSize));
  }

  get pageNumbers(): number[] {
    const pages: number[] = [];
    for (let i = Math.max(1, this.page - 2); i <= Math.min(this.totalPages, this.page + 2); i++) {
      pages.push(i);
    }
    return pages;
  }

  get paginationInfo(): string {
    if (this.totalFiltered === 0) return 'Nenhum registro';
    const start = (this.page - 1) * this.pageSize + 1;
    const end   = Math.min(this.page * this.pageSize, this.totalFiltered);
    return `${start}–${end} de ${this.totalFiltered}`;
  }

  // ─── Dialogs ─────────────────────────────────────────────────────────────
  createNewUser() {
    this.dialog.open(UsuariosCreatedComponent, { width: '460px', maxWidth: '95vw' });
  }

  editarUsuario(u: user) {
    this.dialog.open(UsuariosEditComponent, { width: '460px', maxWidth: '95vw', data: { user: u } });
  }

  deleteUsuario(u: user) {
    this.service.deleteUser(u.idUser).subscribe(() => this.listAllUsers());
  }

  ngOnDestroy() { this.dialogCloseSub.unsubscribe(); }
}
