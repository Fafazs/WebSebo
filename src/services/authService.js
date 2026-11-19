// File: src/services/authService.js
// Requirements: RF02 (Auth), RF04 (Default Reader Profile), RF05 (Login/Reset Password), RF06 (KYC Seller Verification)
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  deleteUser // <-- ADICIONADO PARA DELETAR CONTA
} from 'firebase/auth';
import { doc, setDoc, getDoc, updateDoc, serverTimestamp, deleteDoc } from 'firebase/firestore'; // <-- ADICIONADO deleteDoc
import { auth, db } from '../config/firebaseConfig';




// File: src/services/authService.js (Atualização da função registerUser)
export async function registerUser({ fullName, email, password, city, state, whatsappPhone }) {
  const userCredential = await createUserWithEmailAndPassword(auth, email.trim(), password);
  const { uid } = userCredential.user;

  // Limpa o WhatsApp removendo caracteres especiais
  const cleanPhone = whatsappPhone ? whatsappPhone.replace(/\D/g, '') : '';

  const userData = {
    uid,
    name: fullName.trim(),
    email: email.trim().toLowerCase(),
    role: 'reader', // Default profile "Leitor" (RF04)
    status: 'active', // 'active' | 'suspended' (RF14)
    reportCount: 0,
    location: { 
      city: city ? city.trim() : 'Fortaleza', 
      state: state ? state.trim() : 'CE', 
      neighborhood: '' 
    },
    storeProfile: {
      whatsappPhone: cleanPhone // WhatsApp guardado para os futuros anúncios
    },
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

// Get current logged user profile from Firestore (RENOMEADO PARA getUserProfile para bater com a tela)
export async function getUserProfile() {
  const currentUser = auth.currentUser;
  if (!currentUser) return null;
  const userSnap = await getDoc(doc(db, 'users', currentUser.uid));
  return userSnap.exists() ? userSnap.data() : null;
}

export async function updateUserProfile({ name, email, whatsappPhone }) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('User not authenticated.');
  if (email.trim().toLowerCase() !== (currentUser.email || '').toLowerCase()) throw new Error('A alteração de e-mail não está disponível.');

  // Prepara os dados básicos
  const updateData = {
    name: name.trim(),
    email: email.trim().toLowerCase()
  };

  // Se o telefone foi enviado, limpa os caracteres especiais e adiciona ao update
  // Usamos a notação de ponto (dot notation) para não apagar outros dados do storeProfile (como storeName)
  if (whatsappPhone !== undefined) {
    updateData['storeProfile.whatsappPhone'] = whatsappPhone.replace(/\D/g, ''); 
  }

  await updateDoc(doc(db, 'users', currentUser.uid), updateData);
}

// EXCLUIR CONTA DEFINITIVAMENTE
export async function deleteUserAccount(uid) {
  const currentUser = auth.currentUser;
  if (!currentUser) throw new Error('User not authenticated.');

  // 1. Deleta os dados do banco Firestore
  await deleteDoc(doc(db, 'users', uid));
  
  // 2. Deleta a autenticação do usuário
  await deleteUser(currentUser);
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

  // Proteção extra caso o número chegue indefinido
  const cleanPhone = whatsappPhone ? whatsappPhone.replace(/\D/g, '') : '';

  const updateData = {
    role: 'seller',
    location: { city, state, neighborhood, address },
    kyc: {
      termsAccepted: true,
      verified: false,
      activatedAt: serverTimestamp(),
    },
    storeProfile: {
      storeName: storeName || `Sebo de ${currentUser.email.split('@')[0]}`,
      description: storeDescription || 'Acervo independente de livros usados.',
      whatsappPhone: cleanPhone, // <-- Agora usa a variável tratada
      city,
      state,
      neighborhood,
    },
  };

  await updateDoc(doc(db, 'users', currentUser.uid), updateData);
  return updateData;
}
