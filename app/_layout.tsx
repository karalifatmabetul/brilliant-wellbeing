import React, { useEffect } from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { Colors } from '@/src/theme/colors';
import { AppProvider } from '@/src/context/AppContext';
import { SubscriptionProvider } from '@/src/context/SubscriptionContext';

SplashScreen.preventAutoHideAsync().catch(() => {
  /* ignore error if already prevented or not available */
});

export default function RootLayout() {
  useEffect(() => {
    // Hide splash screen safely with a guaranteed fallback timeout
    const timer = setTimeout(async () => {
      try {
        await SplashScreen.hideAsync();
      } catch (e) {
        // ignore
      }
    }, 400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AppProvider>
      <SubscriptionProvider>
        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: { backgroundColor: Colors.background },
            animation: 'slide_from_right',
          }}
        >
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="course" options={{ headerShown: false }} />
          <Stack.Screen
            name="paywall"
            options={{
              presentation: 'modal',
              headerShown: false,
              animation: 'slide_from_bottom',
            }}
          />
          <Stack.Screen name="+not-found" />
        </Stack>
        <StatusBar style="light" />
      </SubscriptionProvider>
    </AppProvider>
  );
}
