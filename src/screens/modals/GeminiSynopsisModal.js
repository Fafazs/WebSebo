import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function GeminiSynopsisModal({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>TELA 12 • MODAL • RF09</Text>
      <Text style={styles.title}>Geração de Sinopse via IA</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>Usar sinopse sugerida</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 24, justifyContent: 'center' },
  badge: { color: '#666', fontSize: 11, fontWeight: 'bold', marginBottom: 8 },
  title: { color: '#111', fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  btn: { backgroundColor: '#111', height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 }
});