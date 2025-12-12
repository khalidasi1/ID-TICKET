import React from 'react';
import { View, StyleSheet, ImageBackground } from 'react-native';

export default function ScreenWrapper({ children }: { children: React.ReactNode }) {
  return (
    <ImageBackground
      source={require('../assets/background.jpg')} // or use a color background
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.container}>
        {children}
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 20,
  },
});
