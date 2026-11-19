// Gemini credentials must stay on a trusted server.
import { ENV } from '../config/env';

export async function generateSynopsisWithGemini(bookTitle, bookAuthor) {
  const title = bookTitle?.trim();
  const author = bookAuthor?.trim();
  if (!title || !author) throw new Error('Informe o título e o autor.');
  const endpoint = ENV.GEMINI_PROXY_URL?.trim();
  const localHttp = /^http:\/\/(?:localhost|127\.0\.0\.1|10(?:\.\d{1,3}){3}|192\.168(?:\.\d{1,3}){2}|172\.(?:1[6-9]|2\d|3[01])(?:\.\d{1,3}){2})(?::\d+)?\/synopsis$/.test(endpoint || '');
  if (!endpoint || !(endpoint.startsWith('https://') || (__DEV__ && localHttp))) {
    throw new Error('IA indisponível: servidor seguro não configurado. Preencha a sinopse manualmente.');
  }
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 25000);
  try {
    const response = await fetch(endpoint, {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author }), signal: controller.signal,
    });
    if (response.status === 401 || response.status === 403) throw new Error('Autenticação da IA recusada.');
    if (response.status === 429) {
      const details = await response.json().catch(() => ({}));
      throw new Error(details.source === 'local' ? 'Limite local: aguarde um minuto para gerar outra sinopse.' : 'Limite da API Google atingido. Tente mais tarde.');
    }
    if (!response.ok) throw new Error('Serviço de IA indisponível. Tente mais tarde.');
    const data = await response.json();
    if (typeof data.synopsis !== 'string' || !data.synopsis.trim() || !Array.isArray(data.categories) || !data.categories.length || !data.categories.every(item => typeof item === 'string' && item.trim())) {
      throw new Error('A IA retornou uma resposta inválida.');
    }
    return { synopsis: data.synopsis.trim(), categories: data.categories.map(item => item.trim()).slice(0, 4), cached: data.cached === true };
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('A geração demorou demais. Tente novamente.');
    if (error instanceof TypeError) throw new Error('Sem conexão com o serviço de IA.');
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}
