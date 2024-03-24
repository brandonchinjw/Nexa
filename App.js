import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image, Easing, Animated } from 'react-native';
import {Video} from 'react-native-video';
import {useState} from 'react';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator, TransitionSpecs, HeaderStyleInterpolators, CardStyleInterpolators} from '@react-navigation/native-stack';

import FirstPage from './screens/FirstPage';
import SecondPage from './screens/SecondPage';
import TrialSecondPage from './screens/TrialSecondPage';
import SplashScreen from './screens/SplashScreen';
import TrialSecondPageText from './screens/TrialSecondPageText';
import TrialHomePage from './screens/TrialHomePage';

const Stack = createNativeStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 50,
    mass: 3,
    overshootClamping: false,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  }
}

const closeConfig = {
  animation: 'timing',
  config: {
    duration: 500,
    easing: Easing.linear
  }
}

const customTransition = {
  gestureDirection: 'vertical',
  transitionSpec: {
    duration: 1400,
    easing: Easing.out(Easing.poly(4)),
    timing: Animated.timing,
  },
  cardStyleInterpolator: ({ current, next, layouts }) => {
    return {
      cardStyle: {
        transform: [
          {
            translateX: current.progress.interpolate({
              inputRange: [0, 1],
              outputRange: [layouts.screen.width, 0],
            }),
          },
          {
            scale: next
              ? next.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [1, 0.9],
                })
              : 1,
          },
        ],
      },
    };
  },
};

export default function App() {
  const [isLoading, setIsLoading] = useState(true);
  React.useEffect(() => {
    // Simulate loading process
    setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Adjust the time as needed
  }, []);

  return (
    <NavigationContainer>
    {/*If the app is still loading, show the splash screen*/}
    {isLoading ? <SplashScreen /> : <Stack.Navigator 
        screenOptions={{ 
          headerShown: false,
          ...customTransition,
        }}>
        <Stack.Screen name="TrialHomePage" component={TrialHomePage} />
        <Stack.Screen name="FirstPage" component={FirstPage} />
        <Stack.Screen name="SecondPage" component={SecondPage} />
        <Stack.Screen name="TrialSecondPage" component={TrialSecondPage} />
        <Stack.Screen name="TrialSecondPageText" component={TrialSecondPageText} options={{animation: 'none'}} />

      </Stack.Navigator>}
    </NavigationContainer>
  );
}
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
})