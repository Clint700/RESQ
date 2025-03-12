import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../src/screens/HomeScreen';
import EmergencyContactSetup from '../src/screens/EmergencyContactSetup';
import Chatbot from '../src/screens/Chatbot';
import LocationTracker from '../src/screens/LocationTracker';
import AdminDashboard from '../src/screens/AdminDashboard';

const Stack = createStackNavigator();

const App = () => {
  return (
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="EmergencyContactSetup" component={EmergencyContactSetup} />
        <Stack.Screen name="Chatbot" component={Chatbot} />
        <Stack.Screen name="LocationTracker" component={LocationTracker} />
        <Stack.Screen name="AdminDashboard" component={AdminDashboard} />
      </Stack.Navigator>
  );
};

export default App;
