import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';
import axios from 'axios';

const EmergencyContactSetup = ({ navigation }) => {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');

  const addContact = async () => {
    try {
      await axios.post('http://localhost:3000/contacts/add', {
        userId: 1, // Replace with actual user ID
        name,
        phoneNumber,
      });
      alert('Contact Added!');
      navigation.goBack();
    } catch (error) {
      console.error('Error adding contact:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Phone Number"
        value={phoneNumber}
        onChangeText={setPhoneNumber}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <Button title="Add Contact" onPress={addContact} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
});

export default EmergencyContactSetup;
