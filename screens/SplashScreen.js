import React from 'react';
import { View, Image, StyleSheet, Animated, Text } from 'react-native';

const SplashScreen = () => {
  const imageScale = new Animated.Value(0.2);

  Animated.timing(imageScale, {
    toValue: 0.3,
    duration: 1000,
    useNativeDriver: true,
  }).start();

  return (
    <View style={styles.container}>
      <Animated.Image
        source={require('../assets/Images/NexaLogo.jpg')}
        style={[styles.image, { transform: [{ scale: imageScale }] }]}
      />
      <Text style = {styles.brand}> Nexa </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
  },
  image: {
    width: 400,
    height: 400,
  },
  brand: {
    fontSize: 20,
    fontWeight: 'bold'
  },
});

export default SplashScreen;