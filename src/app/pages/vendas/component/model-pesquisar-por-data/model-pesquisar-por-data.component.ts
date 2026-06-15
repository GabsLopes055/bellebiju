import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { parseISO, format } from 'date-fns';

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
})
export class ModelPesquisarPorDataComponent {
  formData: FormGroup;

  constructor(
    private dialogRef: MatDialogRef<ModelPesquisarPorDataComponent>,
    private fb: FormBuilder,
  ) {
    this.formData = this.fb.group({
      dataInicio: ['', Validators.required],
      dataFim:    ['', Validators.required],
    });
  }

  pesquisarVendas() {
    if (this.formData.invalid) return;
    const { dataInicio, dataFim } = this.formData.value;

    const result: DateRangeResult = {
      dataInicio,
      dataFim,
      displayInicio: format(parseISO(dataInicio), 'dd/MM/yyyy'),
      displayFim:    format(parseISO(dataFim),    'dd/MM/yyyy'),
    };

    this.dialogRef.close(result);
  }

  fecharModal() {
    this.dialogRef.close(null);
  }
}
