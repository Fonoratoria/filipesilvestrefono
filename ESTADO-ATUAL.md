# 🧠 ESTADO ATUAL — Site Institucional (CÉREBRO COMPARTILHADO)

> **Cline e Claude Code:** LEIAM este arquivo primeiro e ATUALIZEM ele depois de
> cada mudança. É a fonte da verdade. Funciona mesmo em chat novo sem memória.
> NÃO deixe desatualizar.

---

## 📍 ONDE O PROJETO ESTÁ AGORA (atualizado 2026-06-19)

- **No ar:** https://filipesilvestrefono.com (domínio próprio, migração concluída).
- **Hospedagem:** GitHub Pages (deploy auto a cada push). Wix já cancelado.
- **GitHub:** github.com/Fonoratoria/filipesilvestrefono.
- **Status geral:** site FINALIZADO e publicado. Só ajustes pontuais ao longo do tempo.

### ✅ O que está pronto
- index.html completo (hero, serviços, sobre, diferenciais, casos reais em vídeo,
  avaliações do Google, contato, rodapé).
- Landings `voz.html` e `disfagia.html` (usam `estilo.css`).
- LGPD: `privacidade.html` + `cookies.html` + banner de cookies (Consent Mode v2).
- SEO: `robots.txt` + `sitemap.xml` + schema LocalBusiness/MedicalBusiness.
- Rastreamento instalado: GA4 G-MN1L658BS9 + Clarity x0so945ueq + Google Ads
  AW-16875706438 (conversão "Clique WhatsApp Site" no clique de wa.me).
- Selo "5,0 no Google" no hero + botão flutuante de WhatsApp.

### ⚠️ PENDÊNCIAS / LEMBRETES
1. ~~**Especialista em Voz — reativar após 20/06/2026.**~~ ✅ **CONCLUÍDO em
   2026-06-19:** título oficial saiu no CFFa (nº **11109/26**, Especialidade Voz,
   página pública confirmada). TODOS os marcadores `ESPECIALISTA — REATIVAR APÓS
   20/06` foram ativados no index.html + voz.html. Não há mais marcador pendente.
2. Reviews automático do Google: robô pronto (`scripts/`), mas depende de chave da
   Places API com faturamento — Filipe não quis ativar. Hoje as avaliações são
   editadas manualmente em `reviews.json`.
3. (adicionar novas pendências aqui conforme surgirem)

---

## 📝 CHANGELOG — adicionar no TOPO a cada mudança
> Formato: **[AAAA-MM-DD] — [Cline ou Claude] — o que mudou (arquivos + resumo)**

- **2026-06-19 — [Claude]** — 🏅 ATIVAÇÃO DO TÍTULO DE ESPECIALISTA EM VOZ (CFFa
  nº 11109/26). O Filipe recebeu a autorização oficial (página pública no
  fonoaudiologia.org.br confirmada). Ativados TODOS os pontos que estavam
  comentados como `ESPECIALISTA — REATIVAR APÓS 20/06`. **`index.html`:** title
  ("Fonoaudiólogo Especialista em Voz em Anápolis/GO…"), meta description,
  og:title, schema JSON-LD (description + jobTitle "Fonoaudiólogo — Especialista
  em Voz (CFFa)" + `hasCredential` virou array com EducationalOccupationalCredential
  contendo identifier 11109/26 e recognizedBy CFFa), selo do hero (era `<span>`
  comentado → agora `<a class="selo-especialista">` CLICÁVEL que leva à página
  oficial do CFFa, com badge "Verificar ↗"), hero-sub ("Fonoaudiólogo especialista
  em voz, …"), texto do Sobre, 1º item da lista de Formação (`.formacao-destaque`
  com o nº do título) e card 3 de Diferenciais (título "Especialista em Voz").
  **APRIMORAMENTO de marca:** novo card `.cred-oficial` na seção Sobre — selo
  oficial verificável (degradê azul→turquesa, ícone de verificado, "TÍTULO OFICIAL
  · CFFA / Especialista em Voz / Título nº 11109/26", botão "Verificar no Conselho
  ↗" linkando o CFFa). CSS novo no `<style>` inline: link/hover do selo,
  `.selo-verificar`, `.formacao-destaque`, `.cred-oficial` + filhos + responsivo.
  **`voz.html`:** title, meta description, schema `hasCredential` (array com o
  título) e selo verificável no hero. **`estilo.css`:** selo virou link
  (hover/transition) + `.selo-verificar` + `align-self:flex-start` (pílula
  compacta, não estica). Verificado no preview: title novo, selo compacto (352px)
  clicável, card de credencial renderizando com link correto pro CFFa, Sobre/
  Formação/Diferenciais com o título, console SEM erros. Compliance CFFa mantido
  (agora PODE usar "especialista" — é título oficial). ZERO marcadores
  `REATIVAR APÓS 20/06` restantes.

- **2026-06-18 — [Claude]** — 🎨 Passe de COERÊNCIA DE MARCA (conferido contra o
  Manual de Marca oficial em `OneDrive/Desktop/Minha marca/`). (1) LOGO: o site
  usava `logo.jpg` (achatada, sem transparência) no header E no rodapé escuro
  (com gambiarra de caixa branca). Trocado: header → `logo.png` (transparente,
  texto grafite — versão `FOto sem fundo logo.png` da pasta da marca);
  rodapé → `logo-rodape.png` (transparente com texto BRANCO, gerada a partir de
  `Fundo Preto.jpeg` via PowerShell/System.Drawing, preto→transparente +
  auto-crop) — agora segue a regra do manual "fundo escuro = logo com tipografia
  branca". `.footer-logo` perdeu o `background:white`+padding. nav-logo 46→52px,
  footer 88→96px. Aplicado nas 5 páginas (index, voz, disfagia, cookies,
  privacidade) + `estilo.css`. ZERO refs a `logo.jpg`. (2) DEGRADÊ DA MARCA
  (azul→turquesa) nos CTAs de maior conversão: novo utilitário `.btn-grad`
  (hover desliza o gradiente) no CTA do hero e no CTA final de Contato; `.divisor`
  virou gradiente (era turquesa chapado), 48→56px; `.btn-whats` da triagem deixou
  de ser verde-WhatsApp aleatório e virou o gradiente da marca (index + estilo.css).
  (3) Azul OFF-BRAND corrigido: assistente de IA (`#iaf-*`) usava `#0e5a8a`;
  trocado pelo azul oficial `#006EB4` (fab, head, input focus, botão, sombra).
  FAB verde do WhatsApp (direita) mantido de propósito (convenção universal).
  Verificado no preview: header nítido sem caixa, rodapé com logo branca no escuro,
  CTA do hero com degradê, IA azul-marca, console limpo, landings 200 OK.

- **2026-06-17 — [Claude]** — Correção de marca no hero (`index.html`). A tagline
  "Vozes que ressoam" tinha virado headline; voltou a ser ASSINATURA (kicker do
  hero, no gradiente da marca) — regra do Filipe: tagline principal nunca some.
  Headline agora é de CONVERSÃO no eixo sintoma: "Sua voz firme, sem rouquidão
  nem cansaço. / Refeições sem medo. / Palavras que reconectam." Subtítulo
  recupera o diferencial domiciliar ("em casa, no consultório ou online").
  Assinatura também no rodapé. NÃO usar "Vozes que ressoam" como H1 de novo.
- **2026-06-17 — [Claude]** — Passe de UX/UI (sem mudar o sistema de design).
  `index.html`: (1) seção Contato com chips de ícone SVG da marca no lugar dos
  emojis; (2) revelação suave ao rolar (fade-up) em ~15 blocos, com fallback
  sem-JS + failsafe de 3s + respeito a prefers-reduced-motion; (3) faixa de
  credibilidade abaixo do hero (CRFa · UnB · Voxmetria · domiciliar/online);
  (4) bloco "Acompanhe no Instagram" antes do Contato; (5) menu desktop+mobile
  com "Avaliações" e "Contato". `estilo.css`: chips de contato + revelação (vale
  nas landings). `voz.html` e `disfagia.html`: chips de contato + revelação.
  Compliance CFFa mantido (sem "especialista" — só reativa em 20/06).
- **2026-06-16 — [Claude]** — Voz no eixo SINTOMA (descoberta de marketing 16/06:
  paciente busca sintoma, não especialidade). `voz.html`: meta description + og,
  subtítulo do hero e card 1 agora puxam os termos de maior busca (voz rouca,
  pigarro constante, voz falhando). `index.html`: card "Voz" da home idem.
  Compliance CFFa mantido. SEO/conteúdo só — sem mudança de layout.
- **2026-06-07 — [Claude]** — Criado o sistema de "cérebro compartilhado":
  `.clinerules` (regras p/ o Cline), `CLAUDE.md` (p/ o Claude) e este
  `ESTADO-ATUAL.md`. Objetivo: os dois assistentes lerem e atualizarem o mesmo
  estado, funcionando em chat novo sem memória. Nenhuma mudança no site em si.
