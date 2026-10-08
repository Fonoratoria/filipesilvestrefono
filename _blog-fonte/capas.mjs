// =====================================================================================
//  CAPAS DO BLOG — fotografa uma imagem 1200×630 por artigo (blog/<slug>/capa.jpg).
//  É a imagem que aparece quando o link é colado no WhatsApp/Instagram e na lista do blog.
//  O desenho de cada site mora em `site.mjs` → capaHtml(art). O MESMO arquivo nos dois sites.
//
//  Uso (na pasta do site):  node _blog-fonte/capas.mjs          → só as que faltam
//                           node _blog-fonte/capas.mjs --todas  → refaz todas
//  Depois: node _blog-fonte/montar.mjs (é ele que liga a capa na página).
//  Precisa do puppeteer-core instalado global (npm i -g puppeteer-core) e do Chrome.
// =====================================================================================
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';
import { execSync } from 'node:child_process';

const AQUI = path.dirname(fileURLToPath(import.meta.url));
const RAIZ = path.resolve(AQUI, '..');
const site = (await import('./site.mjs')).default;
const TODAS = process.argv.includes('--todas');

const raizGlobal = execSync('npm root -g').toString().trim();
const require = createRequire(path.join(raizGlobal, 'x.js'));
let puppeteer;
try { puppeteer = require('puppeteer-core'); } catch (e) {
  console.error('Falta o puppeteer-core global. Rode:  npm i -g puppeteer-core\n', e.message);
  process.exit(1);
}
const CHROME = [
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  process.env.LOCALAPPDATA ? path.join(process.env.LOCALAPPDATA, 'Google\\Chrome\\Application\\chrome.exe') : '',
].find((p) => p && fs.existsSync(p));
if (!CHROME) { console.error('Chrome não encontrado.'); process.exit(1); }

function cabecalho(arq) {
  const t = fs.readFileSync(arq, 'utf8').replace(/^\uFEFF/, '').replace(/\r\n?/g, '\n');
  const m = t.match(/^---\n([\s\S]*?)\n---/);
  const meta = { slug: path.basename(arq, '.md') };
  if (!m) return meta;
  for (const l of m[1].split('\n')) {
    const i = l.indexOf(':');
    if (i > 0) meta[l.slice(0, i).trim()] = l.slice(i + 1).trim().replace(/^["']|["']$/g, '');
  }
  return meta;
}

const dirArt = path.join(AQUI, 'artigos');
const artigos = fs.readdirSync(dirArt).filter((f) => f.endsWith('.md')).map((f) => cabecalho(path.join(dirArt, f)));
const navegador = await puppeteer.launch({ executablePath: CHROME, headless: 'new', args: ['--hide-scrollbars'] });
let feitas = 0;
try {
  const pagina = await navegador.newPage();
  await pagina.setViewport({ width: 1200, height: 630, deviceScaleFactor: 1 });
  for (const art of artigos) {
    const destino = path.join(RAIZ, 'blog', art.slug, 'capa.jpg');
    if (!TODAS && fs.existsSync(destino)) continue;
    if (!art.titulo || !art.categoria) { console.log('  [!] sem título/categoria, pulei: ' + art.slug); continue; }
    fs.mkdirSync(path.dirname(destino), { recursive: true });
    // 'load' e não 'networkidle0': a fonte do Google deixa conexão aberta e a 2ª capa travava 30 s
    await pagina.setContent(site.capaHtml(art), { waitUntil: 'load', timeout: 30000 });
    await pagina.evaluate(async () => {
      await document.fonts.ready;
      await Promise.all([...document.images].map((i) => (i.complete ? 0 : new Promise((ok) => { i.onload = i.onerror = ok; }))));
    });
    // título comprido não pode vazar da capa: encolhe a letra até caber
    await pagina.evaluate(() => {
      const h = document.querySelector('h1');
      const caixa = h && h.parentElement;
      if (!h || !caixa) return;
      let tam = parseFloat(getComputedStyle(h).fontSize);
      while ((caixa.scrollHeight > caixa.clientHeight + 1 || h.scrollWidth > h.clientWidth + 1) && tam > 34) {
        tam -= 2; h.style.fontSize = tam + 'px';
      }
    });
    await pagina.screenshot({ path: destino, type: 'jpeg', quality: 84 });
    feitas++;
    console.log('  [ok] ' + art.slug);
  }
} finally {
  await navegador.close();
}
console.log(`\n${feitas} capa(s) feitas. Agora rode: node _blog-fonte/montar.mjs\n`);
