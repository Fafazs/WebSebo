import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>TELA 2 • RF02 / RF05</Text>
      <Text style={styles.title}>Entre na sua conta</Text>
      
      <TouchableOpacity style={styles.btn} onPress={() => navigation.replace('MainTabs')}>
        <Text style={styles.btnText}>Entrar →</Text>
      </TouchableOpacity>
      
      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Criar uma conta nova</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF', padding: 24, justifyContent: 'center' },
  badge: { color: '#666', fontSize: 11, fontWeight: 'bold', marginBottom: 8 },
  title: { color: '#111', fontSize: 24, fontWeight: 'bold', marginBottom: 24 },
  btn: { backgroundColor: '#111', height: 48, borderRadius: 10, justifyContent: 'center', alignItems: 'center', marginBottom: 16 },
  btnText: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  link: { color: '#111', textAlign: 'center', fontWeight: '600' }
});