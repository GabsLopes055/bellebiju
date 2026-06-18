import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';
import { UsuariosComponent } from '../component/usuarios-list/usuarios.component';
import { UsuariosCreatedComponent } from '../component/usuarios-created/usuarios-created.component';
import { UsuariosEditComponent } from '../component/usuarios-edit/usuarios-edit.component';

@NgModule({
  declarations: [
    UsuariosComponent,
    UsuariosCreatedComponent,
    UsuariosEditComponent,
  ],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AngularMaterialModule,
  ],
})
export class UsuariosModule {}
