import React, { useState, useEffect } from 'react';
import './sheets'
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './src/data/authContext';
import { MainNavigator } from './src/navigation/navigator';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { SheetProvider } from 'react-native-actions-sheet';
import { CartProvider } from './src/data/cartContext';
import { ErrorProvider } from './src/data/errorContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const NAVIGATION_STATE_KEY = 'PASSED_NAVIGATION_STATE';
export default function App() {
  const [isReady, setIsReady] = useState(false);
  const [initialState, setInitialState] = useState();

  useEffect(() => {
    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(NAVIGATION_STATE_KEY);
        const state = savedStateString ? JSON.parse(savedStateString) : undefined;
        if (state) setInitialState(state);
      } catch (e) {
        console.error("Ошибка восстановления навигации", e);
      } finally {
        setIsReady(true);
      }
    };
    restoreState();
  }, []);

  if (!isReady) return null;

  return (
    <SafeAreaProvider>
      <ErrorProvider>
        <AuthProvider> 
          <CartProvider> 
            <SheetProvider>
              <NavigationContainer
                initialState={initialState}
                onStateChange={(state) => {
                  AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state));
                }}
              >
                <MainNavigator/>
              </NavigationContainer>
            </SheetProvider>
          </CartProvider>
        </AuthProvider>
      </ErrorProvider>
    </SafeAreaProvider>
  );
}
