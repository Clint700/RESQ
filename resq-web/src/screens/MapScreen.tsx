import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Text, Platform, TouchableOpacity } from 'react-native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { theme } from '../styles/theme';
import { ActivityIndicator } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import ChatbotScreen from '../screens/ChatbotScreen';
import EmergencyScreen from '../screens/EmergencyScreen';


let MapView: React.ComponentType<any> | null = null;
let Marker: React.ComponentType<any> | null = null;
let Location: any = null;
let PROVIDER_DEFAULT: any = null;
let PROVIDER_GOOGLE: any = null;

const MapScreen = () => {
    const [location, setLocation] = useState<{ latitude: number; longitude: number } | null>(null);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);
    const [region, setRegion] = useState({
        latitude: 37.78825,
        longitude: -122.4324,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
    });
    const [loading, setLoading] = useState(true);
    const [isWeb, setIsWeb] = useState(false);
    //const navigation = useNavigation(); //removed


    useEffect(() => {
        const checkPlatform = () => {
            if (typeof window !== 'undefined' && (typeof navigator !== 'undefined' && navigator.product !== 'ReactNative')) {
                setIsWeb(true);
            }
            else {
                setIsWeb(false);
                try {
                    const maps = require('react-native-maps');
                    MapView = maps.default;
                    Marker = maps.Marker;
                    Location = require('expo-location');
                    PROVIDER_DEFAULT = maps.PROVIDER_DEFAULT;
                    PROVIDER_GOOGLE = maps.PROVIDER_GOOGLE;

                } catch (error) {
                    console.error("Failed to load react-native-maps or expo-location in React Native:", error);
                    MapView = null;
                    Marker = null;
                    Location = null;
                }
            }
        }
        checkPlatform();

        (async () => {
            try {
                let status = 'granted';
                if (!isWeb) {

                    if (Location) {
                        const permission = await Location.requestForegroundPermissionsAsync();
                        status = permission.status;
                    }
                }


                if (status !== 'granted') {
                    setErrorMsg('Permission to access location was denied');
                    setLoading(false);
                    return;
                }

                let currentLocation = null;
                if (!isWeb) {
                    if (Location) {
                        currentLocation = await Location.getCurrentPositionAsync({
                            accuracy: Location.Accuracy.High,
                        });
                    }
                }
                else {
                    currentLocation = {
                        coords: {
                            latitude: 37.78825,
                            longitude: -122.4324,
                        }
                    };
                }


                setLocation(currentLocation?.coords || null);
                setRegion(currentLocation?.coords ? {
                    latitude: currentLocation.coords.latitude,
                    longitude: currentLocation.coords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                } : {
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                });
            } catch (error: any) {
                setErrorMsg(`Error getting location: ${error.message}`);
                setLoading(false);
            } finally {
                setLoading(false);
            }
        })();
    }, [isWeb]);



    let text = 'Waiting for location...';
    if (errorMsg) {
        text = errorMsg;
    } else if (location) {
        text = `Latitude: ${location.latitude}, Longitude: ${location.longitude}`;
    }

    return (
        <View style={styles.container}>
            {loading ? (
                <View style={styles.loadingContainer}>
                    <ActivityIndicator size="large" color={theme.colors.primary} />
                    <Text style={styles.loadingText}>Fetching Location...</Text>
                </View>
            ) : isWeb ? (
                <View style={{ ...styles.map, backgroundColor: 'lightgray', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Text>Map Placeholder (Web)</Text>
                    {location &&
                        <div style={{ position: 'absolute', bottom: '10px', left: '10px' }}>
                            <Text> {location.latitude}, {location.longitude} </Text>
                        </div>
                    }
                </View>
            )
                : (
                    <View style={styles.map}>
                        {MapView && location ? (
                            <MapView
                                provider={Platform?.OS === 'ios' ? PROVIDER_DEFAULT : PROVIDER_GOOGLE}
                                style={styles.map}
                                region={region}
                                showsUserLocation={true}
                                zoomEnabled={true}
                                mapType="standard"
                            >
                                {Marker && location && (
                                    <Marker
                                        coordinate={location}
                                        title="Your Location"
                                        description={text}
                                        pinColor={theme.colors.primary}
                                    >
                                        <TouchableOpacity onPress={() => {
                                            //navigation.navigate('Chatbot'); // removed
                                        }}>
                                            {/* <View style={{ backgroundColor: 'blue', padding: 5, borderRadius: 10 }}>
                                                <Text style={{ color: 'white' }}></Text>
                                            </View> */}
                                        </TouchableOpacity>
                                    </Marker>
                                )}
                            </MapView>
                        ) : (
                            <View style={styles.errorContainer}>
                                <Text style={styles.errorText}>Map is not supported on this platform.</Text>
                            </View>
                        )}
                        {location && (
                            <View style={styles.locationContainer}>
                                <Text style={styles.locationText}>{text}</Text>
                            </View>
                        )}
                    </View>
                )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.colors.background,
        alignItems: 'center',
        justifyContent: 'center',
    },
    map: {
        width: '100%',
        height: '100%',
    },
    errorContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    errorText: {
        fontSize: theme.fontSize.medium,
        color: theme.colors.secondary,
        textAlign: 'center'
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    loadingText: {
        fontSize: theme.fontSize.medium,
        color: theme.colors.textSecondary,
        marginTop: theme.spacing.medium
    },
    locationContainer: {
        position: 'absolute',
        bottom: theme.spacing.medium,
        left: theme.spacing.medium,
        backgroundColor: 'rgba(255, 255, 255, 0.7)',
        padding: theme.spacing.small,
        borderRadius: theme.borderRadius,
        zIndex: 10,
    },
    locationText: {
        fontSize: theme.fontSize.small,
        color: theme.colors.text,
    },
});



// Placeholder components for other tabs
const ContactScreen = () => (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>Contact Screen</Text>
    </View>
);

//const HomeScreen = () => {  //removed
const TabbedHomeScreen = () => {
    const Tab = createBottomTabNavigator();
    //const navigation = useNavigation(); //removed

    return (
        <Tab.Navigator
            screenOptions={({ route }) => ({
                tabBarIcon: ({ focused, color, size }) => {
                    let iconName: string = 'map';
                    if (route.name === 'Chatbot') {
                        iconName = 'chatbubble-ellipses';
                    } else if (route.name === 'Emergency') {
                        iconName = 'warning';
                    } else if (route.name === 'Contact') {
                        iconName = 'mail';
                    }

                    // You can return any component that you like here!
                    return <Icon name={iconName} size={size} color={color} />;
                },
                tabBarActiveTintColor: 'gray',
                tabBarInactiveTintColor: 'black',
                tabBarStyle: {
                    backgroundColor: theme.colors.background,
                    borderTopColor: 'transparent',
                },
                tabBarLabelStyle: {
                    fontSize: theme.fontSize.small,
                }
            })}
        >
            <Tab.Screen name="Home" component={MapScreen} options={{
                title: "Map",
                headerShown: false,
            }} />
            <Tab.Screen name="Chatbot" component={ChatbotScreen} options={{
                title: "Chatbot",
                headerShown: false,
            }} />
            <Tab.Screen name="Emergency" component={EmergencyScreen} options={{
                title: "Emergency",
                headerShown: true,
            }} />
            <Tab.Screen name="Contact" component={ContactScreen} options={{
                title: "Contact",
                headerShown: true,
            }} />
        </Tab.Navigator>
    );
};

export default TabbedHomeScreen;
