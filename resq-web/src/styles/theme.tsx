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
        placeholderTextColor: '#95a5a6', // Gray color for placeholder text
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

export const theme: Theme = {
    colors: {
        primary: '#2c3e50',       // Dark blue - for a professional feel
        primaryLight: '#3498db',  // Lighter blue - for accents
        secondary: '#e74c3c',     // Red - for errors or important actions
        text: '#000',            // Black text
        textSecondary: '#bdc3c7',  // Gray text
        background: '#f0f0f0',    // Light gray background
        inputBackground: '#fff',
        inputBorder: '#d3d3d3',
        buttonText: '#fff',        // Black button text
        link: '#3498db',
        placeholderTextColor: '#95a5a6', // Gray color for placeholder text
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
    borderRadius: 8,
    inputHeight: 50,
    buttonHeight: 50,
};
