// File: src/screens/main/styles/HomeStyles.js
import { StyleSheet, Dimensions } from 'react-native';
import { theme } from '../../../theme';

const { width } = Dimensions.get('window');
const COLUMN_WIDTH = (width - 48 - 16) / 2;

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.backgroundLight, 
  },
  scrollContent: {
    paddingHorizontal: theme.spacing.lg,
    paddingTop: 60,
    paddingBottom: 40,
  },
  
  // --- HEADER ---
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.lg,
  },
  logoGroup: {
    flexDirection: 'row',
    alignItems: 'center',
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
    borderColor: theme.colors.textPrimaryLight,
    borderRadius: 2,
  },
  logoTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
    letterSpacing: -0.5,
  },
  logoSubtitle: {
    fontSize: 10,
    fontWeight: 'bold',
    color: theme.colors.textSecondaryLight,
    letterSpacing: 1,
    marginTop: 2,
  },
  avatar: {
    width: 44,
    height: 44,
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: theme.colors.border,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarInner: {
    width: 36,
    height: 36,
    backgroundColor: theme.colors.textPrimaryLight,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  avatarText: {
    color: theme.colors.textPrimaryDark,
    fontSize: 12,
    fontWeight: 'bold',
  },

  // --- HERO CARD (BUSCA) ---
  heroCard: {
    backgroundColor: theme.colors.textPrimaryLight,
    borderRadius: theme.borderRadius.lg,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
  },
  heroSubtitle: {
    color: theme.colors.primary,
    fontSize: 12,
    fontWeight: 'bold',
    letterSpacing: 1,
    marginBottom: 8,
  },
  heroTitle: {
    color: theme.colors.textPrimaryDark,
    fontSize: 32,
    fontWeight: '900',
    lineHeight: 36,
    letterSpacing: -0.5,
    marginBottom: theme.spacing.lg,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: theme.colors.surfaceLight,
    borderRadius: theme.borderRadius.sm,
    paddingHorizontal: theme.spacing.sm,
    height: 56,
    marginBottom: theme.spacing.md,
  },
  searchIconText: {
    fontSize: 18,
    color: theme.colors.textSecondaryLight,
    marginRight: 8,
    transform: [{ rotate: '-45deg' }], 
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontSize: 15,
    color: theme.colors.textPrimaryLight,
  },
  filterBtn: {
    width: 40,
    height: 40,
    backgroundColor: theme.colors.primary, 
    borderRadius: theme.borderRadius.sm,
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterLines: {
    width: 16,
    height: 2,
    backgroundColor: theme.colors.textPrimaryLight,
    marginBottom: 4,
  },
  
  // --- HERO FOOTER ---
  heroFooter: {
      flexDirection: 'row',
      alignItems: 'center'
  },
  heroFooterText: {
      color: theme.colors.textPrimaryDark,
      fontSize: 12,
      fontWeight: '600'
  },
  heroFooterPin: {
      color: theme.colors.primary,
      fontSize: 14,
      marginRight: 6
  },

  // --- CATEGORIES ---
  categoriesContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xl,
  },
  categoryPillActive: {
    backgroundColor: theme.colors.textPrimaryLight,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: theme.borderRadius.pill,
    marginRight: theme.spacing.sm,
  },
  categoryTextActive: {
    color: theme.colors.textPrimaryDark,
    fontWeight: 'bold',
    fontSize: 14,
  },
  categoryPillInactive: {
    backgroundColor: theme.colors.surfaceLight,
    borderWidth: 1,
    borderColor: theme.colors.border,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: theme.borderRadius.pill,
    marginRight: theme.spacing.sm,
  },
  categoryTextInactive: {
    color: theme.colors.textSecondaryLight,
    fontWeight: '600',
    fontSize: 14,
  },

  // --- SECTION HEADER ---
  sectionTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: theme.colors.textPrimaryLight,
    marginBottom: 4,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: theme.colors.textSecondaryLight,
    lineHeight: 20,
    marginBottom: theme.spacing.md,
  },
  seeAll: {
    fontSize: 14,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
    textDecorationLine: 'underline',
    marginBottom: theme.spacing.lg,
  },

  // --- BOOK GRID ---
  booksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  bookCard: {
    width: COLUMN_WIDTH,
    marginBottom: theme.spacing.lg,
  },
  bookImageContainer: {
    backgroundColor: '#FFEFA0', // Placeholder amarelado para imitar o mockup
    borderRadius: theme.borderRadius.md,
    padding: 12,
    marginBottom: 12,
    height: COLUMN_WIDTH * 1.3, 
  },
  bookCoverPlaceholder: {
    flex: 1,
    backgroundColor: theme.colors.surface, 
    borderRadius: 8,
    padding: 16,
    justifyContent: 'space-between',
  },
  bookCoverTopLine: {
      width: 24,
      height: 2,
      backgroundColor: theme.colors.border
  },
  bookCoverDot: {
      width: 8,
      height: 8,
      borderRadius: 4,
      backgroundColor: theme.colors.primary,
      alignSelf: 'flex-end'
  },
  bookInfoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 4,
  },
  bookTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
    flex: 1,
    marginRight: 8,
  },
  bookPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: theme.colors.textPrimaryLight,
  },
  bookStore: {
    fontSize: 12,
    color: theme.colors.textSecondaryLight, 
  },
});