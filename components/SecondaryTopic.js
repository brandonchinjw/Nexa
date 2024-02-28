import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image, ImageBackground } from 'react-native';
import {Video} from 'expo-av';
import React, {useState} from 'react';
import { Dimensions } from 'react-native';

import topicData from "../data/TopicData"
import Swiper from 'react-native-swiper'
import { useNavigation } from '@react-navigation/native';

export function SecondaryTopic(prop) {
    return (
        <Pressable>
        <View style = {styles.container}>
            <ImageBackground source={prop.topicBackground} 
            style={styles.background} 
            imageStyle={{borderRadius: 10, width: 200, height: 100}}>
                <Text style={styles.topicName}> {prop.topicName} </Text>
                <Image source = {prop.topicImage} style = {styles.topicImage}/>
            </ImageBackground>
        </View>
        </Pressable>
    )
}

styles = StyleSheet.create({
    container: {
        width: 200,
        height: 100,
        marginRight: 7
    },
    background: {
        width: "100%",
        height: "100%",
    },
    topicName: {
        width: "100%",
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        left: "8%",
        top: "60%"
    },
    topicImage: {
        width: "30%",
        height: "40%",
        left: "70%",
        bottom: "10%",
        resizeMode: "contain",
    }
})