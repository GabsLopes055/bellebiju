import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVendasComponent } from '../component/list-vendas/list-vendas.component';
import { CreateVendaComponent } from '../component/create-venda/create-venda.component';

const routes: Routes = [
  {path: '', component: CreateVendaComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendasRoutingModule { }
