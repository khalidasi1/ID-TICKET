import { Tabs } from 'expo-router';
import React from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';

import AntDesign from '@expo/vector-icons/AntDesign';
import Octicons from '@expo/vector-icons/Octicons';

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{

        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            // Use a transparent background on iOS to show the blur effect
            position: 'absolute',
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="profile"
        options={{
          title: 'ملفك',
          tabBarIcon: ({ color }) => <AntDesign name="user" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="wallet"
        options={{
          title: 'محفظتك',
          tabBarIcon: ({ color }) => <AntDesign name="tago" size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="sell"
        options={{
          title: 'بيع',
          tabBarIcon: ({ color }) => <Octicons name="diff-added" size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="cart"
        options={{
          title: 'سلتك',
          tabBarIcon: ({ color }) => <AntDesign name="shoppingcart" size={28} color={color} />,
        }}
      />

      <Tabs.Screen
        name="index"
        options={{
          title: 'استكشف',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
    </Tabs>
  );
}
