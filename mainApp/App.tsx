import React from 'react';
import './sheets'
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/data/authContext';
import { MainNavigator } from './src/navigation/navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SheetProvider } from 'react-native-actions-sheet';
import { CartProvider } from './src/data/cartContext';
export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider> 
        <CartProvider> 
          <SheetProvider>
            <NavigationContainer>
              <MainNavigator/>
            </NavigationContainer>
          </SheetProvider>
        </CartProvider>
      </AuthProvider>
    </SafeAreaProvider>
      
  );
}

