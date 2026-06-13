import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DATE_LOCALE, DateAdapter } from '@angular/material/core';
import { MatDialogRef } from '@angular/material/dialog';
import { format } from 'date-fns';

export interface DateRangeResult {
  dataInicio: string;
  dataFim: string;
  displayInicio: string;
  displayFim: string;
}

@Component({
  selector: 'app-model-pesquisar-por-data',
  templateUrl: './model-pesquisar-por-data.component.html',
  styleUrls: ['./model-pesquisar-por-data.component.scss'],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class ModelPesquisarPorDataComponent {
  formData!: FormGroup;

  constructor(
    public dialogRef: MatDialogRef<ModelPesquisarPorDataComponent>,
    @Inject(MAT_DATE_LOCALE) private _locale: string,
    private _adapter: DateAdapter<any>,
    private fb: FormBuilder,
  ) {
    this._adapter.setLocale(this._locale);
    this.formData = this.fb.group({
      dataInicio: ['', Validators.required],
      dataFim: ['', Validators.required],
    });
  }

  pesquisarVendas() {
    if (this.formData.invalid) return;

    const result: DateRangeResult = {
      dataInicio: format(this.formData.value.dataInicio, 'yyyy-MM-dd'),
      dataFim: format(this.formData.value.dataFim, 'yyyy-MM-dd'),
      displayInicio: format(this.formData.value.dataInicio, 'dd/MM/yyyy'),
      displayFim: format(this.formData.value.dataFim, 'dd/MM/yyyy'),
    };

    this.dialogRef.close(result);
  }

  fecharModal() {
    this.dialogRef.close(null);
  }
}
