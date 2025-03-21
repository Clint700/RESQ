import { StackNavigationProp } from '@react-navigation/stack';

// Define all available routes
export type RootStackParamList = {
  'index': undefined;
  'emergency-setup': undefined;
  'chatbot': undefined;
  'location-tracker': undefined;
  'signup': undefined;
  'login': undefined;
};

// Define a type for navigation prop
export type NavigationProp = StackNavigationProp<RootStackParamList>;