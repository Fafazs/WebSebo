import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function ChatHistoryScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>TELA 10 • RF12 / RF13 / RF14</Text>
      <Text style={styles.title}>Minhas Conversas (Histórico)</Text>
      <Text style={styles.desc}>Lista de contatos iniciados e botão de denúncia persistente.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 24, justifyContent: 'center' },
  badge: { color: '#666', fontSize: 11, fontWeight: 'bold', marginBottom: 8 },
  title: { color: '#111', fontSize: 24, fontWeight: 'bold', marginBottom: 12 },
  desc: { color: '#666', fontSize: 14 }
});