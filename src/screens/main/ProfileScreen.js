import React, { useState, useEffect } from 'react';
import { 
  View, Text, TouchableOpacity, ScrollView, TextInput, 
  ActivityIndicator, Modal, Alert 
} from 'react-native';
import { styles } from './styles/ProfileStyles';

import Header from '../../components/Header';
import KeyboardScreen from '../../components/KeyboardScreen';
import BottomNavbar from '../../components/BottomNavbar';
import SellerPromoBox from '../../components/profile/SellerPromoBox';

import { 
  getUserProfile, 
  updateUserProfile, 
  deleteUserAccount, 
  logoutUser 
} from '../../services/authService';

export default function ProfileScreen({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  
  const [userData, setUserData] = useState(null);
  
  const [editForm, setEditForm] = useState({ name: '', email: '', whatsappPhone: '' });

  useEffect(() => {
    let active = true;
    getUserProfile().then(data => {
      if (!active) return;
      if (!data) { Alert.alert('Erro', 'Perfil não encontrado.'); return; }
      setUserData(data);
      setEditForm({ name: data.name || '', email: data.email || '', whatsappPhone: data.storeProfile?.whatsappPhone || '' });
    }).catch(() => {
      if (active) Alert.alert('Erro', 'Não foi possível carregar os dados.');
    }).finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  const getInitials = (name) => {
    if (!name) return 'ME';
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  const formatDate = (timestamp) => {
    if (!timestamp) return '';
    
    if (typeof timestamp.toDate === 'function') {
      const date = timestamp.toDate();
      return date.toLocaleDateString('pt-BR', { month: 'long', year: 'numeric' });
    }
    
    if (typeof timestamp === 'string') {
      const parts = timestamp.split(' ');
      if (parts.length >= 5) {
          return `${parts[2]} de ${parts[4]}`;
      }
      return timestamp;
    }
    
    return '';
  };

  const handleSaveProfile = async () => {
    setSaving(true);
    try {
      // 2. ADICIONADO whatsappPhone NOS PARÂMETROS DE ATUALIZAÇÃO
      await updateUserProfile({ 
        name: editForm.name, 
        email: editForm.email,
        whatsappPhone: editForm.whatsappPhone
      });
      
      // 2.1 ATUALIZANDO O ESTADO LOCAL DO USUÁRIO
      setUserData(prev => ({ 
        ...prev, 
        name: editForm.name, 
        email: editForm.email,
        storeProfile: {
          ...prev.storeProfile,
          whatsappPhone: editForm.whatsappPhone
        }
      }));
      
      setIsEditing(false);
      Alert.alert("Sucesso", "Perfil atualizado com sucesso.");
    } catch (error) {
      Alert.alert("Erro", error.message || "Falha ao atualizar perfil. Tente novamente.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteAccount = async () => {
    try {
      await deleteUserAccount(userData.uid);
      setShowDeleteModal(false);
      navigation.replace('Login');
    } catch (error) {
      Alert.alert("Erro", "Não foi possível excluir a conta. Talvez precise relogar.");
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigation.replace('Login');
    } catch (error) {
      Alert.alert("Erro", "Problema ao tentar sair da conta.");
    }
  };

  const handleTabPress = (tabId) => {
    if (tabId === 'Profile') return;
    if (tabId === 'Home') navigation.navigate('HomeTab');
    if (tabId === 'Activity') navigation.navigate('ChatHistoryTab');
    if (tabId === 'Ads') navigation.navigate('MyAdsTab');
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator color="#000000" size="large"/>
      </View>
    );
  }

  if (!userData) return <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 24 }]}><Text>Não foi possível carregar o perfil.</Text><TouchableOpacity onPress={() => navigation.navigate('HomeTab')} style={{ padding: 16 }}><Text>Voltar à vitrine</Text></TouchableOpacity></View>;

  const isSeller = userData.role === 'seller' || userData.kyc?.verified;
  const roleDisplay = isSeller ? 'Vendedor' : 'Leitor';

  return (
    <View style={styles.container}>
      
      <Header 
        userName={userData.name} 
        onPressAvatar={() => {}} 
        isFixed={true} 
      />

      <KeyboardScreen>
      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false} keyboardShouldPersistTaps="handled" keyboardDismissMode="on-drag">
        
        <Text style={styles.pageContext}>Minha Conta</Text>
        <Text style={styles.pageTitle}>Perfil</Text>
        <Text style={styles.pageDescription}>Gerencie seus dados, preferências e atividades.</Text>

        <View style={styles.profileCard}>
          <View style={styles.avatarLarge}>
            <Text style={styles.avatarLargeText}>{getInitials(userData.name)}</Text>
          </View>
          <Text style={styles.profileName}>{userData.name}</Text>
          <Text style={styles.profileSince}>{roleDisplay} desde {formatDate(userData.createdAt)}</Text>
          
          <View style={styles.dividerDark}/>
          
          <View style={styles.statsRow}>
            <Text style={styles.statsIcon}>💬</Text>
            <Text style={styles.statsText}>{userData.reportCount || 0} contatos registrados</Text>
          </View>
          <View style={styles.statsRow}>
            <Text style={styles.statsIcon}>📍</Text>
            <Text style={styles.statsText}>
              {userData.location?.city || 'Cidade não informada'}, {userData.location?.state || 'UF'}
            </Text>
          </View>
        </View>

        <View style={styles.infoCard}>
          <View style={styles.infoHeaderRow}>
            <Text style={styles.infoTitle}>Informações cadastrais</Text>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)} style={styles.editBtn}>
              <Text style={styles.editText}>✎ {isEditing ? 'Cancelar' : 'Editar'}</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>NOME</Text>
            {isEditing ? (
              <TextInput 
                onChangeText={(txt) => setEditForm({...editForm, name: txt})} 
                style={styles.inputField} 
                value={editForm.name} 
              />
            ) : (
              <Text style={styles.infoValue}>{userData.name}</Text>
            )}
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>E-MAIL</Text>
            {isEditing ? (
              <TextInput 
                onChangeText={(txt) => setEditForm({...editForm, email: txt})} 
                style={styles.inputField} 
                value={editForm.email} 
                keyboardType="email-address"
                autoCapitalize="none"
              />
            ) : (
              <Text style={styles.infoValue}>{userData.email}</Text>
            )}
          </View>

           <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>NÚMERO DE TELEFONE</Text>
            {isEditing ? (
              <TextInput 
                onChangeText={(txt) => setEditForm({...editForm, whatsappPhone: txt})} 
                style={styles.inputField} 
                value={editForm.whatsappPhone} 
                keyboardType="phone-pad"
              />
            ) : (
              <Text style={styles.infoValue}>{userData.storeProfile?.whatsappPhone || 'Não informado'}</Text>
            )}
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>LOCALIZAÇÃO</Text>
            <Text style={[styles.infoValue, isEditing && { color: '#999' }]}>
              {userData.location?.city || 'Não informada'} {userData.location?.state || ''}
            </Text>
          </View>

          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>TIPO DE CONTA</Text>
            <Text style={[styles.infoValue, isEditing && { color: '#999' }]}>
              {roleDisplay}
            </Text>
          </View>

          {/* O BLOCO DUPLICADO DE TELEFONE QUE ESTAVA AQUI FOI REMOVIDO */}

          {isEditing && (
            <TouchableOpacity disabled={saving} onPress={handleSaveProfile} style={styles.saveBtn}>
              {saving ? <ActivityIndicator color="#FFF"/> : <Text style={styles.saveBtnText}>Salvar Alterações</Text>}
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity onPress={() => navigation.navigate('ChatHistoryTab')} style={styles.historyBtn}>
          <View style={styles.historyBtnContent}>
            <Text style={styles.historyIcon}>💬</Text>
            <View>
              <Text style={styles.historyTitle}>Histórico de negociações</Text>
              <Text style={styles.historySubtitle}>Veja seus contatos com vendedores</Text>
            </View>
          </View>
          <Text style={styles.historyIcon}></Text>
        </TouchableOpacity>

        <SellerPromoBox 
          isSeller={isSeller} 
          onPress={() => navigation.navigate('KycVerification')} 
        />
        
        {isSeller && (
            <TouchableOpacity onPress={() => navigation.navigate('MyAdsTab')} style={styles.historyBtn}>
                <View style={styles.historyBtnContent}>
                <Text style={styles.historyIcon}>📘</Text>
                <View>
                    <Text style={styles.historyTitle}>Espaço do Vendedor</Text>
                    <Text style={styles.historySubtitle}>Gerencie seus anúncios</Text>
                </View>
                </View>
                <Text style={styles.historyIcon}></Text>
            </TouchableOpacity>
        )}

        <TouchableOpacity onPress={handleLogout} style={styles.logoutBtn}>
          <Text style={styles.logoutText}>→ Sair da conta</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setShowDeleteModal(true)} style={styles.deleteAccountBtn}>
          <Text style={styles.deleteAccountText}>🗑 Excluir minha conta</Text>
        </TouchableOpacity>

      </ScrollView>
      </KeyboardScreen>

      <BottomNavbar activeTab="Profile" onTabPress={handleTabPress}/>

      <Modal animationType="fade" transparent={true} visible={showDeleteModal}>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <TouchableOpacity onPress={() => setShowDeleteModal(false)} style={styles.modalCloseBtn}>
              <Text style={styles.modalCloseText}>✕</Text>
            </TouchableOpacity>
            
            <Text style={styles.modalTitle}>Excluir Conta?</Text>
            <Text style={styles.modalDescription}>
              Tem certeza que deseja excluir sua conta? Todos os seus dados, histórico e anúncios serão perdidos. Esta ação não pode ser desfeita.
            </Text>
            
            <TouchableOpacity onPress={handleDeleteAccount} style={styles.modalActionBtn}>
              <Text style={styles.modalActionText}>Deletar</Text>
            </TouchableOpacity>
            
            <TouchableOpacity onPress={() => setShowDeleteModal(false)} style={styles.modalCancelBtn}>
              <Text style={styles.modalCancelText}>Cancelar</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

    </View>
  );
}
