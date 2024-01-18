import { UsuariosModule } from './pages/usuarios/module/usuarios.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/telaLogin/login.component';
import { DashboardComponent } from './pages/dashboard/component/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UsuariosComponent } from './pages/usuarios/component/usuarios-list/usuarios.component';
import { AuthGuardService } from './shared/Auth/auth-guard.service';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {
    path: 'dashboard',
    component: LayoutComponent,
    children: [
      {
        path: '',
        component: DashboardComponent,
        canActivate: [AuthGuardService],
      },
      {
        path: 'usuarios',
        loadChildren: () =>
          import('../app/pages/usuarios/module/usuarios.module').then(
            (module) => module.UsuariosModule
          ),
      },
      {
        path: 'adicionarVenda',
        loadChildren: () =>
          import('../app/pages/vendas/module/vendas.module').then(
            (module) => module.VendasModule
          ),
      },
      {
        path: 'minhasInformacoes',
        loadChildren: () =>
          import(
            '../app/pages/my-informations/module/my-informations.module'
          ).then((module) => module.MyInformationsModule),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
