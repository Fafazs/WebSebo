import React from 'react';
import { Text, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { theme } from '../../theme';

export const CATEGORIES = [
  'Todos', 'Literatura', 'Romance', 'Ficção', 'Fantasia', 
  'Infantil', 'Biografia', 'Autoajuda', 'História', 'Acadêmico', 'HQs e Mangás'
];

export default function CategoryBar({ selectedCategory, setSelectedCategory }) {
  return (
    <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.categoriesContainer}>
      {CATEGORIES.map((cat) => {
        const isActive = selectedCategory === cat;
        return (
          <TouchableOpacity 
            key={cat}
            style={isActive ? styles.categoryPillActive : styles.categoryPillInactive}
            onPress={() => setSelectedCategory(cat)}
          >
            <Text style={isActive ? styles.categoryTextActive : styles.categoryTextInactive}>
              {cat}
            </Text>
          </TouchableOpacity>
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xl,
  },
  categoryPillActive: {
    backgroundColor: theme.colors.textPrimaryLight,
    paddingVertical: 10, paddingHorizontal: 20,
    borderRadius: theme.borderRadius.pill,
    marginRight: theme.spacing.sm,
  },
  categoryTextActive: {
    color: theme.colors.textPrimaryDark,
    fontWeight: 'bold', fontSize: 14,
  },
  categoryPillInactive: {
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1, borderColor: theme.colors.border,
    paddingVertical: 10, paddingHorizontal: 20,
    borderRadius: theme.borderRadius.pill,
    marginRight: theme.spacing.sm,
  },
  categoryTextInactive: {
    color: theme.colors.textSecondaryLight,
    fontWeight: '600', fontSize: 14,
  },
});