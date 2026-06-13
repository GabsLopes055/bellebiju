# Belle Biju - Sistema de Gestão de Bijuterias

## Visão Geral

Sistema de gestão (POS) para loja de bijuterias. Frontend Angular 16 com Angular Material conectado a backend REST em Railway. Funcionalidades: autenticação JWT, dashboard com KPIs, CRUD de vendas/usuários/produtos e gráficos interativos com Chart.js.

**Status atual**: Projeto Angular em uso. Há planos documentados para migrar para React + Vite + TailwindCSS (ver `DOCUMENTACAO_BELLE_BIJU_REACT.md`).

## Tecnologias

- **Angular 16.1.0** + TypeScript 5.1.3 (strict mode ativo)
- **Angular Material 16.2.12** (tema deeppurple-amber)
- **Chart.js 4.4.2** + date-fns 3.2.0
- **RxJS 7.8.0**
- **Backend**: `https://bellebiju-backend-production-5cda.up.railway.app/api`

## Comandos

```bash
npm start          # ng serve na porta 4200
npm run build      # build de produção
npm test           # testes com karma
```

## Estrutura de Pastas

```
src/app/
├── login/
│   ├── telaLogin/          # LoginComponent
│   ├── service/            # LoginService, InterceptorToken
│   ├── login-module.module.ts
│   └── login-module-routing.module.ts
├── pages/
│   ├── dashboard/          # DashboardComponent + DashboardService
│   ├── layout/             # LayoutComponent (sidebar)
│   ├── vendas/             # CRUD completo de vendas
│   ├── usuarios/           # CRUD completo de usuários
│   ├── produtos/           # Listagem de produtos
│   ├── graficos/           # Gráficos Chart.js
│   ├── session-login/      # Modal de sessão expirada
│   └── my-informations/    # Módulo de informações (parcial)
└── shared/
    ├── Auth/               # AuthGuardService
    ├── angular-material/   # Módulo centralizado com imports do Material
    └── models/             # Interfaces TypeScript (login, user, venda, produto, datasForGraficos)
```

## Roteamento

```
/                      → LoginComponent
/dashboard             → LayoutComponent (protegido por AuthGuard)
  ├── '' (default)     → DashboardComponent
  ├── /usuarios        → UsuariosComponent (lazy-loaded)
  ├── /adicionarVenda  → CreateVendaComponent
  │   └── /visualizarVenda → ListVendasComponent
  ├── /graficos        → GraficosComponent (lazy-loaded)
  └── /produtos        → ListarProdutosComponent (lazy-loaded)
** (wildcard)          → redirect para login
```

## Endpoints da API

| Método | Rota | Descrição |
|--------|------|-----------|
| POST | `/authentication/login` | Login |
| GET | `/vendas` | Listar vendas |
| POST | `/vendas` | Criar venda |
| PUT | `/vendas/:id` | Editar venda |
| DELETE | `/vendas/:id` | Deletar venda |
| POST | `/vendas/:dataInicio/:dataFim` | Vendas por período |
| GET | `/users` | Listar usuários |
| POST | `/users/register` | Criar usuário |
| PUT | `/users/:id` | Editar usuário |
| DELETE | `/users/:id` | Deletar usuário |
| GET | `/produto` | Listar produtos |
| POST | `/graficos/gerarGraficoPizza` | Dados gráfico doughnut |
| POST | `/graficos/gerarGraficoTotalVendas` | Dados gráfico barras |

## Modelos de Dados

```typescript
// user.ts
interface user { idUser: string; nome: string; username: string; createdAt: any; roles: string; }

// venda.ts
interface venda { id: string; nomeProduto: string; preco: number; quantidade: number; total: number; formaPagamento: string; createAt: string; updateAt: string; }

// produto.model.ts
interface produto { idProduto: string; nomeProduto: string; precoProduto: number; }
```

Formas de pagamento aceitas: `DINHEIRO | PIX | DEBITO | CREDITO`
Roles de usuário: `ADMIN | USER`

## Autenticação

- Token JWT com expiração de **30 minutos** (1800000ms)
- Token e data de expiração armazenados no `localStorage`
- `InterceptorToken` adiciona `Authorization: Bearer {token}` em todas as requisições
- `AuthGuardService` verifica expiração e abre modal `SessionLoginComponent` se necessário
- Logout limpa o `localStorage` e redireciona para login

## Variáveis CSS Globais (styles.scss)

```scss
--primary-color: #770d7c    /* roxo */
--secondary-color: #138182  /* teal */
--white-color: #fff
--warning-color: #dbb40c    /* amarelo */
--success-color: #198754    /* verde */
--delete-color: #dc3545     /* vermelho */
--background-color: #f2f2f2
--black-color: #00022e
```

## Cores dos Gráficos (Chart.js)

```
Dinheiro: #138182 | PIX: #770d7c | Débito: #7f5410 | Crédito: #822b0e
```

## Módulo Angular Material

Todos os imports do Material estão centralizados em `src/app/shared/angular-material/angular-material.module.ts`. Sempre importar Material a partir daí, não diretamente nos módulos de feature.

## Problemas Conhecidos

1. **Bug no AuthGuard** (`shared/Auth/auth-guard.service.ts`): `.getTime().toLocaleString()` converte timestamp para string com vírgulas antes de comparar. Deveria ser `.getTime()` sem `.toLocaleString()`.

2. **Login hardcoded**: `LoginComponent` preenche username/password com 'teste' e executa `localStorage.clear()` toda vez que o componente é instanciado.

3. **GraficosModule**: `GraficosComponent` está declarado em `app.module.ts` ao invés do seu próprio módulo.

4. **environment.ts vazio**: Sem URL configurada para build de produção — só `environment.development.ts` tem a URL da API.

5. **Total da venda**: Cálculo automático de `total = preco * quantidade` está comentado no formulário de criação de venda.

## Funcionalidades por Módulo

### Dashboard
- KPIs do dia: total vendido (BRL), qtd produtos, qtd vendas
- Lista de vendas via `AccordionVendasComponent`

### Vendas
- Tabela com pesquisa por nome de produto
- Dialogs para criar, editar e deletar
- Modal de pesquisa por período de datas

### Usuários
- Tabela com: nome, username, data criação, roles
- Dialogs para criar e editar (com radio buttons ADMIN/USER)

### Produtos
- Listagem simples: idProduto, nomeProduto, precoProduto
- CRUD completo ainda não implementado (botões não funcionais)

### Gráficos
- Estado inicial: exibe `grafico.svg` como placeholder
- Após selecionar período: renderiza gráfico de barras + doughnut
- Cards informativos com valores por forma de pagamento
- Gráficos são destruídos e recriados a cada pesquisa (2s delay)
