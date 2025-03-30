import React, { useState, useCallback } from 'react';
import { View, TextInput, TextInputProps, TouchableOpacity, Text, StyleSheet, Alert, Platform, StyleProp, TextStyle, ViewStyle, Image } from 'react-native';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '../../src/types/navigation';
import { loginUser } from '../../src/services/auth'; // Import auth services
//import { Logo } from '../../assets/Logo'; // Import the logo component.  Assume this exists.

// Theme Definition (Adaptable for Web)
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
        primary: '#2c3e50', // Dark blue - for a professional feel (UK-friendly)
        primaryLight: '#3498db', // Lighter blue - for accents
        secondary: '#e74c3c', // Red - for errors or important actions
        text: '#000',          // Black text
        textSecondary: '#bdc3c7', // Gray text
        background: '#f0f0f0',    // Light gray background
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
    borderRadius: 8, // Consistent border radius
    inputHeight: 50,
    buttonHeight: Platform.OS === 'web' ? 40 : 50, // Adjust button height for web
};

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
    [key: string]: any;
}

// Reusable Button Component
const AppButton: React.FC<ButtonProps> = ({ children, onPress, style, textStyle, ...props }) => {
    const buttonStyle: StyleProp<ViewStyle> = [styles.button, style];
    const textStyleProp: StyleProp<TextStyle> = [styles.buttonText, textStyle];
    return (
        <TouchableOpacity style={buttonStyle} onPress={onPress} {...props}>
            <Text style={textStyleProp}>{children}</Text>
        </TouchableOpacity>
    );
};

interface LinkProps {
    children: React.ReactNode;
    onPress: () => void;
    style?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    [key: string]: any;
}
// Reusable Link Component
const AppLink: React.FC<LinkProps> = ({ children, onPress, style, textStyle, ...props }) => {
    const linkTextStyle: StyleProp<TextStyle> = [styles.linkText, textStyle];
    return (
        <TouchableOpacity style={style} onPress={onPress} {...props}>
            <Text style={linkTextStyle}>{children}</Text>
        </TouchableOpacity>
    );
};

// Login Screen Component
const LoginScreen = () => {
    const navigation = useNavigation<NavigationProp>();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    //  Use require for local images.  The path needs to be relative to this file.
    const imageSource = require('../../assets/images/image.png');

    const handleLogin = useCallback(async () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordRegex = /^.{8,}$/;

        if (!email || !password) {
            Alert.alert('Error', 'Please enter both email and password.');
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

        setIsLoading(true); // Start loading
        try {
            await loginUser(email, password);
            Alert.alert('Success', 'Login successful!');
            navigation.navigate('mapscreen'); // Navigate to home screen
        } catch (error: any) {
            console.error('Error logging in:', error);
            Alert.alert('Error', error.message || 'Failed to login. Please check your credentials.');
        } finally {
            setIsLoading(false); // Stop loading
        }
    }, [email, password, navigation]);

    return (
        <View style={styles.container}>
            {/* <Logo style={styles.logo} /> */}
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
                style={styles.input}

                editable={!isLoading}
            />
            <Text style={styles.info}>Enter your email address.</Text>

            <AppInput
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}

                editable={!isLoading}
            />
            <Text style={styles.info}>Enter your password (min 8 characters).</Text>

            <AppButton
                onPress={handleLogin}
                style={styles.button}
                disabled={isLoading}
            >
                {isLoading ? 'Loading...' : 'Login'}
            </AppButton>

            <AppLink
                onPress={() => navigation.navigate('signup')}
                style={styles.link}
            >
                Don't have an account? Sign Up
            </AppLink>
        </View>
    );
};

// Styles (Refactored for Consistency and Web Adaptability)
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
    logo: {
        fontSize: theme.fontSize.xLarge,
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
    logoImage: { // Style for the image
        width: 150,  // Or whatever size you want
        height: 150,
        resizeMode: 'contain', // Or 'cover', 'stretch', etc.
    },
    title: {
        fontSize: theme.fontSize.title,
        fontWeight: 'bold',
        marginBottom: theme.spacing.large,
        color: theme.colors.primary,
        textAlign: 'center',
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
    },
    info: {
        fontSize: theme.fontSize.small,
        color: theme.colors.textSecondary,
        marginBottom: theme.spacing.medium,
        width: '100%',
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
    },
    link: {
        marginTop: theme.spacing.medium,
    },
    linkText: {
        color: theme.colors.link,
        fontSize: theme.fontSize.medium,
    },
});

export default LoginScreen;
