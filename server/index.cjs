// Local-only Gemini proxy. Do not expose this server to the public internet.
const http = require('node:http');
const os = require('node:os');
const net = require('node:net');
const { Buffer } = require('node:buffer');
const fs = require('node:fs');
const path = require('node:path');

const host = process.env.HOST || '127.0.0.1';
const port = Number(process.env.PORT || 8787);
const key = process.env.GEMINI_API_KEY;
const model = 'gemini-3.1-flash-lite';
const localAddresses = Object.values(os.networkInterfaces()).flat().filter(Boolean).map(item => item.address);
if (!(host === '127.0.0.1' || (net.isIPv4(host) && localAddresses.includes(host) && /^(10\.|192\.168\.|172\.(1[6-9]|2\d|3[01])\.)/.test(host)))) {
  throw new Error('HOST must be 127.0.0.1 or a private IPv4 address assigned to this machine.');
}
if (!key || !Number.isInteger(port) || port < 1024 || port > 65535) throw new Error('Configure GEMINI_API_KEY and PORT in server/.env.');

const requests = new Map();
const cachePath = path.join(__dirname, '.gemini-cache.json');
let cache = {};
try { cache = JSON.parse(fs.readFileSync(cachePath, 'utf8')); } catch { cache = {}; }
function reply(res, status, value, origin) {
  const headers = { 'Content-Type': 'application/json', 'Cache-Control': 'no-store', 'X-Content-Type-Options': 'nosniff' };
  if (origin) { headers['Access-Control-Allow-Origin'] = origin; headers.Vary = 'Origin'; }
  res.writeHead(status, headers);
  res.end(JSON.stringify(value));
}
function validOrigin(origin) {
  if (!origin) return true;
  try { const url = new URL(origin); return ['localhost', '127.0.0.1', host].includes(url.hostname) && ['http:', 'https:'].includes(url.protocol); }
  catch { return false; }
}

const server = http.createServer(async (req, res) => {
  const origin = req.headers.origin;
  if (!validOrigin(origin)) return reply(res, 403, { error: 'Origem não permitida.' });
  if (req.method === 'OPTIONS' && req.url === '/synopsis') {
    res.writeHead(204, { 'Access-Control-Allow-Origin': origin || 'http://localhost', 'Access-Control-Allow-Methods': 'POST, OPTIONS', 'Access-Control-Allow-Headers': 'Content-Type', Vary: 'Origin' });
    return res.end();
  }
  if (req.method !== 'POST' || req.url !== '/synopsis') return reply(res, 404, { error: 'Não encontrado.' }, origin);
  if (!(req.headers['content-type'] || '').startsWith('application/json')) return reply(res, 415, { error: 'Envie JSON.' }, origin);
  let body = '';
  try {
    for await (const chunk of req) { body += chunk; if (Buffer.byteLength(body) > 4096) return reply(res, 413, { error: 'Requisição muito grande.' }, origin); }
    const input = JSON.parse(body);
    if (typeof input.title !== 'string' || typeof input.author !== 'string' || !input.title.trim() || !input.author.trim() || input.title.length > 160 || input.author.length > 160) return reply(res, 400, { error: 'Informe título e autor válidos.' }, origin);
    const cacheKey = JSON.stringify([input.title.trim().toLocaleLowerCase('pt-BR').replace(/\s+/g, ' '), input.author.trim().toLocaleLowerCase('pt-BR').replace(/\s+/g, ' ')]);
    if (cache[cacheKey]) return reply(res, 200, { ...cache[cacheKey], cached: true }, origin);
    const now = Date.now();
    for (const [address, time] of requests) if (now - time > 60000) requests.delete(address);
    const address = req.socket.remoteAddress;
    if (requests.has(address)) return reply(res, 429, { error: 'Limite local: aguarde um minuto antes de gerar outra sinopse.', source: 'local' }, origin);
    requests.set(address, now);
    const prompt = `Escreva uma sinopse curta em português brasileiro, sem spoilers, e até três categorias literárias para o livro. Escolha as categorias somente desta lista: Romance, Ficção, Fantasia, Infantil, Biografia, História, Autoajuda, Acadêmico, HQs e Mangás, Literatura Brasileira. Não invente informações se não conhecer a obra. Título: ${JSON.stringify(input.title.trim())}. Autor: ${JSON.stringify(input.author.trim())}. Responda somente em JSON: {"synopsis":"...","categories":["..."]}.`;
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`, {
      method: 'POST', headers: { 'Content-Type': 'application/json', 'x-goog-api-key': key }, signal: AbortSignal.timeout(20000),
      body: JSON.stringify({ contents: [{ parts: [{ text: prompt }] }], generationConfig: { responseMimeType: 'application/json' } }),
    });
    if (!response.ok) return reply(res, response.status === 429 ? 429 : response.status === 401 || response.status === 403 || response.status === 400 ? 502 : 503, { error: response.status === 429 ? 'Limite da API Google atingido. Tente mais tarde.' : 'Não foi possível consultar o Gemini.', source: response.status === 429 ? 'google' : 'provider' }, origin);
    const data = await response.json();
    const raw = data.candidates?.[0]?.content?.parts?.map(part => part.text || '').join('');
    const parsed = JSON.parse(raw);
    if (typeof parsed.synopsis !== 'string' || !parsed.synopsis.trim() || parsed.synopsis.length > 2000 || !Array.isArray(parsed.categories) || !parsed.categories.length || parsed.categories.length > 4 || !parsed.categories.every(item => typeof item === 'string' && item.trim().length > 0 && item.length <= 80)) throw new Error('Invalid model response');
    const result = { synopsis: parsed.synopsis.trim(), categories: parsed.categories.map(item => item.trim()) };
    cache[cacheKey] = result;
    if (Object.keys(cache).length > 200) delete cache[Object.keys(cache)[0]];
    try { fs.writeFileSync(cachePath, JSON.stringify(cache)); } catch { /* The current process can still use the in-memory cache. */ }
    return reply(res, 200, { ...result, cached: false }, origin);
  } catch (error) {
    return reply(res, error.name === 'TimeoutError' ? 504 : 502, { error: error.name === 'TimeoutError' ? 'A geração demorou demais.' : 'Resposta inválida ou serviço indisponível.' }, origin);
  }
});
server.listen(port, host, () => console.log(`Local Gemini proxy listening on http://${host}:${port}/synopsis`));
