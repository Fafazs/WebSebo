// File: src/screens/ScreenPlaceholders.js
// Contains the ready-to-navigate skeletons for all 12 screens in the Prototype
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

function BaseTemplate({ screenNumber, title, requirement, children }) {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>TELA {screenNumber} DO PROTÓTIPO • {requirement}</Text>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.actions}>{children}</View>
    </View>
  );
}

export function OnboardingScreen({ navigation }) {
  return (
    <BaseTemplate screenNumber="1" title="SEBO ONLINE - Splash / Onboarding" requirement="RF01">
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnText}>Começar Agora → (Ir para Login)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.devBtn} onPress={() => navigation.navigate('DevTest')}>
        <Text style={styles.devBtnText}>⚙️ Abrir Painel de Testes Firebase</Text>
      </TouchableOpacity>
    </BaseTemplate>
  );
}

export function LoginScreen({ navigation }) {
  return (
    <BaseTemplate screenNumber="2" title="Entre na sua conta" requirement="RF02 / RF05">
      <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('MainTabs')}>
        <Text style={styles.btnText}>Entrar → (Ir para Home)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.navigate('Register')}>
        <Text style={styles.outlineBtnText}>Criar uma conta nova</Text>
      </TouchableOpacity>
    </BaseTemplate>
  );
}

export function RegisterScreen({ navigation }) {
  return (
    <BaseTemplate screenNumber="3" title="Crie sua conta (Leitor)" requirement="RF04">
      <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('MainTabs')}>
        <Text style={styles.btnText}>Criar conta →</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.outlineBtnText}>Já tenho uma conta</Text>
      </TouchableOpacity>
    </BaseTemplate>
  );
}

export function HomeScreen({ navigation }) {
  return (
    <BaseTemplate screenNumber="4" title="Achados na sua região (Vitrine)" requirement="RF10 / RNF01">
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('BookDetails')}>
        <Text style={styles.btnText}>📖 Ver Detalhes do Livro (Tela 5)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.navigate('SearchFilterModal')}>
        <Text style={styles.outlineBtnText}>🔍 Abrir Filtros de Busca (Tela 11)</Text>
      </TouchableOpacity>
    </BaseTemplate>
  );
}

export function BookDetailsScreen({ navigation }) {
  return (
    <BaseTemplate screenNumber="5" title="Detalhes do Livro (Torto Arado)" requirement="RF11">
      <TouchableOpacity style={[styles.btn, { backgroundColor: '#25D366' }]} onPress={() => navigation.navigate('MainTabs', { screen: 'ChatHistoryTab' })}>
        <Text style={styles.btnText}>💬 Chamar no WhatsApp (Salva Snapshot)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.outlineBtnText}>← Voltar</Text>
      </TouchableOpacity>
    </BaseTemplate>
  );
}

export function ProfileScreen({ navigation }) {
  return (
    <BaseTemplate screenNumber="6" title="Perfil (Leitor)" requirement="RF04 / RF06">
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('KycVerification')}>
        <Text style={styles.btnText}>Ativar conta de vendedor (Tela 7 - KYC)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.replace('Login')}>
        <Text style={styles.outlineBtnText}>Sair da conta</Text>
      </TouchableOpacity>
    </BaseTemplate>
  );
}

export function KycVerificationScreen({ navigation }) {
  return (
    <BaseTemplate screenNumber="7" title="Ative sua conta de vendedor (KYC)" requirement="RF06 / RNF02">
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('MainTabs', { screen: 'MyAdsTab' })}>
        <Text style={styles.btnText}>Enviar para validação →</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.outlineBtnText}>← Voltar</Text>
      </TouchableOpacity>
    </BaseTemplate>
  );
}

export function MyAdsScreen({ navigation }) {
  return (
    <BaseTemplate screenNumber="8" title="Meus anúncios (Área do Vendedor)" requirement="RF07 / RF08">
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AddBook')}>
        <Text style={styles.btnText}>Cadastrar novo livro + (Tela 9)</Text>
      </TouchableOpacity>
    </BaseTemplate>
  );
}

export function AddBookScreen({ navigation }) {
  return (
    <BaseTemplate screenNumber="9" title="Cadastrar livro" requirement="RF07 / RF09">
      <TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.navigate('GeminiSynopsisModal')}>
        <Text style={styles.outlineBtnText}>✨ Gerar sinopse e tags com IA (Tela 12)</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>Publicar anúncio →</Text>
      </TouchableOpacity>
    </BaseTemplate>
  );
}

export function ChatHistoryScreen() {
  return (
    <BaseTemplate screenNumber="10" title="Minhas conversas (Histórico)" requirement="RF12 / RF13 / RF14">
      <Text style={{ color: '#555', marginBottom: 12 }}>Aqui ficam os Snapshots salvos ao clicar no WhatsApp e o botão de Denunciar.</Text>
    </BaseTemplate>
  );
}

export function SearchFilterModal({ navigation }) {
  return (
    <BaseTemplate screenNumber="11" title="Filtros de busca (Modal)" requirement="RF10">
      <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>Aplicar filtros</Text>
      </TouchableOpacity>
    </BaseTemplate>
  );
}

export function GeminiSynopsisModal({ navigation }) {
  return (
    <BaseTemplate screenNumber="12" title="Gerar sinopse com IA (Modal)" requirement="RF09">
      <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>Usar sinopse sugerida</Text>
      </TouchableOpacity>
    </BaseTemplate>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FAFAFA', padding: 24, justifyContent: 'center' },
  badge: { fontSize: 11, fontWeight: 'bold', color: '#666', marginBottom: 8 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#111', marginBottom: 24 },
  actions: { gap: 12 },
  btn: { backgroundColor: '#111', minHeight: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, marginBottom: 10 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  outlineBtn: { backgroundColor: '#FFF', minHeight: 48, borderRadius: 10, borderWidth: 1, borderColor: '#CCC', justifyContent: 'center', alignItems: 'center', paddingHorizontal: 16, marginBottom: 10 },
  outlineBtnText: { color: '#111', fontWeight: '600', fontSize: 15 },
  devBtn: { marginTop: 20, padding: 12, backgroundColor: '#EEE', borderRadius: 8, alignItems: 'center' },
  devBtnText: { color: '#333', fontSize: 13, fontWeight: 'bold' },
});