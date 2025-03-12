import React from 'react';
import { View, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const HomeScreen = ({ navigation }) => {

  const triggerEmergency = async () => {
    try {
      await axios.post('http://localhost:3000/emergency/trigger', {
        userId: 1, // Replace with actual user ID
        location: 'Current Location'
      });
      alert('Emergency Triggered!');
    } catch (error) {
      console.error('Error triggering emergency:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Button title="Trigger Emergency" onPress={triggerEmergency} />
      <Button title="Setup Contacts" onPress={() => navigation.navigate('EmergencyContactSetup')} />
      <Button title="First Aid Chatbot" onPress={() => navigation.navigate('Chatbot')} />
      <Button title="Location Tracker" onPress={() => navigation.navigate('LocationTracker')} />
      <Button title="Admin Dashboard" onPress={() => navigation.navigate('AdminDashboard')} />
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
