import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image } from 'react-native';
import {Video} from 'react-native-video';
import {useState} from 'react';

import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import FirstPage from './screens/FirstPage';
import SecondPage from './screens/SecondPage';
import SplashScreen from './screens/SplashScreen';


const Stack= createNativeStackNavigator();


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
    {isLoading ? <SplashScreen /> : <Stack.Navigator 
        screenOptions={{ headerShown: false }}>

        <Stack.Screen name="FirstPage" component={FirstPage} />
        <Stack.Screen name="SecondPage" component={SecondPage} />
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