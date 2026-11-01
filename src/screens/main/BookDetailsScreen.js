import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function BookDetailsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>TELA 5 • RF11</Text>
      <Text style={styles.title}>Detalhes do Livro</Text>

      <TouchableOpacity style={styles.whatsappBtn} onPress={() => navigation.navigate('MainTabs', { screen: 'ChatHistoryTab' })}>
        <Text style={styles.btnText}>💬 Chamar no WhatsApp</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.backBtn} onPress={() => navigation.goBack()}>
        <Text style={styles.backText}>← Voltar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 24, justifyContent: 'center' },
  badge: { color: '#666', fontSize: 11, fontWeight: 'bold', marginBottom: 8 },
  title: { color: '#111', fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  whatsappBtn: { backgroundColor: '#25D366', height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  backBtn: { height: 48, justifyContent: 'center', alignItems: 'center' },
  backText: { color: '#666', fontWeight: '600' }
});