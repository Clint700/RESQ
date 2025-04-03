// src/types/navigation.ts
import { StackNavigationProp } from '@react-navigation/stack';

// 1. Define all available routes and their params (if any)
export type RootStackParamList = {
  index: undefined;
  emergency: undefined;
  chatbot: undefined;
  signup: undefined;
  login: undefined;
  about: undefined;
  map: undefined;
};

// 2. Define a type for the navigation prop used throughout the app
export type NavigationProp = StackNavigationProp<RootStackParamList>;