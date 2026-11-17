// File: src/components/InputText.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { theme } from '../theme';

export default function InputText({ label, placeholder, secureTextEntry, value, onChangeText, keyboardType }) {
  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.textSecondaryLight}
        secureTextEntry={secureTextEntry}
        value={value}
        onChangeText={onChangeText}
        keyboardType={keyboardType}
        autoCapitalize="none"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: theme.spacing.md },
  label: { 
    fontSize: 12, 
    fontWeight: '700', 
    color: '#777', 
    textTransform: 'uppercase', 
    marginBottom: 6 
  }, // Padrão "NOME COMPLETO"[cite: 4, 5]
  input: {
    backgroundColor: theme.colors.surfaceLight,
    height: 54,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.md,
    fontSize: 15,
    color: theme.colors.textPrimaryLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
});