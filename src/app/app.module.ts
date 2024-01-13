import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/telaLogin/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AngularMaterialModule } from './shared/angular-material/angular-material.module';
import { HttpClientModule } from '@angular/common/http';
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
    AccordionVendasComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
