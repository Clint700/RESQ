import { Platform } from 'react-native';

export const theme = {
  colors: {
    primary: '#2c3e50',
    primaryLight: '#3498db',
    secondary: '#e74c3c',
    text: '#000',
    textSecondary: '#bdc3c7',
    background: '#f0f0f0',
    inputBackground: '#fff',
    inputBorder: '#d3d3d3',
    buttonText: '#fff',
    link: '#3498db',
    placeholderTextColor: '#95a5a6', // 👈 used in LoginScreen
  },
  spacing: {
    small: 8,
    medium: 16,
    large: 24,
    xLarge: 32,
  },
  fontSize: {
    small: 12,
    medium: 14,
    large: 18,
    xLarge: 24,
    title: 28,
  },
  fontWeight: {
    normal: '400',
    bold: '700',
  },
  fontFamily: {
    regular: 'SpaceMono',
  },
  borderRadius: 8,
  inputHeight: 50,
  buttonHeight: Platform.OS === 'web' ? 40 : 50,
};