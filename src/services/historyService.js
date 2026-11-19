import { collection, doc, getDocs, query, runTransaction, serverTimestamp, setDoc, where } from 'firebase/firestore';
import { Linking } from 'react-native';
import { auth, db } from '../config/firebaseConfig';

export function normalizeBrazilianPhone(value) {
  let digits = String(value || '').replace(/\D/g, '');
  if (digits.length === 12 || digits.length === 13) {
    if (!digits.startsWith('55')) throw new Error('Informe um telefone brasileiro válido.');
    digits = digits.slice(2);
  }
  if (!/^[1-9][1-9](?:9\d{8}|[2-5]\d{7})$/.test(digits)) throw new Error('Informe um telefone brasileiro válido com DDD.');
  return `55${digits}`;
}

export async function openHistoryWhatsApp(seller, book) {
  const phone = normalizeBrazilianPhone(seller.sellerWhatsapp);
  const price = Number(book.price).toFixed(2).replace('.', ',');
  const message = encodeURIComponent(`Olá ${seller.sellerName || ''}! Vi o anúncio do livro "${book.title}" por R$ ${price} no Sebo Perto e tenho interesse.`);
  try { await Linking.openURL(`https://wa.me/${phone}?text=${message}`); }
  catch { throw new Error('Não foi possível abrir o WhatsApp. O contato permanece no histórico.'); }
}

export async function startWhatsAppNegotiation(book, openWhatsAppApp = true) {
  const user = auth.currentUser;
  if (!user) throw new Error('Entre na conta para negociar.');
  if (!book?.id || !book.sellerId || book.isMock || book.sellerId === user.uid || !book.title || !Number.isFinite(Number(book.price))) throw new Error('Anúncio inválido ou indisponível para negociação.');
  const phone = normalizeBrazilianPhone(book.sellerWhatsapp);
  const historyRef = doc(collection(db, 'negotiation_history'));
  const record = {
    id: historyRef.id, readerId: user.uid, readerEmail: user.email || '', sellerId: book.sellerId,
    bookSnapshot: { originalBookId: book.id, title: book.title, author: book.author || '', price: Number(book.price), condition: book.condition || '', coverUrl: book.coverUrl || '' },
    sellerSnapshot: { sellerName: book.sellerName || '', sellerWhatsapp: phone, location: book.location || {} },
    reported: false, createdAt: serverTimestamp(),
  };
  await setDoc(historyRef, record);
  if (openWhatsAppApp) await openHistoryWhatsApp(record.sellerSnapshot, record.bookSnapshot);
  return record;
}

export async function getReaderHistory() {
  if (!auth.currentUser) return [];
  const result = await getDocs(query(collection(db, 'negotiation_history'), where('readerId', '==', auth.currentUser.uid)));
  return result.docs.map(item => ({ ...item.data(), id: item.id }));
}

export async function finalizeNegotiationAndLike(historyId, sellerId, giveLike) {
  if (!auth.currentUser) throw new Error('Entre na conta para continuar.');
  if (giveLike) throw new Error('Avaliações estão indisponíveis até a configuração de um servidor seguro.');
  await runTransaction(db, async transaction => {
    const historyRef = doc(db, 'negotiation_history', historyId);
    const record = await transaction.get(historyRef);
    if (!record.exists() || record.data().readerId !== auth.currentUser.uid) throw new Error('Histórico não encontrado.');
    if (record.data().status === 'finalizado') throw new Error('Negociação já finalizada.');
    transaction.update(historyRef, { status: 'finalizado', liked: false, finalizedAt: serverTimestamp() });
  });
}

export async function reportSellerFromHistory() {
  throw new Error('Denúncias estão indisponíveis até a configuração de um servidor seguro.');
}
