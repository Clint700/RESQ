import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from '../screens/HomeScreen';
import EmergencyContactSetup from '../screens/EmergencyContactSetup';
import Chatbot from '../screens/Chatbot';
import LocationTracker from '../screens/LocationTracker';
import AdminDashboard from '../screens/AdminDashboard';

const Stack = createStackNavigator();

const AppNavigator = () => {
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

export default AppNavigator;
