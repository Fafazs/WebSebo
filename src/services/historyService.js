// File: src/services/historyService.js
// Requirements: RF11 (WhatsApp Redirect & Log), RF12 (Interaction History), RF13 (Persistent Report), RF14 (Auto-Suspension), RNF03 (Auditability Snapshot), RNF06 (Prevent Duplicate Reports)
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  addDoc,
  query,
  where,
  writeBatch,
  serverTimestamp,
} from 'firebase/firestore';
import { Linking } from 'react-native';
import { auth, db } from '../config/firebaseConfig';

const MAX_REPORTS_BEFORE_SUSPENSION = 3; // RF14 threshold

// RF11 & RNF03: Save immutable snapshot and redirect to WhatsApp
export async function startWhatsAppNegotiation(book, openWhatsAppApp = true) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('User must be logged in to negotiate.');

  const historyRef = doc(collection(db, 'negotiation_history'));
  const snapshotRecord = {
    id: historyRef.id,
    readerId: currentUser.uid,
    readerEmail: currentUser.email,
    sellerId: book.sellerId,
    bookSnapshot: {
      originalBookId: book.id,
      title: book.title,
      author: book.author,
      price: book.price,
      condition: book.condition,
      coverUrl: book.coverUrl,
    },
    sellerSnapshot: {
      sellerName: book.sellerName,
      sellerWhatsapp: book.sellerWhatsapp,
      location: book.location,
    },
    reported: false, // RNF06 control
    createdAt: serverTimestamp(),
  };

  await setDoc(historyRef, snapshotRecord);

  // RF11: Open WhatsApp with pre-filled message
  if (openWhatsAppApp && book.sellerWhatsapp) {
    const message = encodeURIComponent(
      `Olá ${book.sellerName}! Vi seu anúncio do livro "${book.title}" (R$ ${book.price}) no app Sebo Online e tenho interesse.`
    );
    const whatsappUrl = `https://wa.me/${book.sellerWhatsapp}?text=${message}`;
    const canOpen = await Linking.canOpenURL(whatsappUrl);
    if (canOpen) {
      await Linking.openURL(whatsappUrl);
    }
  }

  return snapshotRecord;
}

// RF12: Get reader's permanent negotiation history
export async function getReaderHistory() {
  const currentUser = auth.currentUser;
  if (!currentUser) return [];

  const q = query(collection(db, 'negotiation_history'), where('readerId', '==', currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(item => item.data());
}

// RF13, RF14, RNF06: Report a seller from history (works even if original book was deleted)
export async function reportSellerFromHistory(historyId, reason = 'Suspeita de fraude / Anúncio falso') {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('User not authenticated.');

  const historyRef = doc(db, 'negotiation_history', historyId);
  const historySnap = await getDoc(historyRef);
  if (!historySnap.exists()) throw new Error('Negotiation record not found.');

  const historyData = historySnap.data();

  // RNF06: Prevent duplicate consecutive reports on the same negotiation
  if (historyData.reported) {
    throw new Error('Você já denunciou esta negociação (RNF06).');
  }

  const sellerId = historyData.sellerId;

  // 1. Mark negotiation as reported
  await updateDoc(historyRef, {
    reported: true,
    reportedAt: serverTimestamp(),
  });

  // 2. Create audit report document (RF13)
  await addDoc(collection(db, 'reports'), {
    historyId,
    reporterId: currentUser.uid,
    sellerId,
    reason,
    bookSnapshot: historyData.bookSnapshot,
    sellerSnapshot: historyData.sellerSnapshot,
    createdAt: serverTimestamp(),
  });

  // 3. Increment seller report count and check RF14 punishment threshold
  const sellerRef = doc(db, 'users', sellerId);
  const sellerSnap = await getDoc(sellerRef);
  const currentReports = (sellerSnap.data()?.reportCount || 0) + 1;
  const shouldSuspend = currentReports >= MAX_REPORTS_BEFORE_SUSPENSION;

  await updateDoc(sellerRef, {
    reportCount: currentReports,
    status: shouldSuspend ? 'suspended' : 'active',
  });

  // 4. RF14: If seller reaches 3 reports, hide all their books from the feed automatically
  if (shouldSuspend) {
    const booksQuery = query(collection(db, 'books'), where('sellerId', '==', sellerId));
    const sellerBooks = await getDocs(booksQuery);
    const batch = writeBatch(db);
    sellerBooks.docs.forEach(bookDoc => {
      batch.update(bookDoc.ref, { isVisible: false, sellerStatus: 'suspended' });
    });
    await batch.commit();
  }

  return { newReportCount: currentReports, sellerSuspended: shouldSuspend };
}