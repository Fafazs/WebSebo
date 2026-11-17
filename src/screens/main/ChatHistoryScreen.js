import React, { useState, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, 
  ActivityIndicator, Alert, Modal, Linking 
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';

import { styles } from './styles/HistoryStyles';
import { theme } from '../../theme';
import Header from '../../components/Header';
import BottomNavbar from '../../components/BottomNavbar';

import { getUserProfile } from '../../services/authService';
import { getReaderHistory, reportSellerFromHistory, finalizeNegotiationAndLike } from '../../services/historyService';

const COVER_COLORS = ['#4A4641', '#004A7C', '#A83B00', '#2E4C3B', '#5A3D5C'];

export default function ChatHistoryScreen({ navigation }) {
  const [userData, setUserData] = useState(null);
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  // Estados dos Modais
  const [selectedChat, setSelectedChat] = useState(null);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  
  // Estado para o fluxo de finalização
  const [isFinalizing, setIsFinalizing] = useState(false);
  const [giveLike, setGiveLike] = useState(true);
  const [savingAction, setSavingAction] = useState(false);

  const loadData = async () => {
    try {
      setLoading(true);
      const profile = await getUserProfile();
      setUserData(profile);

      const userHistory = await getReaderHistory();
      const sortedHistory = userHistory.sort((a, b) => {
        const dateA = a.createdAt?.toDate ? a.createdAt.toDate() : new Date(a.createdAt);
        const dateB = b.createdAt?.toDate ? b.createdAt.toDate() : new Date(b.createdAt);
        return dateB - dateA;
      });
      setHistory(sortedHistory);
    } catch (error) {
      console.error(error);
      Alert.alert('Erro', 'Não foi possível carregar as suas conversas.');
    } finally {
      setLoading(false);
    }
  };

  useFocusEffect(React.useCallback(() => { loadData(); }, []));

  // --- Ações dos Modais ---

  const handleOpenChatOptions = (item) => {
    setSelectedChat(item);
    setIsFinalizing(false);
    setGiveLike(true);
    setShowOptionsModal(true);
  };

  const handleCallWhatsApp = async () => {
    if (!selectedChat?.sellerSnapshot?.sellerWhatsapp) return;
    
    // Pega o número do banco
    let phone = selectedChat.sellerSnapshot.sellerWhatsapp;
    
    // Se não começar com 55, a gente empurra o 55 pra dentro dele
    if (!phone.startsWith('55')) {
      phone = '55' + phone;
    }

    const whatsappUrl = `https://wa.me/${phone}`;
    
    const canOpen = await Linking.canOpenURL(whatsappUrl);
    if (canOpen) {
      await Linking.openURL(whatsappUrl);
    } else {
      Alert.alert('Erro', 'Não foi possível abrir o WhatsApp.');
    }
  };

  const handleFinalizeSave = async () => {
    try {
      setSavingAction(true);
      await finalizeNegotiationAndLike(selectedChat.id, selectedChat.sellerId, giveLike);
      Alert.alert('Sucesso', 'Negociação finalizada! Obrigado pelo seu feedback.');
      setShowOptionsModal(false);
      loadData(); // Recarrega para atualizar o status na lista
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível salvar.');
    } finally {
      setSavingAction(false);
    }
  };

  const handleConfirmReport = async () => {
    try {
      setSavingAction(true);
      await reportSellerFromHistory(selectedChat.id);
      Alert.alert('Denúncia Registrada', 'Nossa equipe irá analisar imediatamente.');
      setShowReportModal(false);
      loadData(); 
    } catch (error) {
      Alert.alert('Erro', error.message || 'Não foi possível registrar a denúncia.');
    } finally {
      setSavingAction(false);
    }
  };

  // --- Helpers ---

  const formatChatDate = (timestamp) => {
    if (!timestamp) return '';
    const date = typeof timestamp.toDate === 'function' ? timestamp.toDate() : new Date(timestamp);
    const now = new Date();
    const isToday = date.getDate() === now.getDate() && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    if (isToday) return `Hoje, ${hours}:${minutes}`;
    const months = ['jan', 'fev', 'mar', 'abr', 'mai', 'jun', 'jul', 'ago', 'set', 'out', 'nov', 'dez'];
    return `${date.getDate().toString().padStart(2, '0')} ${months[date.getMonth()]}, ${hours}:${minutes}`;
  };

  const getInitials = (title) => {
    if (!title) return 'LV';
    const parts = title.trim().split(' ');
    if (parts.length > 1) return (parts[0][0] + parts[1][0]).toUpperCase();
    return title.substring(0, 2).toUpperCase();
  };

  const handleTabPress = (tabId) => {
    if (tabId === 'Activity') return;
    if (tabId === 'Home') navigation.navigate('HomeTab');
    if (tabId === 'Ads') navigation.navigate('MyAdsTab');
    if (tabId === 'Profile') navigation.navigate('ProfileTab');
  };

  return (
    <View style={styles.container}>
      <Header userName={userData?.name || ''} onPressAvatar={() => navigation.navigate('ProfileTab')} isFixed={true} />

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <Text style={styles.pageContext}>SUA ATIVIDADE</Text>
        <Text style={styles.pageTitle}>Minhas conversas</Text>
        <Text style={styles.pageDescription}>
          Todos os contatos iniciados com sebos e vendedores, organizados por data.
        </Text>

        {loading ? (
          <ActivityIndicator color={theme.colors.textPrimaryLight} size="large" style={{ marginTop: 40 }} />
        ) : history.length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyStateIcon}>💬</Text>
            <Text style={styles.emptyStateText}>Você ainda não iniciou nenhuma conversa com vendedores.</Text>
          </View>
        ) : (
          <View style={styles.listContainer}>
            {history.map((item, index) => {
              const coverBg = COVER_COLORS[index % COVER_COLORS.length];
              const bookData = item.bookSnapshot || {};
              const sellerData = item.sellerSnapshot || {};
              const isFinalizado = item.status === 'finalizado'; // <-- Verifica status no banco

              return (
                <View key={item.id}>
                  {/* Clicar no card abre as opções */}
                  <TouchableOpacity style={styles.chatItem} activeOpacity={0.7} onPress={() => handleOpenChatOptions(item)}>
                    
                    <View style={styles.itemTopRow}>
                      <View style={[styles.bookCover, { backgroundColor: coverBg }]}>
                        <View style={styles.coverTopLine} />
                        <View style={styles.coverDot} />
                        <Text style={styles.coverInitials}>{getInitials(bookData.title)}</Text>
                      </View>

                      <View style={styles.itemDetails}>
                        <Text style={styles.bookTitle} numberOfLines={1}>{bookData.title || 'Livro'}</Text>
                        <Text style={styles.sellerName} numberOfLines={1}>{sellerData.sellerName || 'Vendedor'}</Text>
                        
                        <View style={[styles.statusBadge, isFinalizado && styles.statusBadgeFinalizado]}>
                          <Text style={[styles.statusBadgeText, isFinalizado && styles.statusBadgeTextFinalizado]}>
                            {isFinalizado ? 'Negociação finalizada' : 'Contato iniciado'}
                          </Text>
                        </View>
                      </View>
                    </View>

                    <View style={styles.itemBottomRow}>
                      <View style={styles.timeRow}>
                        <Text style={styles.clockIcon}>🕒</Text>
                        <Text style={styles.timeText}>{formatChatDate(item.createdAt)}</Text>
                      </View>

                      {item.reported && (
                        <Text style={styles.reportedLabel}>⚠️ Denúncia registrada</Text>
                      )}
                    </View>

                  </TouchableOpacity>
                  {index < history.length - 1 && <View style={styles.divider} />}
                </View>
              );
            })}
          </View>
        )}
      </ScrollView>

      <BottomNavbar activeTab="Activity" onTabPress={handleTabPress} />

      {/* --- MODAL 1: OPÇÕES DA CONVERSA --- */}
      <Modal animationType="fade" transparent={true} visible={showOptionsModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            
            <TouchableOpacity onPress={() => setShowOptionsModal(false)} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Opções da Conversa</Text>
            <Text style={styles.modalDescription}>
              Livro: {selectedChat?.bookSnapshot?.title}
            </Text>

            {/* Ação 1: WhatsApp */}
            <TouchableOpacity style={styles.modalWhatsappBtn} onPress={handleCallWhatsApp}>
              <Text style={styles.modalWhatsappIcon}>💬</Text>
              <Text style={styles.modalWhatsappText}>Chamar de novo no WhatsApp</Text>
            </TouchableOpacity>

            {/* Ação 2: Finalizar (Se ainda não foi finalizado) */}
            {!selectedChat?.status || selectedChat?.status !== 'finalizado' ? (
              
              !isFinalizing ? (
                <TouchableOpacity style={styles.modalSecondaryBtn} onPress={() => setIsFinalizing(true)}>
                  <Text style={styles.modalSecondaryBtnText}>Marcar como finalizado</Text>
                </TouchableOpacity>
              ) : (
                <View style={styles.likeBox}>
                  <Text style={styles.likeBoxTitle}>Avalie o vendedor</Text>
                  <Text style={styles.likeBoxSub}>Sua curtida ajuda o sebo a ter mais visibilidade.</Text>
                  
                  <View style={styles.likeButtonsRow}>
                    <TouchableOpacity 
                      style={[styles.likeOption, giveLike && styles.likeOptionActive]} 
                      onPress={() => setGiveLike(true)}
                    >
                      <Text style={[styles.likeIcon, giveLike && styles.likeIconActive]}>👍 Curti</Text>
                    </TouchableOpacity>

                    <TouchableOpacity 
                      style={[styles.likeOption, !giveLike && styles.likeOptionActive]} 
                      onPress={() => setGiveLike(false)}
                    >
                      <Text style={[styles.likeIcon, !giveLike && styles.likeIconActive]}>👎 Não curti</Text>
                    </TouchableOpacity>
                  </View>

                  <TouchableOpacity style={styles.modalConfirmBtn} onPress={handleFinalizeSave} disabled={savingAction}>
                    {savingAction ? <ActivityIndicator color="#FFF" /> : <Text style={styles.modalConfirmText}>Salvar Finalização</Text>}
                  </TouchableOpacity>
                </View>
              )

            ) : (
              <View style={styles.finalizedInfoBox}>
                <Text style={styles.finalizedInfoText}>✓ Esta negociação já foi marcada como finalizada.</Text>
              </View>
            )}

            {/* Ação 3: Denunciar */}
            {!selectedChat?.reported && (
              <TouchableOpacity 
                style={{ marginTop: 24, alignSelf: 'center' }} 
                onPress={() => {
                  setShowOptionsModal(false);
                  setTimeout(() => setShowReportModal(true), 300); // Aguarda fechar um modal pra abrir outro
                }}
              >
                <Text style={styles.reportText}>Denunciar vendedor / golpe</Text>
              </TouchableOpacity>
            )}

          </View>
        </View>
      </Modal>

      {/* --- MODAL 2: DENUNCIAR VENDEDOR (Estilo Modal Excluir) --- */}
      <Modal animationType="fade" transparent={true} visible={showReportModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setShowReportModal(false)} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Denunciar Vendedor?</Text>
            <Text style={styles.modalDescription}>
              Tem certeza que deseja denunciar o anúncio/vendedor <Text style={{fontWeight:'bold'}}>"{selectedChat?.sellerSnapshot?.sellerName}"</Text> por suspeita de fraude? Nossa equipe irá analisar a denúncia imediatamente.
            </Text>
            
            <TouchableOpacity onPress={handleConfirmReport} style={styles.modalDangerBtn} disabled={savingAction}>
              {savingAction ? <ActivityIndicator color="#FFF" /> : <Text style={styles.modalDangerText}>Denunciar</Text>}
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setShowReportModal(false)} style={styles.modalCancelBtn} disabled={savingAction}>
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}