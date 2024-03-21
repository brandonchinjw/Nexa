import React, { useState, useCallback, useEffect, useRef } from 'react';
import { StyleSheet, SafeAreaView, Text, View, Image, Pressable, TextInput, FlatList, ScrollView, Dimensions } from 'react-native';

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
import { SecondaryCarousel } from '../components/SecondaryCarousel';
import Animated, { SharedTransition, withSpring, FadeInDown, FadeInUp } from 'react-native-reanimated';

const customTransition = SharedTransition.custom((values) => {
  'worklet';
  return {
    height: withSpring(values.targetHeight),
    width: withSpring(values.targetWidth),
    originX: withSpring(values.targetOriginX),
    originY: withSpring(values.targetOriginY),
  };
});

const TrialSecondPageText = ({ route, navigation }) => {
  data = route.params.currentData
  currentText = route.params.currentText
  const reachedHighlight = false
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
  function InputSentence(prop) {
    return (
        <View style = {styles.userContainer} key = {prop.key}>
            <Text style = {styles.userText}>{prop.input}</Text>
        </View>
    )
  }
  
  //[fadeInup, setFadeInup] = React.useState(true)
  function OneSentence(prop) {
    //if (fadeInup) {
      return (
          <View style = {styles.textContainer} key = {prop.key}>
              <Animated.Text entering={FadeInDown.duration(400).delay(200)} style = {styles.text}>{prop.sentences}</Animated.Text>
          </View>
      )
    //}
    //else {
      return (
          <View style = {styles.textContainer} key = {prop.key}>
              <Animated.Text exiting={FadeInUp.duration(400).delay(200)} style = {styles.text}>{prop.sentences}</Animated.Text>
          </View>
      )
   // }
  }
  
  const[positionOfHighlight, setPositionOfHighlight] = React.useState(0)
  function OneSentenceHighlighted(prop) {
    //setFadeInup(false)
    return (
        <BlurView intensity={40} tint='light' style = {styles.highlightedTextContainer} key = {prop.key} onLayout = {(event) => {
          setPositionOfHighlight(event.nativeEvent.layout.y)      
        }
        }>
            <Animated.Text style = {styles.textHighlight} sharedTransitionTag='tag'>{prop.sentences}</Animated.Text>
        </BlurView>
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

  scrollToInitialPosition = () => {
    const WindowHeight = Dimensions.get('window').height
    this.scrollViewRef.scrollTo({y : positionOfHighlight - WindowHeight * 0.7 * 0.9})
  }

  const scrollViewRef = useRef(null)
  return (
    <View style={styles.mainContainer}>
    <SafeAreaView style = {styles.scrollViewContainer}>
      <ScrollView style = {styles.scrollView}
      ref = {(ref) => {this.scrollViewRef = ref}}
      onLayout={this.scrollToInitialPosition}
      >
      <View style={styles.mainContainer}>
      </View>
        {data.map((item, index) => {
          if (item.type === 'user') {
            return (InputSentence({input: item.input, key: index}))
          }
          else {
            if (item.structure === "sentence") {
              if (item.sentence === currentText) {
                return (OneSentenceHighlighted({sentences: item.sentence, key: index}))
              }
              else {
                return (OneSentence({sentences: item.sentence, key: index}))
              }
            }
          }
        })
        }
        <SideSuggestion/>
      </ScrollView>
    </SafeAreaView>
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
    height: "90%",
  },
  userContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
    right: "2%",
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
    //marginHorizontal: 20,
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
  textHighlight: {
    color: 'white',
    fontSize: 23,
    fontWeight: 'bold',
    textAlign: 'center',
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
  highlightedTextContainer: {
    width: "80%",
    left: "10%",
    padding: "2%",
    overflow: "hidden",
    borderRadius: 10,
  }
});

export default TrialSecondPageText;