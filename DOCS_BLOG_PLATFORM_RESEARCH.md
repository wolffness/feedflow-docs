# Pesquisa: Plataformas Open-Source para Documentacao e Blog

**Data:** 2026-03-31
**Contexto:** FeedFlow (SaaS Nuvemshop) — docs.feed-flow.app + blog.feed-flow.app
**Stack atual:** Astro + Starlight (docs) / Astro custom (blog) no Cloudflare Pages

---

## 1. Analise Individual de Cada Plataforma

### 1.1 DOCUSAURUS (Meta)

- **URL:** https://docusaurus.io
- **Licenca:** MIT
- **Linguagem/Framework:** React (JavaScript/TypeScript)
- **Self-hosted / Cloud:** Self-hosted (SSG, deploy em qualquer CDN)
- **GitHub Stars:** ~58.6k
- **Ultima atualizacao:** Ativo, mantido pela Meta

**Controle de acesso por pagina:**
NAO nativo. Controle de acesso e client-side via "swizzling" de componentes React. O conteudo e empacotado no bundle JS — ou seja, mesmo protegido visualmente, o HTML/JS contem o conteudo. Solucoes existentes: SlashID (terceiro), Cloudflare Access (nivel infra), Auth0. Issue #2769 aberta desde 2020 sem resolucao oficial.

**Blog:** Sim, built-in. Plugin `docusaurus-plugin-content-blog` com tags, feed RSS, paginacao.

**Busca full-text:** Algolia DocSearch (gratuito para OSS) ou plugins locais (lunr, typesense). Nao tem busca nativa como Pagefind.

**CMS visual:** Nao. Edicao via arquivos Markdown/MDX no repositorio.

**Performance:** SSG puro. Build gera HTML estatico. Bundle JS pode ser pesado (~200-400KB) por ser React SPA.

**Customizacao:** Boa via CSS custom, swizzling de componentes React. Mais flexivel que Starlight, mas mais complexo.

**i18n:** Excelente. Built-in com suporte a Crowdin, pastas por locale, pt-BR suportado.

**RAM para self-host:** Zero (e SSG, serve arquivos estaticos). Build precisa ~1-2GB RAM.

**Compatibilidade stack FeedFlow:** Media. React-based, mas nao integra com Flask. Deploy via Cloudflare Pages funciona.

**Pros:**
- Comunidade enorme, documentacao excelente
- Blog built-in
- Versionamento de docs nativo
- i18n robusto com Crowdin
- Usado por Meta, Supabase, Algolia, etc.

**Contras:**
- Bundle JS pesado (SPA React)
- SEM controle de acesso nativo (problema critico)
- Swizzling e complexo para customizacoes profundas
- Migracao de Astro/Starlight significativa

---

### 1.2 MINTLIFY

- **URL:** https://mintlify.com
- **Licenca:** Proprietaria (SaaS). NAO e open-source
- **Linguagem/Framework:** Proprietario (backend) + React (frontend)
- **Self-hosted:** NAO (apenas SaaS). Tem "starter kit" Astro para frontend custom, mas o engine e hosted
- **Preco:** Free (1 editor), Pro $150/mes, Enterprise custom

**Veredicto:** Descartada. Nao e open-source, nao e self-hosted. Vendor lock-in total. A "alternativa OSS" que recomendam (Fumadocs/Unmint) sera analisada separadamente.

---

### 1.3 GITBOOK

- **URL:** https://gitbook.com
- **Licenca:** Proprietaria (SaaS). Versao open-source (GitBook Legacy v2) descontinuada
- **Self-hosted:** NAO. A versao self-hosted foi descontinuada em 2018
- **Preco:** Free (1 space publico), Plus $8/mes, Pro $12/mes, Enterprise custom

**Veredicto:** Descartada. Sem versao self-hosted. Vendor lock-in. Alternativas OSS melhores existem.

---

### 1.4 NEXTRA (Next.js)

- **URL:** https://nextra.site
- **Licenca:** MIT
- **Linguagem/Framework:** Next.js (React)
- **Self-hosted:** Sim (SSG ou SSR via Next.js)
- **GitHub Stars:** ~12k

**Controle de acesso:** Possivel via Next.js middleware + NextAuth.js. Nao e nativo do Nextra, mas como roda em Next.js, middleware de auth funciona a nivel de rota (server-side, seguro).

**Blog:** Sim, tema de blog built-in.

**Busca:** Flexsearch (client-side, built-in) ou Algolia.

**CMS visual:** Nao nativo.

**Performance:** SSG por padrao, SSR disponivel. Mais pesado que Astro.

**Customizacao:** Boa, mas "opinionated" — e mais configuracao que composicao.

**i18n:** Suportado via Next.js i18n routing.

**Compatibilidade:** Media. Next.js e um framework separado. Deploy Cloudflare funciona com adapter.

**Pros:**
- Auth server-side via Next.js middleware (seguro)
- Blog built-in
- Ecossistema Next.js maduro

**Contras:**
- Menor que Docusaurus em comunidade
- Nextra v4 mudou bastante, breaking changes
- Mais complexo que Astro/Starlight
- Depende de runtime Node.js para SSR (se quiser auth)

---

### 1.5 VITEPRESS (Vue)

- **URL:** https://vitepress.dev
- **Licenca:** MIT
- **Linguagem/Framework:** Vue 3 + Vite
- **Self-hosted:** Sim (SSG)
- **GitHub Stars:** ~14k

**Controle de acesso:** NAO nativo. E SSG puro. Precisaria de solucao externa (Cloudflare Access, Auth0). Template com Auth0 existe, mas e "gambiarra" client-side.

**Blog:** NAO built-in. Precisa de plugin comunitario.

**Busca:** MiniSearch built-in (local, bom).

**CMS visual:** Nao.

**Performance:** Excelente. Vite-based, build rapido, bundle leve.

**Customizacao:** Boa via Vue components e CSS.

**i18n:** Suportado nativamente.

**Compatibilidade:** Baixa. Stack FeedFlow e React, VitePress e Vue. Misturar frameworks.

**Pros:**
- Performance excelente
- Build rapido
- Busca local built-in

**Contras:**
- Vue (FeedFlow e React)
- Sem blog nativo
- Sem controle de acesso
- Comunidade menor que Docusaurus

---

### 1.6 STARLIGHT (Astro) — STACK ATUAL

- **URL:** https://starlight.astro.build
- **Licenca:** MIT
- **Linguagem/Framework:** Astro (agnóstico de framework)
- **Self-hosted:** Sim (SSG ou SSR com adapters)
- **GitHub Stars:** ~8.2k (Starlight) / ~50k+ (Astro)

**Controle de acesso:** NAO nativo em modo SSG. Porem:
- Template `starlight-auth` existe (Auth.js + 80+ OAuth providers)
- Com SSR mode (adapter Node/Cloudflare), middleware server-side e possivel
- Cloudflare Access pode proteger rotas especificas (nivel infra)

**Blog:** Plugin comunitario `starlight-blog`. Funciona, mas nao e first-class.

**Busca:** Pagefind (Rust/WASM, excelente, zero API, funciona offline, built-in).

**CMS visual:** Keystatic integra nativamente com Astro (painel admin file-based).

**Performance:** A melhor entre todos. Zero JS client por padrao. Core Web Vitals perfeito. Build rapido.

**Customizacao:** Boa via CSS custom properties e component overrides.

**i18n:** Excelente. Built-in com locale detection, RTL, 35+ idiomas pre-traduzidos (inclui pt-BR).

**RAM para self-host:** Zero em SSG. ~256-512MB para SSR mode.

**Compatibilidade:** EXCELENTE. Ja e o stack atual. Cloudflare Pages nativo.

**Pros:**
- Ja esta em uso (zero migracao para docs)
- Melhor performance de todos
- Pagefind (melhor busca local)
- i18n excelente
- Zero JS por padrao
- Keystatic para CMS

**Contras:**
- Controle de acesso requer SSR ou Cloudflare Access
- Blog e plugin comunitario, nao first-class
- Menos plugins que Docusaurus

---

### 1.7 FUMADOCS (Next.js) — DESCOBERTA NA PESQUISA

- **URL:** https://fumadocs.dev
- **Licenca:** MIT
- **Linguagem/Framework:** Next.js (React)
- **Self-hosted:** Sim
- **GitHub Stars:** ~4k+ (crescendo rapido, 3x YoY)
- **npm downloads:** ~150K/mes

**Controle de acesso:** SIM, documentado oficialmente. Duas abordagens:
1. Loader API: filtrar conteudo por permission level no build
2. Next.js middleware: proteger rotas server-side

**Blog:** Suportado (Next.js routing + MDX).

**Busca:** Orama (built-in) ou Algolia.

**CMS visual:** Nao nativo, mas compativel com Contentlayer/MDX.

**Performance:** Boa (Next.js SSG/SSR/ISR).

**Customizacao:** A melhor entre frameworks de docs. "Headless" — voce compoe a UI com primitivas.

**i18n:** Suportado via Next.js.

**Compatibilidade:** Media. Next.js e separado de Flask. Deploy Cloudflare via adapter.

**Pros:**
- Controle de acesso documentado oficialmente
- Altissima customizacao (headless)
- Crescimento rapido, comunidade ativa
- React-based (alinhado com FeedFlow dashboard)
- OpenAPI integration

**Contras:**
- Comunidade menor que Docusaurus/Starlight
- Next.js adiciona complexidade
- Requer runtime Node para SSR/auth
- Migracao significativa do Astro

---

### 1.8 STRAPI (Headless CMS)

- **URL:** https://strapi.io
- **Licenca:** MIT (Community) / Enterprise pago
- **Linguagem/Framework:** Node.js (JavaScript/TypeScript)
- **Self-hosted:** Sim
- **GitHub Stars:** ~66k

**Controle de acesso:** SIM. RBAC nativo, permissoes por content-type.

**Blog/Docs:** CMS generico — precisa construir o frontend separadamente (Astro, Next.js, etc.).

**Busca:** Nao nativa. Integravel com Meilisearch.

**CMS visual:** SIM. Admin panel com editor WYSIWYG.

**Performance:** Depende do frontend escolhido. API REST/GraphQL.

**Customizacao:** Total (e um CMS, nao um framework de docs).

**i18n:** Plugin built-in.

**RAM:** Minimo 1GB (build precisa 1GB+). Producao: 2-4GB.

**Compatibilidade:** Media. Suporta PostgreSQL, mas roda em Node.js (servidor adicional no Hetzner).

**Preco:** Community gratuito. Enterprise: $2,500/mes.

**Pros:**
- CMS visual completo para nao-devs
- RBAC robusto
- API REST + GraphQL
- PostgreSQL nativo
- Comunidade gigante

**Contras:**
- E um CMS, NAO um framework de docs
- Precisa de frontend separado
- Mais um servico Node.js no servidor
- RAM significativa (2-4GB)
- Complexidade operacional alta

---

### 1.9 PAYLOAD CMS

- **URL:** https://payloadcms.com
- **Licenca:** MIT
- **Linguagem/Framework:** TypeScript + Next.js
- **Self-hosted:** Sim
- **GitHub Stars:** ~35k+

**Controle de acesso:** SIM. Access control granular por collection/field. SSO no Enterprise.

**Blog/Docs:** Templates prontos para blog e docs com versionamento.

**Busca:** Nao nativa. API permite integracao.

**CMS visual:** SIM. Admin panel moderno, live preview, editor rico.

**Performance:** Next.js-based. SSG/SSR/ISR.

**Customizacao:** Excelente. Config-based, TypeScript-first.

**i18n:** Suportado nativamente.

**RAM:** ~1-2GB (mais leve que Strapi).

**Compatibilidade:** Boa. Suporta PostgreSQL via Drizzle adapter. Deploy no Hetzner viavel.

**Preco:** Gratuito self-hosted. Cloud: a partir de $60/mes.

**Pros:**
- CMS mais moderno do mercado
- TypeScript-first, excelente DX
- PostgreSQL nativo (pode usar mesmo DB do FeedFlow)
- Access control granular
- Live preview, visual editing
- Templates de blog e docs

**Contras:**
- Payload 3.0 ainda em BETA
- Next.js dependency (mais um runtime)
- Documentacao de deploy VPS e confusa
- RAM adicional no servidor

---

### 1.10 GHOST

- **URL:** https://ghost.org
- **Licenca:** MIT
- **Linguagem/Framework:** Node.js
- **Self-hosted:** Sim
- **GitHub Stars:** ~49k

**Controle de acesso:** SIM. Tiers de membros (Free, Paid), content gating por tier, public preview dividers.

**Blog:** SIM. E a principal funcao. Editor excelente (Koenig).

**Docs:** NAO e projetado para docs. Possivel mas nao ideal.

**Busca:** Nao nativa (usa Sodo Search, basico).

**CMS visual:** SIM. Editor WYSIWYG excelente (melhor da categoria).

**Performance:** SSR (Node.js). Nao e SSG.

**i18n:** NAO nativo. Hacky.

**RAM:** 2GB minimo recomendado. MySQL obrigatorio (nao PostgreSQL).

**Compatibilidade:** Baixa. MySQL (nao PostgreSQL). Outro runtime Node.js. Nao serve para docs.

**Preco:** Self-hosted gratuito. Ghost(Pro): $9-199/mes.

**Pros:**
- Melhor editor de blog do mercado
- Membros/tiers/newsletters nativos
- Stripe integrado
- Comunidade madura

**Contras:**
- NAO serve para documentacao
- MySQL obrigatorio (nao PostgreSQL)
- i18n fraco
- Mais um servico no servidor
- Escopo limitado a blog/newsletter

---

### 1.11 DIRECTUS

- **URL:** https://directus.io
- **Licenca:** BSL 1.1 (nao e MIT; restritivo para uso comercial hosting)
- **Linguagem/Framework:** Node.js + Vue.js (admin)
- **Self-hosted:** Sim
- **GitHub Stars:** ~30k+

**Controle de acesso:** SIM. RBAC granular ate nivel de campo. Content versioning nativo.

**Blog/Docs:** CMS generico — precisa frontend separado.

**Busca:** Nao nativa. API + Meilisearch.

**CMS visual:** SIM. Studio com editor visual, WYSIWYG, drag-and-drop.

**Performance:** Depende do frontend.

**Customizacao:** Total (e data layer, nao framework de docs).

**i18n:** Plugin de traducao nativo.

**RAM:** 2-4GB recomendado (Node.js + PostgreSQL + Redis).

**Compatibilidade:** ALTA. Pode usar o PostgreSQL existente do FeedFlow.

**Preco:** Self-hosted Community gratuito. Professional $99/mes. Enterprise custom.

**Pros:**
- Usa seu PostgreSQL existente
- RBAC granular com content versioning
- API REST + GraphQL automatica
- Admin panel moderno
- Pode servir como backend para docs E blog

**Contras:**
- Licenca BSL 1.1 (nao MIT)
- Precisa de frontend separado
- Mais um servico Node.js
- RAM significativa
- Complexidade operacional

---

### 1.12 KEYSTONEJS

- **URL:** https://keystonejs.com
- **Licenca:** MIT
- **Linguagem/Framework:** Node.js + Next.js (admin)
- **Self-hosted:** Sim
- **GitHub Stars:** ~9.2k

**Controle de acesso:** SIM. Access control por lista/campo via config.

**Blog/Docs:** CMS generico. GraphQL API.

**RAM:** ~1-2GB.

**Compatibilidade:** Suporta PostgreSQL (via Prisma).

**Preco:** Gratuito (open source).

**Pros:**
- MIT license
- GraphQL API
- PostgreSQL via Prisma
- Access control

**Contras:**
- Comunidade relativamente pequena
- Desenvolvimento mais lento que Payload/Strapi
- Precisa de frontend separado
- Menos features que Directus/Strapi

---

### 1.13 OUTLINE

- **URL:** https://getoutline.com
- **Licenca:** BSL 1.1
- **Linguagem/Framework:** Node.js + React
- **Self-hosted:** Sim
- **GitHub Stars:** ~30k+

**Controle de acesso:** SIM. Collections com permissoes, RBAC.

**Blog:** NAO. E wiki/knowledge base interno.

**Busca:** SIM. Full-text excelente.

**CMS visual:** SIM. Editor Markdown colaborativo em tempo real.

**RAM:** 2-4GB (Node.js + PostgreSQL + Redis + MinIO).

**Compatibilidade:** PostgreSQL + Redis (mesma stack).

**Pros:**
- Excelente para docs internos
- Colaboracao real-time
- Busca full-text excelente
- API robusta

**Contras:**
- NAO serve para docs publicos/SEO
- NAO tem blog
- Licenca BSL 1.1
- Focado em equipes internas
- Nao gera site estatico

**Veredicto:** Descartado. Outline e para knowledge base interna, nao para docs publicos com SEO.

---

### 1.14 KEYSTATIC (CMS para Astro)

- **URL:** https://keystatic.com
- **Licenca:** MIT
- **Linguagem/Framework:** React + Astro/Next.js
- **Self-hosted:** Sim (file-based, Git-backed)
- **GitHub Stars:** ~4.5k

**O que e:** CMS file-based que gera Markdown/JSON/YAML. Nao e framework de docs, e um painel admin para editar conteudo Astro.

**CMS visual:** SIM. Admin UI no /keystatic com editor visual.

**Integracao Astro:** NATIVA. Funciona direto com content collections.

**Auth do admin:** Via GitHub OAuth ou Keystatic Cloud.

**Preco:** Gratuito (open source). Keystatic Cloud gratuito tambem.

**Pros:**
- Integra nativamente com Astro/Starlight
- Admin visual para nao-devs editarem conteudo
- File-based (Git-backed, sem banco)
- Zero overhead de infraestrutura
- MIT license

**Contras:**
- Nao resolve controle de acesso do leitor
- Apenas para gerenciar conteudo (CMS), nao auth de usuarios

---

## 2. Combinacoes Analisadas

### 2.A: Astro Starlight + Cloudflare Access (manter stack + auth infra)

**Como funciona:**
- Docs publicos: SSG normal no Cloudflare Pages
- Docs privados: subfolder `/private/` protegido por Cloudflare Access
- Cloudflare Access: free ate 50 usuarios, One-Time PIN por email ou SSO

**Pros:** Zero migracao, zero overhead, gratis ate 50 users
**Contras:** Granularidade limitada (por path, nao por pagina), nao integra com auth do app FeedFlow

### 2.B: Astro Starlight SSR + Auth.js (auth nativo no Astro)

**Como funciona:**
- Astro em SSR mode (adapter Cloudflare ou Node)
- Middleware checa session/JWT antes de servir pagina
- Template starlight-auth ja existe

**Pros:** Controle granular por pagina, integra com auth do FeedFlow via JWT
**Contras:** Perde SSG puro (mas pode ser hibrido), precisa de runtime

### 2.C: Astro Starlight + Keystatic (CMS visual)

**Como funciona:**
- Starlight para docs
- Keystatic como admin panel para editar Markdown
- Nao-devs editam via /keystatic, conteudo vai pro Git

**Pros:** CMS visual sem infra extra, zero custo
**Contras:** Nao resolve auth de leitores

### 2.D: Fumadocs (Next.js) substituindo Starlight

**Como funciona:**
- Migrar docs para Fumadocs
- Access control via Next.js middleware (server-side)
- Blog via Next.js pages

**Pros:** Auth nativo e seguro, React-based como dashboard
**Contras:** Migracao completa, outro framework, perde Pagefind

### 2.E: Strapi/Directus + Astro (CMS headless + SSG)

**Como funciona:**
- CMS headless gerencia conteudo (docs + blog)
- Astro consome API e gera paginas (SSG com revalidacao ou SSR)
- Auth do CMS controla quem pode VER conteudo

**Pros:** CMS visual, RBAC, versionamento, API
**Contras:** Dois sistemas para manter, complexidade operacional, RAM extra

---

## 3. Tabela Comparativa — Top 8 Opcoes Viaveis

```
Criterio                | Starlight+CF  | Starlight SSR | Fumadocs    | Docusaurus  | Payload CMS | Strapi+Astro | Directus+Astro | Ghost(blog)
                        | Access        | + Auth.js     |             |             |             |              |                |
------------------------|---------------|---------------|-------------|-------------|-------------|--------------|----------------|------------
Licenca                 | MIT           | MIT           | MIT         | MIT         | MIT         | MIT          | BSL 1.1        | MIT
Controle acesso         | Path-level    | Page-level    | Page-level  | Client-side | Field-level | Field-level  | Field-level    | Tier-level
  (seguro server-side?) | SIM (infra)   | SIM           | SIM         | NAO         | SIM         | SIM          | SIM            | SIM
Blog built-in           | Plugin        | Plugin        | Via Next.js | SIM         | Template    | Precisa front| Precisa front  | SIM (core)
Busca full-text         | Pagefind      | Pagefind      | Orama       | Algolia     | Nao nativa  | Meilisearch  | Meilisearch    | Basica
CMS visual              | +Keystatic    | +Keystatic    | NAO         | NAO         | SIM         | SIM          | SIM            | SIM
Performance (LCP)       | *****         | ****          | ***         | ***         | ***         | ***          | ***            | ***
i18n nativo             | SIM (35+ lng) | SIM           | SIM         | SIM         | SIM         | SIM          | SIM            | NAO
Customizacao visual     | ****          | ****          | *****       | ****        | ****        | *****        | *****          | ***
Markdown/MDX            | SIM           | SIM           | SIM         | SIM         | Rich text   | Rich text    | Rich text      | Mobiledoc
Versionamento docs      | Via Git       | Via Git       | Via Git     | SIM (nativo)| SIM (nativo)| SIM          | SIM (nativo)   | NAO
SEO                     | *****         | ****          | ****        | ****        | ****        | ****         | ****           | ****
Migracao necessaria     | ZERO          | Minima        | Total       | Total       | Total       | Total        | Total          | N/A (so blog)
RAM extra servidor      | 0             | ~256MB        | ~512MB      | 0           | ~1-2GB      | ~2-4GB       | ~2-4GB         | ~2GB
Compatib. PostgreSQL    | N/A           | N/A           | N/A         | N/A         | SIM         | SIM          | SIM            | NAO (MySQL)
Custo                   | $0            | $0            | $0          | $0          | $0          | $0           | $0 (BSL)       | $0
Comunidade (GitHub)     | 8.2k+50k     | 8.2k+50k     | ~4k         | 58.6k       | 35k         | 66k          | 30k            | 49k
```

---

## 4. RECOMENDACAO

### Opcao Principal: STARLIGHT SSR + Auth.js + Keystatic + starlight-blog

**Arquitetura proposta:**

```
docs.feed-flow.app (Astro Starlight)
|
|-- Paginas publicas (SSG, cached Cloudflare)  --> SEO, performance maxima
|-- Paginas privadas (SSR, Auth.js middleware)  --> Clientes logados
|-- /keystatic (admin CMS)                     --> Edicao por nao-devs
|-- /blog (starlight-blog plugin)              --> Blog integrado
```

**Justificativa detalhada:**

1. **Zero migracao de conteudo:** Os MDX atuais continuam funcionando. Nao precisa reescrever nada.

2. **Controle de acesso seguro (server-side):** Com Astro SSR mode + adapter Cloudflare (ou Node), middleware intercepta requests antes de servir conteudo. O template `starlight-auth` ja resolve isso. Pode integrar com JWT do FeedFlow para single sign-on.

3. **Melhor performance:** Astro em modo hibrido permite SSG para paginas publicas (maioria) e SSR apenas para paginas que precisam de auth. Melhor Core Web Vitals do mercado.

4. **Pagefind:** A melhor busca full-text local. WASM, zero API, funciona offline. Nenhum concorrente chega perto.

5. **Keystatic para CMS:** Admin visual em /keystatic, file-based (Git-backed), zero infra extra, zero custo. Nao-devs editam conteudo, PR automatica no GitHub.

6. **Blog integrado:** Plugin starlight-blog adiciona blog sem sair do ecossistema.

7. **i18n pronto:** 35+ idiomas built-in, incluindo pt-BR. Quando precisar de EN/ES, a infra ja existe.

8. **Custo:** $0 (Cloudflare Pages free tier).

9. **RAM extra:** ~256MB se usar SSR no Hetzner, ou zero se usar Cloudflare Workers (serverless).

10. **Conhecimento existente:** Voce ja domina Astro/Starlight. Curva de aprendizado minima.

### Opcao Alternativa: FUMADOCS (Next.js)

**Quando considerar Fumadocs em vez de Starlight:**
- Se o FeedFlow dashboard migrar para Next.js no futuro
- Se precisar de customizacao extrema da UI de docs (Fumadocs e headless)
- Se o ecossistema Next.js se tornar mais estrategico

**Trade-offs:**
- Migracao completa necessaria (reescrever estrutura)
- Perde Pagefind (teria que usar Orama ou Algolia)
- Perde performance SSG pura do Astro
- Ganha: auth nativo mais robusto, React components compartilhados com dashboard

---

## 5. Plano de Implementacao (Starlight SSR + Auth.js + Keystatic)

### Fase 1: Controle de Acesso (1-2 dias)

1. Instalar adapter Cloudflare (ou Node) no Astro
2. Habilitar SSR mode hibrido (`output: 'hybrid'` no astro.config)
3. Instalar Auth.js (`@auth/astro`)
4. Configurar middleware para rotas `/private/*` ou `/guides/advanced/*`
5. Criar login page integrando com auth do FeedFlow (JWT)
6. Paginas publicas continuam SSG (`prerender: true`)

### Fase 2: CMS Visual com Keystatic (1 dia)

1. `npm install @keystatic/core @keystatic/astro`
2. Configurar `keystatic.config.ts` para collections existentes
3. Mapear content collections do Starlight para Keystatic
4. Deploy com rota `/keystatic` protegida
5. Treinar equipe para usar o admin

### Fase 3: Blog (0.5 dia)

1. Instalar `starlight-blog`
2. Configurar em `astro.config.mjs`
3. Migrar posts existentes do blog Astro custom
4. Configurar RSS feed, tags, paginacao

### Fase 4: i18n (quando necessario)

1. Habilitar locales em `starlight` config
2. Criar pasta `src/content/docs/en/` e `src/content/docs/es/`
3. Traduzir conteudo prioritario
4. Pagefind indexa automaticamente por locale

### Estimativa total: 3-4 dias de trabalho

---

## 6. Plataformas Descartadas e Motivo

| Plataforma  | Motivo da exclusao                                             |
|-------------|----------------------------------------------------------------|
| Mintlify    | SaaS proprietario, nao open-source                             |
| GitBook     | SaaS proprietario, sem self-hosted                             |
| VitePress   | Vue-based (stack e React), sem blog nativo                     |
| Ghost       | Apenas blog, MySQL obrigatorio, nao serve para docs            |
| Outline     | Wiki interno, sem SEO, sem site publico                        |
| KeystoneJS  | Comunidade menor, menos features que Payload/Strapi            |
| Directus    | Licenca BSL 1.1, complexidade operacional, RAM 2-4GB           |
| Strapi      | Complexidade operacional alta, RAM 2-4GB, precisa frontend     |
| Nextra      | Inferior ao Fumadocs em customizacao, breaking changes no v4   |

---

## Sources

- [Docusaurus Auth Issue #2769](https://github.com/facebook/docusaurus/issues/2769)
- [Docusaurus + SlashID](https://www.slashid.dev/blog/docusaurus-authentication-authorization/)
- [Mintlify OSS Program](https://www.mintlify.com/oss-program)
- [Fumadocs Access Control](https://www.fumadocs.dev/docs/guides/access-control)
- [Fumadocs Comparisons](https://www.fumadocs.dev/docs/comparisons)
- [Fumadocs vs Nextra vs Starlight 2026](https://www.pkgpulse.com/blog/fumadocs-vs-nextra-v4-vs-starlight-documentation-sites-2026)
- [Starlight Auth Starter](https://github.com/TheOtterlord/starlight-auth)
- [Starlight Private Docs Discussion #1348](https://github.com/withastro/starlight/discussions/1348)
- [Astro Authentication Guide](https://docs.astro.build/en/guides/authentication/)
- [Starlight i18n](https://starlight.astro.build/guides/i18n/)
- [Starlight Plugins](https://starlight.astro.build/resources/plugins/)
- [VitePress Auth Template](https://github.com/Com-X/vitepress-auth-template)
- [Payload CMS PostgreSQL](https://payloadcms.com/docs/database/postgres)
- [Payload CMS RAM Discussion](https://github.com/payloadcms/payload/discussions/1683)
- [Ghost Tiers](https://ghost.org/help/tiers/)
- [Directus Content Versioning](https://docs.directus.io/guides/headless-cms/content-versioning)
- [Directus Self-Hosting Requirements](https://directus.io/docs/self-hosting/requirements)
- [Strapi Self-Host Docker](https://strapi.io/blog/how-to-self-host-your-headless-cms-using-docker-compose)
- [Keystatic + Astro](https://docs.astro.build/en/guides/cms/keystatic/)
- [Cloudflare Access](https://www.cloudflare.com/sase/products/access/)
- [Outline GitHub](https://github.com/outline/outline)
- [KeystoneJS](https://keystonejs.com/)
- [Docusaurus i18n Crowdin](https://docusaurus.io/docs/i18n/crowdin)
- [Starlight vs Docusaurus - LogRocket](https://blog.logrocket.com/starlight-vs-docusaurus-building-documentation/)
