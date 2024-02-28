import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image, FlatList } from 'react-native';
import {Video} from 'expo-av';
import React, {useState} from 'react';
import { Dimensions } from 'react-native';

import topicData from "../data/TopicData"
import Swiper from 'react-native-swiper'
import {SecondaryTopic} from "./SecondaryTopic"

export function SecondaryCarousel() {
    return (
        <Pressable>
        <View style = {styles.container}>
            <FlatList 
                horizontal
                data = {topicData.data.topics}
                style = {styles.flatList}   
                keyExtractor={item => item.id}
                renderItem={({item: secondaryTopic, index, separators}) => {
                    return (<SecondaryTopic 
                        topicImage = {secondaryTopic.topicImage}
                        topicBackground = {secondaryTopic.topicBackground}
                        topicName = {secondaryTopic.topicName}
                        />)
                }}
            />
        </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    container: {
        width: "100%",
        height: 122,
        paddingTop: "2%"
    },
    flatList: {
        flex: 1,
        width: "100%",
        height: "30%",
        marginTop: "3%",
        //marginLeft: "1%",
        //marginRight: "1%"
    }
})
