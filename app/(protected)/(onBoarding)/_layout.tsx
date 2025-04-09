import { Stack } from "expo-router";
export default function RootLayout() {
  return (
          <Stack> 
            <Stack.Screen name="uno" options={{headerShown: false}} />
            <Stack.Screen name="dos" options={{headerShown: false}} />
            <Stack.Screen name="tres" options={{headerShown: false}} />
          </Stack>
  );
}