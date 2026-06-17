# 🧠 ESTADO ATUAL — Site Institucional (CÉREBRO COMPARTILHADO)

> **Cline e Claude Code:** LEIAM este arquivo primeiro e ATUALIZEM ele depois de
> cada mudança. É a fonte da verdade. Funciona mesmo em chat novo sem memória.
> NÃO deixe desatualizar.

---

## 📍 ONDE O PROJETO ESTÁ AGORA (atualizado 2026-06-07)

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
1. **Especialista em Voz — reativar após 20/06/2026:** buscar no index.html a marca
   `ESPECIALISTA — REATIVAR APÓS 20/06` (vários pontos) + adicionar o nº do título
   quando o Filipe informar. (Há lembrete remoto agendado.)
2. Reviews automático do Google: robô pronto (`scripts/`), mas depende de chave da
   Places API com faturamento — Filipe não quis ativar. Hoje as avaliações são
   editadas manualmente em `reviews.json`.
3. (adicionar novas pendências aqui conforme surgirem)

---

## 📝 CHANGELOG — adicionar no TOPO a cada mudança
> Formato: **[AAAA-MM-DD] — [Cline ou Claude] — o que mudou (arquivos + resumo)**

- **2026-06-16 — [Claude]** — Voz no eixo SINTOMA (descoberta de marketing 16/06:
  paciente busca sintoma, não especialidade). `voz.html`: meta description + og,
  subtítulo do hero e card 1 agora puxam os termos de maior busca (voz rouca,
  pigarro constante, voz falhando). `index.html`: card "Voz" da home idem.
  Compliance CFFa mantido. SEO/conteúdo só — sem mudança de layout.
- **2026-06-07 — [Claude]** — Criado o sistema de "cérebro compartilhado":
  `.clinerules` (regras p/ o Cline), `CLAUDE.md` (p/ o Claude) e este
  `ESTADO-ATUAL.md`. Objetivo: os dois assistentes lerem e atualizarem o mesmo
  estado, funcionando em chat novo sem memória. Nenhuma mudança no site em si.
