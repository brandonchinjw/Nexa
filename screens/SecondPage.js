import React, { useState } from 'react';
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

const SecondPage = ({ route, navigation }) => {
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
  initialData = [{type: 'user', 'input': route.params.topic.headlineQuestion}]
  const [textInput, setTextInput] = useState('');

  const topic = route.params.topic
  sentences = topic.response.split(". ")
  const video = topic.displayVideo
  const videoRef = React.useRef(null);
  function InputSentence(prop) {
      return (
          <View style = {styles.userContainer} key = {prop.key}>
              <Text style = {styles.userText}>{prop.input}</Text>
          </View>
      )
  }
  function OneSentence(prop) {
      return (
          <View style = {styles.textContainer} key = {prop.key}>
              <Text style = {styles.text}>{prop.sentences + "."}</Text>
          </View>
      )
  }
  function StickyVideo(prop) {
      return (
          <View style = {styles.videoContainer} key = {prop.key}>
              <Video 
              style={styles.mainVideo} 
              source = {prop.video} 
              ref = {prop.videoRef}
              shouldPlay
              isMuted
              isLooping
              resizeMode='cover'
              />
          </View>
      )
  }
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
    console.log(data)
  }
  const handleDataReceive = (data) => {
    setReceivedData(data)
    receiveSuggestion(data)
  }
  // END OF HANDLING ACTUAL SCREEN OUTPUT

  // STARTING TO ANIMATE THE SCREEN
  /*console.log(data)
  componentWillMount() {
    this.animatedValue = new Animated.Value(0);
  }

  componentDidMount() {
    Animated.timing(this.animatedValue, {
      toValue: height,
      duration: 1500,
      easing: Easing.linear,
    }).start();
  }*/

  return (
    <View style={styles.mainContainer}>
    <SafeAreaView style = {styles.scrollViewContainer}>
      <ScrollView style = {styles.scrollView} stickyHeaderIndices={[3]}>
        {data.map((item, index) => {
          if (item.type === 'user') {
            return (InputSentence({input: item.input, key: index}))
          }
          else {
            if (item.structure === "sentence") {
              return (OneSentence({sentences: item.sentence, key: index}))
            }
            else {
              return (StickyVideo({video: item.video, videoRef: item.videoRef, key: index}))
            }
          }
        })
        }
      </ScrollView>
    </SafeAreaView>
    <SideSuggestion onDataSend={handleDataReceive}/>
    <ButtonBanner/>
    </View>
  )
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor:'black',
    height: "100%",
  },
  scrollViewContainer: {
    flexDirection: "column",
    backgroundColor:'black',
    //marginHorizontal: 10,
    height: "85%",
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: "2%",
    marginTop: "2%",
    marginBottom: "3%"
  },
  userText: {
    color: '#86868B',
    fontSize: 19,
    textAlign: 'right',
    fontWeight: 'bold',
    width: '90%',
    padding: 10,
    right: "2%"
  },
  scrollView: {
    flex: 1,
    flexDirection: "column",
    backgroundColor:'black',
    marginHorizontal: 20,
  },
  text: {
    fontSize: 19,
    fontWeight: 'bold',
    color: "#86868B"
  },
  textContainer: {
    flex: 1,
    marginVertical: "5%",
    width: "80%",
    marginHorizontal: 10,
  },
  mainVideo: {
    flex: 1,
    borderRadius: 25,
  },
  videoContainer: {
    width: "100%",
    height: 625,
    marginTop: "1%"
  },
});

export default SecondPage;