import { VizualizarVendasComponent } from '../component/vizualizar-vendas/vizualizar-vendas.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    component: VizualizarVendasComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisualizarVendasRoutingModule {}
