import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import axios from 'axios';

const LocationTracker = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    const fetchLocation = async () => {
      try {
        const response = await axios.get('http://localhost:3000/location');
        setLocation(response.data);
      } catch (error) {
        console.error('Error fetching location:', error);
      }
    };

    fetchLocation();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Location:</Text>
      {location ? (
        <Text style={styles.location}>{location}</Text>
      ) : (
        <Text style={styles.location}>Loading...</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
  },
});

export default LocationTracker;
