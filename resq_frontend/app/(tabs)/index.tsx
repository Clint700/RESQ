// app/(tabs)/index.tsx
import TabNavigator from 'src/navigation/TabNavigator';
import { Text } from 'react-native-svg';

export default function Tabs() {
  if (!TabNavigator) {
    return <Text>TabNavigator not found</Text>;
  }

  return <TabNavigator />;
}