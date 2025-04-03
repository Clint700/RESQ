// src/navigation/MapStack.tsx
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MapScreen from '@screens/MapScreen';
import MapDetailsScreen from '@screens/MapDetailsScreen'; // if you want sub screens

const Stack = createNativeStackNavigator();

const MapStack = () => (
  <Stack.Navigator screenOptions={{ headerShown: false }}>
    <Stack.Screen name="MapMain" component={MapScreen} />
    <Stack.Screen name="MapDetails" component={MapDetailsScreen} />
  </Stack.Navigator>
);

export default MapStack;