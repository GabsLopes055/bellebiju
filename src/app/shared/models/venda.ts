export interface venda {
  id: string;
  nomeProduto: string;
  preco: number;
  quantidade: number;
  total: number;
  formaPagamento: string;
  idProduto: string | null;
  createAt: string;
  updateAt: string;
}
