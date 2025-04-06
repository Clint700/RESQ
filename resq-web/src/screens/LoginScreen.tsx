import React, { useState, useCallback } from 'react';
import { View, Text, StyleSheet, Alert, Image } from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '@services/auth';
import { theme } from '@styles/theme';
import AppInput from '@components/common/AppInput';
import AppButton from '@components/common/AppButton';
import AppLink from '@components/common/AppLink';

const imageSource = require('@/../assets/images/image.png');

const LoginScreen = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = useCallback(async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    if (!email || !password) {
      return Alert.alert('Error', 'Please enter both email and password.');
    }
    if (!emailRegex.test(email)) {
      return Alert.alert('Error', 'Please enter a valid email address.');
    }
    if (!passwordRegex.test(password)) {
      return Alert.alert('Error', 'Password must be at least 8 characters long.');
    }

    setIsLoading(true);
    try {
      await loginUser(email, password);
      Alert.alert('Success', 'Login successful!');
      router.replace('/(tabs)');
    } catch (error: any) {
      Alert.alert('Error', error.message || 'Login failed. Please check your credentials.');
    } finally {
      setIsLoading(false);
    }
  }, [email, password]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={imageSource} style={styles.logoImage} />
      </View>
      <Text style={styles.title}>Login</Text>

      <AppInput
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        editable={!isLoading}
      />
      <Text style={styles.info}>Enter your email address.</Text>

      <AppInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        editable={!isLoading}
      />
      <Text style={styles.info}>Enter your password (min 8 characters).</Text>

      <AppButton onPress={handleLogin} disabled={isLoading}>
        {isLoading ? 'Loading...' : 'Login'}
      </AppButton>

      <AppLink onPress={() => router.push('/signup')}>
        Don't have an account? Sign Up
      </AppLink>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
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
    marginBottom: theme.spacing.large,
    color: theme.colors.primary,
    textAlign: 'center',
    fontFamily: theme.fontFamily.regular,
  },
  info: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.medium,
    width: '100%',
    fontFamily: theme.fontFamily.regular,
  },
});