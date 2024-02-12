import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image, ImageBackground } from 'react-native';
import {Video} from 'react-native-video';
import React, {useState} from 'react';
import { Dimensions } from 'react-native';

import topicData from "../data/TopicData"
import Swiper from 'react-native-swiper'


export function Topic(prop) {
    if (prop.main) {
        return (
            <View key={prop.topic.id} style = {styles.container1}>
                <Image style={styles.mainImage} source = {prop.topic.topicImage}></Image>
                <Text style={styles.mainTopicText}> {prop.topic.topicText} </Text>
            </View>
        )
        }
    else {
        return (
            <View key={prop.topic.id} style = {styles.container2}>
                <Image style={styles.secondaryImage} source = {prop.topic.topicImage}></Image>
                <Text style={styles.secondaryTopicText}> {prop.topic.topicName} </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    container1: {
        flex: 3,
        width: "100%",
        height: "60%",
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