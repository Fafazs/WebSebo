import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function AddBookScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>TELA 9 • RF07</Text>
      <Text style={styles.title}>Cadastrar Livro</Text>

      <TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.navigate('GeminiSynopsisModal')}>
        <Text style={styles.outlineText}>✨ Gerar sinopse com IA (Tela 12)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.goBack()}>
        <Text style={styles.btnText}>Publicar anúncio →</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 24, justifyContent: 'center' },
  badge: { color: '#666', fontSize: 11, fontWeight: 'bold', marginBottom: 8 },
  title: { color: '#111', fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  outlineBtn: { borderWidth: 1, borderColor: '#111', height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  outlineText: { color: '#111', fontWeight: 'bold', fontSize: 15 },
  btn: { backgroundColor: '#111', height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 }
});