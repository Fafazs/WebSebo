// File: src/components/home/HeroSearch.js
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export default function HeroSearch({ searchQuery, setSearchQuery, userLocation }) {
  return (
    <View style={styles.heroCard}>
      <Text style={styles.heroSubtitle}>GARIMPE PERTO DE CASA</Text>
      <Text style={styles.heroTitle}>Qual história{'\n'}você quer{'\n'}encontrar hoje?</Text>
      
      <View style={styles.searchContainer}>
        <Text style={styles.searchIconText}>⚲</Text>
        <TextInput 
          style={styles.searchInput}
          placeholder="Busque por título, autor ou gênero"
          placeholderTextColor="#999999"
          value={searchQuery}
          onChangeText={setSearchQuery} // Atualiza o estado em tempo real
        />
        {/* O botão de filtro foi removido para focar na pesquisa direta e poupar tempo */}
      </View>
      
      <View style={styles.heroFooter}>
        <Text style={styles.heroFooterPin}>📍</Text>
        {/* Renderiza dinamicamente a localização do utilizador */}
        <Text style={styles.heroFooterText}>{userLocation || 'Localização não informada'}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  heroCard: {
    backgroundColor: theme.colors.textPrimaryLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  heroSubtitle: {
    color: theme.colors.primary,
    fontSize: 12, fontWeight: 'bold', letterSpacing: 1, marginBottom: 8,
  },
  heroTitle: {
    color: theme.colors.textPrimaryDark,
    fontSize: 32, fontWeight: '900', lineHeight: 36, letterSpacing: -0.5,
    marginBottom: theme.spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row', alignItems: 'center',
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.md, // Ajustado para compensar a saída do botão
    height: 56, marginBottom: theme.spacing.md,
  },
  searchIconText: {
    fontSize: 22, color: theme.colors.textSecondaryLight,
    marginRight: 12, transform: [{ rotate: '-45deg' }], 
  },
  searchInput: {
    flex: 1, height: '100%', fontSize: 15, color: theme.colors.textPrimaryLight,
  },
  heroFooter: { flexDirection: 'row', alignItems: 'center' },
  heroFooterText: { color: theme.colors.textPrimaryDark, fontSize: 12, fontWeight: '600' },
  heroFooterPin: { color: theme.colors.primary, fontSize: 14, marginRight: 6 },
});