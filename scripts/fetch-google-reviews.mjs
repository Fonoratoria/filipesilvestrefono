/**
 * Busca as avaliações do Google (Places API New) e grava em reviews.json.
 * Roda no GitHub Actions — a chave NUNCA aparece no site (fica em GitHub Secrets).
 *
 * Variáveis de ambiente (configurar em GitHub Secrets):
 *   GOOGLE_API_KEY   -> chave da API do Google Cloud (com "Places API (New)" ativada)
 *   GOOGLE_QUERY     -> (modo fácil) nome do negócio para buscar, ex:
 *                       "Filipe Silvestre Fonoaudiólogo Anápolis"
 *   GOOGLE_PLACE_ID  -> (opcional) se você tiver o Place ID, ele tem prioridade.
 *
 * Não usa dependências externas (fetch nativo do Node 20+).
 */

import { writeFileSync } from 'node:fs';

const API_KEY = process.env.GOOGLE_API_KEY;
const PLACE_ID = process.env.GOOGLE_PLACE_ID;
const QUERY = process.env.GOOGLE_QUERY;

const NOTA_MINIMA = 4;        // só entra depoimento com 4 ou 5 estrelas
const MAX_DEPOIMENTOS = 6;    // máximo de cards mostrados

function abortar(msg) {
  console.error('ERRO:', msg);
  process.exit(1);
}

if (!API_KEY) abortar('Falta GOOGLE_API_KEY (configure em GitHub Secrets).');
if (!PLACE_ID && !QUERY) abortar('Configure GOOGLE_QUERY (nome do negócio) ou GOOGLE_PLACE_ID.');

let lugar;

if (PLACE_ID) {
  // ----- Modo Place ID: detalhes diretos do lugar -----
  const url = `https://places.googleapis.com/v1/places/${encodeURIComponent(PLACE_ID)}`;
  const resp = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'id,displayName,rating,userRatingCount,reviews',
      'Accept-Language': 'pt-BR'
    }
  });
  if (!resp.ok) abortar(`API (Place Details) respondeu ${resp.status}: ${(await resp.text()).slice(0, 400)}`);
  lugar = await resp.json();
} else {
  // ----- Modo busca por nome (mais fácil): Text Search -----
  const resp = await fetch('https://places.googleapis.com/v1/places:searchText', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Goog-Api-Key': API_KEY,
      'X-Goog-FieldMask': 'places.id,places.displayName,places.rating,places.userRatingCount,places.reviews',
      'Accept-Language': 'pt-BR'
    },
    body: JSON.stringify({ textQuery: QUERY, languageCode: 'pt-BR', regionCode: 'BR' })
  });
  if (!resp.ok) abortar(`API (Text Search) respondeu ${resp.status}: ${(await resp.text()).slice(0, 400)}`);
  const j = await resp.json();
  lugar = (j.places && j.places[0]) || {};
  if (!lugar.id) abortar(`Nenhum lugar encontrado para a busca: "${QUERY}". Refine o GOOGLE_QUERY.`);
  console.log('Lugar encontrado:', (lugar.displayName && lugar.displayName.text) || lugar.id);
}

const reviewsBrutas = Array.isArray(lugar.reviews) ? lugar.reviews : [];

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
  .filter((d) => d.estrelas >= NOTA_MINIMA && d.texto.length > 0)
  .sort((a, b) => b.estrelas - a.estrelas)
  .slice(0, MAX_DEPOIMENTOS);

const saida = {
  atualizadoEm: new Date().toISOString(),
  media: typeof lugar.rating === 'number' ? lugar.rating : null,
  total: typeof lugar.userRatingCount === 'number' ? lugar.userRatingCount : null,
  depoimentos
};

writeFileSync('reviews.json', JSON.stringify(saida, null, 2) + '\n', 'utf8');

console.log(`OK: ${depoimentos.length} depoimento(s) gravado(s) em reviews.json.`);
console.log(`Nota média: ${saida.media} | Total de avaliações: ${saida.total}`);
