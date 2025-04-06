import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useNavigation } from 'expo-router';
import type { NavigationProp } from '../types/navigation';
import { theme } from '@styles/theme'; // ✅ Use global theme

const imageSource = require('@/../assets/images/image.png');

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>();

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
    backgroundColor: theme.colors.background,
    padding: theme.spacing.large,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xLarge,
  },
  logoImage: {
    width: 150,
    height: 150,
    resizeMode: 'contain',
  },
  title: {
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.medium,
    textAlign: 'center',
    fontFamily: theme.fontFamily.regular,
  },
  description: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xLarge,
    textAlign: 'center',
    fontFamily: theme.fontFamily.regular,
  },
  button: {
    backgroundColor: theme.colors.primary,
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius,
    width: 200,
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    fontFamily: theme.fontFamily.regular,
  },
  secondaryButton: {
    backgroundColor: 'transparent',
    padding: theme.spacing.medium,
    borderRadius: theme.borderRadius,
    width: 200,
    alignItems: 'center',
    marginBottom: theme.spacing.medium,
    borderWidth: 2,
    borderColor: theme.colors.primary,
  },
  secondaryButtonText: {
    color: theme.colors.text,
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    fontFamily: theme.fontFamily.regular,
  },
});

export default HomeScreen;