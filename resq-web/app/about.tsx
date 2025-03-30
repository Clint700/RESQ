import React from 'react';
import { View, Text, StyleSheet, ScrollView, Platform } from 'react-native';

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
        text: '#000',       // Black text
        textSecondary: '#bdc3c7', // Gray text
        background: '#f0f0f0',  // Light gray background
        inputBackground: '#fff',
        inputBorder: '#d3d3d3',
        buttonText: '#000', // Black button text
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

const AboutScreen = () => {
    return (
        <ScrollView style={styles.container}>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>About ResQ</Text>
                <Text style={styles.paragraph}>
                    ResQ is an AI-powered emergency assistance app designed to provide rapid support during critical situations.  The platform automatically alerts your designated emergency contacts when you trigger an alert, ensuring help is on its way when you need it most.  Whether you're experiencing a car breakdown, feeling unsafe, or facing any other emergency, ResQ is here to help.
                </Text>

                <Text style={styles.heading}>Our Mission</Text>
                <Text style={styles.paragraph}>
                    Our mission is to provide a reliable and intelligent emergency response system that empowers users to quickly and effectively seek assistance. We leverage cutting-edge technology, including AI and location services, to ensure that help reaches you as swiftly as possible.
                </Text>

                <Text style={styles.heading}>Key Features</Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bullet}>●</Text> <Text style={styles.featureText}>Automatic Emergency Alerts:</Text>  Trigger an alert, and ResQ automatically notifies your emergency contacts.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bullet}>●</Text> <Text style={styles.featureText}>Geolocation Tracking:</Text>  Pinpoint your precise location using Google Maps API.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bullet}>●</Text> <Text style={styles.featureText}>Emergency SMS Notifications:</Text>  Automated SMS alerts sent to your contacts via Twilio API.
                </Text>
                <Text style={styles.paragraph}>
                   <Text style={styles.bullet}>●</Text>  <Text style={styles.featureText}>AI-Powered First-Aid Chatbot:</Text>  Receive immediate first-aid guidance from our AI chatbot while waiting for help.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bullet}>●</Text> <Text style={styles.featureText}>Emergency Contact Management:</Text> Easily set up and manage your emergency contacts.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bullet}>●</Text> <Text style={styles.featureText}>Admin Dashboard (Web):</Text>  Monitor requests and manage emergency contacts through a dedicated web interface.
                </Text>

                <Text style={styles.heading}>How It Works</Text>
                <Text style={styles.paragraph}>
                   ResQ utilizes a combination of mobile and web technologies to provide comprehensive emergency support:
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bullet}>●</Text> <Text style={styles.featureText}>React Native Mobile App:</Text>  Users trigger alerts and manage contacts via an intuitive mobile app.
                </Text>
                 <Text style={styles.paragraph}>
                    <Text style={styles.bullet}>●</Text>  <Text style={styles.featureText}>React.js Web Dashboard:</Text> Administrators monitor requests and manage data.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bullet}>●</Text> <Text style={styles.featureText}>Express.js and Node.js Backend:</Text>  A robust backend handles user authentication, alert processing, and API integrations.
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bullet}>●</Text> <Text style={styles.featureText}>PostgreSQL Database:</Text>  Securely stores user information, emergency contacts, and alert data.
                </Text>

                <Text style={styles.heading}>Technical Highlights</Text>
                <Text style={styles.paragraph}>
                    ResQ is built using a modern technology stack, including:
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bullet}>●</Text> Frontend: React Native (mobile), React.js (web)
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bullet}>●</Text> Backend: Express.js, Node.js
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bullet}>●</Text> Database: PostgreSQL
                </Text>
                <Text style={styles.paragraph}>
                    <Text style={styles.bullet}>●</Text> Authentication: JWT
                </Text>
                <Text style={styles.paragraph}>
                   <Text style={styles.bullet}>●</Text>  APIs: Google Maps, Twilio, OpenAI
                </Text>

                <Text style={styles.heading}>Why Choose ResQ?</Text>
                <Text style={styles.paragraph}>
                   ResQ stands out by providing a critical service with a focus on speed, reliability, and intelligent assistance.  It is designed for a wide range of users, including travelers, hikers, and anyone who may find themselves in a vulnerable situation.  The integration of AI-powered first-aid guidance ensures that users receive immediate support, even before emergency services arrive.
                </Text>

                <Text style={styles.heading}>Contact Us</Text>
                <Text style={styles.paragraph}>
                    For any inquiries or support, please contact us at support@resq.com.
                </Text>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
    },
    contentContainer: {
        padding: theme.spacing.large,
    },
    title: {
        fontSize: theme.fontSize.title,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginBottom: theme.spacing.large,
        textAlign: 'center',
    },
    heading: {
        fontSize: theme.fontSize.xLarge,
        fontWeight: 'bold',
        color: theme.colors.primary,
        marginTop: theme.spacing.xLarge,
        marginBottom: theme.spacing.medium,
    },
    paragraph: {
        fontSize: theme.fontSize.medium,
        color: theme.colors.text,
        lineHeight: 24,
        marginBottom: theme.spacing.medium,
    },
    bullet: {
        fontWeight: 'bold',
        color: theme.colors.primary,
    },
     featureText:{
        fontWeight: 'bold',
    },
});

export default AboutScreen;
