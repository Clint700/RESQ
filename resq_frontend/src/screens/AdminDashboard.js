import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const AdminDashboard = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:3000/emergency/requests')
      .then(response => setRequests(response.data))
      .catch(error => console.error('Error fetching requests:', error));
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Admin Dashboard</Text>
      {requests.map(request => (
        <Text key={request.id}>{request.location} - {request.status}</Text>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default AdminDashboard;
