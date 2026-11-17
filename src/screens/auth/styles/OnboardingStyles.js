// File: src/screens/auth/styles/OnboardingStyles.js
import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundDark,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 60, 
    paddingBottom: theme.spacing.xl,
    justifyContent: 'space-between',
  },
  
  // --- HEADER (Logo) ---
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoPlaceholder: {
    width: 44,
    height: 44,
    borderWidth: 1,
    borderColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIconInner: {
    width: 20,
    height: 24,
    borderWidth: 1.5,
    borderColor: theme.colors.textSecondaryDark,
    borderRadius: 2,
  },
  logoText: {
    color: theme.colors.textPrimaryDark,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  logoSubText: {
    color: theme.colors.textSecondaryDark,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 2,
  },

  // --- LOCATION BADGE (Pill shape) ---
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: theme.colors.surface,
    borderRadius: theme.borderRadius.pill,
    paddingVertical: 6,
    paddingHorizontal: theme.spacing.sm,
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.xl,
  },
  locationPin: {
    color: theme.colors.primary,
    fontSize: 14,
    marginRight: 6,
  },
  locationText: {
    color: theme.colors.textPrimaryDark,
    fontSize: 12,
    fontWeight: '600',
  },

  // --- MAIN TYPOGRAPHY ---
  mainTitleContainer: {
    marginBottom: theme.spacing.lg,
  },
  mainTitle: {
    color: theme.colors.textPrimaryDark,
    fontSize: 52,
    fontWeight: '900',
    lineHeight: 56,
    letterSpacing: -1.5,
  },
  highlightText: {
    color: theme.colors.primary,
  },
  description: {
    color: theme.colors.textPrimaryDark,
    fontSize: 18,
    lineHeight: 26,
    paddingRight: theme.spacing.xl,
  },

  // --- BOTTOM CARD ---
  bottomCard: {
    backgroundColor: 'transparent',
    borderWidth: 1,
    borderColor: theme.colors.surface,
    padding: theme.spacing.lg,
    borderRadius: theme.borderRadius.lg,
    width: '100%',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  cardIconPlaceholder: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.pill,
    marginRight: theme.spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardIconText: {
    color: theme.colors.textPrimaryLight,
    fontSize: 18,
  },
  cardTitle: {
    color: theme.colors.textPrimaryDark,
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 2,
  },
  cardSubtitle: {
    color: theme.colors.textSecondaryDark,
    fontSize: 13,
    lineHeight: 18,
  },

  // --- CARD BUTTON ---
  cardButton: {
    backgroundColor: theme.colors.primary,
    height: 52,
    borderRadius: theme.borderRadius.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  cardButtonText: {
    color: theme.colors.textPrimaryLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowIcon: {
    color: theme.colors.textPrimaryLight,
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 8,
    marginTop: -2,
  },
  
  // --- CARD FOOTER ---
  cardFooterText: {
    color: theme.colors.textSecondaryDark,
    fontSize: 11,
    textAlign: 'center',
  },

  // Botão fantasma de dev
  devBtn: {
    alignItems: 'center',
    marginTop: theme.spacing.md,
    opacity: 0.2,
  },
  devText: {
    color: theme.colors.textPrimaryDark,
    fontSize: 10,
  }
});