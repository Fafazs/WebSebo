// File: src/theme/index.js
export const theme = {
  colors: {
    backgroundDark: '#111111', // Splash[cite: 3]
    backgroundLight: '#F5F5F5', // Telas internas[cite: 4, 5, 6]
    surface: '#444444',        // Card inferior Splash[cite: 3]
    surfaceLight: '#FFFFFF',   // Inputs[cite: 4, 5] e Cards[cite: 6]
    primary: '#C6FF45',        // Verde limão[cite: 3]
    textPrimaryDark: '#FFFFFF',
    textSecondaryDark: '#CCCCCC',
    textPrimaryLight: '#111111',
    textSecondaryLight: '#666666',
    border: '#E0E0E0',
    whatsapp: '#25D366',       // Botão do WhatsApp[cite: 6]
  },
  spacing: {
    xs: 8, sm: 12, md: 16, lg: 24, xl: 32, xxl: 48
  },
  borderRadius: {
    sm: 8, md: 12, lg: 16, pill: 9999
  },
};

// Adicione isto ao seu theme.js ou arquivo de estilos global equivalente
export const additionalColors = {
    danger: '#D32F2F', // Vermelho do botão "Deletar" do modal[cite: 25]
    modalBackground: 'rgba(0, 0, 0, 0.5)',
};
