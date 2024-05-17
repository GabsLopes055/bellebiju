import { Component } from '@angular/core';
import { produto } from 'src/app/shared/models/produto.model';
import { ProdutoService } from '../../service/produto.service';

@Component({
  selector: 'app-listar-produtos',
  templateUrl: './listar-produtos.component.html',
  styleUrls: ['./listar-produtos.component.scss']
})
export class ListarProdutosComponent {

  isLoading: boolean = true
  produtos: produto[] = [];
  headersTable : string[] = ["idProduto", "nomeProduto", "precoProduto", "editar", "deletar"]

  constructor(
    private service: ProdutoService
  ) {
    this.isLoading = false
    this.listAllProducts()
  }

  listAllProducts() {
    return this.service.listAllProducts().subscribe((response) => {
      this.produtos = response;
    });
  }

}
