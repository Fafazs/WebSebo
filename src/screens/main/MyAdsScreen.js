// File: src/screens/main/MyAdsScreen.js
import React, { useState } from 'react';
import * as ImagePicker from 'expo-image-picker';
import { useFocusEffect } from '@react-navigation/native';
import { 
  View, Text, TouchableOpacity, ScrollView, TextInput,
  ActivityIndicator, Alert, RefreshControl, Modal 
} from 'react-native';
import { styles } from './styles/MyAdsStyles';
import { theme } from '../../theme';// Importando o theme para o botãozinho da IA

import BookCover from '../../components/BookCover';
import KeyboardScreen from '../../components/KeyboardScreen';
import Header from '../../components/Header';
import BottomNavbar from '../../components/BottomNavbar';

import { getUserProfile } from '../../services/authService';
import { getMyBookAds, deleteBookAd, updateBookAd, uploadBookCover } from '../../services/bookService';
// Importando o serviço da IA para usar no modal de edição
import { generateSynopsisWithGemini } from '../../services/geminiService';

export default function MyAdsScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [userData, setUserData] = useState(null);
  const [myAds, setMyAds] = useState([]);
  
  // Estados do Modal de Exclusão
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [bookToDelete, setBookToDelete] = useState(null);
  const [deleting, setDeleting] = useState(false);

  // Estados do Modal de Edição (Patch)
  const [showEditModal, setShowEditModal] = useState(false);
  const [savingEdit, setSavingEdit] = useState(false);
  const [loadingAIEdit, setLoadingAIEdit] = useState(false); // Carregamento da IA na edição
  const [editCoverUri, setEditCoverUri] = useState('');
  const [editForm, setEditForm] = useState({
    id: '', title: '', author: '', price: '', condition: '', synopsis: ''
  });

  async function loadData() {
    try {
      setLoading(true);
      const profile = await getUserProfile();
      setUserData(profile);

      if (profile && profile.role === 'seller') {
        const ads = await getMyBookAds();
        setMyAds(ads);
      }
    } catch (error) {
      console.error("Erro ao carregar área do vendedor:", error);
      Alert.alert("Erro", "Não foi possível carregar as informações.");
    } finally {
      setLoading(false);
    }
  }

  useFocusEffect(React.useCallback(() => {
    loadData();
  }, []));

  const onRefresh = async () => {
    setRefreshing(true);
    await loadData();
    setRefreshing(false);
  };

  // --- LÓGICA DE EXCLUSÃO ---
  const openDeleteModal = (bookId) => {
    setBookToDelete(bookId);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!bookToDelete) return;
    try {
      setDeleting(true);
      await deleteBookAd(bookToDelete);
      setMyAds(prevAds => prevAds.filter(ad => ad.id !== bookToDelete));
      setShowDeleteModal(false);
    } catch (error) {
      console.error("Erro ao deletar:", error);
      Alert.alert("Erro", "Não foi possível excluir o anúncio.");
    } finally {
      setDeleting(false);
      setBookToDelete(null);
    }
  };

  // --- LÓGICA DE EDIÇÃO ---
  const openEditModal = (book) => {
    setEditCoverUri('');
    setEditForm({
      id: book.id,
      title: book.title || '',
      author: book.author || '',
      price: book.price ? book.price.toString().replace('.', ',') : '',
      condition: book.condition || '',
      synopsis: book.synopsis || ''
    });
    setShowEditModal(true);
  };

  const saveEdit = async () => {
    try {
      setSavingEdit(true);
      
      const numericPrice = parseFloat(editForm.price.replace(',', '.'));
      if (!editForm.title.trim() || !editForm.author.trim() || !Number.isFinite(numericPrice) || numericPrice <= 0) throw new Error('Informe título, autor e preço válido.');
      
      const patchData = {
        title: editForm.title,
        author: editForm.author,
        price: isNaN(numericPrice) ? 0 : numericPrice,
        condition: editForm.condition,
        synopsis: editForm.synopsis
      };
      if (editCoverUri) { patchData.coverUrl = await uploadBookCover(editCoverUri); patchData.coverIllustrative = false; }

      await updateBookAd(editForm.id, patchData);

      setMyAds(prevAds => prevAds.map(ad => 
        ad.id === editForm.id ? { ...ad, ...patchData } : ad
      ));

      setShowEditModal(false);
    } catch (error) {
      console.error("Erro ao editar:", error);
      Alert.alert("Erro", error.message || "Não foi possível salvar as alterações.");
    } finally {
      setSavingEdit(false);
    }
  };

  // --- LÓGICA DA IA NO MODAL ---
  const handleGenerateAIEdit = async () => {
    if (!editForm.title || !editForm.author) {
      Alert.alert('Dados Insuficientes', 'O Título e Autor precisam estar preenchidos para a IA funcionar.');
      return;
    }
    
    try {
      setLoadingAIEdit(true);
      const generatedData = await generateSynopsisWithGemini(editForm.title, editForm.author);
      if (generatedData.cached) Alert.alert('Sinopse recuperada', 'Esta sugestão foi recuperada do cache local.');
      
      // Atualiza apenas a sinopse no formulário (ignora categorias para esse patch rápido)
      setEditForm(prev => ({ ...prev, synopsis: generatedData.synopsis }));
      
    } catch (error) {
      console.error(error);
      Alert.alert('Erro na IA', error.message || 'Não foi possível gerar a sinopse agora.');
    } finally {
      setLoadingAIEdit(false);
    }
  };

  const handleTabPress = (tabId) => {
    if (tabId === 'Ads') return;
    if (tabId === 'Home') navigation.navigate('HomeTab');
    if (tabId === 'Activity') navigation.navigate('ChatHistoryTab');
    if (tabId === 'Profile') navigation.navigate('ProfileTab');
  };

  const getBookInitials = (title) => {
    if (!title) return 'LV';
    const words = title.split(' ');
    if (words.length > 1) return (words[0][0] + words[1][0]).toUpperCase();
    return title.substring(0, 2).toUpperCase();
  };

  if (loading || !userData) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color="#000000" size="large"/>
      </View>
    );
  }

  const isSeller = userData.role === 'seller';

  return (
    <View style={styles.container}>
      <Header 
        userName={userData.name} 
        onPressAvatar={() => navigation.navigate('ProfileTab')} 
        isFixed={true} 
      />

      <ScrollView 
        contentContainerStyle={styles.scrollContent} 
        showsVerticalScrollIndicator={false}
        refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}
      >
        <Text style={styles.pageContext}>ÁREA DO VENDEDOR</Text>
        <Text style={styles.pageTitle}>Meus anúncios</Text>
        <Text style={styles.pageDescription}>Acompanhe e gerencie os livros publicados.</Text>

        {!isSeller ? (
          <View style={styles.emptyContainer}>
            <Text style={{fontSize: 40}}>🔒</Text>
            <Text style={styles.emptyTitle}>Área Restrita</Text>
            <Text style={styles.emptyText}>
              Para publicar e gerenciar anúncios, você precisa ativar sua conta de vendedor preenchendo as informações necessárias.
            </Text>
            <TouchableOpacity 
              style={styles.becomeSellerBtn}
              onPress={() => navigation.navigate('KycVerification')}
            >
              <Text style={{color: '#000', fontWeight: 'bold'}}>Tornar-se Vendedor →</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <TouchableOpacity style={styles.addBookBtn} onPress={() => navigation.navigate('AddBook')}>
              <Text style={{fontSize: 18, color: '#111'}}>+</Text>
              <Text style={styles.addBookBtnText}>Cadastrar novo livro</Text>
            </TouchableOpacity>

            <View style={styles.statusCardDark}>
              <Text style={styles.statusCardLabelDark}>STATUS DA CONTA</Text>
              <View style={styles.statusCardValueRow}>
                <View style={styles.statusDot} />
                <Text style={styles.statusCardValueDark}>Ativa</Text>
              </View>
            </View>

            <View style={styles.statCardLight}>
              <Text style={styles.statCardLabelLight}>ANÚNCIOS ATIVOS</Text>
              <Text style={styles.statCardValueLight}>{myAds.length}</Text>
            </View>

            <View style={styles.listHeaderRow}>
              <Text style={styles.listTitle}>Anúncios ativos</Text>
              <Text style={styles.listSubtitle}>Atualizado agora</Text>
            </View>

            {myAds.length === 0 ? (
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyText}>Você ainda não possui nenhum livro cadastrado.</Text>
              </View>
            ) : (
              myAds.map((ad) => (
                <View key={ad.id} style={styles.adCard}>
                  <View style={styles.adCardTop}>
                    <BookCover uri={ad.coverUrl} title={ad.title} style={styles.adCoverPlaceholder} />

                    <View style={styles.adInfo}>
                      <Text style={styles.adTitle}>{ad.title}</Text>
                      <Text style={styles.adDetails}>
                        R$ {typeof ad.price === 'number' ? ad.price.toFixed(2).replace('.', ',') : ad.price} · {ad.location?.neighborhood || userData.location?.city || 'Fortaleza'}
                      </Text>
                      <View style={styles.adBadge}>
                        <View style={styles.adBadgeDot} />
                        <Text style={styles.adBadgeText}>Publicado</Text>
                      </View>
                    </View>
                  </View>
                  
                  <View style={styles.adActionsRow}>
                    <TouchableOpacity style={[styles.actionBtn, { marginRight: 8 }]} onPress={() => openEditModal(ad)}>
                      <Text style={styles.actionBtnText}>✎ Editar</Text>
                    </TouchableOpacity>
                    
                    <TouchableOpacity style={styles.actionBtn} onPress={() => openDeleteModal(ad.id)}>
                      <Text style={styles.deleteBtnText}>🗑 Excluir</Text>
                    </TouchableOpacity>
                  </View>
                </View>
              ))
            )}
          </>
        )}
      </ScrollView>

      <BottomNavbar activeTab="Ads" onTabPress={handleTabPress}/>

      {/* MODAL DE EXCLUSÃO */}
      <Modal animationType="fade" transparent={true} visible={showDeleteModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setShowDeleteModal(false)} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Excluir Anúncio</Text>
            <Text style={styles.modalDescription}>
              Tem certeza que deseja apagar este livro? Esta ação não pode ser desfeita.
            </Text>
            
            <TouchableOpacity 
              style={styles.modalActionBtn} 
              onPress={confirmDelete}
              disabled={deleting}
            >
              {deleting ? <ActivityIndicator color="#FFF" /> : <Text style={styles.modalActionText}>Excluir</Text>}
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.modalCancelBtn} onPress={() => setShowDeleteModal(false)} disabled={deleting}>
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* MODAL DE EDIÇÃO (Patch) */}
      <Modal animationType="slide" transparent={true} visible={showEditModal}>
        <KeyboardScreen>
        <View style={styles.modalOverlay}>
          <View style={styles.editModalContent}>
            
            <TouchableOpacity onPress={() => setShowEditModal(false)} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Editar Anúncio</Text>
            
            <ScrollView showsVerticalScrollIndicator={false} style={{ width: '100%', marginTop: 10 }} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
              <TouchableOpacity onPress={async () => {
                try {
                  const result = await ImagePicker.launchImageLibraryAsync({ mediaTypes: ['images'], quality: 0.8 });
                  if (!result.canceled) setEditCoverUri(result.assets[0].uri);
                } catch { Alert.alert('Erro', 'Não foi possível selecionar a foto.'); }
              }} style={{ minHeight: 48, justifyContent: 'center' }}>
                <Text>Selecionar nova foto</Text>
                {editCoverUri ? <BookCover uri={editCoverUri} title={editForm.title} style={{ width: 80, height: 110 }} /> : null}
              </TouchableOpacity>
              
              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>TÍTULO</Text>
                <TextInput 
                  style={styles.inputField} 
                  value={editForm.title} 
                  onChangeText={(txt) => setEditForm({...editForm, title: txt})} 
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>AUTOR</Text>
                <TextInput 
                  style={styles.inputField} 
                  value={editForm.author} 
                  onChangeText={(txt) => setEditForm({...editForm, author: txt})} 
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>PREÇO</Text>
                <TextInput 
                  style={styles.inputField} 
                  keyboardType="numeric"
                  value={editForm.price} 
                  onChangeText={(txt) => setEditForm({...editForm, price: txt})} 
                />
              </View>

              <View style={styles.inputContainer}>
                <Text style={styles.inputLabel}>ESTADO DE CONSERVAÇÃO</Text>
                <TextInput 
                  style={styles.inputField} 
                  value={editForm.condition} 
                  onChangeText={(txt) => setEditForm({...editForm, condition: txt})} 
                />
              </View>

              {/* INPUT COM O NOVO BOTÃO DA IA */}
              <View style={styles.inputContainer}>
                <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 6}}>
                  <Text style={[styles.inputLabel, {marginBottom: 0}]}>SINOPSE</Text>
                  
                  <TouchableOpacity 
                    onPress={handleGenerateAIEdit} 
                    disabled={loadingAIEdit}
                    style={{ backgroundColor: '#F0F4F8', paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 }}
                  >
                    {loadingAIEdit ? (
                      <ActivityIndicator size="small" color={theme.colors.primary} />
                    ) : (
                      <Text style={{fontSize: 10, color: '#333', fontWeight: 'bold'}}>✨ GERAR COM IA</Text>
                    )}
                  </TouchableOpacity>
                </View>

                <TextInput 
                  style={[styles.inputField, styles.textArea]} 
                  multiline={true}
                  value={editForm.synopsis} 
                  onChangeText={(txt) => setEditForm({...editForm, synopsis: txt})} 
                />
              </View>

              <TouchableOpacity 
                style={styles.editSaveBtn} 
                onPress={saveEdit}
                disabled={savingEdit}
              >
                {savingEdit ? <ActivityIndicator color="#000" /> : <Text style={styles.modalCancelText}>Salvar Alterações</Text>}
              </TouchableOpacity>

            </ScrollView>
          </View>
        </View>
        </KeyboardScreen>
      </Modal>

    </View>
  );
}
