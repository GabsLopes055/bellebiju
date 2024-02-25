import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { format } from 'date-fns';
import { VendasService } from '../../service/vendas.service';
import { venda } from 'src/app/shared/models/venda';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-model-pesquisar-por-data',
  templateUrl: './model-pesquisar-por-data.component.html',
  styleUrls: ['./model-pesquisar-por-data.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class ModelPesquisarPorDataComponent {

  formData!: FormGroup;
  vendas!: venda[];

  constructor(
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private _adapter: DateAdapter<any>,
    private fb: FormBuilder,
    private service: VendasService,
    private dialog: MatDialog
  ) {
    this._adapter.setLocale(this._locale);
    this.formData = this.fb.group({
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
    });
  }

  pesquisarVendas() {
    let inicio = format(this.formData.value.dataInicio, 'yyyy-MM-dd');
    let fim = format(this.formData.value.dataFim, 'yyyy-MM-dd');

    this.service.pesquisarPorVenda(inicio, fim).subscribe((response) => {
      this.onClose(response)
    });
  }

  onClose(vendas: venda[]) {
    this.service.vendasPorData = true;
    this.service.setData(vendas);
    this.dialog.closeAll()
  }
}
