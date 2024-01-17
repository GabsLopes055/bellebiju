import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListVendasComponent } from '../component/list-vendas/list-vendas.component';
import { CreateVendaComponent } from '../component/create-venda/create-venda.component';
import { AuthGuardService } from 'src/app/shared/Auth/auth-guard.service';

const routes: Routes = [
  {path: '', component: CreateVendaComponent, canActivate: [AuthGuardService]},
  {path: 'visualizarVenda', component: ListVendasComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class VendasRoutingModule { }
