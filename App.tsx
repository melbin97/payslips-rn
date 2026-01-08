/**
 * Payslips App
 * Main entry point for the React Native application
 *
 * @format
 */

import React from 'react';
import { StatusBar, useColorScheme } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { PayslipsProvider } from './src/context/PayslipsContext';
import AppNavigator from './src/navigation/AppNavigator';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <PayslipsProvider>
        <AppNavigator />
      </PayslipsProvider>
    </SafeAreaProvider>
  );
}

export default App;
