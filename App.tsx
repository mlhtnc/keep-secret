import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import BootSplash from "react-native-bootsplash";

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import { DetailsScreenName, HomeScreenName, ImportSecretsScreenName, LoginScreenName, NoteDetailsScreenName } from './src/constants';
import { RootStackParamList } from './src/types';
import NoteDetailsScreen from './src/screens/NoteDetailsScreen';
import ImportSecretsScreen from './src/screens/ImportSecretsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar translucent backgroundColor={"transparent"} barStyle="light-content" />
        <NavigationContainer onReady={() => BootSplash.hide() }>
          <Stack.Navigator initialRouteName={LoginScreenName} screenOptions={{ headerShown: false, animation: 'none' }}>
            <Stack.Screen name={LoginScreenName} component={LoginScreen} />
            <Stack.Screen name={HomeScreenName} component={HomeScreen} />
            <Stack.Screen name={DetailsScreenName} component={DetailsScreen} />
            <Stack.Screen name={NoteDetailsScreenName} component={NoteDetailsScreen} />
            <Stack.Screen name={ImportSecretsScreenName} component={ImportSecretsScreen} />
          </Stack.Navigator>
        </NavigationContainer>
    </SafeAreaProvider>
  );
}