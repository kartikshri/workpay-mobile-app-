/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import AsyncStorage from '@react-native-async-storage/async-storage';

import LoginScreen from './src/screens/LoginScreen';
import HomeScreen from './src/screens/HomeScreen';
import RoleSelectionScreen from './src/screens/RoleSelectionScreen';
import ClientProfileScreen from './src/screens/ClientProfileScreen';

// Define the type for the navigation stack parameters
export type RootStackParamList = {
  Login: undefined;
  LoginSuccess: undefined;
  Home: undefined;
  RoleSelection: { token: string; email?: string };
  ClientProfile: { token: string; email?: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen 
            name="Login" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="LoginSuccess" 
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="RoleSelection" 
            component={RoleSelectionScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="ClientProfile" 
            component={ClientProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Home" 
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default App;
