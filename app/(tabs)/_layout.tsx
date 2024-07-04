import Drawer from "expo-router/drawer";

export default function TabLayout () {
  return (
    <Drawer 
        screenOptions={{
            headerShown: false,
        }}
    >
      <Drawer.Screen name="games-page" />
      <Drawer.Screen name="map-page"  />
      <Drawer.Screen name="point-page"  />
      <Drawer.Screen name="video-stream-page"  />
    </Drawer>
  );
}