import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image, ImageBackground } from 'react-native';
import {Video} from 'expo-av';
import React, {useState} from 'react';
import { Dimensions } from 'react-native';

import headlineData from "../data/HeadlinesData"
import Swiper from 'react-native-swiper'
import {SecondaryTopic} from './SecondaryTopic'
import { useNavigation } from '@react-navigation/native';

export function DisplayTopic(prop) {
    const videoRef = React.useRef(null);
    const navigation = useNavigation()


    return (
        <Pressable style = {styles.container1} onPress = {() => 
            navigation.navigate("SecondPage", {topicVideo: prop.topicVideo, 
            topicText: prop.topic.topicText, topicId: prop.topicId})}>
        <View key={prop.topicId} style = {styles.container1}>
            <Video 
            style={styles.mainVideo} 
            source = {prop.topicVideo} 
            ref = {videoRef}
            shouldPlay
            isLooping/>
            <Text style={styles.mainTopicText}> {prop.topicText} </Text>
        </View>
        </Pressable>
    )
}


const styles = StyleSheet.create({
    container1: {
        flex: 3,
        width: "100%",
        height: "40%",
        justifyContent: 'center',
        alignItems: 'center'
    },
    mainImage: {
        flex: 2,
        width: "100%",
        height: "60%",
        borderRadius: 40,
        resizeMode: "cover",
    },
    mainTopicText: {
        position: "absolute",
        width: "72%",
        color: "white",
        fontSize: 30,
        fontWeight: "bold",
        bottom: 30,
        left: 10
    },
    container2: {
        flex: 1,
        height: "35%",
        width: "50%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    secondaryImage: {
        flex: 1,
        width: 200,
        borderRadius: 10,
        marginTop: 15,
        marginLeft: 5,
        marginRight: 10,
    },
    secondaryTopicText: {
        position: "absolute",
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
    },
})