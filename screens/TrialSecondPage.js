import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Pressable, TextInput, FlatList, ScrollView } from 'react-native';

import {Video} from 'expo-av'
import { useFonts } from 'expo-font';
import { MainCarousel } from '../components/MainCarousel';
import { DisplayTopic } from '../components/DisplayTopic';
import { TopicData } from '../data/TopicData';
import { Response } from '../components/Response';
import { ButtonBanner } from '../components/ButtonBanner';
import { Suggestions } from '../components/Suggestions';
import { SideSuggestion } from '../components/SideSuggestion';
import {BlurView} from 'expo-blur'
import Animated from 'react-native-reanimated';
import { SharedTransition, withSpring } from 'react-native-reanimated';
import { SharedElement, SharedElementTransition, nodeFromRef } from 'react-native-shared-element';

// IN USE
const customTransition = SharedTransition.custom((values) => {
  'worklet';
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
    originX: withSpring(values.targetOriginX),
    originY: withSpring(values.targetOriginY),
  };
});

const TrialSecondPage = ({ route, navigation }) => {
  //console.log(route.params.topic)
  //const [data, setData] = React.useState([{type: 'user', 'input': route.params.topic.headlineQuestion}]);
  //const apiKey = ''
  //const apiUrl = ''

  /*const handleSend = async () => {
    const prompt = textInput

    function findElement(array, prompt) {
      return array.find((element) => element.headlineText === prompt)
    }

    const topic = findElement(TopicData, prompt)
    console.log(topic)
    setData([...data, {type: 'user', 'text': textInput}, {type: 'bot', 'topic': topic}])
    setTextInput('')
  }*/
  // HANDLING ACTUAL SCREEN OUTPUT
  const object = route.params.object
  const json = route.params.object.json
  const startingIndex = route.params.startingIndex

  initialData = [{type: 'user', 'input': object.headlineQuestion}]
  const textChunks = json.textChunks

  for (let i = startingIndex; i < Object.keys(textChunks).length; i++) {
    const start = textChunks[i]["start"]
    const text = textChunks[i]["text"]
    initialData.push({type: 'bot', 'text': text, "start": start})
  }
  const [data, setData] = React.useState(initialData)


  const sentences = []
  const intervals = []

  const start = 0
  const videoLength = json.videoLength
  const video = json.video
  const videoRef = React.useRef(null)

  for (let i = startingIndex; i < Object.keys(textChunks).length-1; i++) {
    sentences.push(textChunks[i]["text"])
    intervals.push(textChunks[i+1]["start"] - textChunks[i]["start"])
  }
  sentences.push(textChunks[Object.keys(textChunks).length-1]["text"])
  intervals.push(videoLength - textChunks[Object.keys(textChunks).length-1]["start"])
  
  const handleDataReceive = (data) => {
    setReceivedData(data)
    receiveSuggestion(data)
  }
  // END OF HANDLING ACTUAL SCREEN OUTPUT

  // STARTING TO ANIMATE THE SCREEN
  const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 1);
    }, 1000); // Update current time every second
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    let totalInterval = 0;
    for (let i = 0; i < intervals.length; i++) {
      totalInterval += intervals[i];
      if (totalInterval > currentTime) {
        setCurrentSentenceIndex(i);
        break;
      }
    }
    if (totalInterval <= currentTime) {
      setCurrentSentenceIndex(sentences.length - 1); // Last sentence when time exceeds all intervals
      if (currentSentenceIndex === sentences.length - 1) {
        // Navigate to "TrialHomePage"
        navigation.navigate('TrialHomePage');
      }
    }
  }, [currentTime]);

  return (
    <View style={styles.mainContainer}>
      <Pressable style = {styles.crossContainer} onPress = {() => navigation.navigate("TrialHomePage")}>
        <Image source={require('../assets/Images/Cross.png')} style={styles.crossIcon}/>
      </Pressable>
        <View style = {styles.videoContainer} key = {1}>
        <Video 
            style={styles.mainVideo} 
            source = {video}
            ref = {videoRef}
            shouldPlay
            isMuted
            isLooping
            resizeMode='cover'
        />
        </View>
        <Pressable style = {styles.mainBlur} onPress = {() => 
            navigation.navigate("TrialSecondPageText", {currentIndex: currentSentenceIndex, json: json, data: data, clearInterval: clearInterval})}>
        <BlurView intensity={50} tint='light' style={styles.blurContainer} id = 'main'>
            <Animated.Text style={styles.userText} sharedTransitionTag='xxx'> {sentences[currentSentenceIndex]} </Animated.Text>
        </BlurView>
        </Pressable>
        <SideSuggestion onDataSend={handleDataReceive}/>
        <ButtonBanner/>
    </View>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
      display: 'flex',
      flex: 1,
      flexDirection: "column",
      backgroundColor:'black',
      width: "100%",
      height: "100%"
    },
  userText: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
    borderRadius: 10,
  },
  mainVideo: {
    flex: 1,
    borderRadius: 25,
  },
  mainBlur: {
    flex: 1,
    position: "absolute",
    top: "68%",
    width: "100%",
    borderRadius: 10,
  },
  blurContainer: {
    position: "absolute",
    top: "80%",
    width: "80%",
    left: "10%",
    padding: "2%",
    overflow: "hidden",
    borderRadius: 10,
  },
  videoContainer: {
    width: "100%",
    height: "86%",
  },
  crossContainer: {
    position: 'absolute', // Added
    top: 40, // Adjust as needed
    left: 30, // Adjust as needed
    zIndex: 1, // Ensure it's above the video
  },
  crossIcon: {
    width: 40,
    height: 40,
  },
});

export default TrialSecondPage;