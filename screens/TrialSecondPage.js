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
  print(object)

  initialData = [{type: 'user', 'input': object.headlineQuestion}]
  const [textInput, setTextInput] = useState('');

  sentences = object.response.split(". ")
  sentences = sentences.map((x) => x + ".")
  const video = object.displayVideo
  const videoRef = React.useRef(null);
    for (let i = 0; i < 2; i++) {
        initialData.push({type: 'bot', structure: "sentence", sentence: sentences[i]})
    }
    initialData.push({type: 'bot', structure: "video", video: video, videoRef: videoRef})
    for (let i = 2; i < sentences.length; i++) {
        initialData.push({type: 'bot', structure: "sentence", sentence: sentences[i]})
    }
  const [data, setData] = React.useState(initialData)

  const [receivedData, setReceivedData] = React.useState('')
  function receiveSuggestion(suggestion) {
    sentences = suggestion.response.split(". ")
    const video = suggestion.displayVideo
    const videoRef = React.useRef(null);
    initialData = [{type: 'user', 'input': suggestion.headlineQuestion}]
    for (let i = 0; i < 2; i++) {
      initialData.push({type: 'bot', structure: "sentence", sentence: sentences[i]})
    }
    initialData.push({type: 'bot', structure: "video", video: video, videoRef: videoRef})
    for (let i = 2; i < sentences.length; i++) {
        initialData.push({type: 'bot', structure: "sentence", sentence: sentences[i]})
    }
    setData([...data, initialData])
  }
  const handleDataReceive = (data) => {
    setReceivedData(data)
    receiveSuggestion(data)
  }
  // END OF HANDLING ACTUAL SCREEN OUTPUT

  // STARTING TO ANIMATE THE SCREEN

  const [newText, setNewText] = React.useState(0)
  const shuffle = useCallback(()  => {
    const index = newText + 1
    setNewText(index)
  }, [])

  useEffect(() => {
    const interval = setInterval(shuffle, 5000)
    return () => clearInterval(interval)
  }, [shuffle])

  const handleSendData = (value) => {
    navigation.navigate("TrialSecondPageText", {textHistory:value});
  };

  return (
    <View style={styles.mainContainer}>
        <Pressable style = {styles.container1} onPress = {() => 
            navigation.navigate("TrialSecondPageText", {currentText: sentences[newText], currentData: data})}>
        <View style = {styles.videoContainer} key = {1}>
        <Video 
            style={styles.mainVideo} 
            source = {{uri: video}}
            ref = {videoRef}
            shouldPlay
            isMuted
            isLooping
            resizeMode='cover'
        />
        </View>
        <BlurView intensity={40} tint='light' style={styles.blurContainer}>
            <Animated.Text style={styles.userText} sharedTransitionTag='tag'> {sentences[newText]} </Animated.Text>
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
    },
  userText: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mainVideo: {
    flex: 1,
    borderRadius: 25,
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
    marginTop: "1%"
  },
});

export default TrialSecondPage;