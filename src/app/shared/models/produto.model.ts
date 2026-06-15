import { categoria } from './categoria';

export interface produto {
  idProduto: string;
  nomeProduto: string;
  precoProduto: number;
  quantidadeEstoque: number;
  estoqueMinimo: number;
  categoria: Pick<categoria, 'idCategoria' | 'nomeCategoria'> | null;
}
