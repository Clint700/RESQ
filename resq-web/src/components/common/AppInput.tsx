import React from 'react';
import { TextInput, TextInputProps, StyleSheet, StyleProp, TextStyle } from 'react-native';
import { theme } from '@styles/theme';

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

export default AppInput;

const styles = StyleSheet.create({
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
});