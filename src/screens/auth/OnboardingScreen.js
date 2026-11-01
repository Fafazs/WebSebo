import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function OnboardingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>TELA 1 • RF01</Text>
      <Text style={styles.title}>Livros perto. Histórias sem fim.</Text>
      <Text style={styles.desc}>Encontre sebos e livros na sua região com segurança.</Text>
      
      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.btnText}>Começar Agora →</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.devBtn} onPress={() => navigation.navigate('DevTest')}>
        <Text style={styles.devText}>⚙️ Abrir Painel de Testes do Firebase</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#0D0D0D', padding: 24, justifyContent: 'center' },
  badge: { color: '#888', fontSize: 11, fontWeight: 'bold', marginBottom: 8 },
  title: { color: '#FFF', fontSize: 32, fontWeight: 'bold', marginBottom: 12 },
  desc: { color: '#AAA', fontSize: 16, marginBottom: 32 },
  btn: { backgroundColor: '#FFF', height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center' },
  btnText: { color: '#111', fontWeight: 'bold', fontSize: 16 },
  devBtn: { marginTop: 20, padding: 10, alignItems: 'center' },
  devText: { color: '#888', fontSize: 12 }
});