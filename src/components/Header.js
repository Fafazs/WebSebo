// File: src/components/Header.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { theme } from '../theme';

export default function Header({ userName, onPressAvatar, isFixed = false }) {
  const getInitials = (name) => {
    if (!name) return 'ME';
    const parts = name.trim().split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.substring(0, 2).toUpperCase();
  };

  return (
    // Se isFixed for true, aplica a classe styles.fixedHeader
    <SafeAreaView style={[styles.safeArea, isFixed && styles.fixedHeader]}>
      <View style={styles.headerContainer}>
        <View style={styles.logoGroup}>
          <View style={styles.logoIcon}>
            <View style={styles.logoIconInner} />
          </View>
          <View>
            <Text style={styles.logoTitle}>sebo perto</Text>
            <Text style={styles.logoSubtitle}>LIVROS QUE CIRCULAM</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.avatar} onPress={onPressAvatar}>
          <View style={styles.avatarInner}>
            <Text style={styles.avatarText}>{getInitials(userName)}</Text>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: 'transparent', // Fundo padrão caso não seja fixo
    zIndex: 100,
  },
  fixedHeader: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.9)', // O efeito translúcido
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(0,0,0,0.05)',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: theme.spacing.lg,
    paddingVertical: theme.spacing.md,
  },
  logoGroup: { flexDirection: 'row', alignItems: 'center' },
  logoIcon: {
    width: 44, height: 44,
    backgroundColor: theme.colors.primary, 
    borderWidth: 1, borderColor: theme.colors.textPrimaryLight,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
    justifyContent: 'center', alignItems: 'center',
  },
  logoIconInner: {
    width: 20, height: 24,
    borderWidth: 1.5, borderColor: theme.colors.textPrimaryLight,
    borderRadius: 2,
  },
  logoTitle: {
    fontSize: 20, fontWeight: 'bold',
    color: theme.colors.textPrimaryLight, letterSpacing: -0.5,
  },
  logoSubtitle: {
    fontSize: 10, fontWeight: 'bold',
    color: theme.colors.textSecondaryLight, letterSpacing: 1, marginTop: 2,
  },
  avatar: {
    width: 44, height: 44,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: 22, borderWidth: 1, borderColor: theme.colors.border,
    justifyContent: 'center', alignItems: 'center',
  },
  avatarInner: {
    width: 36, height: 36,
    backgroundColor: theme.colors.textPrimaryLight,
    borderRadius: 18, justifyContent: 'center', alignItems: 'center',
  },
  avatarText: {
    color: theme.colors.textPrimaryDark,
    fontSize: 12, fontWeight: 'bold',
  },
});