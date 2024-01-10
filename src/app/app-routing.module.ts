import { UsuariosModule } from './pages/usuarios/module/usuarios.module';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/telaLogin/login.component';
import { DashboardComponent } from './pages/dashboard/component/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UsuariosComponent } from './pages/usuarios/component/usuarios-list/usuarios.component';

const routes: Routes = [
  { path: '', component: LoginComponent },
  {path: 'dashboard', component: LayoutComponent,children: [
      { path: '', component: DashboardComponent },
      { path: 'usuarios', loadChildren: () => import('../app/pages/usuarios/module/usuarios.module').then((module) => module.UsuariosModule)}

    ],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
