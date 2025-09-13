# 🚀 Guia de Deploy - Online Vôlei

## Deploy no GitHub Pages

### 1. Configuração Inicial

1. **Fork do repositório** (se ainda não fez)
2. **Clone o repositório**:
   ```bash
   git clone https://github.com/SEU-USUARIO/Online-Volei.github.io.git
   cd Online-Volei.github.io
   ```

### 2. Instalação e Build

```bash
# Instalar dependências
npm install

# Fazer build do projeto
npm run build

# Verificar se o build foi bem-sucedido
ls dist/
```

### 3. Deploy Automático (Recomendado)

O projeto já está configurado com GitHub Actions para deploy automático:

1. **Ative o GitHub Pages** no repositório:
   - Vá em Settings > Pages
   - Source: "GitHub Actions"

2. **Faça push para a branch main**:
   ```bash
   git add .
   git commit -m "Deploy inicial do Online Vôlei"
   git push origin main
   ```

3. **Aguarde o deploy** (2-3 minutos)
4. **Acesse**: `https://SEU-USUARIO.github.io/Online-Volei.github.io/`

### 4. Deploy Manual

Se preferir fazer deploy manual:

```bash
# Instalar gh-pages
npm install -g gh-pages

# Deploy
npm run deploy
```

### 5. Verificação

Após o deploy, verifique se:

- [ ] O site carrega corretamente
- [ ] A navegação funciona
- [ ] É possível criar um novo treino
- [ ] As ações são registradas
- [ ] O export/import funciona
- [ ] O design é responsivo no mobile

### 6. Personalização

Para personalizar o app:

1. **Alterar cores**: Edite `tailwind.config.js`
2. **Modificar ícones**: Substitua `public/volleyball.svg`
3. **Adicionar funcionalidades**: Edite os componentes em `src/components/`

### 7. Troubleshooting

**Problema**: Site não carrega
- **Solução**: Verifique se o base path está correto em `vite.config.ts`

**Problema**: Erro 404
- **Solução**: Certifique-se de que o repositório se chama exatamente `Online-Volei.github.io`

**Problema**: Build falha
- **Solução**: Execute `npm run build` localmente para ver os erros

### 8. Atualizações

Para atualizar o site:

1. Faça as alterações no código
2. Teste localmente: `npm run dev`
3. Faça commit e push:
   ```bash
   git add .
   git commit -m "Atualização: descrição das mudanças"
   git push origin main
   ```
4. O deploy será automático via GitHub Actions

## 🎉 Pronto!

Seu aplicativo de análise de treinos de vôlei está online e funcionando!
