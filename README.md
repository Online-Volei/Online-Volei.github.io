# Online Vôlei - Análise de Treinos

Um aplicativo web responsivo para análise e registro de treinos de vôlei, desenvolvido em React com TypeScript e hospedado no GitHub Pages.

## 🏐 Funcionalidades

- **Registro de Treinos**: Interface intuitiva para registrar ações durante os treinos
- **Visualização da Quadra**: Quadra dividida em 6 zonas clicáveis para cada lado
- **Tipos de Ações**: Saque, Ataque, Bloqueio, Recepção, Defesa, Erro, Ponto
- **Controle de Sets**: Gerenciamento automático de sets e pontuação
- **Histórico Completo**: Visualização cronológica de todas as ações
- **Export/Import**: Salvar e carregar treinos em formato JSON
- **Design Responsivo**: Funciona perfeitamente em celulares e computadores
- **Estatísticas**: Relatórios básicos de performance por jogador e time

## 🚀 Como Usar

### Instalação Local

1. Clone o repositório:
```bash
git clone https://github.com/seu-usuario/Online-Volei.github.io.git
cd Online-Volei.github.io
```

2. Instale as dependências:
```bash
npm install
```

3. Execute o projeto em modo de desenvolvimento:
```bash
npm run dev
```

4. Abra [http://localhost:5173](http://localhost:5173) no seu navegador

### Deploy no GitHub Pages

1. Faça o build do projeto:
```bash
npm run build
```

2. Faça o deploy:
```bash
npm run deploy
```

## 📱 Como Usar o App

### 1. Iniciar um Novo Treino
- Clique em "Novo Treino" na tela inicial
- Configure os jogadores dos dois times
- Clique em "Iniciar Treino"

### 2. Registrar Ações
- Clique em uma zona da quadra
- Selecione o jogador, ação e resultado
- Adicione observações se necessário
- Clique em "Registrar"

### 3. Gerenciar Sets
- Use o painel de controle para iniciar novos sets
- Acompanhe a pontuação em tempo real
- Visualize o histórico de ações

### 4. Exportar/Importar
- Use "Exportar Treino" para salvar os dados
- Use "Carregar Treino" para importar arquivos JSON
- Acesse o histórico para revisar treinos anteriores

## 🛠️ Tecnologias Utilizadas

- **React 18** - Biblioteca principal
- **TypeScript** - Tipagem estática
- **Vite** - Bundler e dev server
- **Tailwind CSS** - Estilização
- **Zustand** - Gerenciamento de estado
- **React Router** - Navegação
- **Lucide React** - Ícones
- **GitHub Pages** - Hospedagem

## 📊 Estrutura de Dados

O app salva os dados em formato JSON com a seguinte estrutura:

```json
{
  "id": "session_id",
  "date": "2025-01-13",
  "duration": 0,
  "teams": {
    "team1": [{"id": "1", "name": "Kel"}],
    "team2": [{"id": "2", "name": "Carlos"}]
  },
  "sets": [{
    "setNumber": 1,
    "actions": [{
      "id": "action_id",
      "timestamp": 1705123456789,
      "player": "Kel",
      "team": "team1",
      "action": "saque",
      "result": "positivo",
      "zone": 1,
      "notes": "Observação opcional"
    }],
    "team1Score": 0,
    "team2Score": 0,
    "isCompleted": false
  }],
  "currentSet": 1,
  "isActive": true
}
```

## 🎯 Próximas Funcionalidades

- [ ] Relatórios avançados com gráficos
- [ ] Modo offline (PWA)
- [ ] Sincronização em nuvem
- [ ] Análise de tendências
- [ ] Compartilhamento de treinos
- [ ] Integração com planilhas

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para:

1. Fazer um fork do projeto
2. Criar uma branch para sua feature
3. Fazer commit das mudanças
4. Abrir um Pull Request

## 📄 Licença

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

## 🏆 Agradecimentos

Desenvolvido com ❤️ para a comunidade de vôlei brasileira.