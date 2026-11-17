// File: src/screens/auth/styles/RegisterStyles.js
import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.backgroundLight,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 60,
    paddingBottom: 40,
  },
  
  // --- TOP BAR ---
  backButton: {
    marginBottom: theme.spacing.xl,
    paddingVertical: 8,
    alignSelf: 'flex-start',
  },
  backText: {
    color: theme.colors.textSecondaryLight,
    fontSize: 14,
    fontWeight: '600',
  },

  // --- TYPOGRAPHY ---
  greeting: {
    fontSize: 14,
    color: theme.colors.textSecondaryLight,
    fontWeight: '700',
    marginBottom: 8,
  },
  mainTitle: {
    fontSize: 40,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
    lineHeight: 44,
    letterSpacing: -1.5,
    marginBottom: 12,
  },
  description: {
    fontSize: 14,
    color: theme.colors.textSecondaryLight,
    marginBottom: theme.spacing.xl,
  },

  // --- BUTTONS ---
  registerBtn: {
    backgroundColor: theme.colors.primary, // Verde limão do theme
    borderWidth: 1,
    borderColor: theme.colors.textPrimaryLight,
    height: 52,
    borderRadius: theme.borderRadius.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: theme.spacing.xl,
  },
  registerBtnText: {
    color: theme.colors.textPrimaryLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
    marginLeft: 8,
    marginTop: -2,
  },

  // --- DIVIDER ---
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  line: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.border,
  },
  orText: {
    marginHorizontal: theme.spacing.md,
    color: theme.colors.textSecondaryLight,
    fontWeight: '500',
    fontSize: 12,
  },

  // --- LOGIN BUTTON (BOTTOM) ---
  loginBtn: {
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    height: 52,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginBtnText: {
    color: theme.colors.textPrimaryLight,
    fontSize: 15,
    fontWeight: 'bold',
  },
});