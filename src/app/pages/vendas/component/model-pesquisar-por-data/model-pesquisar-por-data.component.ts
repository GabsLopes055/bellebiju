import { GraficosServiceService } from './../../../graficos/service/graficos-service.service';
import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { format } from 'date-fns';
import { VendasService } from '../../service/vendas.service';
import { venda } from 'src/app/shared/models/venda';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { GraficosComponent } from 'src/app/pages/graficos/component/graficos/graficos.component';
// import { GraficosServiceService } from 'src/app/pages/graficos/service/graficos-service.service';

@Component({
  selector: 'app-model-pesquisar-por-data',
  templateUrl: './model-pesquisar-por-data.component.html',
  styleUrls: ['./model-pesquisar-por-data.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class ModelPesquisarPorDataComponent {

  formData!: FormGroup;
  vendas!: venda[];
  modal: boolean = true;

  constructor(
    public dialogRef: MatDialogRef<ModelPesquisarPorDataComponent>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private _adapter: DateAdapter<any>,
    private fb: FormBuilder,
    private service: GraficosServiceService,
    private graficoPizza: GraficosServiceService
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

    this.service.gerarGraficoPizza(inicio, fim).subscribe((response) => {
      this.graficoPizza.setDadosGraficoPizza(response);
    })

    this.service.gerarGraficoTotalVendas(inicio, fim).subscribe((response) => {
      this.graficoPizza.setDadosGraficoTotalVendas(response);
    })

    this.fecharModal(this.formData.value);
  }

  fecharModal(formData: any | null) {
    if(formData) {
      this.dialogRef.close(this.modal)
    } else {
      this.dialogRef.close()
    }
  }

}
