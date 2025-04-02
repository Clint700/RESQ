import { Stack } from "expo-router";
import { AuthProvider } from "../src/context/AuthContext";

export default function Layout() {
  return (
    <AuthProvider>
    <Stack>
      <Stack.Screen name="index" options={{ title: "Home", headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="signup" options={{ title: "Sign Up", headerShown: false, animation: "slide_from_right" }}/>
      <Stack.Screen name="login" options={{ title: "Login", headerShown: false, animation: "slide_from_right" }}/>
      <Stack.Screen name="chatbot" options={{ title: "Chatbot", headerShown: false, animation: "slide_from_right" }}/>
      <Stack.Screen name="about" options={{ title: "About", headerShown: false, animation: "slide_from_right" }} />
      <Stack.Screen name="mapscreen" options={{ title: "Map", headerShown: false, animation: "slide_from_right" }}/>
    </Stack>
    </AuthProvider>
  );
}