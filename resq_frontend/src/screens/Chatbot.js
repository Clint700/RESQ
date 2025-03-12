import React, { useState } from 'react';
import { View, TextInput, Button, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const Chatbot = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');

  const getFirstAidGuidance = async () => {
    try {
      const result = await axios.post('http://localhost:3000/bot/first-aid', { query });
      setResponse(result.data.response);
    } catch (error) {
      console.error('Error fetching guidance:', error);
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        placeholder="Ask for first aid guidance"
        value={query}
        onChangeText={setQuery}
        style={styles.input}
      />
      <Button title="Get Guidance" onPress={getFirstAidGuidance} />
      <Text style={styles.response}>{response}</Text>
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
  response: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default Chatbot;
