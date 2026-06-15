import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/Auth/auth-guard.service';
import { ListarCategoriasComponent } from '../component/listar-categorias/listar-categorias.component';

const routes: Routes = [
  { path: '', component: ListarCategoriasComponent, canActivate: [AuthGuardService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CategoriasRoutingModule {}
