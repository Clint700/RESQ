import { Platform } from 'react-native';

export const theme = {
  colors: {
    primary: '#2c3e50',
    primaryLight: '#3498db',
    secondary: '#e74c3c',
    text: '#000000',
    textSecondary: '#bdc3c7',
    background: '#f0f0f0',
    inputBackground: '#ffffff',
    inputBorder: '#d3d3d3',
    buttonText: '#ffffff',
    link: '#3498db',
    placeholderTextColor: '#95a5a6',

    // Extended colors for cards/alerts
    card: '#ffffff',
    cardTitle: '#2d3748',
    cardDescription: '#718096',
  },

  button: {
    height: Platform.OS === 'ios' ? 48 : 50,
    paddingVertical: Platform.OS === 'ios' ? 12 : 14,
    paddingHorizontal: 20,
    borderRadius: 10,
    shadow: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.15,
      shadowRadius: 6,
      elevation: 4, // Android
    },
  },

  dimensions: {
    screenPadding: Platform.OS === 'ios' ? 20 : 16,
    contentMaxWidth: 600,
  },

  spacing: {
    tiny: 4,
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
    xxLarge: 48,
  },

  fontSize: {
    tiny: 10,
    small: 12,
    medium: 14,
    large: 18,
    xLarge: 24,
    title: 28,
    h1: 30,
    h2: 24,
  },

  fontWeight: {
    normal: '400' as '400' | '500' | '700',
    bold: '700' as '400' | '500' | '700',
  },

  fontFamily: {
    regular: 'SpaceMono',
  },

  borderRadius: 8,
  inputHeight: 50,
  buttonHeight: Platform.OS === 'web' ? 40 : 50,

  shadow: {
    small: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 2,
    },
    medium: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 4,
    },
    large: {
      shadowColor: '#000',
      shadowOffset: { width: 0, height: 6 },
      shadowOpacity: 0.15,
      shadowRadius: 8,
      elevation: 6,
    },
  },
};