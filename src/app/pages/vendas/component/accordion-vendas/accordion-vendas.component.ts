import { Component } from '@angular/core';
import { venda } from 'src/app/shared/models/venda';
import { VendasService } from '../../service/vendas.service';

@Component({
  selector: 'app-accordion-vendas',
  templateUrl: './accordion-vendas.component.html',
  styleUrls: ['./accordion-vendas.component.scss']
})
export class AccordionVendasComponent {

  dataSource!: venda[];
  panelOpenState: boolean = false

  constructor(private service: VendasService) {
    this.service
      .listAllVendas()
      .subscribe((response) => (this.dataSource = response));
  }

}
