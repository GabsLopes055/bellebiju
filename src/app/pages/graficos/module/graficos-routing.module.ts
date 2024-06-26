import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GraficosComponent } from '../component/graficos/graficos.component';

const routes: Routes = [{ path: '', component: GraficosComponent }];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  declarations: []
})
export class GraficosRoutingModule {}
