import React from 'react';
import { TouchableOpacity, Text, StyleSheet, StyleProp, TextStyle, ViewStyle } from 'react-native';
import { theme } from '@styles/theme';

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
export default AppLink;

const styles = StyleSheet.create({
    linkText: {
        color: theme.colors.link,
        fontSize: theme.fontSize.medium,
        fontFamily: theme.fontFamily.regular,
    },
});