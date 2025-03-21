import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '../src/types/navigation'; // Import the navigation type
import LoginScreen from '@/src/screens/LoginScreen';

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>(); // Use the correct type

  return (
    <View style={styles.container}>
      <LoginScreen />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default HomeScreen;