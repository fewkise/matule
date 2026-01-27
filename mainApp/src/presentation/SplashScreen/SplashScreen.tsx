import React from 'react';
import { View, Text, StyleSheet, StatusBar } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient'; 

const SplashScreen = () => {
   const gradientColors = ['#0047FF', '#007FFF', '#00BFFF'] as const; 

  return (

    <LinearGradient
      colors={gradientColors}
      style={styles.container}
      start={{ x: 0, y: 0 }} 
      end={{ x: 0, y: 1 }}  
    >
      <StatusBar hidden={true} />
      
      <Text style={styles.logoText}>
        Matule
      </Text>
      
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  logoText: {
    fontSize: 40,
    color: 'white',
    fontWeight: 'bold', 
  },
});

export default SplashScreen;
