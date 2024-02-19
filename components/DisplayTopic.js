import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image, ImageBackground } from 'react-native';
import {Video, VideoRef} from 'expo-av';
import React, {useState, useRef} from 'react';
import { Dimensions, requireNativeComponent } from 'react-native';
import Swiper from 'react-native-swiper'
import {SecondaryTopic} from './SecondaryTopic'
import { useNavigation } from '@react-navigation/native';

export function DisplayTopic(prop) {
    const videoRef = React.useRef(null);
    const video = prop.topicVideo

    return (
        <View key={prop.topicId} style = {styles.container1}>
            <Video 
            style={styles.mainVideo} 
            source = {video} 
            ref = {videoRef}
            shouldPlay
            isLooping
            resizeMode='cover'
            />
            <Text style={styles.mainTopicText}> {prop.topicText} </Text>
        </View>
    )
}


const styles = StyleSheet.create({
    container1: {
        display: "flex",
        width: "100%",
        height: "40%",
    },
    mainVideo: {
        flex: 2,
        width: "100%",
        height: "100%",
        borderRadius: 40,
        resizeMode: "cover",
    },
    mainTopicText: {
        position: "absolute",
        width: "83%",
        color: "white",
        fontSize: 22,
        fontWeight: "bold",
        bottom: 30,
        left: "9%"
    },
})