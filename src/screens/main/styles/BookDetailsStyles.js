import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../theme'; 

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.surfaceLight, 
  },

  // --- CONTENT AREA ---
  // Removi os estilos do top header, pois agora usamos o componente Header
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingBottom: theme.spacing.xxl, 
  },
  backButton: {
    paddingVertical: theme.spacing.lg,
  },
  backText: {
    color: theme.colors.textSecondaryLight,
    fontSize: 15,
    fontWeight: '600',
  },

  // --- IMAGE PLACEHOLDER ---
  imageContainer: {
    backgroundColor: theme.colors.backgroundLight, 
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.xl,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  coverPlaceholder: {
    width: '100%',
    aspectRatio: 0.75,
    backgroundColor: theme.colors.backgroundDark, 
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    justifyContent: 'space-between',
  },
  coverTopRightDot: {
    width: 10,
    height: 10,
    backgroundColor: theme.colors.primary, 
    borderRadius: theme.borderRadius.pill,
    alignSelf: 'flex-end',
  },
  coverBottomInfo: {
    justifyContent: 'flex-end',
    flex: 1,
  },
  coverInitials: {
    color: theme.colors.textPrimaryDark,
    fontSize: 42,
    fontWeight: '900',
    letterSpacing: -2,
    marginBottom: 4,
  },
  coverAuthor: {
    color: theme.colors.textSecondaryDark,
    fontSize: 12,
    fontWeight: '500',
  },

  // --- TITLE & INFO ---
  authorText: {
    fontSize: 14,
    fontWeight: '700',
    color: theme.colors.textSecondaryLight,
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  titleRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center', 
    marginBottom: theme.spacing.md,
  },
  bookTitle: {
    flex: 1, 
    fontSize: 32,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
    lineHeight: 36,
    paddingRight: theme.spacing.md,
  },
  heartBtn: {
    width: 44,
    height: 44,
    backgroundColor: theme.colors.backgroundDark, 
    borderRadius: theme.borderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
  },
  heartIcon: {
    color: theme.colors.textPrimaryDark,
    fontSize: 22,
  },
  
  // --- PRICE ---
  priceRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  pricePrefix: {
    fontSize: 20,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
    marginTop: 4,
    marginRight: 4,
  },
  priceText: {
    fontSize: 40,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
    lineHeight: 44, 
  },
  priceSuffix: {
    fontSize: 15,
    color: theme.colors.textSecondaryLight,
    fontWeight: '500',
    marginBottom: theme.spacing.lg,
  },

  // --- SPECS GRID ---
  specsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  specCard: {
    width: (width - 48 - 12) / 2, 
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
  },
  specLabel: {
    fontSize: 11,
    color: theme.colors.textSecondaryLight,
    fontWeight: '700',
    letterSpacing: 0.5,
    marginBottom: 6,
  },
  specValue: {
    fontSize: 15,
    fontWeight: '800',
    color: theme.colors.textPrimaryLight,
  },

  divider: {
    height: 1,
    backgroundColor: theme.colors.border,
    marginVertical: theme.spacing.lg,
  },

  // --- SYNOPSIS ---
  synopsisHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  synopsisTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: theme.colors.textPrimaryLight,
    marginRight: theme.spacing.sm,
  },
  aiBadge: {
    backgroundColor: theme.colors.border,
    paddingVertical: 4,
    paddingHorizontal: 8,
    borderRadius: theme.borderRadius.sm,
  },
  aiBadgeText: {
    fontSize: 10,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
  },
  synopsisText: {
    fontSize: 15,
    color: theme.colors.textSecondaryLight,
    lineHeight: 24,
  },

  // --- SELLER CARD ---
  sellerCard: {
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1.5,
    borderColor: theme.colors.textPrimaryLight, 
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg, // <-- Aumentei o respiro (espaçamento interno)
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  sellerAvatar: {
    width: 52, // <-- Avatar ligeiramente maior
    height: 52,
    backgroundColor: theme.colors.backgroundDark,
    borderRadius: theme.borderRadius.pill,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: theme.spacing.md,
  },
  sellerAvatarText: {
    color: theme.colors.textPrimaryDark,
    fontWeight: 'bold',
    fontSize: 18,
  },
  sellerInfo: {
    flex: 1,
  },
  sellerName: {
    fontSize: 16,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
    marginBottom: 4,
  },
  sellerDetailsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
  verifiedBadge: {
    backgroundColor: '#E8F5E9', // Fundo verde claro
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderRadius: theme.borderRadius.sm,
    marginRight: 8,
    borderWidth: 1,
    borderColor: '#A5D6A7', // Borda verde para destacar mais
  },
  verifiedText: {
    fontSize: 10,
    fontWeight: '800',
    color: '#2E7D32', // Texto verde escuro
  },
  sellerLocation: {
    fontSize: 13,
    color: theme.colors.textSecondaryLight,
  },
  sellerArrow: {
    fontSize: 20,
    color: theme.colors.textSecondaryLight,
    fontWeight: '600',
    marginLeft: theme.spacing.sm,
  },

  // --- WHATSAPP BUTTON ---
  whatsappBtn: {
    backgroundColor: theme.colors.backgroundDark, 
    height: 56,
    borderRadius: theme.borderRadius.md,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.xl, 
  },
  whatsappIcon: {
    fontSize: 18,
    marginRight: theme.spacing.sm,
  },
  whatsappText: {
    color: theme.colors.textPrimaryDark,
    fontSize: 16,
    fontWeight: 'bold',
  },
});