// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MapStack from './MapStack';
import ChatbotScreen from '@screens/ChatbotScreen';
import EmergencyScreen from '@screens/EmergencyScreen';
import ContactScreen from '@screens/ContactScreen';
import ProfileScreen from '@screens/ProfileScreen';
import { theme } from '@styles/theme';
import { Platform } from 'react-native';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => {
        let iconName: string = 'map';

        switch (route.name) {
          case 'Chatbot':
            iconName = 'chatbubble-ellipses-outline';
            break;
          case 'Emergency':
            iconName = 'warning-outline';
            break;
          case 'Contact':
            iconName = 'people-outline';
            break;
          case 'Profile':
            iconName = 'person-circle-outline';
            break;
          case 'Map':
          default:
            iconName = 'map-outline';
        }

        return {
          tabBarIcon: ({ color, size }) => (
            <Icon name={iconName} size={size} color={color} />
          ),
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: {
            backgroundColor: theme.colors.background,
            borderTopColor: 'transparent',
            shadowColor: '#000',
            shadowOpacity: 0.05,
            shadowOffset: { width: 0, height: -3 },
            shadowRadius: 8,
            elevation: 8,
            height: Platform.OS === 'ios' ? 80 : 60,
            paddingBottom: Platform.OS === 'ios' ? 20 : 8,
            paddingTop: 4,
          },
          tabBarLabelStyle: {
            fontSize: theme.fontSize.small,
            fontWeight: '500',
            marginBottom: Platform.OS === 'ios' ? 4 : 0,
          },
          headerShown: true,
          headerTitleAlign: 'center',
          headerStyle: {
            backgroundColor: theme.colors.background,
            shadowOpacity: 0,
            elevation: 0,
          },
          headerTitleStyle: {
            fontSize: theme.fontSize.title,
            fontWeight: 'bold',
            color: theme.colors.primary,
          },
        };
      }}
    >
      <Tab.Screen
        name="Map"
        component={MapStack}
        options={{ title: 'Map' }}
      />
      <Tab.Screen
        name="Chatbot"
        component={ChatbotScreen}
        options={{ title: 'Chatbot', headerShown: false}}
      />
      <Tab.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{ title: 'Emergency' }}
      />
      <Tab.Screen
        name="Contact"
        component={ContactScreen}
        options={{ title: 'Contacts' }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{ title: 'Profile' }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;