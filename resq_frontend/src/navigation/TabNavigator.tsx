// src/navigation/TabNavigator.tsx
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';
import MapStack from './MapStack';
import ChatbotScreen from '@screens/ChatbotScreen';
import EmergencyScreen from '@screens/EmergencyScreen';
import ContactScreen from '@screens/ContactScreen';
import { theme } from '@styles/theme';

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ color, size }) => {
          let iconName = 'map';
          if (route.name === 'Chatbot') iconName = 'chatbubble-ellipses';
          if (route.name === 'Emergency') iconName = 'warning';
          if (route.name === 'Contact') iconName = 'mail';
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
        },
        headerShown: false,
      })}
    >
      <Tab.Screen name="Map" component={MapStack} />
      <Tab.Screen name="Chatbot" component={ChatbotScreen} />
      <Tab.Screen
        name="Emergency"
        component={EmergencyScreen}
        options={{
          title: 'Emergency🚨', // This is the title shown in the header
          headerShown: true,              // Show the header
          headerTitleAlign: 'center',     // Optional: center the title on iOS
          headerStyle: {
            backgroundColor: theme.colors.background,
          },
          headerTitleStyle: {
            fontSize: theme.fontSize.title,
            fontWeight: 'bold',
            color: theme.colors.primary,
          },
        }}
      />
      <Tab.Screen 
      name="Contact" 
      component={ContactScreen} 
      options={{
        title: '📞 Contacts', // This is the title shown in the header
        headerShown: true,              // Show the header
        headerTitleAlign: 'center',     // Optional: center the title on iOS
        headerStyle: {
          backgroundColor: theme.colors.background,
        },
        headerTitleStyle: {
          fontSize: theme.fontSize.title,
          fontWeight: 'bold',
          color: theme.colors.primary,
        },
      }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;