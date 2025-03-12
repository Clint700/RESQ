import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { getLocation } from '../src/services/location';

const LocationTrackerScreen = () => {
  interface LocationObjectCoords {
    latitude: number;
    longitude: number;
  }
  
  const [location, setLocation] = useState<LocationObjectCoords | null>(null);

  const fetchLocation = async () => {
    try {
      const response = await getLocation();
      setLocation(response);
    } catch (error) {
      console.error('Error fetching location:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Current Location:</Text>
      <Button title="Get Location" onPress={fetchLocation} />
      {location ? (
        <Text style={styles.location}>{`Lat: ${location.latitude}, Lng: ${location.longitude}`}</Text>
      ) : (
        <Text style={styles.location}>Press the button to get location</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
  location: {
    fontSize: 16,
  },
});

export default LocationTrackerScreen;