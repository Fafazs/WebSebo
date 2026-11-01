import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function MyAdsScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>TELA 8 • RF07 / RF08</Text>
      <Text style={styles.title}>Meus Anúncios</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('AddBook')}>
        <Text style={styles.btnText}>Cadastrar novo livro +</Text>
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