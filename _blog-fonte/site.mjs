// =====================================================================================
//  O QUE É DESTE SITE no blog (clínica · filipesilvestrefono.com).
//  O motor (`montar.mjs`) é igual nos dois sites; aqui mora o visual, o menu, a medição e
//  as chamadas. Cabeçalho, rodapé, aviso de cookies e medição foram COPIADOS da `voz.html`
//  (08/10/2026) — se mudarem lá, mudar aqui também e rodar a montagem de novo.
//
//  ⛔ Cor só as 3 do DESIGN.md (azul, turquesa, grafite) + branco. Degradê só azul→turquesa.
//  ⛔ Sombra só em estado de toque/hover. Card parado = borda de 1px.
// =====================================================================================

import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import { fileURLToPath } from 'node:url';

// carimbo de versão nos .css (?v=): sem ele o celular de quem já visitou segue com o estilo velho guardado
const AQUI_SITE = path.dirname(fileURLToPath(import.meta.url));
const carimboDe = (s) => crypto.createHash('md5').update(s).digest('hex').slice(0, 8);
const CSS = `/* blog.css — GERADO pelo _blog-fonte/site.mjs (não editar aqui). Usa os tokens do estilo.css. */
.blog-main{max-width:1100px;margin:0 auto;padding:24px var(--secao-h) 64px}
.artigo{max-width:720px;margin:0 auto}
.migalhas{font-size:14px;color:var(--cinza-suave);margin:8px 0 24px}
.migalhas a{color:var(--azul)}
.migalhas a:hover{text-decoration:underline}
.art-topo{margin-bottom:24px}
.art-cat,.cartao-cat,.blog-kicker{display:inline-block;font:600 12px Inter,sans-serif;letter-spacing:.06em;text-transform:uppercase;color:var(--azul);border:1px solid rgba(0,110,180,.3);border-radius:9999px;padding:4px 12px}
.art-topo h1{font:800 36px/1.18 Sora,sans-serif;color:var(--grafite);margin:16px 0 12px;letter-spacing:-.01em}
.art-meta{font-size:14px;color:var(--cinza-suave);line-height:1.5}
.art-meta strong{color:var(--grafite);font-weight:600}
.art-corpo{font-size:18px;line-height:1.7;color:var(--cinza-texto)}
.art-corpo>p,.art-corpo>ul,.art-corpo>ol,.faq-item p{margin:0 0 16px}
.art-corpo h2{font:700 26px/1.25 Sora,sans-serif;color:var(--grafite);margin:40px 0 16px;scroll-margin-top:88px}
.art-corpo h3{font:700 18px/1.35 Sora,sans-serif;color:var(--grafite);margin:24px 0 8px}
.art-corpo strong{color:var(--grafite);font-weight:600}
.art-corpo a{color:var(--azul);text-decoration:underline;text-underline-offset:3px}
.art-corpo ul,.art-corpo ol{padding-left:24px}
.art-corpo li{margin:0 0 8px}
.art-corpo li::marker{color:var(--turquesa)}
.destaque{border-left:4px solid var(--turquesa);background:var(--bg-suave);border-radius:0 6px 6px 0;padding:16px 24px;margin:24px 0}
.destaque p{margin:0;color:var(--grafite)}
.sumario{border:1px solid rgba(0,110,180,.16);border-radius:6px;padding:16px 24px;margin:24px 0 32px;background:var(--branco)}
.sumario-tit{font:600 14px Sora,sans-serif;color:var(--grafite);margin:0 0 8px}
.sumario ol{margin:0;padding-left:20px;font-size:16px;line-height:1.5}
.sumario li{margin:4px 0}
.sumario a{color:var(--azul);text-decoration:none}
.sumario a:hover{text-decoration:underline}
.cta-meio{border:1px solid rgba(0,110,180,.18);background:var(--bg-suave);border-radius:8px;padding:24px;margin:32px 0}
.cta-meio p{margin:0 0 16px;font-size:16px;line-height:1.6}
.cta-meio .cta-meio-tit{font:700 18px/1.35 Sora,sans-serif;color:var(--grafite);margin-bottom:8px}
.cta-btn{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(90deg,var(--azul),var(--turquesa));color:#fff!important;text-decoration:none!important;font:600 16px Inter,sans-serif;padding:12px 24px;border-radius:9999px;min-height:48px;transition:transform .2s,box-shadow .2s}
.cta-btn:hover{transform:translateY(-1px);box-shadow:0 8px 24px rgba(0,110,180,.25)}
.cta-btn .ico-whatsapp{fill:currentColor}
.faq{border-top:1px solid rgba(0,110,180,.14);margin-top:40px;padding-top:8px}
.faq-item{border-bottom:1px solid rgba(0,110,180,.10);padding:8px 0}
.faq-item h3{margin:16px 0 8px}
.art-autor{display:flex;gap:16px;align-items:flex-start;border:1px solid rgba(0,110,180,.16);border-radius:8px;padding:24px;margin:40px 0 24px}
.art-autor img{width:72px;height:72px;border-radius:50%;object-fit:cover;flex-shrink:0}
.art-autor p{margin:0;font-size:14px;line-height:1.55;color:var(--cinza-texto)}
.art-autor .art-autor-nome{font:700 18px Sora,sans-serif;color:var(--grafite);margin-bottom:4px}
.art-autor .art-autor-cred{color:var(--azul);font-weight:600;margin-bottom:8px}
.art-autor a{color:var(--azul);text-decoration:underline}
.cta-fim{background:linear-gradient(120deg,var(--azul),var(--turquesa));color:#fff;border-radius:8px;padding:40px 24px;margin:24px 0;text-align:center}
.cta-fim h2{font:800 26px/1.25 Sora,sans-serif;margin:0 0 12px;color:#fff}
.cta-fim p{font-size:16px;line-height:1.6;max-width:560px;margin:0 auto 24px;opacity:.95}
.cta-fim-botoes{display:flex;flex-wrap:wrap;gap:16px;justify-content:center;align-items:center}
.cta-btn-claro{background:#fff;color:var(--azul)!important}
.cta-btn-claro .ico-whatsapp{fill:var(--azul)}
.cta-link{color:#fff;font-weight:600;text-decoration:underline;text-underline-offset:3px}
.art-aviso{font-size:14px;color:var(--cinza-suave);line-height:1.6;margin:16px 0 0}
.relacionados{max-width:1100px;margin:64px auto 0}
.relacionados>h2,.cat-topo h2{font:800 26px Sora,sans-serif;color:var(--grafite);margin:0 0 16px}
.grade{display:grid;grid-template-columns:repeat(auto-fill,minmax(280px,1fr));gap:24px}
.cartao{display:flex;flex-direction:column;gap:8px;border:1px solid rgba(0,110,180,.16);border-radius:8px;padding:0 0 24px;background:var(--branco);overflow:hidden;transition:box-shadow .2s,transform .2s,border-color .2s}
.cartao>*:not(img){margin-left:24px;margin-right:24px}
.cartao img{width:100%;height:auto;aspect-ratio:1200/630;object-fit:cover;margin-bottom:8px}
.cartao:not(:has(img)){padding-top:24px}
.cartao:hover{box-shadow:var(--sombra);transform:translateY(-2px);border-color:rgba(0,110,180,.3)}
.cartao-cat{align-self:flex-start}
.cartao-tit{font:700 18px/1.35 Sora,sans-serif;color:var(--grafite);margin-top:4px}
.cartao-res{font-size:16px;line-height:1.55;color:var(--cinza-texto)}
.cartao-min{font-size:14px;color:var(--cinza-suave);margin-top:auto}
.ver-todos{margin:24px 0 0}
.ver-todos a{color:var(--azul);font-weight:600}
.blog-hero{max-width:760px;padding:40px 0 24px}
.blog-hero h1{font:800 48px/1.1 Sora,sans-serif;color:var(--grafite);margin:16px 0;letter-spacing:-.015em}
.blog-sub{font-size:18px;line-height:1.65;color:var(--cinza-texto);margin:0 0 16px}
.blog-assina{font-size:14px;color:var(--azul);font-weight:600;margin:0 0 24px}
.chips{display:flex;flex-wrap:wrap;gap:8px}
.chip{border:1px solid var(--azul);color:var(--azul);border-radius:9999px;padding:8px 16px;font-weight:600;font-size:14px;transition:background .2s,color .2s}
.chip:hover{background:var(--azul);color:#fff}
.cat-bloco{margin:48px 0;scroll-margin-top:88px}
.cat-topo{margin-bottom:24px;max-width:720px}
.cat-topo p{font-size:16px;line-height:1.6;color:var(--cinza-texto);margin:0}
.cta-fim-indice{margin-top:64px}
.nav-links a.nav-ativo{color:var(--azul)}
@media (max-width:768px){
  .blog-main{padding:16px var(--secao-h) 48px}
  .art-topo h1{font-size:26px}
  .blog-hero{padding:24px 0 8px}
  .blog-hero h1{font-size:36px}
  .art-corpo{font-size:18px}
  .art-corpo h2{font-size:22px;margin-top:32px}
  .cta-fim{padding:32px 16px}
  .cta-fim h2,.relacionados>h2,.cat-topo h2{font-size:22px}
  .art-autor{padding:16px}
  .grade{grid-template-columns:1fr;gap:16px}
}
`;
const VER_BLOG = carimboDe(CSS);
const VER_ESTILO = carimboDe(fs.readFileSync(path.join(AQUI_SITE, '..', 'estilo.css')));

const DOMINIO = 'https://filipesilvestrefono.com';
const WA = 'https://wa.me/5562998814511?text=';
const wa = (msg) => WA + encodeURIComponent(msg);
const CFFA = 'https://fonoaudiologia.org.br/especialista/filipe-silva-silvestre-de-paiva/';

const ICO_WA = '<svg class="ico-whatsapp" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>';

// mensagem do WhatsApp: a palavra "voz" ou "engolir" é o que o listener usa pra contar o lead por serviço
const msgDe = (art) => (art && art.categoria === 'Disfagia'
  ? `Olá Filipe! Li no blog o texto "${art.titulo}" e quero conversar sobre a dificuldade para engolir.`
  : art
    ? `Olá Filipe! Li no blog o texto "${art.titulo}" e quero conversar sobre a minha voz.`
    : 'Olá Filipe! Vim pelo blog e quero agendar uma avaliação.');

const MEDICAO = `<script>
  window.GADS_ID = 'AW-16875706438';
  window.GADS_CONVERSAO = 'HIp0CN2uzKMcEMaw--4-';
  window.GA4_ID = 'G-MN1L658BS9';
</script>
<script>
  (function () {
    var id = window.GADS_ID;
    if (!id) return;
    var s = document.createElement('script');
    s.async = true;
    s.src = 'https://www.googletagmanager.com/gtag/js?id=' + encodeURIComponent(id);
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    var consentido = false;
    try { consentido = localStorage.getItem('cookieConsent') === 'aceito'; } catch (e) { console.warn('[cookies] localStorage indisponível:', e); }
    gtag('consent', 'default', {
      'ad_storage':         consentido ? 'granted' : 'denied',
      'ad_user_data':       consentido ? 'granted' : 'denied',
      'ad_personalization': consentido ? 'granted' : 'denied',
      'analytics_storage':  consentido ? 'granted' : 'denied'
    });
    gtag('js', new Date());
    gtag('config', id);
    if (window.GA4_ID) gtag('config', window.GA4_ID);
  })();
</script>`;

const FONTES = `<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link rel="preconnect" href="https://www.googletagmanager.com">
<link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap" media="print" onload="this.media='all'">
<noscript><link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Sora:wght@400;600;700;800&family=Inter:wght@400;500;600&display=swap"></noscript>
<link rel="stylesheet" href="/estilo.css?v=${VER_ESTILO}">
<link rel="stylesheet" href="/blog/blog.css?v=${VER_BLOG}">
<script type="text/javascript">(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y)})(window,document,"clarity","script","x0so945ueq");</script>`;

function cabeca({ titulo, descricao, url, imagem, tipo, MARCA, esc, extra = '', servico = '' }) {
  return `<!DOCTYPE html>
<html lang="pt-BR">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
${MARCA}
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(descricao)}">
<meta name="robots" content="index, follow, max-image-preview:large">
<meta name="author" content="Filipe Silvestre">
<meta name="theme-color" content="#006EB4">
<link rel="canonical" href="${url}">
<meta name="geo.region" content="BR-GO">
<meta name="geo.placename" content="Anápolis, Goiás">
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="alternate" type="application/rss+xml" title="Blog do Filipe Silvestre" href="${DOMINIO}/blog/feed.xml">
<meta property="og:title" content="${esc(titulo)}">
<meta property="og:description" content="${esc(descricao)}">
<meta property="og:type" content="${tipo}">
<meta property="og:locale" content="pt_BR">
<meta property="og:url" content="${url}">
<meta property="og:image" content="${imagem}">
<meta property="og:site_name" content="Filipe Silvestre Fonoaudiólogo">
<meta name="twitter:card" content="summary_large_image">
${MEDICAO}
${FONTES}
${extra}
</head>
<body class="pg-blog"${servico ? ` data-servico="${servico}"` : ''}>
${topo()}`;
}

function topo() {
  const ag = wa('Olá Filipe! Vim pelo blog e quero agendar uma avaliação.');
  return `<header>
  <nav>
    <a href="/" class="nav-marca" aria-label="Filipe Silvestre — Fonoaudiólogo">
      <img src="/logo.png" alt="Filipe Silvestre Fonoaudiólogo" class="nav-logo" width="56" height="46">
    </a>
    <ul class="nav-links">
      <li><a href="/">Início</a></li>
      <li><a href="/voz.html">Voz</a></li>
      <li><a href="/disfagia.html">Disfagia</a></li>
      <li><a href="/blog/" class="nav-ativo">Blog</a></li>
      <li><a href="${ag}" class="nav-cta nav-cta-desktop">Agendar</a></li>
    </ul>
    <button class="nav-menu-btn" aria-label="Abrir menu" onclick="toggleMenu()">
      <span></span><span></span><span></span>
    </button>
  </nav>
  <div class="nav-mobile-drawer" id="navDrawer">
    <a href="/" onclick="toggleMenu()">Início</a>
    <a href="/voz.html" onclick="toggleMenu()">Voz</a>
    <a href="/disfagia.html" onclick="toggleMenu()">Disfagia</a>
    <a href="/blog/" onclick="toggleMenu()">Blog</a>
    <a href="${ag}" class="nav-cta-mobile">Agendar pelo WhatsApp</a>
  </div>
</header>`;
}

function rodape(art) {
  return `<footer>
  <img src="/logo-rodape.png" alt="Filipe Silvestre Fonoaudiólogo" class="footer-logo" loading="lazy">
  <div class="footer-links">
    <a href="/">Início</a>
    <a href="/voz.html">Voz</a>
    <a href="/disfagia.html">Disfagia</a>
    <a href="/blog/">Blog</a>
    <a href="/privacidade.html">Política de Privacidade</a>
    <a href="/cookies.html">Política de Cookies</a>
  </div>
  <p>© 2026 Filipe Silvestre Fonoaudiologia | CNPJ 60.994.445/0001-66 | CRFa 5-13357</p>
</footer>

<a class="whats-fab" href="${wa(msgDe(art))}" aria-label="Fale no WhatsApp">${ICO_WA.replace(' class="ico-whatsapp"', '')}</a>

<div id="cookie-banner" role="dialog" aria-label="Aviso de cookies">
  <p>Usamos cookies para medir resultados de anúncios. Você escolhe. <a href="/cookies.html">Política de Cookies</a>.</p>
  <div class="ck-botoes">
    <button type="button" class="ck-rejeitar" onclick="cookieConsent(false)">Rejeitar</button>
    <button type="button" class="ck-aceitar" onclick="cookieConsent(true)">Aceitar</button>
  </div>
</div>
<script>
  (function () {
    var escolha = null;
    try { escolha = localStorage.getItem('cookieConsent'); } catch (e) { console.warn('[cookies] localStorage indisponível:', e); }
    if (!escolha) {
      var b = document.getElementById('cookie-banner');
      if (b) { b.classList.add('mostrar'); document.body.classList.add('ck-aberto'); }
    }
  })();
  function cookieConsent(aceitou) {
    try { localStorage.setItem('cookieConsent', aceitou ? 'aceito' : 'rejeitado'); } catch (e) { console.warn('[cookies] localStorage indisponível:', e); }
    if (aceitou && typeof gtag === 'function') {
      gtag('consent', 'update', {
        'ad_storage':'granted','ad_user_data':'granted','ad_personalization':'granted','analytics_storage':'granted'
      });
    }
    var b = document.getElementById('cookie-banner'); if (b) b.classList.remove('mostrar');
    document.body.classList.remove('ck-aberto');
  }
  function toggleMenu() {
    var d = document.getElementById('navDrawer');
    if (d) d.classList.toggle('aberto');
  }
  document.addEventListener('click', function (e) {
    var header = document.querySelector('header');
    var d = document.getElementById('navDrawer');
    if (header && d && !header.contains(e.target)) d.classList.remove('aberto');
  });
  // Google Ads: clique no WhatsApp conta como "Clique WhatsApp Site" (mesmo listener das landings)
  if (!window.__convWhatsAtiva) {
    window.__convWhatsAtiva = true;
    document.addEventListener('click', function (e) {
      var a = e.target.closest ? e.target.closest('a[href*="wa.me"]') : null;
      if (!a || typeof window.gtag !== 'function') return;
      var msg = '';
      try { msg = decodeURIComponent((a.href.split('text=')[1] || '')).toLowerCase(); } catch (x) { console.warn('[whats] texto do link ilegível:', x); }
      // no blog o assunto vem da categoria do texto (o título pode ter "fala" e enganar o teste por palavra)
      var servico = document.body.getAttribute('data-servico') || (/disfagia|degluti|engolir/.test(msg) ? 'disfagia'
                  : /comunica|fala|linguagem/.test(msg) ? 'comunicacao'
                  : /voz|vocal/.test(msg)               ? 'voz'
                  : 'agendar');
      gtag('event', 'whatsapp_click', { servico: servico, origem: 'blog' });
      if (window.GADS_CONVERSAO && window.GADS_ID) {
        gtag('event', 'conversion', { send_to: window.GADS_ID + '/' + window.GADS_CONVERSAO });
      }
    });
  }
</script>
</body>
</html>
`;
}

const CATEGORIAS = [
  {
    id: 'Voz',
    ancora: 'voz',
    titulo: 'Voz',
    sub: 'Rouquidão, pigarro, voz cansada e os cuidados de quem vive da voz: na sala de aula, no púlpito, no palco e no atendimento.',
    pagina: { href: '/voz.html', txt: 'Como é a avaliação de voz' },
    ordem: ['rouquidao-que-nao-passa', 'nodulo-nas-cordas-vocais', 'polipo-nas-cordas-vocais', 'voz-de-professor',
      'voz-de-pastor-e-pregador', 'voz-cansada-depois-de-cantar', 'voz-cansada-de-quem-fala-o-dia-todo', 'refluxo-e-rouquidao',
      'voz-do-idoso', 'rouquidao-depois-da-intubacao', 'pigarro-na-garganta', 'perda-de-voz-repentina', 'aquecimento-vocal', 'gengibre-mel-e-a-voz'],
  },
  {
    id: 'Disfagia',
    ancora: 'engolir',
    titulo: 'Engolir com segurança',
    sub: 'Engasgos, tosse ao comer, remédio que não desce e o cuidado em casa, seja qual for a causa.',
    pagina: { href: '/disfagia.html', txt: 'Como é a avaliação para engolir' },
    ordem: ['engasgo-no-idoso', 'pneumonia-aspirativa', 'dificuldade-para-engolir-depois-do-avc', 'parkinson-demencia-e-engolir',
      'dificuldade-de-engolir-comprimido', 'fonoaudiologo-em-casa-anapolis'],
  },
];
const nomeCat = (id) => (CATEGORIAS.find((c) => c.id === id) || { titulo: id }).titulo;

function caixaAutor() {
  return `<aside class="art-autor" aria-label="Quem escreveu">
  <img src="/foto-sobre.jpg" alt="Filipe Silvestre, fonoaudiólogo" width="72" height="72" loading="lazy">
  <div>
    <p class="art-autor-nome">Filipe Silvestre</p>
    <p class="art-autor-cred">Fonoaudiólogo especialista em Voz (título CFFa nº 11109/26) · Pós-graduado em Disfagia · CRFa 5-13357</p>
    <p class="art-autor-bio">Atendo adultos e idosos em casa, em Anápolis/GO, e online. São mais de 3.000 atendimentos realizados. <a href="${CFFA}" target="_blank" rel="noopener">Verificar o título no Conselho</a>.</p>
  </div>
</aside>`;
}

function cartao(a, esc, nivel = 'h3') {
  const img = a.temCapa ? `<img src="/blog/${a.slug}/capa.jpg" alt="" width="1200" height="630" loading="lazy">` : '';
  return `<a class="cartao" href="/blog/${a.slug}/">${img}<span class="cartao-cat">${esc(nomeCat(a.categoria))}</span><${nivel} class="cartao-tit">${esc(a.titulo)}</${nivel}><span class="cartao-res">${esc(a.resumo)}</span><span class="cartao-min">${a.minutos} min de leitura</span></a>`;
}

export default {
  dominio: DOMINIO,
  nomeBlog: 'Blog do Filipe Silvestre · Voz e deglutição',
  descricaoBlog: 'Textos sobre rouquidão, cuidados com a voz e dificuldade para engolir, escritos pelo fonoaudiólogo Filipe Silvestre, especialista em Voz, em Anápolis/GO.',
  dataPadrao: '2026-10-08',
  capaPadrao: `${DOMINIO}/foto-hero.jpg`,
  categorias: CATEGORIAS,

  // ⛔ compliance do Conselho (CLAUDE.md do site). Erro = a montagem para.
  proibidas: [
    { re: /\bcur(a|ar|ou|ado|ada|ados|adas|ável)\b/i, porque: 'promessa de cura (CFFa)' },
    { re: /garantid|garantia/i, porque: 'promessa (CFFa)' },
    { re: /100\s?%/, porque: 'promessa (CFFa)' },
    { re: /milagr/i, porque: 'promessa (CFFa)' },
    { re: /avalia[çc][ãa]o gratuita/i, porque: 'CFFa' },
    { re: /antes e depois/i, porque: 'DESIGN.md: nada de antes/depois' },
    { re: /especialista em (disfagia|degluti|linguagem|motricidade)/i, porque: 'ele é especialista SÓ em Voz' },
    { re: /\b(o|a) melhor (fono|profissional|tratamento|clínica)/i, porque: 'superlativo (CFFa)' },
    { re: /\b(o|a) únic[oa] (fono|especialista|profissional)/i, porque: '"único" (CFFa)' },
    { re: /vozes que ressoam/i, porque: 'tagline não vai no texto' },
    { re: /\bcrian[çc]a/i, porque: 'o site é só de adultos e idosos' },
  ],
  suspeitas: [
    { re: /\bmelhor\b/i, porque: '"melhor" está na lista do CLAUDE.md — conferir se não é superlativo' },
    { re: /\bresolv(e|er|ido)\b/i, porque: 'parece promessa' },
    { re: /\bresultado/i, porque: 'parece promessa' },
    { re: /\búnic[oa]\b/i, porque: '"único" — conferir o sentido' },
    { re: /\b\d{2,}\s?%/, porque: 'número/estatística — conferir a fonte' },
    { re: /neste (artigo|texto)|vamos explorar|em resumo|é importante ressaltar|vale ressaltar|jornada/i, porque: 'cara de texto de IA' },
  ],

  autorSchema: {
    '@type': 'Person',
    name: 'Filipe Silvestre',
    jobTitle: 'Fonoaudiólogo especialista em Voz',
    url: DOMINIO + '/',
    sameAs: [CFFA, 'https://instagram.com/filipesilvestrefono'],
    hasCredential: [{ '@type': 'EducationalOccupationalCredential', credentialCategory: 'Título de Especialista em Voz', identifier: '11109/26', recognizedBy: { '@type': 'Organization', name: 'Conselho Federal de Fonoaudiologia' } }],
  },
  publisherSchema: {
    '@type': 'Organization',
    name: 'Filipe Silvestre Fonoaudiologia',
    url: DOMINIO + '/',
    logo: { '@type': 'ImageObject', url: DOMINIO + '/logo.png' },
  },

  ctaMeio(art) {
    const disf = art.categoria === 'Disfagia';
    return `<aside class="cta-meio">
  <p class="cta-meio-tit">${disf ? 'Quer que eu veja como está a hora de comer aí na sua casa?' : 'Quer que eu escute a sua voz de perto?'}</p>
  <p>${disf ? 'Atendo em casa, em Anápolis: observo a refeição na rotina real e oriento quem cuida.' : 'Atendo em casa, em Anápolis, e online. A conversa começa pelo WhatsApp.'}</p>
  <a class="cta-btn" href="${wa(msgDe(art))}">${ICO_WA}Conversar no WhatsApp</a>
</aside>`;
  },

  paginaArtigo({ art, relacionados, schema, MARCA, esc }) {
    const cat = CATEGORIAS.find((c) => c.id === art.categoria);
    const disf = art.categoria === 'Disfagia';
    return cabeca({ titulo: `${art.titulo_seo} | Filipe Silvestre`, descricao: art.descricao, url: art.url, imagem: art.capa, tipo: 'article', MARCA, esc, servico: disf ? 'disfagia' : 'voz',
      extra: `<meta property="article:published_time" content="${art.data}">\n${schema}` }) + `
<main class="blog-main">
  <article class="artigo">
    <p class="migalhas"><a href="/">Início</a> <span aria-hidden="true">›</span> <a href="/blog/">Blog</a> <span aria-hidden="true">›</span> <a href="/blog/#${cat.ancora}">${esc(cat.titulo)}</a></p>
    <div class="art-topo">
      <span class="art-cat">${esc(cat.titulo)}</span>
      <h1>${esc(art.titulo)}</h1>
      <p class="art-meta">Por <strong>Filipe Silvestre</strong>, fonoaudiólogo especialista em Voz · <time datetime="${art.data}">${art.dataExtenso}</time> · ${art.minutos} min de leitura</p>
    </div>
    <div class="art-corpo">
${art.corpo.html}
    </div>
    ${caixaAutor()}
    <section class="cta-fim">
      <h2>${disf ? 'Engolir com mais segurança começa por uma avaliação' : 'A sua voz merece uma avaliação de verdade'}</h2>
      <p>${disf ? 'Vou até a sua casa, em Anápolis, vejo a refeição acontecendo e combino com a família o que muda já. Sem pressa e com explicação em linguagem simples.' : 'Avaliação completa da voz, com análise acústica no computador, em casa (Anápolis) ou online. Você sai sabendo o que está acontecendo e o que fazer.'}</p>
      <div class="cta-fim-botoes">
        <a class="cta-btn cta-btn-claro" href="${wa(msgDe(art))}">${ICO_WA}Conversar no WhatsApp</a>
        <a class="cta-link" href="${cat.pagina.href}">${esc(cat.pagina.txt)} ›</a>
      </div>
    </section>
    <p class="art-aviso">Este texto é informativo e não substitui uma avaliação individual. Cada voz e cada forma de engolir têm a sua história. Em caso de engasgo com falta de ar, ligue para o SAMU (192).</p>
  </article>
  <section class="relacionados" aria-labelledby="leia-tambem">
    <h2 id="leia-tambem">Leia também</h2>
    <div class="grade">${relacionados.map((r) => cartao(r, esc)).join('')}</div>
    <p class="ver-todos"><a href="/blog/">Ver todos os textos do blog ›</a></p>
  </section>
</main>
` + rodape(art);
  },

  paginaIndice({ artigos, schema, MARCA, esc }) {
    const blocos = CATEGORIAS.map((c) => {
      const lista = artigos.filter((a) => a.categoria === c.id);
      if (!lista.length) return '';
      return `<section class="cat-bloco" id="${c.ancora}" aria-labelledby="t-${c.ancora}">
    <div class="cat-topo"><h2 id="t-${c.ancora}">${esc(c.titulo)}</h2><p>${esc(c.sub)}</p></div>
    <div class="grade">${lista.map((a) => cartao(a, esc)).join('')}</div>
  </section>`;
    }).join('\n  ');
    return cabeca({ titulo: 'Blog sobre voz e deglutição | Filipe Silvestre, fonoaudiólogo em Anápolis', descricao: 'Rouquidão que não passa, voz cansada, pigarro, engasgos e dificuldade para engolir: textos claros do fonoaudiólogo Filipe Silvestre, especialista em Voz.', url: `${DOMINIO}/blog/`, imagem: `${DOMINIO}/foto-hero.jpg`, tipo: 'website', MARCA, esc, extra: schema }) + `
<main class="blog-main">
  <div class="blog-hero">
    <p class="blog-kicker">Blog</p>
    <h1>Voz e deglutição, explicadas sem complicação</h1>
    <p class="blog-sub">Escrevo aqui sobre o que mais me perguntam no atendimento: a rouquidão que não vai embora, a voz que cansa no meio do dia, o engasgo na hora do almoço. Para você entender o que está sentindo e saber quando procurar ajuda.</p>
    <p class="blog-assina">Filipe Silvestre · Fonoaudiólogo especialista em Voz (CFFa nº 11109/26) · Pós-graduado em Disfagia · CRFa 5-13357</p>
    <div class="chips">${CATEGORIAS.map((c) => `<a class="chip" href="#${c.ancora}">${esc(c.titulo)}</a>`).join('')}</div>
  </div>
  ${blocos}
  <section class="cta-fim cta-fim-indice">
    <h2>Prefere conversar direto?</h2>
    <p>Atendo adultos e idosos em casa, em Anápolis/GO, e online. Me conta o que está acontecendo pelo WhatsApp.</p>
    <div class="cta-fim-botoes"><a class="cta-btn cta-btn-claro" href="${wa(msgDe(null))}">${ICO_WA}Conversar no WhatsApp</a></div>
  </section>
</main>
` + rodape(null);
  },

  // capa 1200×630 (WhatsApp, Google, lista do blog). Fotografada pelo capas.mjs.
  capaHtml(art) {
    const cat = CATEGORIAS.find((c) => c.id === art.categoria);
    return `<!DOCTYPE html><html><head><meta charset="utf-8">
<link href="https://fonts.googleapis.com/css2?family=Sora:wght@600;800&family=Inter:wght@500;600&display=swap" rel="stylesheet">
<style>
*{margin:0;padding:0;box-sizing:border-box}
body{width:1200px;height:630px;background:linear-gradient(120deg,#006EB4 0%,#006EB4 45%,#46C8BE 100%);font-family:Inter,sans-serif;color:#fff;position:relative;overflow:hidden}
.ondas{position:absolute;right:-120px;top:-120px;width:620px;height:620px;border-radius:50%;border:2px solid rgba(255,255,255,.18)}
.ondas::before,.ondas::after{content:"";position:absolute;inset:64px;border-radius:50%;border:2px solid rgba(255,255,255,.14)}
.ondas::after{inset:128px;border-color:rgba(255,255,255,.10)}
.caixa{position:absolute;left:72px;right:72px;top:64px;bottom:64px;display:flex;flex-direction:column;justify-content:space-between}
.cat{align-self:flex-start;font:600 22px Inter,sans-serif;letter-spacing:.04em;text-transform:uppercase;border:2px solid rgba(255,255,255,.7);border-radius:9999px;padding:8px 20px}
h1{font:800 60px/1.1 Sora,sans-serif;max-width:980px;letter-spacing:-.01em}
.pe{display:flex;align-items:center;gap:20px;font:600 24px Inter,sans-serif}
.selo{background:#fff;border-radius:6px;padding:8px 14px;display:flex;align-items:center}
.selo img{height:64px;width:auto;display:block}
.pe small{display:block;font-weight:500;font-size:20px;opacity:.9;margin-top:4px}
</style></head><body><div class="ondas"></div><div class="caixa">
<span class="cat">${cat.titulo}</span>
<h1>${art.titulo}</h1>
<div class="pe"><span class="selo"><img src="${DOMINIO}/logo.png" alt=""></span><div>Filipe Silvestre · Fonoaudiólogo<small>Especialista em Voz · CRFa 5-13357 · Anápolis/GO</small></div></div>
</div></body></html>`;
  },

  css: CSS,
};

