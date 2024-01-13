import { Component } from '@angular/core';
import { venda } from 'src/app/shared/models/venda';
import { VendasService } from '../../service/vendas.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-list-vendas',
  templateUrl: './list-vendas.component.html',
  styleUrls: ['./list-vendas.component.scss'],
})
export class ListVendasComponent {

  dataSource!: venda[];
  panelOpenState: boolean = false

  constructor(private service: VendasService) {
    this.service
      .listAllVendas()
      .subscribe((response) => (this.dataSource = response));
    console.log(this.dataSource);
  }
}
