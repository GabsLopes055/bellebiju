# Documentação Completa - Sistema Belle Biju

## Visão Geral do Projeto

O **Belle Biju** é um sistema de gestão para uma loja de bijuterias, desenvolvido em Angular 16 com Angular Material. É um CRUD completo que permite gerenciar vendas, usuários, produtos e visualizar relatórios através de gráficos.

## Tecnologias Utilizadas

### Frontend

- **Angular 16.1.0**
- **Angular Material 16.2.12**
- **Chart.js 4.4.2** (para gráficos)
- **Date-fns 3.2.0** (manipulação de datas)
- **TypeScript 5.1.3**

### Backend

- **URL da API**: `https://bellebiju-backend-production-5cda.up.railway.app/api`
- **Interceptor HTTP** com token de autenticação
- **Token de expiração**: 30 minutos (1800000ms)

## Estrutura de Módulos

### 1. Módulo de Login (`login/`)

- **Componente**: `LoginComponent`
- **Serviço**: `LoginService`
- **Interceptor**: `InterceptorToken`

### 2. Módulo de Dashboard (`pages/dashboard/`)

- **Componente**: `DashboardComponent`
- **Serviço**: `DashboardService`

### 3. Módulo de Vendas (`pages/vendas/`)

- **Componentes**:
  - `ListVendasComponent`
  - `CreateVendaComponent`
  - `EditVendaComponent`
  - `DeleteVendaComponent`
  - `AccordionVendasComponent`
  - `ModelPesquisarPorDataComponent`
- **Serviço**: `VendasService`

### 4. Módulo de Usuários (`pages/usuarios/`)

- **Componentes**:
  - `UsuariosComponent` (listagem)
  - `UsuariosCreatedComponent`
  - `UsuariosEditComponent`
- **Serviço**: `UsuariosService`

### 5. Módulo de Produtos (`pages/produtos/`)

- **Componente**: `ListarProdutosComponent`
- **Serviço**: `ProdutoService`

### 6. Módulo de Gráficos (`pages/graficos/`)

- **Componente**: `GraficosComponent`
- **Serviço**: `GraficosServiceService`

### 7. Módulo de Layout (`pages/layout/`)

- **Componente**: `LayoutComponent` (sidebar navigation)

## Interfaces/Modelos de Dados

### Interface Login

```typescript
export interface login {
  username: string;
  password: string;
}
```

### Interface User

```typescript
export interface user {
  idUser: string;
  nome: string;
  username: string;
  createdAt: any;
  roles: string;
}
```

### Interface Venda

```typescript
export interface venda {
  id: string;
  nomeProduto: string;
  preco: number;
  quantidade: number;
  total: number;
  formaPagamento: string;
  createAt: string;
  updateAt: string;
}
```

### Interface Produto

```typescript
export interface produto {
  idProduto: string;
  nomeProduto: string;
  precoProduto: number;
}
```

### Interface DatasForGraficos

```typescript
export interface datasForGraficos {
  dataInicio: Date;
  dataFim: Date;
}
```

## Autenticação e Segurança

### Sistema de Login

- **Campos obrigatórios**:
  - Username (texto)
  - Password (texto com toggle de visibilidade)
- **Validações**: Campos não podem estar vazios
- **Credenciais padrão**: username: "teste", password: "teste"
- **Funcionalidades**:
  - Checkbox "Mantenha-me conectado"
  - Botão de acesso habilitado apenas quando formulário é válido
  - Progress bar durante autenticação

### Auth Guard

- **Serviço**: `AuthGuardService`
- **Funcionalidade**: Verifica token de expiração
- **Comportamento**: Abre modal de sessão expirada quando necessário
- **Componente de Sessão**: `SessionLoginComponent`

### Interceptor HTTP

- **Classe**: `InterceptorToken`
- **Função**: Adiciona token de autenticação nos headers das requisições

## Funcionalidades por Tela

### 1. Tela de Login

- **Rota**: `/` (raiz)
- **Campos**:
  - Username (obrigatório, min 1 caractere)
  - Password (obrigatório, min 1 caractere, com toggle de visibilidade)
- **Ações**:
  - Login com Enter ou clique no botão
  - Conversão automática do username para lowercase
  - Redirecionamento para `/dashboard` após login

### 2. Dashboard (Tela Inicial)

- **Rota**: `/dashboard`
- **Proteção**: Auth Guard
- **Informações exibidas**:
  - Data atual
  - Total vendido (em BRL)
  - Quantidade de produtos vendidos
  - Número de vendas realizadas
- **Componentes**:
  - Cards com estatísticas
  - Progress bar durante carregamento
  - Accordion com lista de vendas

### 3. Tela de Vendas

- **Rota**: `/dashboard/adicionarVenda/visualizarVenda`
- **Proteção**: Auth Guard

#### 3.1 Listagem de Vendas (AccordionVendasComponent)

- **Funcionalidades**:
  - Tabela com todas as vendas
  - Campo de pesquisa por nome do produto
  - Colunas: Produto, Preço, Quantidade, Total, Forma Pagamento, Editar, Deletar
  - Formatação de valores em BRL
  - Mensagem quando não há dados

#### 3.2 Criar Venda

- **Campos do formulário**:
  - Nome do Produto (texto, obrigatório, min 3 caracteres)
  - Preço do Produto (número, obrigatório)
  - Quantidade Vendida (número, obrigatório)
  - Total da Venda (número, obrigatório)
  - Forma de Pagamento (select, obrigatório)
    - Opções: DINHEIRO, PIX, DEBITO, CREDITO
- **Ações**:
  - Cadastrar (habilitado apenas se formulário válido)
  - Fechar
  - Reset do formulário após salvar

#### 3.3 Editar/Deletar Venda

- **Componentes**: `EditVendaComponent`, `DeleteVendaComponent`
- **Funcionalidade**: Modais para edição e confirmação de exclusão

### 4. Tela de Usuários

- **Rota**: `/dashboard/usuarios`
- **Proteção**: Auth Guard

#### 4.1 Listagem de Usuários

- **Colunas**:
  - Ícone de pessoa
  - Nome
  - Username
  - Data de criação (formato dd/MM/yyyy)
  - Permissões (roles)
  - Editar
  - Deletar

#### 4.2 Criar Usuário

- **Campos do formulário**:
  - Nome (obrigatório, min 1 caractere)
  - Username (obrigatório, min 1 caractere)
  - Password (obrigatório, min 1 caractere, com toggle de visibilidade)
  - Roles (obrigatório)
    - Opções: ADMIN, USER (radio buttons)

### 5. Tela de Produtos

- **Rota**: `/dashboard/produtos`
- **Status**: Parcialmente implementada
- **Funcionalidades**:
  - Listagem de produtos com ID, Nome e Preço
  - Botão "Cadastrar Produtos" (não implementado)
  - Notas para implementação: paginação backend e frontend
  - Botões de editar/deletar (não funcionais)

### 6. Tela de Gráficos

- **Rota**: `/dashboard/graficos`
- **Proteção**: Auth Guard
- **Funcionalidades**:
  - Botão para pesquisar por data (abre modal)
  - Dois tipos de gráfico:
    - **Gráfico de Barras**: Valor vendido por forma de pagamento
    - **Gráfico Pizza (Doughnut)**: Distribuição de vendas por forma de pagamento
  - **Cores dos gráficos**:
    - Dinheiro: #138182
    - PIX: #770d7c
    - Débito: #7f5410
    - Crédito: #822b0e
  - **Estados**:
    - Loading durante geração
    - Imagem padrão quando não há dados
    - Substituição dinâmica dos gráficos

### 7. Layout/Navegação

- **Sidebar fixa** com as seguintes opções:
  - Dashboard (ícone: dashboard)
  - Vendas (ícone: real_estate_agent)
  - Gráficos (ícone: equalizer)
  - Produtos (ícone: inventory_2)
  - Usuários (ícone: person)
  - Sair (ícone: logout)
- **Logo** da loja no topo da sidebar
- **Highlight** da página ativa

## APIs/Endpoints

### Autenticação

- **POST** `/authentication/login` - Login do usuário

### Vendas

- **GET** `/vendas` - Listar todas as vendas
- **POST** `/vendas` - Criar nova venda
- **PUT** `/vendas/{id}` - Editar venda
- **DELETE** `/vendas/{id}` - Deletar venda
- **POST** `/vendas/{dataInicio}/{dataFim}` - Buscar vendas por período

### Usuários

- **GET** `/usuarios` - Listar usuários (presumido)
- **POST** `/usuarios` - Criar usuário (presumido)
- **PUT** `/usuarios/{id}` - Editar usuário (presumido)
- **DELETE** `/usuarios/{id}` - Deletar usuário (presumido)

### Produtos

- **GET** `/produtos` - Listar produtos (presumido)

## Tratamento de Erros

### Login Service

- **Status 400**: Exibe erro retornado pela API
- **Status 404**: "Usuário não encontrado"
- **Status 403**: "Não foi possível validar o token. Por favor, refaça o login"

### Vendas Service

- **Status 500**: "Erro Interno"
- **Status 403**: Redirecionamento para login (comentado)

## Funcionalidades de UX

### Feedback Visual

- **Snackbars** com mensagens de sucesso/erro
- **Progress bars** durante carregamentos
- **Loading states** em operações assíncronas
- **Material Design** para consistência visual

### Validações

- **Formulários reativos** com validações em tempo real
- **Mensagens de erro** padronizadas
- **Botões desabilitados** quando formulário inválido
- **Campos obrigatórios** claramente indicados

### Navegação

- **Router** com lazy loading para módulos
- **Active states** na navegação
- **Guard de autenticação** em rotas protegidas
- **Redirecionamentos** automáticos

## Recursos Não Implementados/Comentados

1. **Produtos**: CRUD completo (apenas listagem funciona)
2. **Usuários**: Edição e exclusão (apenas criação e listagem)
3. **Vendas**: Cálculo automático do total (código comentado)
4. **Login**: Link de cadastro (comentado)
5. **Dashboard**: Cards superiores (comentados)

## Configurações de Ambiente

### Desenvolvimento

```typescript
export const environment = {
  url: "https://bellebiju-backend-production-5cda.up.railway.app/api",
};
```

### Token de Expiração

- **Duração**: 30 minutos (1800000 ms)
- **Armazenamento**: localStorage
- **Verificação**: AuthGuard

## Estrutura de Pastas Detalhada

```
src/app/
├── login/
│   ├── service/
│   │   ├── InterceptorToken.ts
│   │   └── login.service.ts
│   └── telaLogin/
│       ├── login.component.html
│       ├── login.component.scss
│       └── login.component.ts
├── pages/
│   ├── dashboard/
│   ├── vendas/
│   ├── usuarios/
│   ├── produtos/
│   ├── graficos/
│   ├── layout/
│   └── session-login/
├── shared/
│   ├── angular-material/
│   ├── Auth/
│   │   └── auth-guard.service.ts
│   └── models/
│       ├── login.ts
│       ├── user.ts
│       ├── venda.ts
│       ├── produto.model.ts
│       └── datasForGraficos.ts
└── assets/
    └── img/
        ├── logo.jpeg
        ├── bg-login.jpg
        └── grafico.svg
```

## Considerações para Recriação

1. **Todas as interfaces** estão definidas e funcionais
2. **Estrutura modular** bem organizada
3. **Sistema de autenticação** completo
4. **CRUD de vendas** totalmente funcional
5. **Dashboard** com estatísticas em tempo real
6. **Gráficos interativos** com Chart.js
7. **Material Design** para UI consistente
8. **Lazy loading** para performance
9. **Interceptors HTTP** para autenticação automática
10. **Guard de rotas** para segurança

Este sistema representa um CRUD completo e funcional para gestão de uma loja de bijuterias, com todas as funcionalidades principais implementadas e funcionando.
