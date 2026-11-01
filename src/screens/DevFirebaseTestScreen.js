// File: src/screens/DevFirebaseTestScreen.js
// Engineering Test Suite for Sprint 1: Validates all Firebase & Gemini services
import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { registerUser, loginUser, activateSellerKyc, resetUserPassword } from '../services/authService';
import { createBookAd, getFeedBooks, deleteBookAd } from '../services/bookService';
import { generateSynopsisWithGemini } from '../services/geminiService';
import { startWhatsAppNegotiation, reportSellerFromHistory } from '../services/historyService';

export default function DevFirebaseTestScreen({ navigation }) {
  const [logs, setLogs] = useState(['Pronto para testar o Firebase Nativo...']);
  const [lastBook, setLastBook] = useState(null);
  const [lastHistory, setLastHistory] = useState(null);

  const addLog = (msg) => setLogs(prev => [`[${new Date().toLocaleTimeString()}] ${msg}`, ...prev]);

  // 1. Test Auth & Profile Creation (RF02, RF04, RF05)
  const handleTestAuth = async () => {
    try {
      const testEmail = `sebeiro_${Date.now()}@teste.com`;
      addLog(`Criando usuário Leitor: ${testEmail}...`);
      const user = await registerUser('Fabricio Teste', testEmail, '123456');
      addLog(`✅ RF02/RF04 OK! UID: ${user.uid} | Perfil: ${user.role}`);
    } catch (e) {
      addLog(`❌ Erro Auth: ${e.message}`);
    }
  };

  // 2. Test KYC Seller Verification (RF06, RF08)
  const handleTestKyc = async () => {
    try {
      addLog('Ativando conta de Vendedor (KYC)...');
      await activateSellerKyc({
        cpf: '123.456.789-00',
        address: 'Av. da Universidade, 2853',
        city: 'Fortaleza',
        state: 'CE',
        neighborhood: 'Benfica',
        storeName: 'Sebo Girassol',
        storeDescription: 'Clássicos e raridades no Benfica',
        whatsappPhone: '5585999999999',
        termsAccepted: true,
      });
      addLog('✅ RF06/RF08 OK! Usuário agora é Vendedor Verificado.');
    } catch (e) {
      addLog(`❌ Erro KYC: ${e.message}`);
    }
  };

  // 3. Test Gemini AI + Book CRUD (RF07, RF09, RF10)
  const handleTestCreateBookWithAI = async () => {
    try {
      addLog('Gerando sinopse via Gemini AI (RF09)...');
      const aiResult = await generateSynopsisWithGemini('Torto Arado', 'Itamar Vieira Junior');
      addLog(`✨ IA respondeu: ${aiResult.categories.join(', ')}`);

      addLog('Salvando livro no Firestore (RF07)...');
      const book = await createBookAd({
        title: 'Torto Arado',
        author: 'Itamar Vieira Junior',
        price: 32,
        condition: 'Muito Bom',
        synopsis: aiResult.synopsis,
        categories: aiResult.categories,
      });
      setLastBook(book);

      const feed = await getFeedBooks({ city: 'Fortaleza' });
      addLog(`✅ RF07/RF10 OK! Livro criado (${book.id}). Total no Feed: ${feed.length}`);
    } catch (e) {
      addLog(`❌ Erro CRUD Livro: ${e.message}`);
    }
  };

  // 4. Test WhatsApp Snapshot + Anti-Fraud Reporteven after Book Deletion (RF11, RF12, RF13, RNF03)
  const handleTestHistoryAndAntiFraud = async () => {
    try {
      if (!lastBook) {
        addLog('⚠️ Crie um livro no botão 3 primeiro!');
        return;
      }
      addLog('1/3 Gravando Snapshot no Histórico de Negociações (RF11)...');
      const historyRecord = await startWhatsAppNegotiation(lastBook, false);
      setLastHistory(historyRecord);
      addLog(`Snapshot salvo: ${historyRecord.id}`);

      addLog('2/3 Vendedor malicioso apagou o livro do Feed (RF07 Delete)...');
      await deleteBookAd(lastBook.id);
      addLog('Livro deletado do Feed!');

      addLog('3/3 Leitor denuncia pelo Histórico mesmo sem o anúncio existir (RF13/RNF03)...');
      const reportResult = await reportSellerFromHistory(historyRecord.id, 'Anúncio apagado após pagamento');
      addLog(`✅ RF13/RNF03 OK! Denúncias do vendedor: ${reportResult.newReportCount} | Suspenso: ${reportResult.sellerSuspended}`);
    } catch (e) {
      addLog(`❌ Erro Histórico/Denúncia: ${e.message}`);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>⚙️ Painel de Engenharia (Sprint 1)</Text>
      <Text style={styles.subtitle}>Teste todo o Firebase antes de liberar para a equipe</Text>

      <TouchableOpacity style={styles.btn} onPress={handleTestAuth}>
        <Text style={styles.btnText}>1. Testar Cadastro Leitor (RF02 / RF04)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={handleTestKyc}>
        <Text style={styles.btnText}>2. Testar Virar Vendedor KYC (RF06 / RF08)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={handleTestCreateBookWithAI}>
        <Text style={styles.btnText}>3. Testar Gemini IA + Criar Livro (RF07 / RF09)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={handleTestHistoryAndAntiFraud}>
        <Text style={styles.btnText}>4. Testar Snapshot + Deletar + Denunciar (RF11-RF14)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, styles.navBtn]} onPress={() => navigation.navigate('Onboarding')}>
        <Text style={styles.btnText}>👉 Ir para as 12 Telas do Protótipo</Text>
      </TouchableOpacity>

      <ScrollView style={styles.logBox}>
        {logs.map((log, index) => (
          <Text key={index} style={styles.logText}>{log}</Text>
        ))}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#111', padding: 16 },
  title: { color: '#FFF', fontSize: 18, fontWeight: 'bold' },
  subtitle: { color: '#AAA', fontSize: 12, marginBottom: 12 },
  btn: { backgroundColor: '#222', padding: 12, borderRadius: 8, marginBottom: 8, minHeight: 44, justifyContent: 'center', borderWidth: 1, borderColor: '#444' },
  navBtn: { backgroundColor: '#25D366', borderColor: '#25D366' },
  btnText: { color: '#FFF', fontWeight: '600', fontSize: 13 },
  logBox: { flex: 1, backgroundColor: '#000', borderRadius: 8, padding: 10, marginTop: 8 },
  logText: { color: '#00FF66', fontFamily: 'monospace', fontSize: 12, marginBottom: 6 },
});