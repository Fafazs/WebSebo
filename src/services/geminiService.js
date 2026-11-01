// File: src/services/geminiService.js
// Requirement: RF09 (Google AI Studio / Gemini API - Auto Synopsis & Categories)
import { ENV } from '../config/env';

export async function generateSynopsisWithGemini(bookTitle, bookAuthor) {
  if (!ENV.GEMINI_API_KEY || ENV.GEMINI_API_KEY.includes('COLE_SUA_CHAVE')) {
    // Fallback mock para teste caso a chave da IA não esteja inserida
    return {
      synopsis: `Sinopse gerada automaticamente para "${bookTitle}" de ${bookAuthor}: Uma obra marcante que explora temas profundos da experiência humana.`,
      categories: ['Romance', 'Literatura Brasileira'],
    };
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${ENV.GEMINI_API_KEY}`;
  const prompt = `Gere uma sinopse curta em português (máximo 300 caracteres, sem spoilers) e até 4 categorias literárias curtas para o livro "${bookTitle}" do autor "${bookAuthor}". Responda ESTRITAMENTE em JSON válido no formato: {"synopsis": "...", "categories": ["...", "..."]}`;

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: { responseMimeType: 'application/json' },
    }),
  });

  const data = await response.json();
  const rawText = data?.candidates?.[0]?.content?.parts?.[0]?.text;
  if (!rawText) throw new Error('Failed to generate synopsis from Gemini.');
  return JSON.parse(rawText);
}