import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

import { useFonts } from 'expo-font';
import { MainCarousel } from '../components/MainCarousel';
import { DisplayTopic } from '../components/DisplayTopic';

const SecondPage = ({ route, navigation }) => {
  return (
    <View style = {styles.mainContainer}>
            <DisplayTopic 
            topicText = {route.params.topicText} 
            topicVideo = {route.params.topicVideo} 
            topicId = {route.params.topicId}/>  
    </View>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor:'black',
  },
});

export default SecondPage;