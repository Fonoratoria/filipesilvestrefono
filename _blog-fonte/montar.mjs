// =====================================================================================
//  MONTAR O BLOG — transforma os textos de `_blog-fonte/artigos/*.md` em páginas prontas.
//  Criado em 08/10/2026. O MESMO arquivo mora no site da clínica e no site do Balbuu;
//  o que muda de um site pro outro (visual, menu, medição, chamada) mora no `site.mjs` ao lado.
//
//  Uso (na pasta do site):   node _blog-fonte/montar.mjs
//  Gera:  blog/index.html · blog/<slug>/index.html · blog/blog.css · blog/feed.xml
//         e reescreve SÓ as linhas /blog/ do sitemap.xml (o resto do sitemap fica como está).
//
//  ⛔ Não editar as páginas de `blog/` à mão: a próxima montagem apaga. Muda o .md ou o site.mjs.
//  ⛔ A montagem PARA se achar palavra proibida (compliance do Conselho / ANVISA) ou link
//     interno quebrado. É de propósito: texto irregular no ar expõe o registro do Filipe.
// =====================================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '..');
const site = (await import('./site.mjs')).default;
const DIR_ART = path.join(AQUI, 'artigos');
const DIR_BLOG = path.join(RAIZ, 'blog');
const MARCA = '<meta name="generator" content="montar-blog">';
const FORCAR = process.argv.includes('--forcar');

const erros = [];
const avisos = [];

// ---------- utilidades ----------
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const semTags = (s) => String(s).replace(/<[^>]+>/g, '').replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/\s+/g, ' ').trim();
function slugify(t) {
  return t.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase()
    .replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '').slice(0, 60).replace(/-+$/, '');
}
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
function dataExtenso(iso) { const [a, m, d] = iso.split('-').map(Number); return `${d} de ${MESES[m - 1]} de ${a}`; }
const jsonLd = (obj) => `<script type="application/ld+json">${JSON.stringify(obj).replace(/</g, '\\u003c')}</script>`;

// ---------- ler os artigos ----------
function lerArtigo(arq) {
  const bruto = fs.readFileSync(arq, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const m = bruto.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!m) { erros.push(`${path.basename(arq)}: falta o cabeçalho entre ---`); return null; }
  const meta = {};
  for (const linha of m[1].split('\n')) {
    const i = linha.indexOf(':');
    if (i < 0) continue;
    meta[linha.slice(0, i).trim()] = linha.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  meta.slug = path.basename(arq, '.md');
  meta.corpoMd = m[2].trim();
  for (const campo of ['titulo', 'descricao', 'categoria', 'resumo']) {
    if (!meta[campo]) erros.push(`${meta.slug}: falta o campo "${campo}" no cabeçalho`);
  }
  meta.titulo_seo = meta.titulo_seo || meta.titulo;
  meta.data = meta.data || site.dataPadrao;
  return meta;
}

// ---------- markdown simples -> HTML ----------
function inline(t, art) {
  t = esc(t);
  t = t.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_, txt, url) => {
    const real = url.replace(/&amp;/g, '&');
    const final = site.ajustaLink ? site.ajustaLink(real, art) : real;
    const externo = /^https?:\/\//.test(final) && !final.startsWith(site.dominio);
    return `<a href="${esc(final)}"${externo ? ' target="_blank" rel="noopener"' : ''}>${txt}</a>`;
  });
  t = t.replace(/\*\*([^*]+?)\*\*/g, '<strong>$1</strong>');
  t = t.replace(/(^|[^*\w])\*([^*\n]+?)\*(?![*\w])/g, '$1<em>$2</em>');
  return t;
}

function tokens(md, art) {
  const out = [];
  let par = [], lista = null, cit = [];
  const fechaPar = () => { if (par.length) { out.push({ t: 'p', html: `<p>${inline(par.join(' '), art)}</p>`, texto: par.join(' ') }); par = []; } };
  const fechaLista = () => {
    if (lista) {
      out.push({ t: 'lista', html: `<${lista.tipo}>${lista.itens.map((i) => `<li>${inline(i, art)}</li>`).join('')}</${lista.tipo}>`, texto: lista.itens.join(' ') });
      lista = null;
    }
  };
  const fechaCit = () => { if (cit.length) { out.push({ t: 'cit', html: `<aside class="destaque"><p>${inline(cit.join(' '), art)}</p></aside>`, texto: cit.join(' ') }); cit = []; } };
  const fechaTudo = () => { fechaPar(); fechaLista(); fechaCit(); };
  for (const l0 of md.split('\n')) {
    const l = l0.trimEnd();
    let m;
    if (!l.trim()) { fechaTudo(); continue; }
    if (/^\s*(---|\*\*\*)\s*$/.test(l)) { fechaTudo(); continue; }
    if ((m = l.match(/^(#{1,4})\s+(.*)$/))) {
      fechaTudo();
      const nivel = m[1].length <= 2 ? 2 : 3;
      if (m[1].length === 1) avisos.push(`${art.slug}: usou "#" (H1) no corpo — virou H2`);
      out.push({ t: 'h', nivel, txt: m[2].trim().replace(/\*\*/g, '') });
      continue;
    }
    if ((m = l.match(/^>\s?(.*)$/))) { fechaPar(); fechaLista(); cit.push(m[1]); continue; }
    if ((m = l.match(/^\s*[-*•]\s+(.*)$/))) {
      fechaPar(); fechaCit();
      if (!lista || lista.tipo !== 'ul') { fechaLista(); lista = { tipo: 'ul', itens: [] }; }
      lista.itens.push(m[1]); continue;
    }
    if ((m = l.match(/^\s*\d+[.)]\s+(.*)$/))) {
      fechaPar(); fechaCit();
      if (!lista || lista.tipo !== 'ol') { fechaLista(); lista = { tipo: 'ol', itens: [] }; }
      lista.itens.push(m[1]); continue;
    }
    if (lista && /^\s{2,}\S/.test(l0)) { lista.itens[lista.itens.length - 1] += ' ' + l.trim(); continue; }
    fechaLista(); fechaCit();
    par.push(l.trim());
  }
  fechaTudo();
  return out;
}

function montarCorpo(art) {
  const tk = tokens(art.corpoMd, art);
  const ids = new Set();
  const idUnico = (txt) => { let b = slugify(txt) || 'secao', id = b, n = 2; while (ids.has(id)) id = `${b}-${n++}`; ids.add(id); return id; };
  const ehFaq = (x) => x.t === 'h' && x.nivel === 2 && /perguntas frequentes/i.test(x.txt);
  const iFaq = tk.findIndex(ehFaq);
  const miolo = iFaq >= 0 ? tk.slice(0, iFaq) : tk;
  const faqTk = iFaq >= 0 ? tk.slice(iFaq + 1) : [];
  if (iFaq < 0) avisos.push(`${art.slug}: sem "## Perguntas frequentes"`);

  // perguntas frequentes -> lista de {p, r}
  const faq = [];
  for (const x of faqTk) {
    if (x.t === 'h') faq.push({ p: x.txt, r: [] });
    else if (faq.length) faq[faq.length - 1].r.push(x);
  }

  const sumario = [];
  let nH2 = 0, ctaPosto = false;
  const partes = [];
  for (const x of miolo) {
    if (x.t === 'h') {
      if (x.nivel === 2) {
        nH2++;
        if (nH2 === 3 && !ctaPosto) { partes.push(site.ctaMeio(art)); ctaPosto = true; }
        const id = idUnico(x.txt);
        sumario.push({ id, txt: x.txt });
        partes.push(`<h2 id="${id}">${inline(x.txt, art)}</h2>`);
      } else {
        partes.push(`<h3>${inline(x.txt, art)}</h3>`);
      }
      continue;
    }
    partes.push(x.html);
  }
  if (!ctaPosto) partes.push(site.ctaMeio(art));

  // sumário entra depois da abertura (antes do 1º H2)
  const iPrimH2 = partes.findIndex((p) => p.startsWith('<h2'));
  if (sumario.length >= 3) {
    const itens = sumario.map((s) => `<li><a href="#${s.id}">${inline(s.txt, art)}</a></li>`);
    if (faq.length) itens.push('<li><a href="#perguntas-frequentes">Perguntas frequentes</a></li>');
    // div (e não <nav>): o CSS das páginas do site estiliza TODO <nav> como a barra do topo
    const nav = `<div class="sumario" role="navigation" aria-label="Nesta página"><p class="sumario-tit">Nesta página</p><ol>${itens.join('')}</ol></div>`;
    partes.splice(iPrimH2 < 0 ? partes.length : iPrimH2, 0, nav);
  }

  let faqHtml = '';
  if (faq.length) {
    faqHtml = `<section class="faq" aria-labelledby="perguntas-frequentes"><h2 id="perguntas-frequentes">Perguntas frequentes</h2>`
      + faq.map((f) => `<div class="faq-item"><h3>${inline(f.p, art)}</h3>${f.r.map((r) => r.html).join('')}</div>`).join('')
      + `</section>`;
  }

  const textoTodo = tk.map((x) => (x.t === 'h' ? x.txt : x.texto)).join(' ');
  const palavras = textoTodo.split(/\s+/).filter(Boolean).length;
  return { html: partes.join('\n') + '\n' + faqHtml, faq, palavras, textoTodo };
}

// ---------- conferências (compliance + links) ----------
function conferir(art, corpo, slugs) {
  const tudo = [art.titulo, art.titulo_seo, art.descricao, art.resumo, corpo.textoTodo].join('\n');
  for (const r of site.proibidas) {
    const m = tudo.match(r.re);
    if (m) erros.push(`${art.slug}: palavra proibida "${m[0]}" (${r.porque})`);
  }
  for (const r of site.suspeitas || []) {
    const m = tudo.match(r.re);
    if (m) avisos.push(`${art.slug}: conferir "${m[0]}" (${r.porque})`);
  }
  for (const m of art.corpoMd.matchAll(/\]\((\/blog\/[^)\s]*)\)/g)) {
    const alvo = m[1].replace(/^\/blog\/?/, '').replace(/\/$/, '').split('#')[0];
    if (alvo && !slugs.has(alvo)) erros.push(`${art.slug}: link interno quebrado ${m[1]}`);
  }
  if (art.descricao.length < 110 || art.descricao.length > 165) avisos.push(`${art.slug}: descrição com ${art.descricao.length} caracteres (bom: 120–160)`);
  if (art.titulo_seo.length > 65) avisos.push(`${art.slug}: titulo_seo com ${art.titulo_seo.length} caracteres (o Google corta perto de 60)`);
  if (corpo.palavras < 700) avisos.push(`${art.slug}: só ${corpo.palavras} palavras`);
  if (!site.categorias.some((c) => c.id === art.categoria)) erros.push(`${art.slug}: categoria "${art.categoria}" não existe no site.mjs`);
}

// ---------- montar ----------
if (!fs.existsSync(DIR_ART)) { console.error('Pasta de artigos não existe:', DIR_ART); process.exit(1); }
const arquivos = fs.readdirSync(DIR_ART).filter((f) => f.endsWith('.md'));
let artigos = arquivos.map((f) => lerArtigo(path.join(DIR_ART, f))).filter(Boolean);

// ordem: a das categorias no site.mjs; o que não estiver listado vai pro fim da categoria
const ordemDe = (a) => {
  const ci = site.categorias.findIndex((c) => c.id === a.categoria);
  const cat = site.categorias[ci];
  const oi = cat && cat.ordem ? cat.ordem.indexOf(a.slug) : -1;
  return (ci < 0 ? 99 : ci) * 1000 + (oi < 0 ? 900 : oi);
};
artigos.sort((a, b) => ordemDe(a) - ordemDe(b));
const slugs = new Set(artigos.map((a) => a.slug));

for (const art of artigos) {
  art.corpo = montarCorpo(art);
  art.url = `${site.dominio}/blog/${art.slug}/`;
  art.minutos = Math.max(2, Math.round(art.corpo.palavras / 200));
  art.dataExtenso = dataExtenso(art.data);
  art.capa = fs.existsSync(path.join(DIR_BLOG, art.slug, 'capa.jpg')) ? `${site.dominio}/blog/${art.slug}/capa.jpg` : site.capaPadrao;
  art.temCapa = art.capa !== site.capaPadrao;
  conferir(art, art.corpo, slugs);
}

for (const a of avisos) console.log('  [!] ' + a);
if (erros.length) {
  for (const e of erros) console.log('  [X] ' + e);
  if (!FORCAR) { console.log(`\nMONTAGEM PARADA: ${erros.length} erro(s). Conserte o .md e rode de novo.\n`); process.exit(1); }
}

fs.mkdirSync(DIR_BLOG, { recursive: true });

// relacionados: mesma categoria, os próximos na ordem (dá a volta)
function relacionados(art) {
  const mesma = artigos.filter((a) => a.categoria === art.categoria);
  const i = mesma.indexOf(art);
  const lista = [];
  for (let k = 1; k <= mesma.length && lista.length < 3; k++) {
    const x = mesma[(i + k) % mesma.length];
    if (x !== art) lista.push(x);
  }
  return lista;
}

for (const art of artigos) {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'BlogPosting',
        headline: art.titulo,
        description: art.descricao,
        image: art.capa,
        datePublished: art.data,
        dateModified: art.data,
        inLanguage: 'pt-BR',
        mainEntityOfPage: art.url,
        url: art.url,
        author: site.autorSchema,
        publisher: site.publisherSchema,
        articleSection: art.categoria,
        keywords: art.palavra_chave || art.titulo,
        wordCount: art.corpo.palavras,
      },
      {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Início', item: site.dominio + '/' },
          { '@type': 'ListItem', position: 2, name: 'Blog', item: site.dominio + '/blog/' },
          { '@type': 'ListItem', position: 3, name: art.titulo, item: art.url },
        ],
      },
    ],
  };
  if (art.corpo.faq.length) {
    schema['@graph'].push({
      '@type': 'FAQPage',
      mainEntity: art.corpo.faq.map((f) => ({
        '@type': 'Question',
        name: f.p,
        acceptedAnswer: { '@type': 'Answer', text: semTags(f.r.map((r) => r.html).join(' ')) },
      })),
    });
  }
  const html = site.paginaArtigo({ art, relacionados: relacionados(art), schema: jsonLd(schema), MARCA, esc, inline: (t) => inline(t, art) });
  const dir = path.join(DIR_BLOG, art.slug);
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), html);
}

// índice do blog
const indiceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Blog',
  name: site.nomeBlog,
  description: site.descricaoBlog,
  url: site.dominio + '/blog/',
  inLanguage: 'pt-BR',
  author: site.autorSchema,
  publisher: site.publisherSchema,
  blogPost: artigos.map((a) => ({ '@type': 'BlogPosting', headline: a.titulo, url: a.url, datePublished: a.data })),
};
fs.writeFileSync(path.join(DIR_BLOG, 'index.html'), site.paginaIndice({ artigos, schema: jsonLd(indiceSchema), MARCA, esc }));
fs.writeFileSync(path.join(DIR_BLOG, 'blog.css'), site.css);

// feed RSS (leitores de notícia e o Google Discover leem)
const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
<title>${esc(site.nomeBlog)}</title>
<link>${site.dominio}/blog/</link>
<atom:link href="${site.dominio}/blog/feed.xml" rel="self" type="application/rss+xml"/>
<description>${esc(site.descricaoBlog)}</description>
<language>pt-BR</language>
${artigos.map((a) => `<item><title>${esc(a.titulo)}</title><link>${a.url}</link><guid>${a.url}</guid><pubDate>${new Date(a.data + 'T12:00:00-03:00').toUTCString()}</pubDate><description>${esc(a.descricao)}</description><category>${esc(a.categoria)}</category></item>`).join('\n')}
</channel>
</rss>
`;
fs.writeFileSync(path.join(DIR_BLOG, 'feed.xml'), rss);

// apaga página órfã (artigo que saiu da pasta) — só se foi esta montagem que criou
for (const d of fs.readdirSync(DIR_BLOG, { withFileTypes: true })) {
  if (!d.isDirectory() || slugs.has(d.name)) continue;
  const idx = path.join(DIR_BLOG, d.name, 'index.html');
  if (fs.existsSync(idx) && fs.readFileSync(idx, 'utf8').includes(MARCA)) {
    fs.rmSync(path.join(DIR_BLOG, d.name), { recursive: true });
    console.log('  [-] removida página órfã: ' + d.name);
  }
}

// sitemap: tira as linhas /blog/ antigas e põe as de agora, sem encostar no resto
const smArq = path.join(RAIZ, 'sitemap.xml');
if (fs.existsSync(smArq)) {
  let sm = fs.readFileSync(smArq, 'utf8');
  sm = sm.replace(/\s*<url>\s*<loc>[^<]*\/blog\/[^<]*<\/loc>[\s\S]*?<\/url>/g, '');
  const hoje = artigos.reduce((m, a) => (a.data > m ? a.data : m), site.dataPadrao);
  const novas = [`  <url>\n    <loc>${site.dominio}/blog/</loc>\n    <lastmod>${hoje}</lastmod>\n    <changefreq>weekly</changefreq>\n    <priority>0.8</priority>\n  </url>`]
    .concat(artigos.map((a) => `  <url>\n    <loc>${a.url}</loc>\n    <lastmod>${a.data}</lastmod>\n    <changefreq>monthly</changefreq>\n    <priority>0.7</priority>\n  </url>`));
  sm = sm.replace(/\s*<\/urlset>/, '\n' + novas.join('\n') + '\n</urlset>');
  fs.writeFileSync(smArq, sm);
}

console.log(`\nOK: ${artigos.length} artigos montados em ${path.relative(RAIZ, DIR_BLOG)}/ (${artigos.filter((a) => a.temCapa).length} com capa) · sitemap atualizado · ${avisos.length} aviso(s)\n`);
