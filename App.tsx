import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import CrossPlatformStatusBar from './src/components/CrossPlatformStatusBar';
import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import { HomeScreenName, LoginScreenName, SettingsScreenName } from './src/constants';
import SettingsScreen from './src/screens/SettingsScreen';
import { RootStackParamList } from './src/types';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <CrossPlatformStatusBar />
        <Stack.Navigator initialRouteName={LoginScreenName} screenOptions={{ headerShown: false, animation: 'none' }}>
          <Stack.Screen name={LoginScreenName} component={LoginScreen} />
          <Stack.Screen name={HomeScreenName} component={HomeScreen} />
          <Stack.Screen name={SettingsScreenName} component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}