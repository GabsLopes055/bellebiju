export interface ResumoResponse {
  dataInicio: string;
  dataFim: string;
  totalVendas: number;
  receitaTotal: number;
  ticketMedio: number;
}

export interface ProdutoMaisVendido {
  nomeProduto: string;
  quantidadeTotal: number;
  receitaTotal: number;
}

export interface ResumoPorCategoria {
  idCategoria: string;
  nomeCategoria: string;
  totalVendas: number;
  receitaTotal: number;
  ticketMedio: number;
}
