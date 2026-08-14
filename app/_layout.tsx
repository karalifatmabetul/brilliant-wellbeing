import React from 'react';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import * as SplashScreen from 'expo-splash-screen';
import { useEffect } from 'react';
import { Colors } from '@/src/theme/colors';
import { AppProvider } from '@/src/context/AppContext';
import { SubscriptionProvider } from '@/src/context/SubscriptionContext';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
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
