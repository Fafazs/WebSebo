// File: src/components/Button.js
import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator } from 'react-native';
import { theme } from '../theme';

export default function Button({ title, onPress, variant = 'primary', loading, style, icon }) {
  const isOutline = variant === 'outline';
  
  return (
    <TouchableOpacity 
      style={[styles.button, isOutline ? styles.outline : styles.primary, style]} 
      onPress={onPress}
      disabled={loading}
    >
      {loading ? (
        <ActivityIndicator color={isOutline ? theme.colors.textPrimaryLight : theme.colors.surfaceLight} />
      ) : (
        <Text style={[styles.text, isOutline ? styles.textOutline : styles.textPrimary]}>
          {title} {icon && icon}
        </Text>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    height: 56,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  primary: { backgroundColor: theme.colors.textPrimaryLight }, // Preto[cite: 4, 5]
  outline: { backgroundColor: 'transparent', borderWidth: 1, borderColor: theme.colors.border },
  text: { fontSize: 16, fontWeight: 'bold' },
  textPrimary: { color: theme.colors.surfaceLight },
  textOutline: { color: theme.colors.textPrimaryLight },
});