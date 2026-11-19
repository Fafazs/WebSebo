// File: src/screens/auth/styles/LoginStyles.js
import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: theme.colors.backgroundLight,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 24,
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

  // --- LOGO AREA (Herdado do Onboarding) ---
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logoIcon: {
    width: 44,
    height: 44,
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.textPrimaryLight,
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoIconInner: {
    width: 20,
    height: 24,
    borderWidth: 1.5,
    borderColor: theme.colors.textSecondaryLight,
    borderRadius: 2,
  },
  logoTitle: {
    color: theme.colors.textPrimaryLight,
    fontSize: 20,
    fontWeight: 'bold',
    letterSpacing: -0.5,
  },
  logoSubtitle: {
    color: theme.colors.textSecondaryLight,
    fontSize: 10,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginTop: 2,
  },

  // --- TYPOGRAPHY ---
  greeting: {
    fontSize: 14,
    color: theme.colors.textSecondaryLight,
    fontWeight: '600',
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

  // --- FORMS & FORGOT PASSWORD ---
  forgotContainer: {
    alignSelf: 'flex-start',
    marginBottom: theme.spacing.md,
    marginTop: -8, 
  },
  forgotText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
    textDecorationLine: 'underline',
  },

  // --- BUTTONS ---
  loginBtn: {
    backgroundColor: theme.colors.primary,
    borderWidth: 1,
    borderColor: theme.colors.textPrimaryLight,
    height: 52,
    borderRadius: theme.borderRadius.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  loginBtnText: {
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

  // --- CREATE ACCOUNT BUTTON ---
  createBtn: {
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    height: 52,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  createBtnText: {
    color: theme.colors.textPrimaryLight,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
