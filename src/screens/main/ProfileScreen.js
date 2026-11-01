import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function ProfileScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.badge}>TELA 6 • RF04 / RF06</Text>
      <Text style={styles.title}>Perfil do Leitor</Text>

      <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('KycVerification')}>
        <Text style={styles.btnText}>Ativar conta de vendedor (KYC)</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.outlineBtn} onPress={() => navigation.replace('Login')}>
        <Text style={styles.outlineText}>Sair da conta</Text>
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