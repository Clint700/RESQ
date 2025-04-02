import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '../types/navigation';
const imageSource = require('../../assets/images/image.png');

interface Theme {
  colors: {
    primary: string;
    primaryLight: string;
    secondary: string;
    text: string;
    textSecondary: string;
    background: string;
    inputBackground: string;
    inputBorder: string;
    buttonText: string;
    link: string;
  };
  spacing: {
    small: number;
    medium: number;
    large: number;
    xLarge: number;
  };
  fontSize: {
    small: number;
    medium: number;
    large: number;
    xLarge: number;
    title: number;
  };
  fontWeight: {
    normal: '400' | '500' | '700';
    bold: '400' | '500' | '700';
  };
  borderRadius: number;
  inputHeight: number;
  buttonHeight: number;
}

const theme: Theme = {
  colors: {
    primary: '#2c3e50',
    primaryLight: '#3498db', // Lighter blue - for accents
    secondary: '#e74c3c', // Red - for errors or important actions
    text: '#000',       // Black text
    textSecondary: '#bdc3c7', // Gray text
    background: '#f0f0f0',  // Light gray background
    inputBackground: '#fff',
    inputBorder: '#d3d3d3',
    buttonText: '#fff', // Black button text
    link: '#3498db',
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
  borderRadius: 8,
  inputHeight: 50,
  buttonHeight: Platform.OS === 'web' ? 40 : 50,
};

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>(); // Use the correct type

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={imageSource} style={styles.logoImage} />
      </View>
      <Text style={styles.title}>Welcome to RESQ</Text>
      <Text style={styles.description}>
        Your platform for finding and offering help.
      </Text>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('login')}
      >
        <Text style={styles.buttonText}>Get Started</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.secondaryButton}
        onPress={() => navigation.navigate('about')}
      >
        <Text style={styles.secondaryButtonText}>Learn More</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: theme.colors.background, // Light gray background
    padding: theme.spacing.large,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xLarge,
  },
  logo: {
    fontSize: theme.fontSize.xLarge + 20, // Larger logo
    fontWeight: 'bold',
    color: theme.colors.primary, // Dark Blue
  },
  logoImage: { // Style for the image
    width: 150,  // Or whatever size you want
    height: 150,
    resizeMode: 'contain', // Or 'cover', 'stretch', etc.
  },
  title: {
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    color: theme.colors.primary, // Dark Blue
    marginBottom: theme.spacing.medium,
    textAlign: 'center',
  },
  description: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.textSecondary, // Gray text
    marginBottom: theme.spacing.xLarge,
    textAlign: 'center',
  },
  button: {
    backgroundColor: theme.colors.primary, // Dark Blue
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius,
    width: 200,
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  buttonText: {
    color: theme.colors.buttonText, // Black
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius,
    width: 200,
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
    borderWidth: 2,
    borderColor: theme.colors.primary, // Dark Blue
  },
  secondaryButtonText: {
    color: theme.colors.text, // Black
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
  },
});

export default HomeScreen;