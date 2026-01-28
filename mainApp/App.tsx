import React, { useState, useEffect, useRef } from 'react'
import { AppState } from 'react-native'
import './sheets'
import { NavigationContainer } from '@react-navigation/native'
import { AuthProvider } from './src/data/authContext'
import { MainNavigator } from './src/navigation/navigator'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { SheetProvider } from 'react-native-actions-sheet'
import { CartProvider } from './src/data/cartContext'
import { ErrorProvider } from './src/data/errorContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { requestPermissions, missingNofification, cancelNotification } from './src/data/services/notificationService'

const NAVIGATION_STATE_KEY = 'PASSED_NAVIGATION_STATE'

export default function App() {
  const [isReady, setIsReady] = useState(false)
  const [initialState, setInitialState] = useState()
  const appState = useRef(AppState.currentState)

  useEffect(() => {
    requestPermissions()
    cancelNotification()

    const restoreState = async () => {
      try {
        const savedStateString = await AsyncStorage.getItem(NAVIGATION_STATE_KEY)
        const state = savedStateString ? JSON.parse(savedStateString) : undefined
        if (state) setInitialState(state)
      } catch (e) {
        console.log(e)
      } finally {
        setIsReady(true)
      }
    }
    restoreState()

    const subscription = AppState.addEventListener('change', nextAppState => {
      if (appState.current === 'active' && nextAppState.match(/inactive|background/)) {
        missingNofification()
      }
      if (appState.current.match(/inactive|background/) && nextAppState === 'active') {
        cancelNotification()
      }
      appState.current = nextAppState
    })

    return () => subscription.remove()
  }, [])

  if (!isReady) return null

  return (
    <SafeAreaProvider>
      <ErrorProvider>
        <AuthProvider> 
          <CartProvider> 
            <SheetProvider>
              <NavigationContainer
                initialState={initialState}
                onStateChange={(state) => {
                  AsyncStorage.setItem(NAVIGATION_STATE_KEY, JSON.stringify(state))
                }}
              >
                <MainNavigator/>
              </NavigationContainer>
            </SheetProvider>
          </CartProvider>
        </AuthProvider>
      </ErrorProvider>
    </SafeAreaProvider>
  )
}
