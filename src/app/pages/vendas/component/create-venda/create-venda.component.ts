import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject, Subscription, debounceTime, distinctUntilChanged, of, switchMap } from 'rxjs';
import { produto } from 'src/app/shared/models/produto.model';
import { ProdutoService } from 'src/app/pages/produtos/service/produto.service';
import { VendasService } from '../../service/vendas.service';

@Component({
  selector: 'app-create-venda',
  templateUrl: './create-venda.component.html',
  styleUrls: ['./create-venda.component.scss'],
})
export class CreateVendaComponent implements OnInit, OnDestroy {

  formGroup: FormGroup;
  isLoading       = false;
  modoVinculado   = false;
  sugestoes: produto[] = [];
  produtoSelecionado: produto | null = null;
  buscandoProduto = false;
  showSugestoes   = false;

  private searchSubject = new Subject<string>();
  private subs = new Subscription();

  constructor(
    private fb: FormBuilder,
    private service: VendasService,
    private produtoService: ProdutoService,
    private dialogRef: MatDialogRef<CreateVendaComponent>,
  ) {
    this.formGroup = this.fb.group({
      nomeProduto:    ['', [Validators.required, Validators.minLength(3)]],
      preco:          [null, [Validators.required, Validators.min(0.01)]],
      quantidade:     [null, [Validators.required, Validators.min(1)]],
      total:          [{ value: null, disabled: true }],
      formaPagamento: ['', Validators.required],
      dataVenda:      [null],
    });

    this.subs.add(
      this.formGroup.controls['preco'].valueChanges.subscribe(() => this.calcularTotal())
    );
    this.subs.add(
      this.formGroup.controls['quantidade'].valueChanges.subscribe(() => this.calcularTotal())
    );
  }

  ngOnInit() {
    this.subs.add(
      this.searchSubject.pipe(
        debounceTime(300),
        distinctUntilChanged(),
        switchMap(term => {
          if (term.length < 2) {
            this.buscandoProduto = false;
            this.sugestoes = [];
            this.showSugestoes = false;
            return of([]);
          }
          this.buscandoProduto = true;
          return this.produtoService.buscarPorNome(term);
        })
      ).subscribe({
        next: (produtos) => {
          this.sugestoes = produtos;
          this.buscandoProduto = false;
          this.showSugestoes = produtos.length > 0;
        },
      })
    );
  }

  // ── Modo ─────────────────────────────────────────────────────────────────────

  setModo(vinculado: boolean) {
    if (this.modoVinculado === vinculado) return;
    this.modoVinculado = vinculado;
    this.limparProduto();
    this.sugestoes = [];
    this.showSugestoes = false;

    if (vinculado) {
      this.formGroup.controls['nomeProduto'].disable();
    } else {
      this.formGroup.controls['preco'].enable();
      this.formGroup.controls['nomeProduto'].enable();
    }
  }

  get temDesconto(): boolean {
    if (!this.modoVinculado || !this.produtoSelecionado) return false;
    const precoEditado = parseFloat(this.formGroup.controls['preco'].value);
    return !isNaN(precoEditado) && precoEditado !== this.produtoSelecionado.precoProduto;
  }

  // ── Busca de produto ──────────────────────────────────────────────────────────

  onSearchInput(event: Event) {
    const term = (event.target as HTMLInputElement).value.trim();
    if (!term) { this.limparProduto(); }
    this.searchSubject.next(term);
  }

  selecionarProduto(p: produto) {
    this.produtoSelecionado = p;
    this.showSugestoes = false;
    this.sugestoes = [];
    this.formGroup.patchValue({
      nomeProduto: p.nomeProduto,
      preco: p.precoProduto,
    }, { emitEvent: false });
    this.calcularTotal();
  }

  limparProduto() {
    this.produtoSelecionado = null;
    this.formGroup.patchValue(
      { nomeProduto: '', preco: null, total: null },
      { emitEvent: false }
    );
  }

  fecharSugestoes() {
    setTimeout(() => { this.showSugestoes = false; }, 150);
  }

  // ── Cálculo ──────────────────────────────────────────────────────────────────

  private calcularTotal() {
    const preco = parseFloat(this.formGroup.controls['preco'].value) || 0;
    const qtd   = parseFloat(this.formGroup.controls['quantidade'].value) || 0;
    this.formGroup.controls['total'].setValue(
      preco * qtd > 0 ? preco * qtd : null,
      { emitEvent: false }
    );
  }

  // ── Validação ────────────────────────────────────────────────────────────────

  get isFormInvalid(): boolean {
    if (this.formGroup.invalid) return true;
    if (this.modoVinculado && !this.produtoSelecionado) return true;
    return false;
  }

  // ── Salvar ──────────────────────────────────────────────────────────────────

  salvarVenda() {
    if (this.isFormInvalid) return;
    this.isLoading = true;
    const raw = this.formGroup.getRawValue();

    const payload: any = {
      formaPagamento: raw.formaPagamento,
      quantidade:     raw.quantidade,
    };

    if (this.modoVinculado && this.produtoSelecionado && !this.temDesconto) {
      // Preço original — backend calcula total e deduz estoque
      const p = this.produtoSelecionado;
      payload.idProduto   = p.idProduto;
      payload.nomeProduto = p.nomeProduto;
      payload.preco       = p.precoProduto;
      payload.total       = p.precoProduto * raw.quantidade;
    } else if (this.modoVinculado && this.produtoSelecionado && this.temDesconto) {
      // Desconto aplicado — envia como avulso (sem idProduto) para usar o preço editado
      payload.idProduto   = null;
      payload.nomeProduto = this.produtoSelecionado.nomeProduto;
      payload.preco       = raw.preco;
      payload.total       = raw.total;
    } else {
      payload.nomeProduto = raw.nomeProduto;
      payload.preco       = raw.preco;
      payload.total       = raw.total;
      payload.idProduto   = null;
    }

    if (raw.dataVenda) {
      payload.dataVenda = raw.dataVenda.length === 16 ? raw.dataVenda + ':00' : raw.dataVenda;
    }

    this.service.createNewVenda(payload).subscribe({
      next: () => {
        this.service.showMessage('Venda cadastrada com sucesso!', 'success');
        this.isLoading = false;
        this.dialogRef.close(true);
      },
      error: () => { this.isLoading = false; },
    });
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }
}
