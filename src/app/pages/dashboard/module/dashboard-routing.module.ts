import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from '../component/dashboard.component';
import { UsuariosComponent } from '../../usuarios/component/usuarios-list/usuarios.component';
import { AuthGuardService } from 'src/app/shared/Auth/auth-guard.service';

const routes: Routes = [
  {path: '', component: DashboardComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
