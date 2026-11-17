// File: src/services/geminiService.js
// Requirement: RF09 (Google AI Studio / Gemini API - Auto Synopsis & Categories)
import { ENV } from '../config/env';

const COMPATIBLE_MODELS = [
  'gemini-4-hydrogen',
  'gemini-3.1-flash-lite',
  // 'gemini-4-argon', // Descomente se usar chave com faturamento (tier pago)
];

const RETRYABLE_STATUSES = new Set([429, 500, 503, 504]);

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

export async function generateSynopsisWithGemini(bookTitle, bookAuthor) {
  const apiKey = ENV.GEMINI_API_KEY?.trim();

  if (!apiKey) {
    throw new Error("Chave da API Gemini não encontrada no config/env.js.");
  }

  const prompt = `Gere uma sinopse curta em português (máximo 300 caracteres, sem spoilers) e até 4 categorias literárias curtas para o livro "${bookTitle}" do autor "${bookAuthor}". Responda ESTRITAMENTE em JSON válido no formato exato: {"synopsis": "...", "categories": ["...", "..."]}.`;

  let lastError = null;

  for (let i = 0; i < COMPATIBLE_MODELS.length; i++) {
    const model = COMPATIBLE_MODELS[i];
    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent`;

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }],
          generationConfig: {
            responseMimeType: 'application/json',
          },
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        const message = data.error?.message || 'Falha na requisição';
        const isHighDemand =
          RETRYABLE_STATUSES.has(response.status) ||
          /high demand|overloaded|unavailable/i.test(message);

        const err = new Error(`[${model} | Erro ${response.status}] ${message}`);

        // Se for erro de chave/permissão (400/403), não adianta trocar de modelo
        if (!isHighDemand) {
          throw err;
        }

        console.warn(`⚠️ ${model} indisponível/alta demanda. Tentando próximo modelo...`, message);
        lastError = err;

        // Pequena pausa antes de tentar o próximo modelo
        if (i < COMPATIBLE_MODELS.length - 1) {
          await sleep(600);
        }
        continue;
      }

      let rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

      if (!rawText) {
        throw new Error(`[${model}] A API não retornou o texto esperado no objeto JSON.`);
      }

      rawText = rawText.replace(/```json/g, '').replace(/```/g, '').trim();
      return JSON.parse(rawText);
    } catch (error) {
      lastError = error;

      // Se o erro não for de rede/demanda, repassa imediatamente
      const isNetworkOrDemand =
        error.name === 'TypeError' ||
        /429|500|503|504|high demand|overloaded|unavailable/i.test(error.message);

      if (!isNetworkOrDemand || i === COMPATIBLE_MODELS.length - 1) {
        console.error("🔥 ERRO DISPARADO NO GEMINI SERVICE:", error);
        throw error;
      }

      await sleep(600);
    }
  }

  throw lastError || new Error("Todos os modelos compatíveis falharam.");
}