import { UsuariosComponent } from '../component/usuarios-list/usuarios.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from 'src/app/shared/Auth/auth-guard.service';

const routes: Routes = [
  {path: '', component: UsuariosComponent, canActivate: [AuthGuardService]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsuariosRoutingModule { }
