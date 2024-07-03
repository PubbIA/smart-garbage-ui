import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { Drawer } from 'expo-router/drawer';
import { useFonts } from 'expo-font';
import { Stack } from 'expo-router';



export default function Layout() {
  useFonts({
    'outfit-Bold': require('./../assets/fonts/Outfit-Bold.ttf'),
    'outfit-Medium': require('./../assets/fonts/Outfit-Medium.ttf'),
    'outfit': require('./../assets/fonts/Outfit-Regular.ttf'),
  });
  
  return (
    <Stack screenOptions={{
      headerShown: false,
    }}>
      <Stack.Screen name="index"   />
    </Stack>
  );
}
