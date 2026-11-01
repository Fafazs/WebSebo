import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function HomeScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>TELA 4 • RF10 / RNF01</Text>
      <Text style={styles.title}>Achados na sua região</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('BookDetails')}>
        <Text style={styles.btnText}>📖 Ver Detalhes do Livro (Tela 5)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.navigate('SearchFilterModal')}>
        <Text style={styles.outlineText}>🔍 Abrir Filtros (Tela 11)</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 24, justifyContent: 'center' },
  badge: { color: '#666', fontSize: 11, fontWeight: 'bold', marginBottom: 8 },
  title: { color: '#111', fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  btn: { backgroundColor: '#111', height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 15 },
  outlineBtn: { borderWidth: 1, borderColor: '#CCC', height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  outlineText: { color: '#111', fontWeight: 'bold', fontSize: 15 }
});