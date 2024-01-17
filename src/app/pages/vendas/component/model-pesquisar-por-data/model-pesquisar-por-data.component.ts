import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { format } from 'date-fns';

@Component({
  selector: 'app-model-pesquisar-por-data',
  templateUrl: './model-pesquisar-por-data.component.html',
  styleUrls: ['./model-pesquisar-por-data.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class ModelPesquisarPorDataComponent {

  formData!: FormGroup;

  constructor(
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private _adapter: DateAdapter<any>,
    private fb: FormBuilder
  ) {
    this._adapter.setLocale(this._locale);
    this.formData = this.fb.group({
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required]
    })
  }

  pesquisarVendas() {

    let inicio = format(this.formData.value.dataInicio, 'yyyy-MM-dd');
    let fim = format(this.formData.value.dataFim, 'yyyy-MM-dd');

    console.log(inicio, fim)
  }
}
