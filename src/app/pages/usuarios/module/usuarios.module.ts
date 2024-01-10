import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsuariosRoutingModule } from './usuarios-routing.module';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    UsuariosRoutingModule,
    FormsModule,
    MatRadioModule,
    MatCheckboxModule,
    ReactiveFormsModule,
    MatRadioModule
  ],
})
export class UsuariosModule {}
