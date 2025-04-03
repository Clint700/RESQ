import React, { useState, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  Image,
  TextInput,
  TouchableOpacity,
  TextInputProps,
  StyleProp,
  TextStyle,
  ViewStyle,
} from 'react-native';
import { useRouter } from 'expo-router';
import { loginUser } from '@services/auth';
import { theme } from '@styles/theme';

const imageSource = require('@/../assets/images/image.png');

// 🔁 Reusable Input
const AppInput = React.forwardRef<TextInput, TextInputProps>(({ style, ...props }, ref) => (
  <TextInput
    ref={ref}
    style={[styles.input, style]}
    placeholderTextColor={theme.colors.placeholderTextColor}
    {...props}
  />
));
AppInput.displayName = 'AppInput';

// 🔁 Reusable Button
const AppButton: React.FC<{
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
  [key: string]: any;
}> = ({ children, onPress, style, textStyle, ...props }) => (
  <TouchableOpacity style={[styles.button, style]} onPress={onPress} {...props}>
    <Text style={[styles.buttonText, textStyle]}>{children}</Text>
  </TouchableOpacity>
);

// 🔁 Reusable Link
const AppLink: React.FC<{
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}> = ({ children, onPress, style, textStyle, ...props }) => (
  <TouchableOpacity style={style} onPress={onPress} {...props}>
    <Text style={[styles.linkText, textStyle]}>{children}</Text>
  </TouchableOpacity>
);

// 🧠 Login Screen
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
      router.replace('/(tabs)'); // ✅ Navigates into the tab layout
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
        Don’t have an account? Sign Up
      </AppLink>
    </View>
  );
};

export default LoginScreen;

// 🎨 Styles
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
  input: {
    width: '100%',
    height: theme.inputHeight,
    paddingHorizontal: theme.spacing.medium,
    borderWidth: 1,
    borderColor: theme.colors.inputBorder,
    borderRadius: theme.borderRadius,
    backgroundColor: theme.colors.inputBackground,
    marginBottom: theme.spacing.small,
    fontSize: theme.fontSize.medium,
    color: theme.colors.text,
    fontFamily: theme.fontFamily.regular,
  },
  info: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.medium,
    width: '100%',
    fontFamily: theme.fontFamily.regular,
  },
  button: {
    width: '100%',
    height: theme.buttonHeight,
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: theme.spacing.medium,
  },
  buttonText: {
    color: theme.colors.buttonText,
    fontSize: theme.fontSize.large,
    fontWeight: 'bold',
    fontFamily: theme.fontFamily.regular,
  },
  linkText: {
    marginTop: theme.spacing.medium,
    color: theme.colors.link,
    fontSize: theme.fontSize.medium,
    fontFamily: theme.fontFamily.regular,
  },
});