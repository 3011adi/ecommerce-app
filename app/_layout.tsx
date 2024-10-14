// app/_layout.js
import { Stack } from "expo-router";
import Buy from "./buy";
export default function Layout() {
  return (
    <Stack  initialRouteName="landingPage">
      <Stack.Screen name="landingPage" options={{ headerShown: false }} />
      <Stack.Screen name="LoginScreen" options={{ headerShown: false }} />
      <Stack.Screen name="SignupScreen" options={{ headerShown: false }} />
      <Stack.Screen name="ForgotPasswordScreen" options={{ headerShown: false }} />
      <Stack.Screen name="index" options={{ headerShown: false }} />
      <Stack.Screen name="sell" options={{ headerShown: false }}/>
      <Stack.Screen name="buy"   options={{ headerShown: false }}/>
      <Stack.Screen name="cart"   options={{ headerShown: false }} />
      <Stack.Screen name="jarvis"  options={{ headerShown: false }}  />
    </Stack>
  );
}