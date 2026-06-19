import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import {
  format, parseISO,
  startOfDay, startOfMonth, endOfMonth,
  subDays, subMonths,
} from 'date-fns';

export interface DateRangeResult {
  dataInicio: string;
  dataFim: string;
  displayInicio: string;
  displayFim: string;
}

type ChipId = 'hoje' | '7dias' | 'esteMes' | 'mesPassado' | '6meses';

interface Chip {
  id: ChipId;
  label: string;
  icon: string;
}

@Component({
  selector: 'app-model-pesquisar-por-data',
  templateUrl: './model-pesquisar-por-data.component.html',
  styleUrls: ['./model-pesquisar-por-data.component.scss'],
})
export class ModelPesquisarPorDataComponent {
  formData: FormGroup;
  activeChip: ChipId | null = null;

  readonly chips: Chip[] = [
    { id: 'hoje',       label: 'Hoje',           icon: 'today'         },
    { id: '7dias',      label: 'Últimos 7 dias',  icon: 'date_range'    },
    { id: 'esteMes',    label: 'Este Mês',        icon: 'calendar_month'},
    { id: 'mesPassado', label: 'Mês Passado',     icon: 'history'       },
    { id: '6meses',     label: 'Últimos 6 Meses', icon: 'schedule'      },
  ];

  constructor(
    private dialogRef: MatDialogRef<ModelPesquisarPorDataComponent>,
    private fb: FormBuilder,
  ) {
    this.formData = this.fb.group({
      dataInicio: ['', Validators.required],
      dataFim:    ['', Validators.required],
    });
  }

  aplicarChip(chip: Chip) {
    this.activeChip = chip.id;
    const today = startOfDay(new Date());
    let inicio: Date;
    let fim: Date;

    switch (chip.id) {
      case 'hoje':
        inicio = fim = today;
        break;
      case '7dias':
        inicio = subDays(today, 6);
        fim    = today;
        break;
      case 'esteMes':
        inicio = startOfMonth(today);
        fim    = today;
        break;
      case 'mesPassado': {
        const mesAnterior = subMonths(today, 1);
        inicio = startOfMonth(mesAnterior);
        fim    = endOfMonth(mesAnterior);
        break;
      }
      case '6meses':
        inicio = startOfMonth(subMonths(today, 5));
        fim    = today;
        break;
    }

    this.formData.patchValue({
      dataInicio: format(inicio!, 'yyyy-MM-dd'),
      dataFim:    format(fim!,    'yyyy-MM-dd'),
    });
  }

  onDateChange() {
    this.activeChip = null;
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
