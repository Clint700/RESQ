// import React from 'react';
// import { TextInput, View, Text, StyleSheet, TouchableOpacity, TextInputProps } from 'react-native';
// //import { TextInputProps } from 'react-native';

// // Theme Definition (Adaptable for Web) - keep it consistent
// interface Theme {
//     colors: {
//         primary: string;
//         primaryLight: string;
//         secondary: string;
//         text: string;
//         textSecondary: string;
//         background: string;
//         inputBackground: string;
//         buttonText: string;
//         link: string;
//         inputBorder: string;
//         card: string;
//         cardTitle: string;
//         cardDescription: string;
//     };
//     spacing: {
//         small: number;
//         medium: number;
//         large: number;
//         xLarge: number;
//     };
//     fontSize: {
//         small: number;
//         medium: number;
//         large: number;
//         xLarge: number;
//         title: number;
//         h1: number;
//         h2: number;
//     };
//     fontWeight: {
//         normal: '400' | '500' | '700';
//         bold: '400' | '500' | '700';
//     };
//     borderRadius: number;
//     inputHeight: number;
//     buttonHeight: number;
//     shadow: {
//         small: any;
//         medium: any;
//         large: any;
//     };
// }

// const theme: Theme = {
//     colors: {
//         primary: '#e53e3e', // Red - Consistent with RESQ theme, urgency, importance
//         primaryLight: '#f56565', // Lighter red
//         secondary: '#a0aec0', // Gray - for less critical elements
//         text: '#2d3748',       // Dark gray/black - for readability
//         textSecondary: '#718096', // Medium gray
//         background: '#f7fafc',  // Very light gray - for background
//         inputBackground: '#fff',
//         inputBorder: '#cbd5e0', // Light gray border
//         buttonText: '#fff',     // White text for buttons
//         link: '#3182ce',       // Blue for links
//         card: '#fff',
//         cardTitle: '#2d3748',
//         cardDescription: '#718096',
//     },
//     spacing: {
//         small: 8,
//         medium: 16,
//         large: 24,
//         xLarge: 32,
//     },
//     fontSize: {
//         small: 12,
//         medium: 14,
//         large: 18,
//         xLarge: 24,
//         title: 28,
//         h1: 30,
//         h2: 24,
//     },
//     fontWeight: {
//         normal: '400',
//         bold: '700',
//     },
//     borderRadius: 8, // Consistent border radius
//     inputHeight: 50,
//     buttonHeight: 50,
//     shadow: {
//         small: {
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 2 },
//             shadowOpacity: 0.1,
//             shadowRadius: 4,
//             elevation: 2,
//         },
//         medium: {
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 4 },
//             shadowOpacity: 0.1,
//             shadowRadius: 6,
//             elevation: 4,
//         },
//         large: {
//             shadowColor: '#000',
//             shadowOffset: { width: 0, height: 6 },
//             shadowOpacity: 0.15,
//             shadowRadius: 8,
//             elevation: 6,
//         },
//     },
// };

// // Reusable Input Component
// const Input = React.forwardRef<TextInput, React.TextInputProps>(({ style, ...props }, ref) => {
//     const inputStyle = [styles.input, style];
//     return (
//         <TextInput
//             ref={ref}
//             style={inputStyle}
//             placeholderTextColor={theme.colors.textSecondary}
//             {...props}
//         />
//     );
// });
// Input.displayName = 'Input';

// // Card Component
// const Card = ({ style, children }: { style?: any, children: React.ReactNode }) => {
//     const cardStyle = [styles.card, style];
//     return (
//         <View style={cardStyle}>
//             {children}
//         </View>
//     );
// };

// // Card Header Component
// const CardHeader = ({ style, children }: { style?: any, children: React.ReactNode }) => {
//     const headerStyle = [styles.cardHeader, style];
//     return (
//         <View style={headerStyle}>
//             {children}
//         </View>
//     );
// };

// // Card Title Component
// const CardTitle = ({ style, children }: { style?: any, children: React.ReactNode }) => {
//     const titleStyle = [styles.cardTitle, style];
//     return (
//         <Text style={titleStyle}>
//             {children}
//         </Text>
//     );
// };

// // Card Description Component
// const CardDescription = ({ style, children }: { style?: any, children: React.ReactNode }) => {
//     const descriptionStyle = [styles.cardDescription, style];
//     return (
//         <Text style={descriptionStyle}>
//             {children}
//         </Text>
//     );
// };

// // Card Content Component
// const CardContent = ({ style, children }: { style?: any, children: React.ReactNode }) => {
//     const contentStyle = [styles.cardContent, style];
//     return (
//         <View style={contentStyle}>
//             {children}
//         </View>
//     );
// };

// // --- Styles ---
// const styles = StyleSheet.create({
//     input: {
//         width: '100%',
//         height: theme.inputHeight,
//         paddingHorizontal: theme.spacing.medium,
//         borderWidth: 1,
//         borderColor: theme.colors.inputBorder,
//         borderRadius: theme.borderRadius,
//         backgroundColor: theme.colors.inputBackground,
//         marginBottom: theme.spacing.small,
//         fontSize: theme.fontSize.medium,
//         color: theme.colors.text,
//     },
//     card: {
//         backgroundColor: theme.colors.card,
//         borderRadius: theme.borderRadius,
//         marginBottom: theme.spacing.medium,
//         ...theme.shadow.small,
//     },
//     cardHeader: {
//         padding: theme.spacing.medium,
//         paddingBottom: theme.spacing.small,
//     },
//     cardTitle: {
//         fontSize: theme.fontSize.large,
//         fontWeight: 'bold',
//         color: theme.colors.cardTitle,
//     },
//     cardDescription: {
//         fontSize: theme.fontSize.medium,
//         color: theme.colors.cardDescription,
//     },
//     cardContent: {
//         padding: theme.spacing.medium,
//         paddingTop: 0,
//     }
// });

// export { Input, Card, CardHeader, CardTitle, CardDescription, CardContent };
