import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/telaLogin/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { DashboardComponent } from './pages/dashboard/component/dashboard.component';
import { LayoutComponent } from './pages/layout/layout.component';
import { UsuariosComponent } from './pages/usuarios/component/usuarios-list/usuarios.component';
import { UsuariosEditComponent } from './pages/usuarios/component/usuarios-edit/usuarios-edit.component';
import { UsuariosCreatedComponent } from './pages/usuarios/component/usuarios-created/usuarios-created.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';
import { ListVendasComponent } from './pages/vendas/component/list-vendas/list-vendas.component';
import { CreateVendaComponent } from './pages/vendas/component/create-venda/create-venda.component';
import { AccordionVendasComponent } from './pages/vendas/component/accordion-vendas/accordion-vendas.component';
import { ModelPesquisarPorDataComponent } from './pages/vendas/component/model-pesquisar-por-data/model-pesquisar-por-data.component';
import { ListInformationsComponent } from './pages/my-informations/components/list-informations/list-informations.component';
import { EditVendaComponent } from './pages/vendas/component/edit-venda/edit-venda.component';
import { DeleteVendaComponent } from './pages/vendas/component/delete-venda/delete-venda.component';
import { InterceptorToken } from './login/service/InterceptorToken';
import { SessionLoginComponent } from './pages/session-login/session-login.component';
import { GraficosComponent } from './pages/graficos/component/graficos/graficos.component';
import { ListarProdutosComponent } from './pages/produtos/components/listar-produtos/listar-produtos.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    LayoutComponent,
    UsuariosComponent,
    UsuariosEditComponent,
    UsuariosCreatedComponent,
    ListVendasComponent,
    CreateVendaComponent,
    AccordionVendasComponent,
    ModelPesquisarPorDataComponent,
    ListInformationsComponent,
    EditVendaComponent,
    DeleteVendaComponent,
    SessionLoginComponent,
    GraficosComponent,
    ListarProdutosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule,
],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: InterceptorToken,
      multi: true
    },

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
