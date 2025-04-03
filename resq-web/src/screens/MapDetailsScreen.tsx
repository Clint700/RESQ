import React from 'react';
import { View, Text, StyleSheet, Image, ScrollView } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { theme } from '@styles/theme';

const MapDetailsScreen = () => {
  const { lat, lng, name } = useLocalSearchParams();

  const latitude = typeof lat === 'string' ? parseFloat(lat) : lat;
  const longitude = typeof lng === 'string' ? parseFloat(lng) : lng;

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {/* Image preview (using Unsplash mock for now) */}
      <Image
        source={{
          uri: `https://source.unsplash.com/random/800x400/?city,landscape,location`,
        }}
        style={styles.mapImage}
        resizeMode="cover"
      />

      <Text style={styles.title}>{name || 'Selected Location'}</Text>

      <Text style={styles.label}>Latitude</Text>
      <Text style={styles.value}>{latitude ?? 'N/A'}</Text>

      <Text style={styles.label}>Longitude</Text>
      <Text style={styles.value}>{longitude ?? 'N/A'}</Text>

      <Text style={styles.description}>
        This is a sample location detail screen. You can enhance this by integrating with
        Google Places, Foursquare, or even OpenStreetMap APIs to show detailed info like:
        photos, reviews, business names, or place types.
      </Text>
    </ScrollView>
  );
};

export default MapDetailsScreen;

const styles = StyleSheet.create({
  container: {
    padding: theme.spacing.large,
    backgroundColor: theme.colors.background,
    alignItems: 'center',
  },
  mapImage: {
    width: '100%',
    height: 200,
    borderRadius: theme.borderRadius,
    marginBottom: theme.spacing.large,
  },
  title: {
    fontSize: theme.fontSize.title,
    fontWeight: 'bold',
    color: theme.colors.primary,
    marginBottom: theme.spacing.medium,
    textAlign: 'center',
    fontFamily: theme.fontFamily.regular,
  },
  label: {
    fontSize: theme.fontSize.medium,
    fontWeight: 'bold',
    color: theme.colors.text,
    marginTop: theme.spacing.medium,
    fontFamily: theme.fontFamily.regular,
  },
  value: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.textSecondary,
    fontFamily: theme.fontFamily.regular,
  },
  description: {
    fontSize: theme.fontSize.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.large,
    textAlign: 'center',
    lineHeight: 20,
    fontFamily: theme.fontFamily.regular,
  },
});