# Belle Biju — Documentação da API

**Base URL:** `http://localhost:8080`  
**Autenticação:** Bearer Token (JWT) — obrigatório em todos os endpoints, exceto login e cadastro.

---

## Sumário

1. [Autenticação](#1-autenticação)
2. [Usuários](#2-usuários)
3. [Categorias](#3-categorias)
4. [Produtos](#4-produtos)
5. [Estoque](#5-estoque)
6. [Vendas](#6-vendas)
7. [Relatórios](#7-relatórios)
8. [Estruturas Compartilhadas](#8-estruturas-compartilhadas)
9. [Erros Padrão](#9-erros-padrão)

---

## 1. Autenticação

### 1.1 Login

**`POST /api/authentication/login`**  
Público — não requer token.

**Request body:**
```json
{
  "username": "admin",
  "password": "senha123"
}
```

**Response `202 Accepted`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

**Erros:**
| Status | Motivo |
|--------|--------|
| `400` | Usuário não encontrado |
| `403` | Senha incorreta |

---

### 1.2 Renovar Token

**`POST /api/authentication/refresh`**  
Requer token válido no header. Gera um novo token com a validade renovada.

**Request body:** nenhum

**Response `200 OK`:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### Como usar o token

Em toda requisição autenticada, adicione o header:
```
Authorization: Bearer <token>
```

---

## 2. Usuários

Base path: `/api/users`

### 2.1 Cadastrar usuário

**`POST /api/users/register`**  
Público — não requer token.

**Request body:**
```json
{
  "nome": "Gabriel Lopes",
  "username": "gabriel",
  "password": "senha123",
  "roles": "ADMIN"
}
```

| Campo | Tipo | Obrigatório | Regras |
|-------|------|-------------|--------|
| `nome` | string | sim | não vazio |
| `username` | string | sim | único no sistema |
| `password` | string | sim | mínimo 8 caracteres |
| `roles` | enum | não | `ADMIN` ou `USER` (padrão: null) |

**Response `201 Created`:**
```json
{
  "idUser": "uuid",
  "nome": "Gabriel Lopes",
  "username": "gabriel",
  "roles": "ADMIN",
  "createdAt": "2024-06-15T10:30:00"
}
```

**Erros:**
| Status | Motivo |
|--------|--------|
| `409` | Username já cadastrado |
| `400` | Campos inválidos / senha com menos de 8 caracteres |

---

### 2.2 Listar usuários

**`GET /api/users`**  
Requer token.

**Query params:**
| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `pagina` | int | `0` | Número da página (começa em 0) |
| `tamanho` | int | `10` | Quantidade de itens por página |

**Exemplo:** `GET /api/users?pagina=0&tamanho=10`

**Response `200 OK`:**
```json
{
  "conteudo": [
    {
      "idUser": "uuid",
      "nome": "Gabriel Lopes",
      "username": "gabriel",
      "roles": "ADMIN",
      "createdAt": "2024-06-15T10:30:00"
    }
  ],
  "paginaAtual": 0,
  "totalPaginas": 3,
  "totalElementos": 25,
  "tamanhoPagina": 10
}
```

---

### 2.3 Editar usuário

**`PUT /api/users/{idUser}`**  
Requer token.

**Path param:** `idUser` (UUID)

**Request body:**
```json
{
  "nome": "Gabriel L.",
  "username": "gabriel2",
  "password": "novaSenha123",
  "roles": "USER"
}
```

> Nota: a senha não é atualizada neste endpoint (apenas nome, username e roles).

**Response `200 OK`:** objeto `UserResponse` atualizado.

**Erros:**
| Status | Motivo |
|--------|--------|
| `404` | Usuário não encontrado |
| `409` | Novo username já em uso |

---

### 2.4 Excluir usuário

**`DELETE /api/users/{idUser}`**  
Requer token.

**Path param:** `idUser` (UUID)

**Response `200 OK`:**
```json
"Usuario Deletado"
```

**Erros:**
| Status | Motivo |
|--------|--------|
| `404` | Usuário não encontrado |

---

## 3. Categorias

Base path: `/api/categoria`

### 3.1 Criar categoria

**`POST /api/categoria`**  
Requer token.

**Request body:**
```json
{
  "nomeCategoria": "Anéis"
}
```

| Campo | Tipo | Obrigatório |
|-------|------|-------------|
| `nomeCategoria` | string | sim |

**Response `201 Created`:**
```json
{
  "idCategoria": "uuid",
  "nomeCategoria": "Anéis"
}
```

---

### 3.2 Listar categorias

**`GET /api/categoria`**  
Requer token.

**Response `200 OK`:**
```json
[
  {
    "idCategoria": "uuid",
    "nomeCategoria": "Anéis"
  },
  {
    "idCategoria": "uuid",
    "nomeCategoria": "Colares"
  }
]
```

> Retorna lista completa sem paginação.

---

### 3.3 Editar categoria

**`PUT /api/categoria/{idCategoria}`**  
Requer token.

**Path param:** `idCategoria` (UUID)

**Request body:**
```json
{
  "nomeCategoria": "Pulseiras"
}
```

**Response `200 OK`:** objeto `CategoriaResponse` atualizado.

---

### 3.4 Excluir categoria

**`DELETE /api/categoria/{idCategoria}`**  
Requer token.

**Path param:** `idCategoria` (UUID)

**Response `204 No Content`**

**Erros:**
| Status | Motivo |
|--------|--------|
| `404` | Categoria não encontrada |

---

## 4. Produtos

Base path: `/api/produto`

### 4.1 Listar produtos (paginado)

**`GET /api/produto`**  
Requer token.

**Query params:**
| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `pagina` | int | `0` | Número da página (começa em 0) |
| `tamanho` | int | `10` | Quantidade de itens por página |

**Exemplo:** `GET /api/produto?pagina=0&tamanho=20`

**Response `200 OK`:**
```json
{
  "conteudo": [
    {
      "idProduto": "uuid",
      "nomeProduto": "Anel de Prata",
      "precoProduto": 49.90,
      "quantidadeEstoque": 15,
      "estoqueMinimo": 5,
      "categoria": {
        "idCategoria": "uuid",
        "nomeCategoria": "Anéis"
      }
    }
  ],
  "paginaAtual": 0,
  "totalPaginas": 5,
  "totalElementos": 48,
  "tamanhoPagina": 10
}
```

> `categoria` pode ser `null` se o produto não tiver categoria associada.

---

### 4.2 Buscar produto por ID

**`GET /api/produto/{idProduto}`**  
Requer token.

**Path param:** `idProduto` (UUID)

**Response `200 OK`:** objeto `ProdutoResponse`.

**Erros:**
| Status | Motivo |
|--------|--------|
| `404` | Produto não encontrado |

---

### 4.3 Buscar produto por nome

**`GET /api/produto/buscar`**  
Requer token.

**Query param:** `nome` (string)

**Exemplo:** `GET /api/produto/buscar?nome=anel`

**Response `200 OK`:** lista de `ProdutoResponse` (busca parcial, ignora maiúsculas/minúsculas).

---

### 4.4 Listar produtos com estoque baixo

**`GET /api/produto/estoque-baixo`**  
Requer token.

Retorna produtos cuja `quantidadeEstoque <= estoqueMinimo`.

**Response `200 OK`:** lista de `ProdutoResponse`.

---

### 4.5 Criar produto

**`POST /api/produto`**  
Requer token.

**Request body:**
```json
{
  "nomeProduto": "Anel de Prata",
  "precoProduto": 49.90,
  "idCategoria": "uuid-da-categoria",
  "quantidadeEstoque": 20,
  "estoqueMinimo": 5
}
```

| Campo | Tipo | Obrigatório | Padrão |
|-------|------|-------------|--------|
| `nomeProduto` | string | sim | — |
| `precoProduto` | double | sim | — |
| `idCategoria` | UUID | não | `null` |
| `quantidadeEstoque` | int | não | `0` |
| `estoqueMinimo` | int | não | `5` |

**Response `201 Created`:** objeto `ProdutoResponse`.

**Erros:**
| Status | Motivo |
|--------|--------|
| `404` | Categoria não encontrada |
| `400` | Campos obrigatórios ausentes |

---

### 4.6 Editar produto

**`PUT /api/produto/{idProduto}`**  
Requer token.

**Path param:** `idProduto` (UUID)

**Request body:** mesmo formato do cadastro.

**Response `200 OK`:** objeto `ProdutoResponse` atualizado.

---

### 4.7 Excluir produto

**`DELETE /api/produto/{idProduto}`**  
Requer token.

**Path param:** `idProduto` (UUID)

**Response `204 No Content`**

---

## 5. Estoque

### 5.1 Ajustar estoque manualmente

**`PATCH /api/produto/{idProduto}/estoque`**  
Requer token.

Permite entrada ou saída manual de estoque sem registrar venda.

**Path param:** `idProduto` (UUID)

**Request body:**
```json
{
  "quantidade": 10
}
```

| Valor de `quantidade` | Efeito |
|-----------------------|--------|
| Positivo (`+10`) | Adiciona ao estoque |
| Negativo (`-5`) | Remove do estoque |

**Response `200 OK`:** objeto `ProdutoResponse` com estoque atualizado.

**Erros:**
| Status | Motivo |
|--------|--------|
| `404` | Produto não encontrado |
| `422` | Ajuste resultaria em estoque negativo |

**Exemplo — entrada de 10 unidades:**
```json
{ "quantidade": 10 }
```

**Exemplo — saída manual de 3 unidades:**
```json
{ "quantidade": -3 }
```

---

## 6. Vendas

Base path: `/api/vendas`

### 6.1 Listar vendas do dia (paginado)

**`GET /api/vendas`**  
Requer token.

Retorna as vendas do **dia atual**, ordenadas pela mais recente.

**Query params:**
| Parâmetro | Tipo | Padrão | Descrição |
|-----------|------|--------|-----------|
| `pagina` | int | `0` | Número da página |
| `tamanho` | int | `10` | Itens por página |

**Response `200 OK`:**
```json
{
  "conteudo": [
    {
      "id": "uuid",
      "nomeProduto": "Anel de Prata",
      "preco": 49.90,
      "quantidade": 2,
      "total": 99.80,
      "formaPagamento": "PIX",
      "idProduto": "uuid-do-produto",
      "createAt": "2024-06-15T14:22:00",
      "updateAt": "2024-06-15T14:22:00"
    }
  ],
  "paginaAtual": 0,
  "totalPaginas": 2,
  "totalElementos": 18,
  "tamanhoPagina": 10
}
```

> `idProduto` é `null` quando a venda foi registrada sem vínculo a produto cadastrado.

---

### 6.2 Listar vendas por período

**`POST /api/vendas/{inicio}/{fim}`**  
Requer token.

**Path params:**
| Parâmetro | Formato | Exemplo |
|-----------|---------|---------|
| `inicio` | `YYYY-MM-DD` | `2024-06-01` |
| `fim` | `YYYY-MM-DD` | `2024-06-15` |

**Exemplo:** `POST /api/vendas/2024-06-01/2024-06-15`

**Request body:** nenhum

**Response `200 OK`:** lista de `VendasResponse` (sem paginação).

---

### 6.3 Registrar venda

**`POST /api/vendas`**  
Requer token.

**Request body:**
```json
{
  "nomeProduto": "Anel de Prata",
  "preco": 49.90,
  "quantidade": 2,
  "total": 99.80,
  "formaPagamento": "PIX",
  "idProduto": "uuid-do-produto"
}
```

| Campo | Tipo | Obrigatório | Observação |
|-------|------|-------------|------------|
| `nomeProduto` | string | sim | Nome exibido na venda |
| `preco` | float | sim | Ignorado se `idProduto` for informado |
| `quantidade` | int | sim | Deve ser positivo |
| `total` | float | sim | Ignorado se `idProduto` for informado |
| `formaPagamento` | enum | sim | Ver valores abaixo |
| `idProduto` | UUID | não | Quando informado, vincula ao produto e deduz estoque automaticamente |

**Comportamento com `idProduto`:**
- O sistema busca o produto pelo ID
- `preco` e `total` são calculados automaticamente com base no preço cadastrado: `total = precoProduto × quantidade`
- Os valores enviados no corpo para `preco` e `total` são **ignorados**
- O estoque do produto é deduzido automaticamente

**Comportamento sem `idProduto`:**
- `preco` e `total` enviados no request são usados diretamente
- Nenhum estoque é alterado

**FormaPagamento — valores aceitos:**
| Valor | Descrição |
|-------|-----------|
| `DINHEIRO` | Dinheiro em espécie |
| `PIX` | Pix |
| `DEBITO` | Cartão de débito |
| `CREDITO` | Cartão de crédito |

**Response `201 Created`:** objeto `VendasResponse`.

**Erros:**
| Status | Motivo |
|--------|--------|
| `404` | Produto não encontrado |
| `422` | Estoque insuficiente para a quantidade solicitada |

---

### 6.4 Editar venda

**`PUT /api/vendas/{idVenda}`**  
Requer token.

**Path param:** `idVenda` (UUID)

> Atenção: editar uma venda **não** recalcula estoque. Use apenas para corrigir dados cadastrais.

**Request body:** mesmo formato do registro de venda.

**Response `200 OK`:** objeto `VendasResponse` atualizado.

---

### 6.5 Excluir venda

**`DELETE /api/vendas/{idVenda}`**  
Requer token.

**Path param:** `idVenda` (UUID)

Ao excluir uma venda vinculada a um produto (`idProduto != null`), o estoque é **devolvido automaticamente**.

**Response `200 OK`:**
```json
"Venda Deletada"
```

**Erros:**
| Status | Motivo |
|--------|--------|
| `404` | Venda não encontrada |

---

## 7. Relatórios

Base path: `/api/relatorios`

### 7.1 Resumo financeiro

**`GET /api/relatorios/resumo`**  
Requer token.

**Query params:**
| Parâmetro | Formato | Obrigatório |
|-----------|---------|-------------|
| `dataInicio` | `YYYY-MM-DD` | sim |
| `dataFim` | `YYYY-MM-DD` | sim |

**Exemplo:** `GET /api/relatorios/resumo?dataInicio=2024-06-01&dataFim=2024-06-15`

**Response `200 OK`:**
```json
{
  "dataInicio": "2024-06-01",
  "dataFim": "2024-06-15",
  "totalVendas": 142,
  "receitaTotal": 7830.50,
  "ticketMedio": 55.14
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `totalVendas` | long | Número de transações no período |
| `receitaTotal` | double | Soma de todos os totais |
| `ticketMedio` | double | Média do valor por venda |

---

### 7.2 Produtos mais vendidos

**`GET /api/relatorios/produtos-mais-vendidos`**  
Requer token.

**Query params:**
| Parâmetro | Formato | Obrigatório |
|-----------|---------|-------------|
| `dataInicio` | `YYYY-MM-DD` | sim |
| `dataFim` | `YYYY-MM-DD` | sim |

**Exemplo:** `GET /api/relatorios/produtos-mais-vendidos?dataInicio=2024-06-01&dataFim=2024-06-15`

**Response `200 OK`:**
```json
[
  {
    "nomeProduto": "Anel de Prata",
    "quantidadeTotal": 87,
    "receitaTotal": 4353.00
  },
  {
    "nomeProduto": "Colar Dourado",
    "quantidadeTotal": 55,
    "receitaTotal": 2750.00
  }
]
```

Lista ordenada por `quantidadeTotal` decrescente.

---

## 8. Estruturas Compartilhadas

### PaginaResponse\<T\>

Estrutura retornada em todos os endpoints de listagem paginada.

```json
{
  "conteudo": [ /* array de objetos */ ],
  "paginaAtual": 0,
  "totalPaginas": 5,
  "totalElementos": 48,
  "tamanhoPagina": 10
}
```

| Campo | Tipo | Descrição |
|-------|------|-----------|
| `conteudo` | array | Itens da página atual |
| `paginaAtual` | int | Índice da página atual (começa em 0) |
| `totalPaginas` | int | Total de páginas disponíveis |
| `totalElementos` | long | Total de registros no banco |
| `tamanhoPagina` | int | Quantidade de itens por página |

---

### FormaPagamento (enum)

```
DINHEIRO | PIX | DEBITO | CREDITO
```

---

### ROLES_PERMISSIONS (enum)

```
ADMIN | USER
```

---

## 9. Erros Padrão

Todos os erros seguem o mesmo formato:

```json
{
  "timestamp": "2024-06-15T10:30:00Z",
  "status": 422,
  "error": "Estoque insuficiente",
  "message": "Estoque insuficiente. Disponível: 3, solicitado: 10",
  "path": "/api/vendas"
}
```

| Status HTTP | Significado |
|-------------|-------------|
| `400` | Dados inválidos na requisição (validação de campos) |
| `401` | Token ausente ou inválido |
| `403` | Token válido mas sem permissão |
| `404` | Recurso não encontrado |
| `409` | Conflito de dados (ex: username duplicado) |
| `422` | Regra de negócio violada (ex: estoque insuficiente) |
| `500` | Erro interno inesperado |

---

## Referência Rápida de Endpoints

| Método | Endpoint | Descrição | Auth |
|--------|----------|-----------|------|
| `POST` | `/api/authentication/login` | Login | Não |
| `POST` | `/api/authentication/refresh` | Renovar token | Sim |
| `POST` | `/api/users/register` | Cadastrar usuário | Não |
| `GET` | `/api/users` | Listar usuários | Sim |
| `PUT` | `/api/users/{id}` | Editar usuário | Sim |
| `DELETE` | `/api/users/{id}` | Excluir usuário | Sim |
| `POST` | `/api/categoria` | Criar categoria | Sim |
| `GET` | `/api/categoria` | Listar categorias | Sim |
| `PUT` | `/api/categoria/{id}` | Editar categoria | Sim |
| `DELETE` | `/api/categoria/{id}` | Excluir categoria | Sim |
| `GET` | `/api/produto` | Listar produtos (paginado) | Sim |
| `GET` | `/api/produto/{id}` | Buscar produto por ID | Sim |
| `GET` | `/api/produto/buscar?nome=` | Buscar produto por nome | Sim |
| `GET` | `/api/produto/estoque-baixo` | Produtos com estoque baixo | Sim |
| `POST` | `/api/produto` | Criar produto | Sim |
| `PUT` | `/api/produto/{id}` | Editar produto | Sim |
| `PATCH` | `/api/produto/{id}/estoque` | Ajustar estoque manualmente | Sim |
| `DELETE` | `/api/produto/{id}` | Excluir produto | Sim |
| `GET` | `/api/vendas` | Vendas do dia (paginado) | Sim |
| `POST` | `/api/vendas/{inicio}/{fim}` | Vendas por período | Sim |
| `POST` | `/api/vendas` | Registrar venda | Sim |
| `PUT` | `/api/vendas/{id}` | Editar venda | Sim |
| `DELETE` | `/api/vendas/{id}` | Excluir venda | Sim |
| `GET` | `/api/relatorios/resumo` | Resumo financeiro | Sim |
| `GET` | `/api/relatorios/produtos-mais-vendidos` | Produtos mais vendidos | Sim |
