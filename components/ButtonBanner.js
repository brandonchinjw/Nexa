import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image } from 'react-native';
import React, {useState} from 'react';
import { Dimensions } from 'react-native';

import headlineData from "../data/HeadlinesData"
import Swiper from 'react-native-swiper'
import {MainTopic} from "./MainTopic"
import Video, {VideoRef} from 'expo-av';

export function ButtonBanner() {
    return (
        <View style={styles.container}>
            <View style = {styles.singularButton}>
                <Pressable style = {styles.singularButton}>
                <Image source={require('../assets/Images/TypeLogo.png')} style={styles.type} />
                </Pressable>
            </View>
            <View style = {styles.singularButton}>
                <Pressable style = {styles.singularButton}>
                    <Image source={require('../assets/Images/SpeakIcon.png')} style={styles.type} />
                </Pressable>
            </View>
            <View style = {styles.singularButton}>
            <Pressable style = {styles.singularButton}>
                <Image source={require('../assets/Images/PauseLogo.png')} style={styles.type} />
            </Pressable>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        flexDirection: 'row',
        width: "100%",
        height: "20%",
        borderTopColor: "white",
        borderTopWidth: 1,
    },
    singularButton: {
        flex: 1,
        width: 45,
        height: 45, 
        marginLeft: "8%",
        marginTop: "1%",
        resizeMode: 'contain',
    },
    type: {
        width: 55,
        height: 55,
        resizeMode: 'contain'
    }
    })