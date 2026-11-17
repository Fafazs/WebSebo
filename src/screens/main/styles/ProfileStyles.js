// File: src/screens/main/styles/ProfileStyles.js
import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 110, // Espaço para o Header fixo
    paddingBottom: 100, // Espaço para a BottomNavbar
  },

  // --- CABEÇALHO DA PÁGINA ---
  pageContext: {
    fontSize: 12,
    color: theme.colors.textSecondaryLight,
    fontWeight: 'bold',
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: theme.spacing.xs,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
    letterSpacing: -1,
    marginBottom: theme.spacing.sm,
  },
  pageDescription: {
    fontSize: 14,
    color: theme.colors.textSecondaryLight,
    marginBottom: theme.spacing.xl,
  },

  // --- CARD PRINCIPAL (PRETO) ---
  profileCard: {
    backgroundColor: theme.colors.textPrimaryLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  avatarLarge: {
    width: 64,
    height: 64,
    backgroundColor: theme.colors.primary,
    borderRadius: 32,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  avatarLargeText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.backgroundLight,
    marginBottom: 4,
  },
  profileSince: {
    fontSize: 12,
    color: theme.colors.textSecondaryDark,
    marginBottom: theme.spacing.xl,
  },
  dividerDark: {
    height: 1,
    backgroundColor: theme.colors.surface,
    marginBottom: theme.spacing.md,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  statsIcon: {
    fontSize: 14,
    color: theme.colors.textSecondaryDark,
    marginRight: theme.spacing.sm,
  },
  statsText: {
    fontSize: 14,
    color: theme.colors.backgroundLight,
  },

  // --- INFORMAÇÕES CADASTRAIS ---
  infoCard: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  infoHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
  },
  editBtn: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  editText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
    marginLeft: 4,
  },
  infoItem: {
    marginBottom: theme.spacing.lg,
  },
  infoLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textSecondaryLight,
    letterSpacing: 1,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  inputField: {
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
    paddingVertical: 8,
    fontSize: 16,
    color: theme.colors.textPrimaryLight,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '500',
    color: theme.colors.textPrimaryLight,
    paddingVertical: 8,
  },
  saveBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 12,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginTop: theme.spacing.md,
  },
  saveBtnText: {
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
  },

  // --- BOTÕES DE AÇÃO ---
  historyBtn: {
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  historyBtnContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  historyIcon: {
    fontSize: 20,
    marginRight: theme.spacing.md,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
  },
  historySubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondaryLight,
  },

  logoutBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  logoutText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textSecondaryLight,
    marginLeft: 8,
  },
  
  deleteAccountBtn: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingVertical: theme.spacing.md,
  },
  deleteAccountText: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#D32F2F', // Cor de perigo
      marginLeft: 8,
  },

  // --- PROMO BOX VENDEDOR ---
  promoBox: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.xl,
  },
  promoHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: theme.spacing.sm,
  },
  promoContext: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
    letterSpacing: 1,
  },
  promoTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
    lineHeight: 32,
    letterSpacing: -1,
    marginBottom: theme.spacing.md,
  },
  promoDescription: {
    fontSize: 14,
    color: theme.colors.textPrimaryLight,
    marginBottom: theme.spacing.xl,
    opacity: 0.8,
  },
  promoBtn: {
    backgroundColor: theme.colors.textPrimaryLight,
    paddingVertical: 14,
    paddingHorizontal: 20,
    borderRadius: theme.borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  promoBtnText: {
    color: theme.colors.surfaceLight,
    fontSize: 14,
    fontWeight: 'bold',
  },
  promoBtnArrow: {
    color: theme.colors.surfaceLight,
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
  },
  
  // --- MODAL ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  modalContent: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.md,
    padding: 24,
    width: '100%',
    maxWidth: 400,
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 12,
    right: 12,
    padding: 8,
  },
  modalCloseText: {
    fontSize: 18,
    color: theme.colors.textSecondaryLight,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F', // Vermelho erro
    textAlign: 'center',
    marginBottom: 12,
    marginTop: 12,
  },
  modalDescription: {
    fontSize: 14,
    color: theme.colors.textSecondaryLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalActionBtn: {
    backgroundColor: '#D32F2F', // Vermelho erro
    paddingVertical: 12,
    borderRadius: theme.borderRadius.sm,
    alignItems: 'center',
    marginBottom: 12,
  },
  modalActionText: {
    color: theme.colors.surfaceLight,
    fontWeight: 'bold',
    fontSize: 16,
  },
  modalCancelBtn: {
    paddingVertical: 12,
    alignItems: 'center',
  },
  modalCancelText: {
    color: theme.colors.textPrimaryLight,
    fontSize: 14,
    fontWeight: '600',
  },
});