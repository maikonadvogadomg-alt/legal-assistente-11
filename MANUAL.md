# Assistente Jurídico IA — Manual Completo

**Versão:** 1.1.0 · **Data:** Maio 2026 · **Público:** Advogados e operadores do sistema

---

## 1. Visão Geral

O **SK Jurídico** é um assistente jurídico com IA voltado para advogados brasileiros. Ele gera petições, minutas, pareceres e outros documentos jurídicos com formatação ABNT automática, usando modelos de linguagem como Gemini, OpenAI, Groq, Perplexity e qualquer provedor compatível com OpenAI.

**Funcionalidades principais:**
- Geração de documentos jurídicos com IA (streaming em tempo real)
- Editor TipTap v3 com formatação ABNT
- Importação de PDF, DOCX, HTML, XML, TXT (até 150 MB)
- Exportação para DOCX
- Busca de jurisprudência no DataJud CNJ
- Biblioteca de ementas e modelos de prompt
- Histórico de gerações
- Assistente de código web (HTML/CSS/JS com preview)
- Auditoria financeira, comunicações CNJ, tramitação processual
- Proteção por senha
- PWA instalável no celular e desktop

---

## 2. Estrutura de Pastas

```
sk-juridico/
├── artifacts/
│   ├── api-server/          # Backend Express 5 (porta 8080)
│   │   ├── src/
│   │   │   ├── app.ts       # Entry point, middlewares, sessão
│   │   │   ├── storage.ts   # Camada de dados (PostgreSQL + fallback memória)
│   │   │   ├── local-config.ts  # Config local em arquivo JSON
│   │   │   └── routes/
│   │   │       ├── ai.ts          # Streaming SSE de IA
│   │   │       ├── upload.ts      # Upload PDF/DOCX/HTML/TXT (150 MB)
│   │   │       ├── crud.ts        # CRUD genérico
│   │   │       ├── settings.ts    # Configurações, auth, DB, TTS, DOCX
│   │   │       ├── jurisprudencia.ts  # DataJud CNJ
│   │   │       └── extra.ts       # JWT, exportação, pesquisa web
│   │   ├── build.mjs        # Build esbuild (bundle CJS)
│   │   └── package.json
│   │
│   └── assistente-juridico/ # Frontend React + Vite (porta dinâmica)
│       ├── public/
│       │   ├── manifest.json    # PWA manifest
│       │   ├── sw.js            # Service Worker (cache offline)
│       │   ├── favicon.svg
│       │   └── robots.txt
│       ├── src/
│       │   ├── pages/           # Todas as páginas da aplicação
│       │   ├── components/      # Componentes reutilizáveis
│       │   │   └── tiptap-editor.tsx  # Editor principal
│       │   └── lib/
│       │       └── legal-formatter.ts # Conversor texto → HTML ABNT
│       ├── index.html           # HTML com PWA meta tags
│       └── vite.config.ts
│
├── lib/
│   └── db/
│       └── src/schema/index.ts  # Schema Drizzle (fonte da verdade)
│
├── scripts/
│   └── export-zip.sh            # Gera ZIP do projeto
│
├── .env.example                 # Template de variáveis de ambiente
├── MANUAL.md                    # Este arquivo
└── pnpm-workspace.yaml
```

---

## 3. Tecnologias Utilizadas

| Camada | Tecnologia |
|--------|-----------|
| Runtime | Node.js 24 |
| Gerenciador | pnpm workspaces |
| Linguagem | TypeScript 5.9 |
| Frontend | React 18 + Vite |
| Roteamento | Wouter |
| Estado/fetch | TanStack Query |
| UI | Tailwind CSS + shadcn/ui |
| Editor | TipTap v3 |
| Backend | Express 5 |
| ORM | Drizzle ORM |
| Banco | PostgreSQL (Neon / Supabase / Railway / local) |
| Validação | Zod v4 + drizzle-zod |
| IA | @google/genai (Gemini), openai (OpenAI/Groq/OpenRouter/etc) |
| PDF | pdfjs-dist (extração de texto) |
| Word | mammoth (extração) + docx (exportação) |
| Build | esbuild (CJS bundle) |
| PWA | Service Worker + Web App Manifest |

---

## 4. Variáveis de Ambiente

Copie `.env.example` para `.env` e preencha:

```bash
cp .env.example .env
```

### Obrigatórias para produção

| Variável | Descrição |
|----------|-----------|
| `DATABASE_URL` | String de conexão PostgreSQL |
| `SESSION_SECRET` | String aleatória longa (≥32 chars) para sessões |

### Opcionais (também configuráveis pelo painel)

| Variável | Descrição |
|----------|-----------|
| `APP_PASSWORD` | Senha para proteger o acesso |
| `GEMINI_API_KEY` | Chave Google Gemini |
| `OPENAI_API_KEY` | Chave OpenAI |
| `GROQ_API_KEY` | Chave Groq |
| `OPENROUTER_API_KEY` | Chave OpenRouter |
| `PERPLEXITY_API_KEY` | Chave Perplexity |
| `DATAJUD_API_KEY` | Chave DataJud CNJ |
| `CUSTOM_API_KEY` | Chave provider custom |
| `CUSTOM_API_URL` | URL base do provider custom |
| `CUSTOM_API_MODEL` | Modelo do provider custom |
| `UPLOAD_MAX_MB` | Tamanho máximo de upload (padrão: 150) |

---

## 5. Configuração do Banco Neon (Gratuito)

1. Acesse **[neon.tech](https://neon.tech)** e crie uma conta gratuita
2. Crie um novo projeto → escolha a região mais próxima (ex: South America)
3. No painel do projeto, clique em **"Connect"** → copie a **Connection String**
   - Formato: `postgresql://user:senha@host.neon.tech/dbname?sslmode=require`
4. Defina a variável de ambiente:
   - **No Replit:** Secrets → adicione `DATABASE_URL` com o valor copiado
   - **Local:** adicione ao seu `.env`
5. Crie as tabelas:
   ```bash
   pnpm --filter @workspace/db run push
   ```
6. Verifique em **Configurações → Banco de Dados** → botão "Listar"

### Outras opções de banco

| Provedor | URL de conexão |
|----------|---------------|
| Supabase | `postgresql://postgres:senha@db.xxx.supabase.co:5432/postgres` |
| Railway | `postgresql://postgres:senha@xxx.railway.app:5432/railway` |
| Local | `postgresql://postgres:senha@localhost:5432/sk_juridico` |
| Neon | `postgresql://user:senha@host.neon.tech/dbname?sslmode=require` |

---

## 6. Como Rodar Localmente (fora do Replit)

### Pré-requisitos
- Node.js 20+ (recomendado: 22 ou 24)
- pnpm 9+
- PostgreSQL ou conta Neon

### Passos

```bash
# 1. Instalar dependências
pnpm install

# 2. Configurar variáveis
cp .env.example .env
# Edite .env com suas credenciais

# 3. Criar tabelas no banco
pnpm --filter @workspace/db run push

# 4. Rodar em desenvolvimento (em 2 terminais)
pnpm --filter @workspace/api-server run dev   # terminal 1
pnpm --filter @workspace/assistente-juridico run dev  # terminal 2

# Ou usar concurrently:
pnpm run dev  # se houver script raiz configurado
```

Acesse: `http://localhost:PORT` (PORT definido para o frontend)

---

## 7. Como Buildar para Produção

```bash
# Build do backend (gera bundle CJS em api-server/dist/)
pnpm --filter @workspace/api-server run build

# Build do frontend (gera estáticos em assistente-juridico/dist/public/)
pnpm --filter @workspace/assistente-juridico run build

# Rodar o backend compilado
node artifacts/api-server/dist/index.cjs
```

**Variáveis necessárias em produção:**
```bash
DATABASE_URL=postgresql://...
SESSION_SECRET=string-aleatoria-longa
PORT=8080
NODE_ENV=production
```

---

## 8. Como Testar

```bash
# Verificar tipos TypeScript
pnpm run typecheck

# Testar endpoints da API
curl http://localhost:8080/api/health
curl http://localhost:8080/api/settings/db-status

# Testar upload de arquivo
curl -X POST http://localhost:8080/api/upload/extract-text \
  -F "files=@/caminho/para/arquivo.pdf"
```

---

## 9. Como Salvar e Testar Configurações

1. Acesse a página **Configurações** (ícone ou menu)
2. **Banco de Dados:** veja o status de conexão atual; cole uma URL de teste e clique no ícone de teste; clique em "Listar" para ver as tabelas
3. **Chaves de IA:** cole a chave no campo correspondente, clique no ícone de teste (tubo de ensaio) para validar antes de salvar
4. Clique em **"Salvar Configurações"** para persistir no banco
5. As chaves ficam mascaradas após salvar (mostram apenas os primeiros 8 caracteres)

---

## 10. Voz e TTS

O sistema usa **edge-tts** (Python) no servidor para gerar áudio em português:
- Voz: `pt-BR-FranciscaNeural` (Microsoft Edge TTS, gratuito)
- Velocidade: +18% (configurável em `routes/settings.ts`)
- Formato de saída: MP3

**Requisito:** Python 3 com `edge-tts` instalado:
```bash
pip install edge-tts
```

**No frontend:**
- Botão "Voz OFF/ON" no painel de resultado
- O texto do editor é enviado ao `/api/tts` e reproduzido no browser
- Compatível com mobile (iOS Safari requer interação do usuário antes de reproduzir)

---

## 11. Importação de Arquivos

| Formato | Limite | Método |
|---------|--------|--------|
| PDF | 150 MB | pdfjs-dist (extração de texto com posicionamento Y) |
| DOCX | 150 MB | mammoth |
| HTML / XML | 150 MB | parse de tags com preservação de parágrafos |
| TXT | 150 MB | leitura direta |

Upload via `POST /api/upload/extract-text` com `multipart/form-data`.  
Campo: `files` (múltiplos arquivos suportados).

---

## 12. Preparação para Versão Mobile / PWA

### PWA (recomendado — sem loja de apps)

O projeto já está configurado como PWA:
- `manifest.json` com nome, ícones, cores e shortcuts
- `sw.js` (Service Worker) com cache offline do shell
- Meta tags Apple e Android no `index.html`

**Como instalar no celular:**
- **Android (Chrome):** Menu → "Adicionar à tela inicial"
- **iPhone (Safari):** Compartilhar → "Adicionar à Tela de Início"
- **Desktop:** ícone de instalação na barra de endereço

### Capacitor (APK nativo)

Para gerar um APK Android real:

```bash
# 1. Instalar Capacitor
pnpm add -D @capacitor/core @capacitor/cli @capacitor/android

# 2. Build do frontend
pnpm --filter @workspace/assistente-juridico run build

# 3. Inicializar Capacitor
npx cap init "SK Juridico" "br.com.skjuridico"

# 4. Adicionar Android
npx cap add android

# 5. Copiar build para Capacitor
npx cap copy

# 6. Abrir no Android Studio
npx cap open android
```

**Atenção:** O backend precisa estar hospedado em um servidor externo (não no celular). Configure a URL do backend no frontend antes do build.

---

## 13. Independência do Replit (Produção sem Replit)

O projeto foi projetado para rodar em qualquer ambiente:

| Componente Replit | Substituição |
|-------------------|-------------|
| Secrets (env vars) | `.env` ou variáveis do sistema operacional |
| Database (PostgreSQL) | Neon, Supabase, Railway, ou PostgreSQL local |
| Hosting | VPS, Railway, Render, Fly.io, DigitalOcean |
| Vite plugins Replit | São ignorados em `NODE_ENV=production` |

**Dependências Replit no código:**
- `@replit/vite-plugin-runtime-error-modal` — só em dev
- `@replit/vite-plugin-cartographer` — só se `REPL_ID` estiver definido
- `@replit/vite-plugin-dev-banner` — só se `REPL_ID` estiver definido

Em produção (`NODE_ENV=production`), nenhum plugin Replit é carregado.

---

## 14. Gerar ZIP do Projeto

```bash
bash scripts/export-zip.sh
```

O arquivo `sk-juridico-YYYYMMDD-HHMMSS.zip` é gerado na raiz do projeto.  
**Exclusões automáticas:** `node_modules`, `dist`, `.git`, `.cache`, skills internas.

No Replit: painel de arquivos (Files) → clique direito no ZIP → Download.

---

## 15. O que Foi Mantido da Estrutura Original

- Todas as páginas e rotas do projeto ZIP2 original
- Editor TipTap v3 com extensões Table e FontSize
- Formatação ABNT automática (`legal-formatter.ts`)
- Sistema de autenticação por senha + sessão
- Storage com fallback em memória se banco indisponível
- Todas as rotas de IA com streaming SSE
- Upload multer com limites de 150 MB
- Extração de PDF via pdfjs-dist
- Exportação DOCX via docx
- Integração DataJud CNJ

## 16. O que Foi Adicionado / Melhorado

- `.env.example` completo com documentação
- `manifest.json` PWA com shortcuts
- `sw.js` Service Worker para cache offline
- `index.html` com meta tags PWA, Apple, tema, lang=pt-BR
- Tela de configurações com status real do banco de dados
- Endpoint `GET /api/settings/db-status` — testa conexão atual
- Endpoint `POST /api/settings/db-test` — testa URL de banco customizada
- Endpoint `POST /api/settings/db-init` — lista tabelas existentes
- Endpoint `GET /api/settings/app-info` — versão, uptime, memória
- Botão "Listar tabelas" na tela de configurações
- Instruções de configuração Neon diretamente na tela
- Script `scripts/export-zip.sh` para exportação
- `MANUAL.md` completo

## 17. Novidades da Versão 1.1.0 (Maio 2026)

### Correções Críticas
- **Editor TipTap v3 — preservação de formatação ABNT**: extensões `StyledParagraph` e `StyledHeading` customizadas que preservam atributos `style` e `class` ao definir conteúdo. A formatação ABNT (recuo 4 cm, justificado, títulos em caixa alta) não é mais perdida ao gerar/refinar documentos.

### Novas Funcionalidades
- **Botão "Drive"** no cabeçalho: envia o documento atual diretamente para o Google Drive (substitui o botão GitHub). Configure o Access Token e Folder ID em Configurações → Google Drive.
- **Painel Administrativo** (`/admin`): visualize variáveis de ambiente (mascaradas), defina novas variáveis no arquivo de configuração local, execute queries SQL no banco de dados, veja todas as rotas da API documentadas, monitore RAM, uptime e versão do Node.js.
- **Link para Admin** adicionado em Configurações e na tela de login.
- **Campos Google Drive** em Configurações: Google Drive Access Token e Google Drive Folder ID.
- **Ícones PWA reais** (192 × 192 px e 512 × 512 px) gerados para instalação correta como PWA em Android, iOS e desktop.

### Melhorias de Backend
- **Rate Limiting**: 300 requisições/min por IP para rotas gerais; 30 requisições/min por IP para rotas de IA (`/api/ai/*`). Protege contra uso abusivo.
- **Compressão Gzip**: respostas JSON comprimidas automaticamente quando `Content-Encoding: gzip` é aceito pelo cliente.
- **Novos endpoints em `/api/settings`**:
  - `GET /api/settings/env-list` — lista variáveis de ambiente e config local (valores mascarados)
  - `POST /api/settings/env-set` — define variável na config local sem reiniciar o servidor
  - `POST /api/settings/db-query` — executa query SQL (SELECT apenas) no banco de dados
  - `POST /api/settings/drive-upload` — faz upload de arquivo para o Google Drive

### Config Local Estendida
Os campos abaixo foram adicionados ao arquivo de configuração local (`local-config.ts`):
- `google_drive_folder_id` — ID da pasta no Google Drive
- `google_drive_access_token` — Token OAuth2 para acesso ao Drive
- `groq_api_key` — Chave Groq separada da custom key
- `custom_api_key`, `custom_model`, `custom_base_url` — Provedor customizado

---

## 18. O que Pode Ser Melhorado Futuramente

- OCR de imagens (Tesseract.js ou API Vision)
- Push notifications para prazos processuais
- Sincronização offline com IndexedDB
- Build Capacitor automatizado (CI/CD)
- Modo multi-usuário com autenticação JWT completa
- Monitoramento de saúde com health checks externos
