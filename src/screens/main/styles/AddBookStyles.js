import { StyleSheet } from 'react-native';
import { theme } from '../../../theme';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight, // Fundo cinza claro
  },

  // --- HEADER (Caso ainda não esteja usando o componente Header padrão aqui) ---
  topHeaderBackground: {
    backgroundColor: theme.colors.surfaceLight,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 50, 
    paddingBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border,
  },
  logoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoIcon: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primary, 
    borderRadius: theme.borderRadius.sm,
    marginRight: theme.spacing.sm,
  },
  logoTitle: {
    fontSize: 18,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
    letterSpacing: -0.5,
  },
  avatarSmall: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.backgroundDark,
    borderRadius: theme.borderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarSmallText: {
    color: theme.colors.textPrimaryDark,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // --- CONTENT AREA ---
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl,
  },
  backButton: {
    paddingVertical: theme.spacing.md,
    marginTop: theme.spacing.sm,
  },
  backText: {
    color: theme.colors.textSecondaryLight,
    fontSize: 15,
    fontWeight: '600',
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
  },

  // --- PHOTO UPLOAD CARD ---
  photoCard: {
    marginBottom: theme.spacing.lg,
  },
  photoTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimaryLight,
    marginBottom: theme.spacing.sm,
  },
  photoUploadBox: {
    width: '100%',
    height: 120,
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1.5,
    borderColor: theme.colors.border,
    borderStyle: 'dashed', // Estilo de upload padrão
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
  },
  photoUploadIcon: {
    marginBottom: theme.spacing.xs,
  },
  photoUploadText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textPrimaryLight,
  },
  photoUploadSub: {
    fontSize: 12,
    color: theme.colors.textSecondaryLight,
    marginTop: 4,
  },

  // --- FORM CONTAINER ---
  formCard: {
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.border,
    marginBottom: theme.spacing.lg,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '800',
    color: theme.colors.textPrimaryLight,
    marginBottom: theme.spacing.md,
  },
  inputContainer: {
    marginBottom: theme.spacing.md,
  },
  standardLabel: {
    fontSize: 11,
    fontWeight: '700',
    color: theme.colors.textSecondaryLight,
    letterSpacing: 0.5,
    marginBottom: theme.spacing.xs,
  },
  input: {
    backgroundColor: theme.colors.backgroundLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    height: 48,
    color: theme.colors.textPrimaryLight,
    fontSize: 14,
  },
  textArea: {
    height: 100,
    paddingTop: theme.spacing.md,
    textAlignVertical: 'top', // Necessário para multiline no Android
  },

  // --- CATEGORIES (Chips) ---
  categoriesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: theme.spacing.xs,
  },
  categoryChip: {
    backgroundColor: theme.colors.backgroundLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: theme.borderRadius.pill,
    marginRight: 8,
    marginBottom: 8,
  },
  categoryChipActive: {
    backgroundColor: theme.colors.backgroundDark,
    borderColor: theme.colors.backgroundDark,
  },
  categoryChipText: {
    fontSize: 12,
    fontWeight: '600',
    color: theme.colors.textSecondaryLight,
  },
  categoryChipTextActive: {
    color: theme.colors.textPrimaryDark,
  },

  // --- BUTTONS ---
  aiBtn: {
    backgroundColor: theme.colors.primary, // Verde limão
    height: 52,
    borderRadius: theme.borderRadius.md,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.textPrimaryLight,
  },
  aiBtnText: {
    fontSize: 15,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
  },
  
  submitBtn: {
    backgroundColor: theme.colors.backgroundDark, // Preto
    height: 56,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  submitBtnDisabled: {
    opacity: 0.6,
  },
  submitBtnText: {
    color: theme.colors.textPrimaryDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
  arrowIcon: {
    color: theme.colors.textPrimaryDark,
    fontSize: 18,
    marginLeft: 8,
  },
});