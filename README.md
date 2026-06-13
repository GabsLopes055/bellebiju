# 📝 Gerenciador de Tarefas - Curso React

Um aplicativo moderno e responsivo para gerenciamento de tarefas construído com React, TypeScript e TailwindCSS. Este projeto demonstra práticas modernas de desenvolvimento frontend com uma interface intuitiva e funcionalidades completas de CRUD.

## 🚀 Tecnologias Utilizadas

### Core

- **React 19.1.0** - Biblioteca JavaScript para construção de interfaces
- **TypeScript 5.6.3** - Superset tipado do JavaScript
- **Vite 7.0.4** - Build tool e servidor de desenvolvimento rápido

### Estilização

- **TailwindCSS 4.1.11** - Framework de CSS utilitário
- **@tailwindcss/vite** - Plugin do Tailwind para Vite

### Desenvolvimento

- **ESLint** - Linter para identificação de problemas no código
- **@typescript-eslint** - Regras específicas do TypeScript para ESLint

## ✨ Funcionalidades

### Gerenciamento de Tarefas

- ✅ **Criar tarefas** - Adição rápida de novas tarefas
- ✅ **Marcar como concluída** - Toggle de status das tarefas
- ✅ **Editar tarefas** - Edição inline com validação
- ✅ **Excluir tarefas** - Remoção individual de tarefas
- ✅ **Persistência de dados** - Armazenamento automático no localStorage

### Interface e UX

- 🎨 **Design responsivo** - Adaptável a diferentes tamanhos de tela
- 📊 **Dashboard de estatísticas** - Métricas em tempo real
- 🔄 **Estados de carregamento** - Feedback visual para o usuário
- 📱 **Mobile-first** - Otimizado para dispositivos móveis
- ♿ **Acessibilidade** - Elementos com suporte a navegação por teclado

### Análise e Produtividade

- 📈 **Estatísticas detalhadas**:
  - Total de tarefas
  - Tarefas pendentes
  - Tarefas concluídas
  - Taxa de conclusão (%)
- 🧹 **Limpeza em lote**:
  - Limpar todas as tarefas
  - Limpar apenas tarefas concluídas
- 📅 **Metadados temporais**:
  - Data de criação
  - Data da última edição

## 🏗️ Estrutura do Projeto

```
curso-react/
├── src/
│   ├── components/           # Componentes React
│   │   ├── add-task.tsx     # Formulário de adição
│   │   ├── task-item.tsx    # Item individual de tarefa
│   │   ├── task-list.tsx    # Lista de tarefas
│   │   ├── task-stats.tsx   # Dashboard de estatísticas
│   │   └── tasks.tsx        # Componente principal
│   ├── hooks/               # Custom hooks
│   │   └── useTasks.ts      # Lógica de gerenciamento de tarefas
│   ├── types/               # Definições de tipos TypeScript
│   │   └── task.ts          # Interface Task e tipos relacionados
│   ├── App.tsx              # Componente raiz
│   ├── main.tsx             # Ponto de entrada da aplicação
│   └── index.css            # Estilos globais e configuração do Tailwind
├── public/                  # Arquivos estáticos
├── package.json             # Dependências e scripts
├── tsconfig.json            # Configuração do TypeScript
├── vite.config.ts           # Configuração do Vite
└── eslint.config.js         # Configuração do ESLint
```

## 🔧 Como Executar

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação e Execução

1. **Clone o repositório**

   ```bash
   git clone <url-do-repositorio>
   cd curso-react
   ```

2. **Instale as dependências**

   ```bash
   npm install
   ```

3. **Execute em modo de desenvolvimento**

   ```bash
   npm run dev
   ```

4. **Acesse a aplicação**
   - Abra o navegador em `http://localhost:5173`

### Scripts Disponíveis

- `npm run dev` - Inicia o servidor de desenvolvimento
- `npm run build` - Cria a build de produção
- `npm run preview` - Visualiza a build de produção
- `npm run lint` - Executa o linter para verificar problemas no código

## 💡 Como Usar

### Adicionando Tarefas

1. Digite o título da tarefa no campo de entrada
2. Clique em "Adicionar" ou pressione Enter
3. A tarefa aparecerá na lista abaixo

### Gerenciando Tarefas

- **Marcar como concluída**: Clique no círculo à esquerda da tarefa
- **Editar**: Clique no ícone de lápis e edite inline
- **Excluir**: Clique no ícone de lixeira
- **Cancelar edição**: Pressione Escape durante a edição

### Visualizando Estatísticas

O dashboard exibe:

- Total de tarefas criadas
- Número de tarefas pendentes
- Número de tarefas concluídas
- Porcentagem de conclusão
- Barra de progresso visual

### Limpeza em Lote

- **Limpar Concluídas**: Remove apenas tarefas marcadas como concluídas
- **Limpar Todas**: Remove todas as tarefas (com confirmação)

## 🏛️ Arquitetura e Padrões

### Componentes

- **Componentes funcionais** com hooks
- **Props tipadas** com TypeScript
- **Separação de responsabilidades** clara
- **Reutilização** de componentes

### Gerenciamento de Estado

- **Custom hook `useTasks`** para centralizar a lógica
- **useState** para estado local dos componentes
- **useEffect** para efeitos colaterais (localStorage)

### Persistência de Dados

- **localStorage** para armazenamento local
- **Serialização automática** de objetos Date
- **Tratamento de erros** robusto

### Estilização

- **TailwindCSS** para estilização utilitária
- **Design system** consistente
- **Responsividade** mobile-first
- **Animações** e transições suaves

### Acessibilidade

- **Navegação por teclado** (Enter, Escape)
- **Atributos ARIA** apropriados
- **Contraste** adequado de cores
- **Feedback visual** para interações

## 🎨 Design System

### Paleta de Cores Principais

- **Âmbar**: `bg-amber-400`, `hover:bg-amber-500` - Elementos primários
- **Verde**: `text-green-600`, `bg-green-500` - Tarefas concluídas
- **Azul**: `text-blue-600` - Informações estatísticas
- **Roxo**: `text-purple-600` - Métricas de progresso
- **Vermelho**: `text-red-500`, `bg-red-50` - Ações destrutivas
- **Cinza**: Variações para texto e backgrounds neutros

### Tipografia

- **Títulos**: Fontes em tamanhos variados (text-4xl, text-lg)
- **Corpo**: text-lg para conteúdo principal
- **Metadados**: text-xs para informações secundárias

### Espaçamento e Layout

- **Grid responsivo**: Adaptação automática para diferentes telas
- **Gaps consistentes**: Espaçamento padronizado (gap-3, gap-4)
- **Padding**: Espaçamento interno consistente

## 🔮 Possíveis Melhorias Futuras

- [ ] Adicionar categorias/tags para tarefas
- [ ] Implementar filtros (pendentes, concluídas, todas)
- [ ] Adicionar datas de vencimento
- [ ] Implementar arrastar e soltar para reordenação
- [ ] Adicionar temas escuro/claro
- [ ] Integração com APIs externas
- [ ] Notificações push
- [ ] Exportação de dados (JSON, CSV)
- [ ] Sincronização na nuvem
- [ ] Modo offline completo

## 📦 Dados Armazenados

As tarefas são persistidas no localStorage do navegador com a seguinte estrutura:

```typescript
interface Task {
  id: string; // UUID único
  title: string; // Título da tarefa
  completed: boolean; // Status de conclusão
  createdAt: Date; // Data de criação
  updatedAt: Date; // Data da última modificação
}
```

## 🤝 Contribuição

Este projeto foi desenvolvido como parte de um curso de React e serve como exemplo de boas práticas de desenvolvimento frontend moderno.

---

**Desenvolvido com ❤️ usando React + TypeScript + TailwindCSS**
