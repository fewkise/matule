import { Stack } from "expo-router";
import { SheetProvider, registerSheet } from 'react-native-actions-sheet';
import {BottomSheet, CategorySheet } from 'uikit'
const StorybookEnabled = process.env.EXPO_PUBLIC_STORYBOOK_ENABLED === "true";
registerSheet('text-sheet', BottomSheet);
registerSheet('category-sheet', CategorySheet);
export const unstable_settings = {
  initialRouteName: StorybookEnabled ? "(storybook)/index" : "(pages)/index",
};

export default function RootLayout() {
  return (
    <SheetProvider>
      <Stack screenOptions={{ headerShown: false }}>
      <Stack.Protected guard={StorybookEnabled}>
        <Stack.Screen name="(storybook)/index" />
      </Stack.Protected>

      <Stack.Screen name="(pages)/index" />
    </Stack>
    </SheetProvider>
    
  );
}
