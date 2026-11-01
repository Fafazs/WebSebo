// File: src/services/bookService.js
// Requirements: RF03 (Firestore), RF07 (Book CRUD + Storage), RF08 (Store Profile CRUD), RF10 (Feed & Filters)
import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  updateDoc,
  deleteDoc,
  query,
  where,
  serverTimestamp,
} from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { auth, db, storage } from '../config/firebaseConfig';

// Helper: Upload book cover image to Firebase Storage (RF07)
export async function uploadBookCover(localUri) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('User not authenticated.');

  const response = await fetch(localUri);
  const blob = await response.blob();

  const filename = `books/${currentUser.uid}/${Date.now()}.jpg`;
  const storageRef = ref(storage, filename);

  await uploadBytes(storageRef, blob);
  const downloadUrl = await getDownloadURL(storageRef);
  return downloadUrl;
}

// RF07 (CREATE): Publish a new book ad
export async function createBookAd({ title, author, price, condition, synopsis, categories, coverUrl }) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('User not authenticated.');

  const sellerSnap = await getDoc(doc(db, 'users', currentUser.uid));
  const sellerData = sellerSnap.data();

  if (!sellerData || sellerData.role !== 'seller') {
    throw new Error('Only verified sellers can publish books (RF06).');
  }
  if (sellerData.status === 'suspended') {
    throw new Error('Seller account is suspended due to reports (RF14).');
  }

  const newBookRef = doc(collection(db, 'books'));
  const bookData = {
    id: newBookRef.id,
    title: title.trim(),
    titleLower: title.trim().toLowerCase(),
    author: author.trim(),
    price: Number(price),
    condition,
    synopsis: synopsis || '',
    categories: categories || ['Geral'],
    coverUrl: coverUrl || 'https://via.placeholder.com/300x450.png?text=Sem+Capa',
    sellerId: currentUser.uid,
    sellerName: sellerData.storeProfile?.storeName || sellerData.name,
    sellerWhatsapp: sellerData.storeProfile?.whatsappPhone || '',
    sellerVerified: Boolean(sellerData.kyc?.verified),
    sellerStatus: sellerData.status || 'active',
    location: {
      city: sellerData.location?.city || 'Fortaleza',
      state: sellerData.location?.state || 'CE',
      neighborhood: sellerData.location?.neighborhood || 'Centro',
    },
    isVisible: true,
    createdAt: serverTimestamp(),
  };

  await setDoc(newBookRef, bookData);
  return bookData;
}

// RF07 (READ - Seller Dashboard): Get all books from logged seller
export async function getMyBookAds() {
  const currentUser = auth.currentUser;
  if (!currentUser) return [];

  const q = query(collection(db, 'books'), where('sellerId', '==', currentUser.uid));
  const snapshot = await getDocs(q);
  return snapshot.docs.map(item => item.data());
}

// RF10 (READ - Reader Feed with Filters): Get active books for Home Vitrine
export async function getFeedBooks({ searchQuery = '', category = 'Todos', city = '', neighborhood = '' } = {}) {
  const q = query(collection(db, 'books'), where('isVisible', '==', true));
  const snapshot = await getDocs(q);
  const books = snapshot.docs.map(item => item.data());

  return books.filter(book => {
    const matchesCategory = category === 'Todos' || !category || book.categories?.includes(category);
    const matchesCity = !city || book.location?.city?.toLowerCase() === city.toLowerCase();
    const matchesNeighborhood = !neighborhood || book.location?.neighborhood?.toLowerCase() === neighborhood.toLowerCase();
    const term = searchQuery.trim().toLowerCase();
    const matchesSearch = !term || book.title?.toLowerCase().includes(term) || book.author?.toLowerCase().includes(term);

    return matchesCategory && matchesCity && matchesNeighborhood && matchesSearch;
  });
}

// RF07 (UPDATE): Edit an existing book ad
export async function updateBookAd(bookId, updatedFields) {
  await updateDoc(doc(db, 'books', bookId), {
    ...updatedFields,
    updatedAt: serverTimestamp(),
  });
  return true;
}

// RF07 (DELETE): Delete a book ad from feed (History snapshots remain intact per RNF03)
export async function deleteBookAd(bookId) {
  await deleteDoc(doc(db, 'books', bookId));
  return true;
}

// RF08 (CRUD 2 - Update Store Profile): Seller updates store details
export async function updateSellerStoreProfile({ storeName, description, whatsappPhone, city, state, neighborhood }) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('User not authenticated.');

  await updateDoc(doc(db, 'users', currentUser.uid), {
    'storeProfile.storeName': storeName,
    'storeProfile.description': description,
    'storeProfile.whatsappPhone': whatsappPhone.replace(/\D/g, ''),
    'location.city': city,
    'location.state': state,
    'location.neighborhood': neighborhood,
  });
  return true;
}