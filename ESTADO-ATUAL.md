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

- **2026-06-22 — [Claude]** — ✍️ `disfagia.html`: o item "Exercícios iniciais"
  virou "Exercícios, técnicas e manobras de deglutição" (pedido do Filipe). Decisão:
  "manobras" (de deglutição — Mendelsohn, esforço, supraglótica) fica JUNTO dos
  exercícios (núcleo da terapia), não na linha de aparelhos/tosse. A linha-guarda-
  chuva de recursos complementares ficou inalterada.

- **2026-06-22 — [Claude]** — ⚡ Refinei a menção de recursos na `disfagia.html`:
  o `<li>` de eletroestimulação virou uma LINHA GUARDA-CHUVA (escolha do Filipe):
  "Recursos complementares, quando indicados: eletroestimulação (TENS/FES),
  estimulação tátil-vibratória, bandagem elástica e técnicas para fortalecer a
  tosse". Decisão: NÃO listar aparelho-por-aparelho (protege a marca humanizada e
  o compliance); "ambu" foi traduzido p/ "técnicas para fortalecer a tosse"
  (empilhamento de ar/tosse assistida) — linguagem de paciente, não de colega.
  Massageador→"estimulação tátil-vibratória". Formação (index) mantém só o item de
  eletroestimulação como credencial; vibração/bandagem/tosse NÃO entraram na Formação.

- **2026-06-22 — [Claude]** — ⚡ ELETROESTIMULAÇÃO (TENS/FES) adicionada ao site,
  de forma DISCRETA (pedido do Filipe: "sem destaque demais, normal"). 3 pontos:
  (1) `index.html` → novo `<li>` na lista de Formação: "Eletroestimulação aplicada
  à fonoaudiologia (TENS e FES)" (entre "Ministrante de treinamentos…" e
  "Aprimoramentos contínuos…"); (2) `disfagia.html` → novo `<li>` no "Como funciona":
  "Eletroestimulação (TENS/FES) como apoio à reabilitação, quando indicada" (deixa
  claro o uso clínico criterioso); (3) `index.html` schema JSON-LD `knowsAbout`
  ganhou "Eletroestimulação (TENS e FES)" (invisível, só SEO). NÃO mexi em
  hero/título/selos. Compliance CFFa OK (sem superlativo; "quando indicada" = honesto).

- **2026-06-20 — [Claude]** — 📱 REVISÃO UX MOBILE do `index.html` (regra de ouro:
  NADA removido, só reorganizado/espaçado). Tudo em 2 blocos ADITIVOS no fim do
  `<style>` (`@media max-width:768px`) → sobrepõem sem editar regras existentes,
  fácil de reverter. DESKTOP intacto (verificado em 1280px: cards row, headers
  centralizados, legenda do hero como pílula). Mudanças: (1) ESPAÇO: `--secao-h`
  20→22px, `--secao-v` 64→72px, gaps dos grids 16→20px. (2) TIPOGRAFIA: corpo de
  leitura ≥16px (`.servico-texto` 15→16, `.diferencial-texto` 14→16, `.contato-valor`,
  `.horario-texto`), rodapé 13→14. (3) AGRUPAMENTO/respiro: padding interno dos cards
  reduzido (servico 40/32→28/22, diferencial 36→26/22) p/ o texto ganhar largura;
  `.diferencial-card` vira `flex-direction:column` (número EM CIMA → texto na largura
  toda, acaba a quebra excessiva tipo "Anamnese clínica,"/"avaliação perceptivo-").
  (4) TOQUE: `.servico-link` ganha padding (alvo maior, os 2 links deixam de ficar
  colados); links do rodapé com padding. (5) ALINHAMENTO: cabeçalhos de seção à
  ESQUERDA no mobile (servicos, diferenciais, casos, avaliacoes, avaliacao-vocal,
  triagem) — fim do "parágrafo longo centralizado", igual à seção Sobre que já lia
  melhor. ⚠️ A triagem é definida DEPOIS do bloco principal → precisou de um 2º
  mini-bloco no fim do CSS p/ vencer (já feito). Hero: a legenda local
  (`#hero .secao-label`) deixa de ser 2ª pílula maiúscula e vira legenda leve cinza
  (menos poluição no topo; texto/SEO mantidos). Verificado no preview mobile (hero,
  serviços, diferenciais, triagem, rodapé) + console sem erros.

- **2026-06-20 — [Claude]** — 🔎 SEO LOCAL (após Search Console no ar mostrar:
  2º lugar em "fonoaudiólogo"/"fonoaudiologia" com 0 cliques, e 14º em
  "fonoaudiologia anápolis"). Diagnóstico: site JÁ bem otimizado on-page (19 menções
  a Anápolis, cidade no title/desc); gargalo do 14º é AUTORIDADE/off-page (domínio
  novo, poucos backlinks), não conteúdo. Ajustes de baixo risco no `index.html`:
  (1) `meta description` reescrita (146 chars, não corta) com a frase exata
  "Fonoaudiologia em Anápolis/GO" + foco voz/disfagia + CTA "Agende pelo WhatsApp";
  (2) `.secao-label` do hero: "Anápolis/GO · …" → "Fonoaudiologia em Anápolis/GO · …"
  (termo exato visível acima do H1). NÃO mexi no `<title>` de propósito (já ranqueia
  2º em "fonoaudiólogo" — não estragar o que funciona). Verificado por eval (texto +
  146 chars, console sem erros). MAIOR alavanca recomendada = Perfil do Google/Maps
  (próximo passo com o Filipe), depois diretórios (Doctoralia/BoaConsulta) e seguir
  juntando avaliações. Volume ainda pequeno (~55 impressões/28d).

- **2026-06-20 — [Claude]** — 📊 NÚMERO DE PROVA SOCIAL "+3.000 atendimentos
  realizados" no `index.html`. Adicionado como DESTAQUE (bloco `.cred-destaque`:
  `.cred-num` 44px Sora 800 azul `#006EB4` + `.cred-num-label`) no TOPO da faixa
  `.credibilidade` (logo abaixo do hero), acima das credenciais que já existiam
  (CRFa · UnB · Voxmetria · Domiciliar/online). Decisões com o Filipe: (1) é
  ATENDIMENTOS (sessões), não pacientes — na fono o mesmo paciente volta muito;
  (2) usar "+3.000" (piso honesto, número dele); (3) NÃO mostrar tempo de
  experiência (só 3 anos de formado → evitar ar de recém-formado); (4) NÃO repetir
  "5,0 no Google" porque já tem selo no hero → o número fica acompanhado das
  credenciais, não solto. CSS responsivo (44→34px no mobile). Verificado no preview
  desktop + mobile: número azul Sora, faixa coesa, credenciais reembrulham em 2
  linhas no celular. Compliance CFFa OK (fato objetivo de experiência, sem
  superlativo). As landings `voz.html`/`disfagia.html` NÃO têm essa faixa.

- **2026-06-19 — [Claude]** — 🎨 ARTE "ESPECIALISTA EM VOZ" (post Instagram
  1080x1350) criada e GUARDADA. Molde editável: **`_arte-especialista.html`** na
  raiz do repo (prefixo `_` → Jekyll NÃO publica; tem no topo o comando do Chrome
  headless pra re-exportar + dicas de Stories/trocar foto). Usa a foto
  `fotos do site/Foto elegante sentado na cadera de blaser.jpg` (1066px — renderizar
  em scale 1 p/ rosto nítido; só usar scale 2 com foto de alta resolução). PNG final
  guardado em 2 lugares: `fotos do site/arte-especialista-voz.png` (repo, p/ uso no
  site) e no Drive `04_MARKETING/Instagram e site/2026-06-19_post-especialista-em-voz.png`.
  Marca: logo grafite (fundo claro), degradê azul→turquesa no badge/risco, CRFa
  correto, nº do título 11109/26.

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
