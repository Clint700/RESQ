import React from 'react';
import { theme } from '@styles/theme';
import {Text, TouchableOpacity, StyleSheet, StyleProp, TextStyle, ViewStyle} from 'react-native';

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
  export default AppButton;

  const styles = StyleSheet.create({
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
  });