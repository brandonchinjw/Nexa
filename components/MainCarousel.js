import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image } from 'react-native';
import React, {useState} from 'react';
import { Dimensions } from 'react-native';

import headlineData from "../data/HeadlinesData"
import Swiper from 'react-native-swiper'
import {MainTopic} from "./MainTopic"
import Video, {VideoRef} from 'react-native-video';

export function MainCarousel() {
    //If it's one of the three main topics, it'll be displayed as a Swiper at the top of the first page
    const headlinesArr = headlineData.data.topics
    const headlines = headlinesArr.sort((a, b) => {
        return b.clicks - a.clicks
    }).slice(0, 3)
    
    return (
        <View style={styles.mainCarousel}>
            <Swiper style={styles.Swiper} 
                autoplay={true} 
                autoplayTimeout={5} 
                showsButtons={false} 
                dot = {<View style={styles.inactiveDot} />}
                inactiveDot = {<View style={styles.inactiveDot} />}
                activeDot = {<View style={styles.activeDot} />}
                paginationStyle = {styles.pag}
            >
                {headlines.map((headline, i) => {
                return (
                    <MainTopic topic={headline} key={headline.id} />
                    )
                })}
            </Swiper>
        </View>
    )
}

const styles = StyleSheet.create({
    mainCarousel: {
        display: "flex",
        width: "100%",
        //height: "57%"
        height: 540
    },
    inactiveDot: {
        width: 100,
        height: 4,
        borderRadius: 4,
        backgroundColor: "grey",
        marginLeft: 10,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    activeDot: {
        width: 100,
        height: 4,
        borderRadius: 4,
        backgroundColor: "white",
        marginLeft: 10,
        marginRight: 3,
        marginTop: 3,
        marginBottom: 3
    },
    pag: {
        bottom: 12
    }
    })