import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image, ImageBackground } from 'react-native';
import {Video} from 'expo-av';
import React, {useState} from 'react';
import { Dimensions } from 'react-native';

import Swiper from 'react-native-swiper'
import {SecondaryTopic} from './SecondaryTopic'
import { useNavigation } from '@react-navigation/native';

export function MainTopic(prop) {
    const videoRef = React.useRef(null);
    const topic = prop.topic
    const video = prop.topic.topicVideo
    const navigation = useNavigation()
    return (
        <Pressable style = {styles.container1} onPress = {() => 
            navigation.navigate("SecondPage", {topic: topic})}>
        <View key={prop.topic.id} style = {styles.container1}>
            <Video 
            style={styles.mainVideo} 
            source = {video} 
            ref = {videoRef}
            shouldPlay
            isMuted
            isLooping/>
            <Text style={styles.mainTopicText}> {prop.topic.headlineText} </Text>
        </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container1: {
        flex: 3,
        width: "100%",
        height: "57%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainVideo: {
        flex: 2,
        width: "100%",
        height: "57%",
        borderRadius: 40,
        resizeMode: "cover",
    },
    mainTopicText: {
        position: "absolute",
        width: "83%",
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        bottom: "6%",
        left: "8.5%"
    },
})