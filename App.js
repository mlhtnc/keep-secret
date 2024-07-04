import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CrossPlatformStatusBar from './components/CrossPlatformStatusBar';
import LoginScreen from './components/screens/LoginScreen';
import HomeScreen from './components/screens/HomeScreen';


const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <CrossPlatformStatusBar />
        <Stack.Navigator initialRouteName={"LoginScreen"} screenOptions={{ headerShown: false }}>
          <Stack.Screen name={"LoginScreen"} component={LoginScreen} />
          <Stack.Screen name={"HomeScreen"} component={HomeScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}