// Search covers without storing API credentials in the application.
export async function findIllustrativeCover(title, author) {
  if (!title.trim() || !author.trim()) throw new Error('Preencha título e autor antes de buscar a capa.');
  const query = `intitle:${title.trim()} inauthor:${author.trim()}`;
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), 12000);
  try {
    const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(query)}&maxResults=5`, { signal: controller.signal }).catch(() => null);
    const normalize = value => value.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
    const data = response?.ok ? await response.json() : {};
    const item = (data.items || []).find(book => {
      const info = book.volumeInfo || {};
      return normalize(info.title || '').includes(normalize(title.trim())) && (info.authors || []).some(name => normalize(name).includes(normalize(author.trim())) || normalize(author.trim()).includes(normalize(name)));
    });
    const cover = item?.volumeInfo?.imageLinks?.thumbnail || item?.volumeInfo?.imageLinks?.smallThumbnail;
    if (cover) return cover.replace(/^http:\/\//, 'https://');
    const fallback = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(title.trim())}&author=${encodeURIComponent(author.trim())}&fields=title,author_name,cover_i&limit=5`, { signal: controller.signal });
    if (!fallback.ok) throw new Error('Busca de capas indisponível. Você pode publicar sem foto.');
    const result = await fallback.json();
    const match = (result.docs || []).find(book => book.cover_i && normalize(book.title || '').includes(normalize(title.trim())) && (book.author_name || []).some(name => normalize(name).includes(normalize(author.trim())) || normalize(author.trim()).includes(normalize(name))));
    if (!match) throw new Error('Nenhuma capa correspondente foi encontrada. Você pode publicar sem foto.');
    return `https://covers.openlibrary.org/b/id/${match.cover_i}-M.jpg?default=false`;
  } catch (error) {
    if (error.name === 'AbortError') throw new Error('A busca de capa demorou demais.');
    if (error instanceof TypeError) throw new Error('Sem conexão para buscar a capa.');
    throw error;
  } finally { clearTimeout(timer); }
}
