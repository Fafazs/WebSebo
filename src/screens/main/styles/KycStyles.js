// File: src/screens/main/styles/KycVerificationStyles.js
import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  
  // --- TOP BAR ---
  backButton: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 60,
    paddingBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  backText: {
    color: theme.colors.textSecondaryLight,
    fontSize: 14,
    fontWeight: '600',
  },

  // --- CONTENT AREA ---
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: 40,
  },
  
  cardContainer: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },

  // --- HEADER TEXTS ---
  headerIcon: {
    width: 48,
    height: 48,
    backgroundColor: theme.colors.primary,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  pageContext: {
    fontSize: 10,
    color: theme.colors.textSecondaryLight,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
    lineHeight: 32,
    letterSpacing: -1,
    marginBottom: theme.spacing.sm,
  },
  pageDescription: {
    fontSize: 14,
    color: theme.colors.textSecondaryLight,
    marginBottom: theme.spacing.xl,
    lineHeight: 20,
  },

  // --- FORMULÁRIO ---
  inputContainer: {
    marginBottom: theme.spacing.lg,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textSecondaryLight,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 6,
  },
  inputField: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    height: 52,
    paddingHorizontal: theme.spacing.md,
    fontSize: 15,
    color: theme.colors.textPrimaryLight,
    backgroundColor: theme.colors.surfaceLight,
  },

  // --- CHECKBOX TERMS ---
  termsBox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FAFAFA',
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: theme.colors.textSecondaryLight,
    borderRadius: 4,
    marginRight: 12,
    marginTop: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxActive: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  termsText: {
    flex: 1,
    fontSize: 13,
    color: theme.colors.textSecondaryLight,
    lineHeight: 18,
  },
  boldLink: {
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
    textDecorationLine: 'underline',
  },

  // --- BOTÃO ENVIAR ---
  submitBtn: {
    backgroundColor: theme.colors.primary,
    height: 52,
    borderRadius: theme.borderRadius.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnDisabled: {
    opacity: 0.5,
  },
  submitBtnText: {
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
});