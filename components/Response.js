import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image, ImageBackground } from 'react-native';
import {Video} from 'expo-av';
import React, {useState} from 'react';
import { Dimensions, NativeModules } from 'react-native';

import topicData from "../data/TopicData"
import Swiper from 'react-native-swiper'
import { useNavigation } from '@react-navigation/native';
import { MainTopic } from './MainTopic';

export function Response(prop) {
    sentences = prop.topic.response.split(". ")
    const video = prop.topic.displayVideo
    const videoRef = React.useRef(null);
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

    /*const changeState = (props) => {
        if (props.)
    }*/

    fullOutput = []
    for (let i = 0; i < 2; i++) {
        fullOutput.push(
        /*<View key = {i} style = {styles.textContainer}>
            <Text style = {styles.text}>{sentences[i] + "."}</Text>
        </View>*/
        {type: "sentence", sentences: sentences[i] + "."}
        )
    }

    fullOutput.push(
        /*<View key = {3} style = {styles.videoContainer}>
            <Video 
            style={styles.mainVideo} 
            source = {video} 
            ref = {videoRef}
            shouldPlay
            isMuted
            isLooping
            resizeMode='cover'
            />
        </View>*/
        {type: "video", video: video, videoRef: videoRef}

    )

    for (let i = 2; i < sentences.length; i++) {
        fullOutput.push(
        /*<View key = {i + 2} style = {styles.textContainer}>
            <Text style = {styles.text}>{sentences[i] + "."}</Text>
        </View>*/
        {type: "sentence", sentences: sentences[i] + "."}
        )
    }
    console.log(fullOutput)
    return (
    <SafeAreaView style={styles.container}>
        <ScrollView style={styles.scrollView} stickyHeaderIndices={[3]}>
            {fullOutput.map((item, index)=>{
                //console.log(item)
                if (item.type === "sentence") {
                    return (<OneSentence key = {index} sentences = {item.sentences}/>)
                }
                else {
                    return (<StickyVideo key = {index} video = {item.video} videoRef = {item.videoRef}/>)
                }
            })}
        </ScrollView>
    </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      height: 100000
    },
    scrollView: {
      marginHorizontal: 10,
      height: "100%",
      flexGrow: 1,
      stickyHeaderIndices: [0]
    },
    text: {
      fontSize: 18,
      color: "#86868B"
    },
    textContainer: {
      flex: 1,
      marginVertical: "5%",
      width: "90%"
    },
    mainVideo: {
        flex: 1,
        borderRadius: 40,
    },
    videoContainer: {
        width: "100%",
        height: "100%",
    }
  });