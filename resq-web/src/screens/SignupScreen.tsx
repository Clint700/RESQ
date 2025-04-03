import React, { useState, useCallback } from 'react';
import {
  View,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  Text,
  StyleSheet,
  Alert,
  Platform,
  StyleProp,
  TextStyle,
  ViewStyle,
  Image,
} from 'react-native';
import { useNavigation } from 'expo-router';
import type { NavigationProp } from '../types/navigation';


import { signupUser } from '@services/auth';
import { theme } from '@styles/theme';

const imageSource = require('../../assets/images/image.png');

// Reusable Input Component
const AppInput = React.forwardRef<TextInput, TextInputProps>(({ style, ...props }, ref) => {
  const inputStyle: StyleProp<TextStyle> = [styles.input, style];
  return (
    <TextInput
      ref={ref}
      style={inputStyle}
      placeholderTextColor={theme.colors.textSecondary}
      {...props}
    />
  );
});
AppInput.displayName = 'AppInput';

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  disabled?: boolean;
}
const AppButton: React.FC<ButtonProps> = ({
  children,
  onPress,
  style,
  textStyle,
  disabled,
  ...props
}) => {
  const buttonStyle = [styles.button, style];
  const textStyleProp = [styles.buttonText, textStyle];
  return (
    <TouchableOpacity style={buttonStyle} onPress={onPress} disabled={disabled} {...props}>
      <Text style={textStyleProp}>{children}</Text>
    </TouchableOpacity>
  );
};

interface LinkProps {
  children: React.ReactNode;
  onPress: () => void;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
}
const AppLink: React.FC<LinkProps> = ({ children, onPress, style, textStyle }) => {
  const linkTextStyle = [styles.linkText, textStyle];
  return (
    <TouchableOpacity style={style} onPress={onPress}>
      <Text style={linkTextStyle}>{children}</Text>
    </TouchableOpacity>
  );
};

const SignupScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSignup = useCallback(async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    if (!email || !password || !confirmPassword) {
      Alert.alert('Error', 'Please fill in all fields.');
      return;
    }

    if (!emailRegex.test(email)) {
      Alert.alert('Error', 'Please enter a valid email address.');
      return;
    }

    if (!passwordRegex.test(password)) {
      Alert.alert('Error', 'Password must be at least 8 characters long.');
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert('Error', 'Passwords do not match.');
      return;
    }

    setIsLoading(true);
    try {
      await signupUser(email, password);
      Alert.alert('Success', 'Signup successful! Please login.');
      navigation.navigate('login');
    } catch (error: any) {
      console.error('Error signing up:', error);
      Alert.alert('Error', error.message || 'Failed to sign up. Please try again.');
    } finally {
      setIsLoading(false);
    }
  }, [email, password, confirmPassword, navigation]);

  return (
    <View style={styles.container}>
      <View style={styles.logoContainer}>
        <Image source={imageSource} style={styles.logoImage} />
      </View>
      <Text style={styles.title}>Sign Up</Text>

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

      <AppInput
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
        editable={!isLoading}
      />
      <Text style={styles.info}>Confirm your password.</Text>

      <AppButton onPress={handleSignup} disabled={isLoading}>
        {isLoading ? 'Signing Up...' : 'Sign Up'}
      </AppButton>

      <AppLink onPress={() => navigation.navigate('login')}>
        Already have an account? Login
      </AppLink>
    </View>
  );
};

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
    color: theme.colors.primary,
    textAlign: 'center',
    marginBottom: theme.spacing.large,
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
  link: {
    marginTop: theme.spacing.medium,
  },
  linkText: {
    color: theme.colors.link,
    fontSize: theme.fontSize.medium,
    fontFamily: theme.fontFamily.regular,
  },
});

export default SignupScreen;