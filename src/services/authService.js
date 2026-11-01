// File: src/services/authService.js
// Requirements: RF02 (Auth), RF04 (Default Reader Profile), RF05 (Login/Reset Password), RF06 (KYC Seller Verification)
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';

// RF04: Register new user with default "reader" role
export async function registerUser(fullName, email, password, city = 'Fortaleza', state = 'CE') {
  const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  const { uid } = userCredential.user;

  const userData = {
    uid,
    name: fullName.trim(),
    email: email.trim().toLowerCase(),
    role: 'reader', // Default profile "Leitor" (RF04)
    status: 'active', // 'active' | 'suspended' (RF14)
    reportCount: 0,
    location: { city, state, neighborhood: '' },
    storeProfile: null,
    kyc: { verified: false, cpf: null, termsAccepted: false },
    createdAt: serverTimestamp(),
  };

  await setDoc(doc(db, 'users', uid), userData);
  return userData;
}

// RF05: Login existing user
export async function loginUser(email, password) {
  const userCredential = await signInWithEmailAndPassword(auth, email.trim(), password);
  const userSnap = await getDoc(doc(db, 'users', userCredential.user.uid));
  return userSnap.exists() ? userSnap.data() : null;
}

// RF05: Password Recovery (Mandatory requirement from Professor Lyndainês)
export async function resetUserPassword(email) {
  await sendPasswordResetEmail(auth, email.trim());
  return true;
}

// RF02: Logout
export async function logoutUser() {
  await signOut(auth);
}

// Get current logged user profile from Firestore
export async function getCurrentUserProfile() {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;
  const userSnap = await getDoc(doc(db, 'users', currentUser.uid));
  return userSnap.exists() ? userSnap.data() : null;
}

// RF06 & RF08: Activate Seller Account (KYC Verification + Initial Store Setup)
export async function activateSellerKyc({
  cpf,
  address,
  city,
  state,
  neighborhood,
  storeName,
  storeDescription,
  whatsappPhone,
  termsAccepted,
}) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('User not authenticated.');
  if (!termsAccepted) throw new Error('Legal responsibility terms must be accepted.');

  const updateData = {
    role: 'seller',
    location: { city, state, neighborhood, address },
    kyc: {
      cpf: cpf.replace(/\D/g, ''), // RNF02: Clean digits
      termsAccepted: true,
      verified: true,
      verifiedAt: serverTimestamp(),
    },
    storeProfile: {
      storeName: storeName || `Sebo de ${currentUser.email.split('@')[0]}`,
      description: storeDescription || 'Acervo independente de livros usados.',
      whatsappPhone: whatsappPhone.replace(/\D/g, ''),
      city,
      state,
      neighborhood,
    },
  };

  await updateDoc(doc(db, 'users', currentUser.uid), updateData);
  return updateData;
}