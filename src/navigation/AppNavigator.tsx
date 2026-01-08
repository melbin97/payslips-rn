/**
 * Main app navigator
 * Sets up the navigation structure for the app
 */

import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import type { RootStackParamList } from './types';
import PayslipListScreen from '../screens/PayslipListScreen';
import PayslipDetailsScreen from '../screens/PayslipDetailsScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="PayslipList"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#FFFFFF',
          },
          headerTintColor: '#000000',
          headerTitleStyle: {
            fontWeight: '600',
          },
        }}>
        <Stack.Screen
          name="PayslipList"
          component={PayslipListScreen}
          options={{
            title: 'Payslips',
          }}
        />
        <Stack.Screen
          name="PayslipDetails"
          component={PayslipDetailsScreen}
          options={{
            title: 'Payslip Details',
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

