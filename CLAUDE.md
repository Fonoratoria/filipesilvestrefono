# CLAUDE.md — Site Filipe Silvestre Fonoaudiólogo

Site de captação do Filipe (Anápolis/GO), focado em **adultos** nas 3 áreas que ele atende:
voz/rouquidão, disfagia e performance comunicativa. **Não atende fono infantil.**
Objetivo único: transformar visita em lead no WhatsApp. Roda **tráfego pago**, então texto e
keyword têm regra de compliance.

> Cérebro compartilhado com o Cline: **ler @ESTADO-ATUAL.md antes e atualizar depois**
> (linha no topo do changelog: `[DATA] — [Claude] — o que mudou`). O Cline lê o `.clinerules`.

## Stack

HTML/CSS/JS puro, **sem build e sem package.json**. `index.html` (~3.086 linhas) tem CSS e JS
**inline**, em ES5 (`var`/IIFE, zero framework). `voz.html` e `disfagia.html` usam
`estilo.css`. Fontes: Sora + Inter (Google Fonts, carregamento não-bloqueante).
Único código Node: `scripts/fetch-google-reviews.mjs`, que roda só no GitHub Actions.

## Publicar

`git add . && git commit -m "..." && git push` na `main` → **GitHub Pages publica sozinho em
~1 min**. Não há workflow de build. Domínio próprio via `CNAME` = `filipesilvestrefono.com`.
Atualize o `ESTADO-ATUAL.md` antes do commit.

- Produção: https://filipesilvestrefono.com
- Repo: https://github.com/Fonoratoria/filipesilvestrefono — **PÚBLICO**
- Rastreamento: GA4 `G-MN1L658BS9` · Google Ads `AW-16875706438`

## 🔴 WhatsApp — CONFERIR ANTES DE MEXER

O código usa `wa.me/556298814511` em **32 links + a variável `var WA`**. Isso é
`(62) 9881-4511`, **8 dígitos**. A memória `whatsapp-filipe` diz que o número correto é
**(62) 99881-4511** → `5562998814511`, **9 dígitos** (padrão de celular brasileiro).

**Não altere por conta própria e não confie no código nem neste arquivo — pergunte ao Filipe.**
Cada clique errado é um lead pago perdido: o site não tem formulário, e a conversão do Google
Ads dispara exatamente nesse link.

## Regras de negócio

- **Conversão = clique no WhatsApp. Não existe formulário e não deve existir.** O evento que
  conta lead de verdade é `whatsapp_click` no GA4.
- O site **não dá diagnóstico**: a triagem é educativa e o assistente de IA é instruído a não
  diagnosticar nem prescrever.
- **Especialista em Voz (CFFa nº 11109/26) é título oficial e pode ser usado** — sempre como
  "verificável no cadastro do Conselho", nunca como "único especialista". Disfagia e
  Linguagem são **pós-graduação**: escreva "Pós-graduado em", nunca "Especialista em".
- Dados oficiais: CRFa 5-13357 · CNPJ 60.994.445/0001-66 · @filipesilvestrefono ·
  atendimento domiciliar/online em Anápolis-GO, **sem endereço fixo público**.
- Anúncio de voz aponta para `/voz.html`; de disfagia, para `/disfagia.html`.

## Armadilhas — o que NÃO fazer

- ⛔ **Palavras proibidas no site:** "melhor", "100%", "cura", "garantido", "único",
  "milagre", "avaliação gratuita". Use: especializado, experiente, humanizado,
  individualizado. É compliance do CFFa — texto irregular expõe o registro do Filipe.
- ⛔ **Em keyword/anúncio do Google Ads, não usar "fonoaudiólogo"/"fonoaudiológico" junto de
  termo clínico** — use "fono" ou "fonoaudiologia". É gatilho de reprovação da política
  *Health in Personalized Advertising*.
- ⛔ **Não assumir que editar o CSS do index vale para as landings** (e vice-versa). O visual
  vive em 2 lugares independentes e **já divergiram**. Mudança de aparência vai nos dois.
- ⛔ **Não abrir texto com nome de doença.** Sintoma primeiro, causa depois e em lista
  ABERTA. Listar "idosos e pós-AVC" exclui quem tem disfagia por cabeça e pescoço,
  Parkinson, demência, pós-intubação ou pela idade — e essa pessoa fecha a página. Regra
  dita pelo Filipe em 12/08/2026, ao revisar o hero. Vale para card, título e porta de
  entrada; meta/og/schema podem citar a doença.
- ⛔ **Não colocar "antes e depois" em legenda de vídeo** (nem de voz, nem de imagem). É
  regra do `DESIGN.md` que já ficou meses furada no site — limpo em 12/08/2026.
- ⚠️ **A primeira tela do celular é decidida pela FOTO, não pelo texto.** `.hero-foto` com
  `aspect-ratio` alto (era 3/4) vira 520px num aparelho de 390px e joga o CTA para fora.
  Antes de mexer no hero, ler `receita-primeira-tela-celular-converte` na memória.
- ⚠️ **As landings não têm banner de cookies** — só respeitam a escolha feita no index.
  Quem entra por anúncio direto em `/voz.html` nunca consente, o Consent Mode fica negado e
  o lead não é contado pelo Ads. Achado de 12/08/2026, ainda **não** consertado.
- ⛔ **Não transformar a tagline "Vozes que ressoam" em H1/headline.** É assinatura (kicker do
  hero e rodapé). Já aconteceu e teve que ser revertido.
- ⛔ **Cores e fontes travadas:** Azul `#006EB4`, Turquesa `#46C8BE`, Grafite `#141414`, bg
  `#F5FAFC`; Sora (títulos) + Inter (corpo). Proibida fonte serifada ou manuscrita.
- ⛔ **Não ligar os secrets do robô de avaliações sem avisar que ele APAGA a curadoria
  manual.** Ele reescreve o `reviews.json` do zero com no máximo 6 depoimentos da API e dá
  commit+push sozinho — os 10 escolhidos a mão somem sem aviso.
- ⛔ **Não "consertar" o rastreamento** (gtag / Consent Mode / listener de `wa.me`) por causa
  de relatório mostrando poucos leads. O código já foi auditado ao vivo e está correto; o
  subregistro tem causa externa (quem recusa cookie não é contado, e uma das campanhas leva
  ao WhatsApp sem abrir o site).
- ⛔ **Não perseguir pontos de PageSpeed nem mexer na foto do hero por LCP.** Já está no teto
  do que o GitHub Pages permite; o resto só migrando de hospedagem.
- ⚠️ **Ignore o comentário no topo do `index.html` que manda "reativar Especialista em Voz
  após 20/06".** Está obsoleto e mente sobre o estado do arquivo — quem obedecer vai procurar
  marcador que não existe ou duplicar conteúdo que já está no ar.
- ⚠️ **`logo.jpg` não é ativo do site** — é a logo antiga, com zero referências. As boas são
  `logo.png` e `logo-rodape.png`.

## 🔴 Segurança — o repo é PÚBLICO

- **O token do assistente de IA e o endpoint do Apps Script estão em texto puro dentro do
  HTML** que qualquer visitante baixa. Trate como público: nunca mande dado de paciente por
  esse widget.
- **Confira o que entra no stage antes de commitar** — já houve arquivo pessoal versionado
  aqui. O que entra no repo público fica no histórico do git mesmo depois de apagado.
