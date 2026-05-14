# 📋 Plano do Projeto: legal assistente configuração internna

**Gerado em:** 14/05/2026 15:03:10

---

## 📊 Visão Geral

| Item | Valor |
|------|-------|
| Total de arquivos | 195 |
| Total de linhas | 38.412 |
| Linguagens | 9 |
| Rotas de API | 183 |

---

## 🌳 Árvore de Arquivos

```
📄 .env.example
📄 .gitattributes
📄 artifact.toml
📄 build.mjs
📋 package.json
🔷 app.ts
🔷 index.ts
🔷 logger.ts
🔷 local-config.ts
🔷 ai.ts
🔷 crud.ts
🔷 extra.ts
🔷 health.ts
🔷 index.ts
🔷 jurisprudencia.ts
🔷 settings.ts
🔷 upload.ts
🔷 storage.ts
📋 tsconfig.json
📋 components.json
🟠 index.html
📋 package.json
📄 favicon.svg
📄 icon-192.png
📄 icon-512.png
📋 manifest.json
📄 opengraph.jpg
📄 robots.txt
🟡 sw.js
🔷 App.tsx
🔷 pwa-install.tsx
🔷 theme-provider.tsx
🔷 theme-toggle.tsx
🔷 tiptap-editor.tsx
🔷 accordion.tsx
🔷 alert-dialog.tsx
🔷 alert.tsx
🔷 aspect-ratio.tsx
🔷 avatar.tsx
🔷 badge.tsx
🔷 breadcrumb.tsx
🔷 button-group.tsx
🔷 button.tsx
🔷 calendar.tsx
🔷 card.tsx
🔷 carousel.tsx
🔷 chart.tsx
🔷 checkbox.tsx
🔷 collapsible.tsx
🔷 command.tsx
🔷 context-menu.tsx
🔷 dialog.tsx
🔷 drawer.tsx
🔷 dropdown-menu.tsx
🔷 empty.tsx
🔷 field.tsx
🔷 form.tsx
🔷 hover-card.tsx
🔷 input-group.tsx
🔷 input-otp.tsx
🔷 input.tsx
🔷 item.tsx
🔷 kbd.tsx
🔷 label.tsx
🔷 menubar.tsx
🔷 navigation-menu.tsx
🔷 pagination.tsx
🔷 popover.tsx
🔷 progress.tsx
🔷 radio-group.tsx
🔷 resizable.tsx
🔷 scroll-area.tsx
🔷 select.tsx
🔷 separator.tsx
🔷 sheet.tsx
🔷 sidebar.tsx
🔷 skeleton.tsx
🔷 slider.tsx
🔷 sonner.tsx
🔷 spinner.tsx
🔷 switch.tsx
🔷 table.tsx
🔷 tabs.tsx
🔷 textarea.tsx
🔷 toast.tsx
🔷 toaster.tsx
🔷 toggle-group.tsx
🔷 toggle.tsx
🔷 tooltip.tsx
🔷 use-mobile.tsx
🔷 use-toast.ts
💜 index.css
🔷 legal-formatter.ts
🔷 queryClient.ts
🔷 utils.ts
🔷 main.tsx
🔷 admin.tsx
🔷 auditoria-financeira.tsx
🔷 codigo.tsx
🔷 comparador-juridico.tsx
🔷 comunicacoes-cnj.tsx
🔷 configuracoes.tsx
🔷 consulta-corporativo.tsx
🔷 consulta-pdpj.tsx
🔷 consulta-processual.tsx
🔷 ementas.tsx
🔷 filtrador.tsx
🔷 historico.tsx
🔷 jurisprudencia.tsx
🔷 legal-assistant.tsx
🔷 login.tsx
🔷 not-found.tsx
🔷 painel-processos.tsx
🔷 playground.tsx
🔷 previdenciario.tsx
🔷 robo-djen.tsx
🔷 token-generator.tsx
🔷 tramitacao.tsx
📋 tsconfig.json
🔷 vite.config.ts
📝 MANUAL.md
📄 artifact.toml
📋 components.json
🟠 index.html
🔷 mockupPreviewPlugin.ts
📋 package.json
🔷 mockup-components.ts
🔷 App.tsx
🔷 accordion.tsx
🔷 alert-dialog.tsx
🔷 alert.tsx
🔷 aspect-ratio.tsx
🔷 avatar.tsx
🔷 badge.tsx
🔷 breadcrumb.tsx
🔷 button-group.tsx
🔷 button.tsx
🔷 calendar.tsx
🔷 card.tsx
🔷 carousel.tsx
🔷 chart.tsx
🔷 checkbox.tsx
🔷 collapsible.tsx
🔷 command.tsx
🔷 context-menu.tsx
🔷 dialog.tsx
🔷 drawer.tsx
🔷 dropdown-menu.tsx
🔷 empty.tsx
🔷 field.tsx
🔷 form.tsx
🔷 hover-card.tsx
🔷 input-group.tsx
🔷 input-otp.tsx
🔷 input.tsx
🔷 item.tsx
🔷 kbd.tsx
🔷 label.tsx
🔷 menubar.tsx
🔷 navigation-menu.tsx
🔷 pagination.tsx
🔷 popover.tsx
🔷 progress.tsx
🔷 radio-group.tsx
🔷 resizable.tsx
🔷 scroll-area.tsx
🔷 select.tsx
🔷 separator.tsx
🔷 sheet.tsx
🔷 sidebar.tsx
🔷 skeleton.tsx
🔷 slider.tsx
🔷 sonner.tsx
🔷 spinner.tsx
🔷 switch.tsx
🔷 table.tsx
🔷 tabs.tsx
🔷 textarea.tsx
🔷 toast.tsx
🔷 toaster.tsx
🔷 toggle-group.tsx
🔷 toggle.tsx
🔷 tooltip.tsx
🔷 use-mobile.tsx
🔷 use-toast.ts
💜 index.css
🔷 utils.ts
🔷 main.tsx
📋 tsconfig.json
🔷 vite.config.ts
🖥️ export-zip.sh
📋 package.json
🖥️ post-merge.sh
🔷 hello.ts
📋 tsconfig.json
```

---

## 🗣️ Linguagens

🔷 typescript: 166 arquivos
📋 json: 11 arquivos
📄 plaintext: 8 arquivos
📄 toml: 2 arquivos
🟠 html: 2 arquivos
💜 css: 2 arquivos
🖥️ bash: 2 arquivos
🟡 javascript: 1 arquivo
📝 markdown: 1 arquivo

---

## 🚀 Pontos de Entrada

  • index.ts
  • app.ts
  • index.html

---

## 🔌 Rotas de API Detectadas

  `POST /ai/process` — ai.ts
  `POST /ai/refine` — ai.ts
  `POST /code-assistant` — ai.ts
  `POST /voice-chat` — ai.ts
  `POST /demo-key-test` — ai.ts
  `POST /ai-usage-credit` — ai.ts
  `GET /snippets` — crud.ts
  `GET /snippets/:id` — crud.ts
  `POST /snippets` — crud.ts
  `PATCH /snippets/:id` — crud.ts
  `DELETE /snippets/:id` — crud.ts
  `GET /custom-actions` — crud.ts
  `POST /custom-actions` — crud.ts
  `PATCH /custom-actions/:id` — crud.ts
  `DELETE /custom-actions/:id` — crud.ts
  `GET /ementas` — crud.ts
  `POST /ementas` — crud.ts
  `PATCH /ementas/:id` — crud.ts
  `DELETE /ementas/:id` — crud.ts
  `GET /ai-history` — crud.ts
  `POST /ai-history` — crud.ts
  `DELETE /ai-history/:id` — crud.ts
  `DELETE /ai-history` — crud.ts
  `GET /prompt-templates` — crud.ts
  `POST /prompt-templates` — crud.ts
  `PATCH /prompt-templates/:id` — crud.ts
  `DELETE /prompt-templates/:id` — crud.ts
  `GET /doc-templates` — crud.ts
  `POST /doc-templates` — crud.ts
  `PATCH /doc-templates/:id` — crud.ts
  `DELETE /doc-templates/:id` — crud.ts
  `GET /processos-monitorados` — crud.ts
  `POST /processos-monitorados` — crud.ts
  `PATCH /processos-monitorados/:id` — crud.ts
  `DELETE /processos-monitorados/:id` — crud.ts
  `POST /share/parecer` — crud.ts
  `GET /tramitacao/publicacoes` — crud.ts
  `PATCH /tramitacao/publicacoes/:id/lida` — crud.ts
  `POST /webhooks/tramitacao` — crud.ts
  `GET /ai-usage-summary` — crud.ts
  `POST /jwt/generate` — extra.ts
  `GET /jwt/status` — extra.ts
  `GET /datajud/tribunais` — extra.ts
  `POST /datajud/consulta` — extra.ts
  `POST /datajud/consulta-oab` — extra.ts
  `GET /corporativo/advogado/cpf/:cpf` — extra.ts
  `GET /corporativo/advogado/oab/:uf/:inscricao` — extra.ts
  `GET /corporativo/magistrados/:tribunal` — extra.ts
  `GET /pdpj/status` — extra.ts
  `POST /pdpj/test-connection` — extra.ts
  `POST /pdpj/comunicacoes` — extra.ts
  `POST /pdpj/representados` — extra.ts
  `POST /pdpj/habilitacao` — extra.ts
  `POST /pdpj/pessoa` — extra.ts
  `POST /cnj/comunicacoes` — extra.ts
  `POST /code/run` — extra.ts
  `POST /previdenciario/extrair` — extra.ts
  `GET /pesquisa/oab` — extra.ts
  `GET /pesquisa/processo` — extra.ts
  `GET /djen/config` — extra.ts
  `POST /djen/gerar-token` — extra.ts
  `POST /export/word` — extra.ts
  `POST /export/word-with-template` — extra.ts
  `POST /doc-templates/upload-docx` — extra.ts
  `GET /tramitacao/test` — extra.ts
  `GET /tramitacao/clientes` — extra.ts
  `POST /tramitacao/clientes` — extra.ts
  `GET /tramitacao/clientes/:id` — extra.ts
  `PATCH /tramitacao/clientes/:id` — extra.ts
  `GET /tramitacao/usuarios` — extra.ts
  `GET /tramitacao/notas` — extra.ts
  `POST /tramitacao/notas` — extra.ts
  `DELETE /tramitacao/notas/:id` — extra.ts
  `GET /settings/:key` — extra.ts
  `PUT /settings/:key` — extra.ts
  `/CLIENTES?PER_PAGE=1 /clientes?per_page=1` — extra.ts
  `/CLIENTES?${QS} /clientes?${qs}` — extra.ts
  `/CLIENTES /clientes` — extra.ts
  `/CLIENTES/${REQ.PARAMS.ID} /clientes/${req.params.id}` — extra.ts
  `/CLIENTES/${REQ.PARAMS.ID} /clientes/${req.params.id}` — extra.ts
  `/USUARIOS?PER_PAGE=100 /usuarios?per_page=100` — extra.ts
  `/NOTAS?${QS} /notas?${qs}` — extra.ts
  `/NOTAS /notas` — extra.ts
  `/NOTAS/${REQ.PARAMS.ID} /notas/${req.params.id}` — extra.ts
  `GET /healthz` — health.ts
  `POST /jurisprudencia/buscar` — jurisprudencia.ts
  `GET /auth/check` — settings.ts
  `POST /auth/login` — settings.ts
  `POST /auth/logout` — settings.ts
  `GET /settings/ai-config` — settings.ts
  `PUT /settings/ai-config` — settings.ts
  `GET /settings/system-status` — settings.ts
  `PUT /settings/app-password` — settings.ts
  `POST /settings/database-reconnect` — settings.ts
  `GET /demo-key-status` — settings.ts
  `GET /demo-key-config` — settings.ts
  `POST /demo-key-config` — settings.ts
  `GET /perplexity-key-status` — settings.ts
  `POST /tts` — settings.ts
  `POST /export/docx` — settings.ts
  `GET /ai-usage-summary` — settings.ts
  `POST /git-push` — settings.ts
  `GET /settings/db-status` — settings.ts
  `POST /settings/db-test` — settings.ts
  `POST /settings/db-init` — settings.ts
  `GET /settings/app-info` — settings.ts
  `GET /settings/env-list` — settings.ts
  `POST /settings/env-set` — settings.ts
  `POST /settings/db-query` — settings.ts
  `POST /settings/drive-upload` — settings.ts
  `POST /upload/extract-text` — upload.ts
  `POST /extract-text` — upload.ts
  `POST /import/url` — upload.ts
  `POST /import-url` — upload.ts
  `POST /upload/transcribe` — upload.ts
  `/API/AUTH/CHECK /api/auth/check` — App.tsx
  `/API/TTS /api/tts` — codigo.tsx
  `/API/CODE-ASSISTANT /api/code-assistant` — codigo.tsx
  `/API/CODE-ASSISTANT /api/code-assistant` — codigo.tsx
  `/API/CNJ/COMUNICACOES /api/cnj/comunicacoes` — comunicacoes-cnj.tsx
  `/API/CORPORATIVO/ADVOGADO/CPF/${CPFCLEAN} /api/corporativo/advogado/cpf/${cpfClean}` — consulta-corporativo.tsx
  `/API/CORPORATIVO/ADVOGADO/OAB/${OABUF}/${NUM} /api/corporativo/advogado/oab/${oabUf}/${num}` — consulta-corporativo.tsx
  `/API/CORPORATIVO/MAGISTRADOS/${MAGTRIBUNAL} /api/corporativo/magistrados/${magTribunal}` — consulta-corporativo.tsx
  `/API/PDPJ/STATUS /api/pdpj/status` — consulta-pdpj.tsx
  `/API/PDPJ/TEST-CONNECTION /api/pdpj/test-connection` — consulta-pdpj.tsx
  `/API/PDPJ/COMUNICACOES /api/pdpj/comunicacoes` — consulta-pdpj.tsx
  `/API/PDPJ/REPRESENTADOS /api/pdpj/representados` — consulta-pdpj.tsx
  `/API/PDPJ/HABILITACAO /api/pdpj/habilitacao` — consulta-pdpj.tsx
  `/API/PDPJ/PESSOA /api/pdpj/pessoa` — consulta-pdpj.tsx
  `/API/DATAJUD/CONSULTA /api/datajud/consulta` — consulta-processual.tsx
  `/API/DATAJUD/CONSULTA-OAB /api/datajud/consulta-oab` — consulta-processual.tsx
  `/API/DATAJUD/CONSULTA /api/datajud/consulta` — consulta-processual.tsx
  `/API/TTS /api/tts` — jurisprudencia.tsx
  `/API/DOC-TEMPLATES/UPLOAD-DOCX /api/doc-templates/upload-docx` — jurisprudencia.tsx
  `/API/EXPORT/WORD-WITH-TEMPLATE /api/export/word-with-template` — jurisprudencia.tsx
  `/API/JURISPRUDENCIA/BUSCAR /api/jurisprudencia/buscar` — jurisprudencia.tsx
  `/API/IMPORT/URL /api/import/url` — jurisprudencia.tsx
  `/API/UPLOAD/EXTRACT-TEXT /api/upload/extract-text` — jurisprudencia.tsx
  `/API/UPLOAD/TRANSCRIBE /api/upload/transcribe` — jurisprudencia.tsx
  `/API/AI/PROCESS /api/ai/process` — jurisprudencia.tsx
  `/API/AI/PROCESS /api/ai/process` — jurisprudencia.tsx
  `/API/AI/REFINE /api/ai/refine` — jurisprudencia.tsx
  `/API/UPLOAD/EXTRACT-TEXT /api/upload/extract-text` — jurisprudencia.tsx
  `/API/UPLOAD/EXTRACT-TEXT /api/upload/extract-text` — jurisprudencia.tsx
  `/API/DEMO-KEY-STATUS /api/demo-key-status` — legal-assistant.tsx
  `/API/DEMO-KEY-CONFIG /api/demo-key-config` — legal-assistant.tsx
  `/API/TTS /api/tts` — legal-assistant.tsx
  `/API/VOICE-CHAT /api/voice-chat` — legal-assistant.tsx
  `/API/DOC-TEMPLATES/UPLOAD-DOCX /api/doc-templates/upload-docx` — legal-assistant.tsx
  `/API/EXPORT/WORD-WITH-TEMPLATE /api/export/word-with-template` — legal-assistant.tsx
  `/API/JURISPRUDENCIA/BUSCAR /api/jurisprudencia/buscar` — legal-assistant.tsx
  `/API/CODE-ASSISTANT /api/code-assistant` — legal-assistant.tsx
  `/API/IMPORT/URL /api/import/url` — legal-assistant.tsx
  `/API/UPLOAD/EXTRACT-TEXT /api/upload/extract-text` — legal-assistant.tsx
  `/API/UPLOAD/TRANSCRIBE /api/upload/transcribe` — legal-assistant.tsx
  `/API/AI/PROCESS /api/ai/process` — legal-assistant.tsx
  `/API/AI/PROCESS /api/ai/process` — legal-assistant.tsx
  `/API/AI/REFINE /api/ai/refine` — legal-assistant.tsx
  `/API/UPLOAD/EXTRACT-TEXT /api/upload/extract-text` — legal-assistant.tsx
  `/API/UPLOAD/EXTRACT-TEXT /api/upload/extract-text` — legal-assistant.tsx
  `/API/SETTINGS/DRIVE-UPLOAD /api/settings/drive-upload` — legal-assistant.tsx
  `/API/DEMO-KEY-CONFIG /api/demo-key-config` — legal-assistant.tsx
  `/API/DEMO-KEY-CONFIG /api/demo-key-config` — legal-assistant.tsx
  `/API/AI-USAGE-SUMMARY /api/ai-usage-summary` — legal-assistant.tsx
  `/API/AI-USAGE-CREDIT /api/ai-usage-credit` — legal-assistant.tsx
  `/API/DEMO-KEY-TEST /api/demo-key-test` — legal-assistant.tsx
  `/API/DEMO-KEY-CONFIG /api/demo-key-config` — legal-assistant.tsx
  `/API/DEMO-KEY-CONFIG /api/demo-key-config` — legal-assistant.tsx
  `/API/AUTH/LOGIN /api/auth/login` — login.tsx
  `/API/DATAJUD/CONSULTA-OAB /api/datajud/consulta-oab` — painel-processos.tsx
  `/API/DATAJUD/CONSULTA /api/datajud/consulta` — painel-processos.tsx
  `/API/DATAJUD/CONSULTA /api/datajud/consulta` — painel-processos.tsx
  `/API/CODE/RUN /api/code/run` — playground.tsx
  `/API/DJEN/CONFIG /api/djen/config` — robo-djen.tsx
  `/API/DJEN/GERAR-TOKEN /api/djen/gerar-token` — robo-djen.tsx
  `/API/PESQUISA/OAB?${PARAMS} /api/pesquisa/oab?${params}` — robo-djen.tsx
  `/API/PESQUISA/PROCESSO?${PARAMS} /api/pesquisa/processo?${params}` — robo-djen.tsx
  `/API/JWT/STATUS /api/jwt/status` — token-generator.tsx
  `/API/JWT/GENERATE /api/jwt/generate` — token-generator.tsx
  `/API/TRAMITACAO/TEST /api/tramitacao/test` — tramitacao.tsx
  `/API/TRAMITACAO/CLIENTES?PAGE=${CLIENTEPAGE}&PER_PAGE=20 /api/tramitacao/clientes?page=${clientePage}&per_page=20` — tramitacao.tsx
  `/API/TRAMITACAO/CLIENTES/${SELECTEDCLIENTE.ID} /api/tramitacao/clientes/${selectedCliente.id}` — tramitacao.tsx
  `/API/TRAMITACAO/USUARIOS /api/tramitacao/usuarios` — tramitacao.tsx

---

## 💡 Sugestões de Melhoria

  📝 Adicionar README.md com instruções do projeto
  🚫 Adicionar .gitignore para evitar commits desnecessários
  🧪 Criar testes automatizados para as funcionalidades principais
  📖 Documentar as rotas de API com exemplos de uso
  📁 Organizar arquivos em subpastas por funcionalidade
  🔷 Migrar arquivos .js para TypeScript para maior segurança de tipos

---

## 📖 Descrição

Importado de legal assistente configuração internna.zip — 195 arquivo(s)

---

*Gerado pelo DevMobile IDE*
