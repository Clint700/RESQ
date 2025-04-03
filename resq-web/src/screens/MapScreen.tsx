import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  Platform,
  ActivityIndicator,
} from 'react-native';
import { useRouter } from 'expo-router';
import * as Location from 'expo-location';
import { useUserLocation } from '@hooks/useLocation';
import { theme } from '@styles/theme';

let MapView: React.ComponentType<any> | null = null;
let Marker: React.ComponentType<any> | null = null;
let PROVIDER_DEFAULT: any = null;
let PROVIDER_GOOGLE: any = null;

const MapScreen = () => {
  const router = useRouter();
  const [isWeb, setIsWeb] = useState(false);
  const [region, setRegion] = useState<{
    latitude: number;
    longitude: number;
    latitudeDelta: number;
    longitudeDelta: number;
  } | null>(null);
  const [tappedLocation, setTappedLocation] = useState<{ latitude: number; longitude: number } | null>(null);
  const [address, setAddress] = useState<string | null>(null);

  const { location, loading, error }: { location: { latitude: number; longitude: number } | null; loading: boolean; error: string | null } = useUserLocation();

  useEffect(() => {
    const loadNativeModules = () => {
      if (Platform.OS === 'web') {
        setIsWeb(true);
      } else {
        try {
          const maps = require('react-native-maps');
          MapView = maps.default;
          Marker = maps.Marker;
          PROVIDER_DEFAULT = maps.PROVIDER_DEFAULT;
          PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;
        } catch (err) {
          console.warn('Error loading maps', err);
        }
      }
    };
    loadNativeModules();
  }, []);

  useEffect(() => {
    if (location && typeof location.latitude === 'number' && typeof location.longitude === 'number') {
      setRegion({
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    }
  }, [location]);

  const handleMapPress = async (e: any) => {
    const coords = e.nativeEvent.coordinate;
    setTappedLocation(coords);

    try {
      const geo = await Location.reverseGeocodeAsync(coords);
      const place = geo?.[0];
      const fullAddress = `${place?.name || ''}, ${place?.city || ''}, ${place?.region || ''}`;
      setAddress(fullAddress);
    } catch (error) {
      console.warn('Reverse geocode failed', error);
      setAddress(null);
    }
  };

  const handleMarkerPress = () => {
    if (!tappedLocation) return;
    router.push({
      pathname: '/(tabs)/map-details',
      params: {
        lat: tappedLocation.latitude,
        lng: tappedLocation.longitude,
        name: address || 'Pinned Location',
      },
    });
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
        <Text style={styles.loadingText}>Fetching Location...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.centered}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {MapView && region ? (
        <MapView
          provider={Platform.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
          style={styles.map}
          region={region}
          showsUserLocation
          onPress={handleMapPress}
        >
          {Marker && tappedLocation && (
            <Marker
              coordinate={tappedLocation}
              title="Selected Location"
              description={address || 'Tap for details'}
              onCalloutPress={handleMarkerPress}
              pinColor={theme.colors.primary}
            />
          )}
        </MapView>
      ) : (
        <View style={styles.centered}>
          <Text>Map could not load.</Text>
        </View>
      )}
    </View>
  );
};

export default MapScreen;

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: '100%', height: '100%' },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.medium,
  },
  loadingText: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.medium,
  },
  errorText: {
    fontSize: theme.fontSize.medium,
    color: theme.colors.secondary,
    textAlign: 'center',
  },
});