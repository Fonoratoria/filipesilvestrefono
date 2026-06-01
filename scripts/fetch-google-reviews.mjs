/**
 * Busca as avaliações do Google (Places API New) e grava em reviews.json.
 * Roda no GitHub Actions — a chave NUNCA aparece no site (fica em GitHub Secrets).
 *
 * Variáveis de ambiente esperadas:
 *   GOOGLE_API_KEY   -> chave da API do Google Cloud (Places API New ativada)
 *   GOOGLE_PLACE_ID  -> Place ID do seu perfil do Google Meu Negócio
 *
 * Não usa nenhuma dependência externa (fetch nativo do Node 20+).
 */

import { writeFileSync } from 'node:fs';

const API_KEY = process.env.GOOGLE_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;

// Nota mínima para um depoimento entrar no site (4 ou 5 estrelas)
const NOTA_MINIMA = 4;
// Quantos depoimentos no máximo mostrar
const MAX_DEPOIMENTOS = 6;

function abortar(msg) {
  console.error('ERRO:', msg);
  process.exit(1);
}

if (!API_KEY) abortar('Falta a variável GOOGLE_API_KEY (configure em GitHub Secrets).');
if (!PLACE_ID) abortar('Falta a variável GOOGLE_PLACE_ID (configure em GitHub Secrets).');

const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}`;

const resp = await fetch(url, {
  headers: {
    'X-Goog-Api-Key': API_KEY,
    // Pede só os campos que precisamos (mais barato e rápido)
    'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews',
    'Accept-Language': 'pt-BR'
  }
});

if (!resp.ok) {
  const corpo = await resp.text();
  abortar(`API do Google respondeu ${resp.status}. Resposta: ${corpo.slice(0, 500)}`);
}

const dados = await resp.json();
const reviewsBrutas = Array.isArray(dados.reviews) ? dados.reviews : [];

const depoimentos = reviewsBrutas
  .map((r) => {
    const autor = r.authorAttribution || {};
    const texto = (r.text && r.text.text) || (r.originalText && r.originalText.text) || '';
    return {
      nome: autor.displayName || 'Paciente',
      foto: autor.photoUri || '',
      estrelas: typeof r.rating === 'number' ? r.rating : 5,
      texto: texto.trim(),
      fonte: 'Google',
      quando: r.relativePublishTimeDescription || ''
    };
  })
  // Só avaliações boas e que tenham texto
  .filter((d) => d.estrelas >= NOTA_MINIMA && d.texto.length > 0)
  // Melhores primeiro
  .sort((a, b) => b.estrelas - a.estrelas)
  .slice(0, MAX_DEPOIMENTOS);

const saida = {
  atualizadoEm: new Date().toISOString(),
  media: typeof dados.rating === 'number' ? dados.rating : null,
  total: typeof dados.userRatingCount === 'number' ? dados.userRatingCount : null,
  depoimentos
};

writeFileSync('reviews.json', JSON.stringify(saida, null, 2) + '\n', 'utf8');

console.log(`OK: ${depoimentos.length} depoimento(s) gravado(s) em reviews.json.`);
console.log(`Nota média: ${saida.media} | Total de avaliações: ${saida.total}`);
