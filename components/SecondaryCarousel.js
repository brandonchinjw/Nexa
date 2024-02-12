import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image, FlatList } from 'react-native';
import {Video} from 'react-native-video';
import React, {useState} from 'react';
import { Dimensions } from 'react-native';

import topicData from "../data/TopicData"
import Swiper from 'react-native-swiper'
import {Topic} from "./MainTopic"

export function SecondaryCarousel() {
    const topicsArr = topicData.data.topics
    const SecondaryTopics = topicsArr.sort((a, b) => {
        return b.clicks - a.clicks
    }).slice(3, topicsArr.length)

    return (
        <FlatList 
            horizontal 
            style = {styles.FlatList}
            data = {SecondaryTopics}    
            renderItem={({item: secondaryTopic, index, separators}) => {
                return <Topic main={false} topic={secondaryTopic} key={secondaryTopic.id}/>
            }}
        />
    )
}

const styles = StyleSheet.create({
    FlatList: {
        width: "100%",
        height: "10%",
        resizeMode: "cover",
    }
})
