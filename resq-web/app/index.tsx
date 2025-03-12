import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { useNavigation } from 'expo-router';
import { NavigationProp } from '../src/types/navigation'; // Import the navigation type

const HomeScreen = () => {
  const navigation = useNavigation<NavigationProp>(); // Use the correct type

  return (
    <View style={styles.container}>
      <Button title="Trigger Emergency" onPress={() => alert("Emergency Triggered!")} />
      <Button title="Setup Contacts" onPress={() => navigation.navigate('emergency-setup')} />
      <Button title="First Aid Chatbot" onPress={() => navigation.navigate('chatbot')} />
      <Button title="Location Tracker" onPress={() => navigation.navigate('location-tracker')} />
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