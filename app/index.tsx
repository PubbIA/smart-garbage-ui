// import Login from '@/components/login';
import { Link } from 'expo-router';
import { View, Text, StyleSheet ,SafeAreaView } from 'react-native';
import Login from '@/components/login';
export default function HomeScreen() {
  return (
     
        <View style={styles.container}>
            <Text>Home</Text>
            <Login />
        </View>
   
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
