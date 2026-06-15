import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ProdutosRoutingModule } from './produtos-routing.module';
import { AngularMaterialModule } from 'src/app/shared/angular-material/angular-material.module';

import { ListarProdutosComponent } from '../components/listar-produtos/listar-produtos.component';
import { CreateProdutoComponent } from '../component/create-produto/create-produto.component';
import { EditProdutoComponent } from '../component/edit-produto/edit-produto.component';
import { AjustarEstoqueComponent } from '../component/ajustar-estoque/ajustar-estoque.component';

@NgModule({
  declarations: [
    ListarProdutosComponent,
    CreateProdutoComponent,
    EditProdutoComponent,
    AjustarEstoqueComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    ProdutosRoutingModule,
    AngularMaterialModule,
  ],
})
export class ProdutosModule {}
