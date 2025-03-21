import { Stack } from "expo-router";

export default function Layout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home" }} />
      <Stack.Screen name="emergency-setup" options={{ title: "Setup Contacts" }} />
      <Stack.Screen name="chatbot" options={{ title: "First Aid Chatbot" }} />
      <Stack.Screen name="location-tracker" options={{ title: "Location Tracker" }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up" }} />
      <Stack.Screen name="login" options={{ title: "Login" }} />
    </Stack>
  );
}