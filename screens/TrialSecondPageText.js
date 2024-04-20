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
import YouTube, { YouTubeStandaloneIOS, YouTubeStandaloneAndroid } from 'react-native-youtube';
import TrialSecondPage from './TrialSecondPage';
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

const TrialSecondPageText = ({ route, navigation }) => {
  json = route.params.json
  currentIndex = route.params.currentIndex
  data = route.params.data
  clearInterval = route.params.clearInterval

  const [currentTime, setCurrentTime] = useState(0); // Define setCurrentTime here
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentTime((prevTime) => prevTime + 1);
    }, 1000);

    return () => {
      clearInterval(intervalId); // Clear the interval when unmounting
    };
  }, []);

  
  // HANDLING ACTUAL SCREEN OUTPUT
  function InputSentence(prop) {
    return (
        <View style = {styles.userContainer} key = {prop.key}>
            <Animated.Text entering={FadeInUp.duration(1000).delay(200)} style = {styles.userText}>{prop.input}</Animated.Text>
        </View>
    )
  }
  
  //[fadeInup, setFadeInup] = React.useState(true)
  function OneSentence(prop) {
    if (prop.key < currentIndex + 1) {
      return (
        <Pressable onPress = {() => navigation.navigate("TrialSecondPage", {json: json, currentIndex: prop.key - 1, data: data})}>
          <View style = {styles.textContainer} key = {prop.key}>
              <Animated.Text entering={FadeInUp.duration(1000).delay(200)} style = {styles.text}>{prop.sentences}</Animated.Text>
          </View>
        </Pressable>
      )
    }
    else {
      return (
        <Pressable onPress = {() => navigation.navigate("TrialSecondPage", {json: json, currentIndex: prop.key - 1, data: data})}>
          <View style = {styles.textContainer} key = {prop.key}>
              <Animated.Text entering={FadeInDown.duration(1000).delay(200)} style = {styles.text}>{prop.sentences}</Animated.Text>
          </View>
        </Pressable>
      )
    }
  }
  
  const[positionOfHighlight, setPositionOfHighlight] = React.useState(0)
  function OneSentenceHighlighted(prop) {
    return (
      //<Animated.View sharedTransitionTag='xxx' sharedTransitionStyle={customTransition}>
      <Pressable onPress = {() => navigation.navigate("TrialSecondPage", {json: json, currentIndex: prop.key - 1, data: data})}>
        <BlurView intensity={50} tint='light' style={styles.highlightedTextContainer} key={prop.key} onLayout={(event) => {
            setPositionOfHighlight(event.nativeEvent.layout.y)
        }}>
            <Animated.Text style={styles.textHighlight} sharedTransitionTag = "xxx">{prop.sentences}</Animated.Text>
        </BlurView>
      </Pressable>
      //</Animated.View>
    );
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

  useEffect(() => {
    scrollToInitialPosition();
  }, [positionOfHighlight]);
  
  scrollToInitialPosition = () => {
    const WindowHeight = Dimensions.get('window').height;
    console.log(positionOfHighlight);
    if (scrollViewRef.current && positionOfHighlight > 0) {
      scrollViewRef.current.scrollTo({ y: positionOfHighlight - WindowHeight * 0.7 * 0.9 });
    }
  };

  const scrollViewRef = useRef(null)
  return (
    <View style={styles.mainContainer}>
    <SafeAreaView style = {styles.scrollViewContainer}>
      <Pressable style = {styles.crossContainer} onPress = {() => navigation.navigate("TrialHomePage")}>
        <Image source={require('../assets/Images/Cross.png')} style={styles.crossIcon}/>
      </Pressable>
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
            if (index === currentIndex + 1) {
              return (OneSentenceHighlighted({sentences: item.text, key: index}))
            }
            else {
              return (OneSentence({sentences: item.text, key: index}))
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

export default TrialSecondPageText;