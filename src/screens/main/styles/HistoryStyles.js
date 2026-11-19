import { StyleSheet } from 'react-native';
import { theme, additionalColors } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight,
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 24,
    paddingBottom: 100, 
  },

  // --- TYPOGRAPHY ---
  pageContext: {
    fontSize: 12,
    fontWeight: '700',
    color: theme.colors.textSecondaryLight,
    letterSpacing: 1,
    marginTop: theme.spacing.sm,
  },
  pageTitle: {
    fontSize: 32,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
    marginBottom: theme.spacing.xs,
  },
  pageDescription: {
    fontSize: 14,
    color: theme.colors.textSecondaryLight,
    marginBottom: theme.spacing.lg,
    lineHeight: 22,
  },

  // --- LIST CONTAINER ---
  listContainer: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    overflow: 'hidden', 
    marginBottom: theme.spacing.lg,
  },
  chatItem: {
    padding: theme.spacing.lg,
  },
  itemTopRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  bookCover: {
    width: 60,
    height: 85,
    borderRadius: theme.borderRadius.sm,
    padding: 8,
    marginRight: theme.spacing.md,
    position: 'relative',
    justifyContent: 'flex-end',
  },
  coverTopLine: {
    position: 'absolute',
    top: 8,
    left: 8,
    width: 24,
    height: 1,
    backgroundColor: '#FFFFFF',
    opacity: 0.7,
  },
  coverDot: {
    position: 'absolute',
    top: 8,
    right: 8,
    width: 6,
    height: 6,
    backgroundColor: theme.colors.primary, 
    borderRadius: 3,
  },
  coverInitials: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '900',
    letterSpacing: -1,
  },
  itemDetails: {
    flex: 1,
    justifyContent: 'center',
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
    marginBottom: 2,
  },
  sellerName: {
    fontSize: 14,
    color: theme.colors.textSecondaryLight,
    marginBottom: 8,
  },
  
  // Badges Dinâmicos
  statusBadge: {
    backgroundColor: '#E8F5E9', 
    alignSelf: 'flex-start',
    paddingVertical: 4,
    paddingHorizontal: 10,
    borderRadius: 12,
  },
  statusBadgeText: {
    color: '#2E7D32',
    fontSize: 11,
    fontWeight: '800',
  },
  statusBadgeFinalizado: {
    backgroundColor: '#EEEEEE', // Cinza para finalizado
  },
  statusBadgeTextFinalizado: {
    color: '#555555',
  },

  itemBottomRow: {
    paddingLeft: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  clockIcon: {
    fontSize: 14,
    color: theme.colors.textSecondaryLight,
    marginRight: 6,
  },
  timeText: {
    fontSize: 13,
    color: theme.colors.textSecondaryLight,
  },
  reportedLabel: {
    fontSize: 11,
    fontWeight: 'bold',
    color: '#D32F2F', 
  },
  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginHorizontal: theme.spacing.lg,
  },

  // --- EMPTY STATE ---
  emptyState: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.lg,
    borderWidth: 1,
    borderColor: theme.colors.border,
    padding: 32,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: theme.spacing.md,
  },
  emptyStateIcon: {
    fontSize: 48,
    marginBottom: 16,
  },
  emptyStateText: {
    fontSize: 15,
    color: theme.colors.textSecondaryLight,
    textAlign: 'center',
    lineHeight: 22,
  },

  // --- MODALS STYLES ---
  modalOverlay: {
    flex: 1,
    backgroundColor: additionalColors.modalBackground, // Aquele 'rgba' que vc colocou no theme
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  modalContent: {
    width: '100%',
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.lg,
    padding: 24,
    paddingTop: 32,
    position: 'relative',
  },
  modalCloseBtn: {
    position: 'absolute',
    top: 16,
    right: 16,
    padding: 8,
  },
  modalCloseText: {
    fontSize: 18,
    color: theme.colors.textSecondaryLight,
    fontWeight: 'bold',
  },
  modalTitle: {
    fontSize: 22,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
    marginBottom: 8,
  },
  modalDescription: {
    fontSize: 14,
    color: theme.colors.textSecondaryLight,
    marginBottom: 24,
    lineHeight: 20,
  },

  // Modal Botões Opções
  modalWhatsappBtn: {
    backgroundColor: theme.colors.whatsapp, // '#25D366' do seu theme
    flexDirection: 'row',
    height: 52,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalWhatsappIcon: {
    fontSize: 18,
    color: '#FFF',
    marginRight: 8,
  },
  modalWhatsappText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalSecondaryBtn: {
    backgroundColor: theme.colors.backgroundLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    height: 52,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalSecondaryBtnText: {
    color: theme.colors.textPrimaryLight,
    fontSize: 15,
    fontWeight: 'bold',
  },
  reportText: {
    fontSize: 13,
    fontWeight: 'bold',
    color: additionalColors.danger, 
    textDecorationLine: 'underline',
  },

  // Modal Like Box
  likeBox: {
    backgroundColor: theme.colors.backgroundLight,
    padding: 16,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
  },
  likeBoxTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
    marginBottom: 4,
  },
  likeBoxSub: {
    fontSize: 12,
    color: theme.colors.textSecondaryLight,
    marginBottom: 16,
  },
  likeButtonsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  likeOption: {
    flex: 1,
    height: 44,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 4,
    backgroundColor: '#FFF',
  },
  likeOptionActive: {
    borderColor: theme.colors.textPrimaryLight,
    backgroundColor: '#EEE',
  },
  likeIcon: {
    fontSize: 13,
    fontWeight: 'bold',
    color: theme.colors.textSecondaryLight,
  },
  likeIconActive: {
    color: theme.colors.textPrimaryLight,
  },
  modalConfirmBtn: {
    backgroundColor: theme.colors.backgroundDark,
    height: 48,
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalConfirmText: {
    color: theme.colors.textPrimaryDark,
    fontSize: 15,
    fontWeight: 'bold',
  },
  finalizedInfoBox: {
    backgroundColor: '#F5F5F5',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  finalizedInfoText: {
    fontSize: 12,
    color: '#666',
    fontWeight: '600',
  },

  // Modal Report (Estilo Delete)
  modalDangerBtn: {
    backgroundColor: additionalColors.danger, // '#D32F2F' do theme
    height: 52,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  modalDangerText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  modalCancelBtn: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalCancelText: {
    color: theme.colors.textSecondaryLight,
    fontSize: 15,
    fontWeight: 'bold',
  },
});
