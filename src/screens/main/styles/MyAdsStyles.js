// File: src/screens/main/styles/MyAdsStyles.js
import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 110,
    paddingBottom: 100,
  },

  // --- HEADER TEXTS ---
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

  // --- BOTÃO CADASTRAR ---
  addBookBtn: {
    backgroundColor: theme.colors.primary,
    height: 52,
    borderRadius: theme.borderRadius.sm,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
    borderWidth: 1,
    borderColor: theme.colors.textPrimaryLight,
  },
  addBookBtnText: {
    color: theme.colors.textPrimaryLight,
    fontSize: 15,
    fontWeight: 'bold',
    marginLeft: 8,
  },

  // --- DASHBOARD CARDS ---
  statusCardDark: {
    backgroundColor: theme.colors.textPrimaryLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.md,
  },
  statusCardLabelDark: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textSecondaryDark,
    letterSpacing: 1,
    marginBottom: 12,
  },
  statusCardValueRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: theme.colors.primary,
    marginRight: 8,
  },
  statusCardValueDark: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.backgroundLight,
  },

  statCardLight: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  statCardLabelLight: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textSecondaryLight,
    letterSpacing: 1,
    marginBottom: 12,
  },
  statCardValueLight: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
  },

  // --- LISTA DE ANÚNCIOS ---
  listHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    marginTop: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
  },
  listTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
  },
  listSubtitle: {
    fontSize: 12,
    color: theme.colors.textSecondaryLight,
    fontWeight: '600',
  },

  adCard: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  adCardTop: {
    flexDirection: 'row',
    marginBottom: theme.spacing.lg,
  },
  adCoverPlaceholder: {
    width: 60,
    height: 85,
    backgroundColor: '#4A4A4A',
    borderRadius: 8,
    padding: 8,
    justifyContent: 'space-between',
    marginRight: 16,
  },
  adCoverTopLine: {
    width: 16,
    height: 2,
    backgroundColor: 'rgba(255,255,255,0.3)',
  },
  adCoverDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: theme.colors.primary,
    alignSelf: 'flex-end',
  },
  adCoverInitials: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  adInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  adTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
    marginBottom: 4,
  },
  adDetails: {
    fontSize: 13,
    color: theme.colors.textSecondaryLight,
    marginBottom: 8,
  },
  adBadge: {
    backgroundColor: '#E8F5E9',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
    flexDirection: 'row',
    alignItems: 'center',
  },
  adBadgeDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#4CAF50',
    marginRight: 4,
  },
  adBadgeText: {
    color: '#2E7D32',
    fontSize: 10,
    fontWeight: 'bold',
  },

  adActionsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionBtn: {
    flex: 1,
    height: 40,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  actionBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
    marginLeft: 6,
  },
  deleteBtnText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginLeft: 6,
  },

  // --- EMPTY STATE ---
  emptyContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 40,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 14,
    color: theme.colors.textSecondaryLight,
    textAlign: 'center',
    marginBottom: 24,
  },
  becomeSellerBtn: {
    backgroundColor: theme.colors.primary,
    paddingVertical: 14,
    paddingHorizontal: 24,
    borderRadius: theme.borderRadius.sm,
    flexDirection: 'row',
    alignItems: 'center',
  },

  // --- ESTILOS DOS MODAIS (EXCLUSÃO E EDIÇÃO) ---
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.lg,
  },
  modalContent: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    width: '100%',
    alignItems: 'center',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
    zIndex: 10,
  },
  modalCloseText: {
    fontSize: 16,
    color: theme.colors.textSecondaryLight,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
    marginBottom: 12,
    textAlign: 'center',
  },
  modalDescription: {
    fontSize: 14,
    color: theme.colors.textSecondaryLight,
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 20,
  },
  modalActionBtn: {
    backgroundColor: '#D32F2F',
    width: '100%',
    height: 48,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalActionText: {
    color: theme.colors.backgroundLight,
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCancelBtn: {
    width: '100%',
    height: 48,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  modalCancelText: {
    color: theme.colors.textPrimaryLight,
    fontSize: 16,
    fontWeight: 'bold',
  },

  // Estilos extras para o modal de Edição
  editModalContent: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    width: '100%',
    maxHeight: '85%',
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  inputLabel: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textSecondaryLight,
    letterSpacing: 1,
    marginBottom: 6,
  },
  inputField: {
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    height: 48,
    paddingHorizontal: theme.spacing.md,
    fontSize: 14,
    color: theme.colors.textPrimaryLight,
  },
  textArea: {
    height: 80,
    paddingTop: 12,
    textAlignVertical: 'top',
  },
  editSaveBtn: {
    backgroundColor: theme.colors.primary,
    height: 48,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    marginBottom: 8,
  }
});