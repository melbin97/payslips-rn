/**
 * Tests for PayslipListScreen component
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';
import PayslipListScreen from '../../src/screens/PayslipListScreen';
import { PayslipsProvider } from '../../src/context/PayslipsContext';
import { NavigationContainer } from '@react-navigation/native';

// Mock navigation
jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe('PayslipListScreen', () => {
  test('renders without crashing', async () => {
    await ReactTestRenderer.act(() => {
      ReactTestRenderer.create(
        <NavigationContainer>
          <PayslipsProvider>
            <PayslipListScreen />
          </PayslipsProvider>
        </NavigationContainer>
      );
    });
  });

  test('displays payslip items in the list', async () => {
    let tree: ReactTestRenderer.ReactTestRenderer;
    
    await ReactTestRenderer.act(() => {
      tree = ReactTestRenderer.create(
        <NavigationContainer>
          <PayslipsProvider>
            <PayslipListScreen />
          </PayslipsProvider>
        </NavigationContainer>
      );
    });

    const instance = tree!.root;
    // Verify component rendered
    expect(instance).toBeTruthy();
    
    // Check that FlatList is present (contains the payslip items)
    const flatList = instance.findByType('RCTScrollView'); // FlatList renders as ScrollView
    expect(flatList).toBeTruthy();
  });
});

