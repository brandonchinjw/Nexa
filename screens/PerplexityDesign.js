import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { StyleSheet, View, ActivityIndicator, FlatList, Text, Pressable, Image } from "react-native";
import {Video} from 'expo-av';
import Animated, { SharedTransition, withSpring, FadeInDown, FadeInUp } from 'react-native-reanimated';
import axios, {isCancel, AxiosError} from 'axios';
import Swiper from 'react-native-swiper'
import { useNavigation } from '@react-navigation/native';
import { BlurView } from 'expo-blur'
import { ButtonBanner } from "../components/ButtonBanner";
import Carousel from 'react-native-snap-carousel';


// IN USE
const PerplexityDesign = ({ navigation }) => {
    const [data, setData] = useState([]);
    const [currentItemIndex, setCurrentItemIndex] = useState(0);
    const [currentTime, setCurrentTime] = useState(0);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await fetch('http://localhost:5050/record');
            const jsonData = await response.json();
            setData(jsonData);
        } catch (error) {
            console.error(error);
        }
    };

    const DisplayObject = ({ item }) => {
        const [currentSentenceIndex, setCurrentSentenceIndex] = useState(0);
        const videoRef = React.useRef(null);
    
        const handlePlaybackStatusUpdate = React.useCallback(
            ({ positionMillis }) => {
                // Determine the current chunk index based on the position of the video
                let totalDuration = 0;
                for (let i = 0; i < item.chunks.length; i++) {
                    totalDuration += item.chunks[i].duration;
                    if (totalDuration >= positionMillis) {
                        setCurrentSentenceIndex(i);
                        break;
                    }
                }
            },
            [item.chunks]
        );
    
        useEffect(() => {
            // Add event listener for playback status updates
            const playbackStatusSubscription = videoRef.current?.setOnPlaybackStatusUpdate(
                handlePlaybackStatusUpdate
            );
    
            return () => {
                // Remove event listener when component unmounts
                playbackStatusSubscription && playbackStatusSubscription.remove();
            };
        }, [handlePlaybackStatusUpdate]);
    
        return (
                <View style={styles.container1}>
                        <Video 
                            ref={videoRef}
                            style={styles.mainVideo} 
                            source={require('../assets/Images/TaylorSwift.mp4')} // Use dynamic video source when editing
                            isLooping={true}
                            shouldPlay
                            isMuted
                            resizeMode="cover"
                        />
                    <Text style={styles.mainTopicText}>{item.article.title}</Text>
                    <BlurView intensity={50} tint='light' style={styles.blurContainer}>
                        <Text style={styles.userText}>{item.chunks[currentSentenceIndex].text}</Text>
                    </BlurView>
                </View>
        );
    };

    const Buttons = () => {
        return (
            <View style={styles.buttonContainer}>
                <View style = {styles.singularButton}>
                    <Pressable style = {styles.singularButton}>
                    <Image source={require('../assets/Images/TypeLogo.png')} style={styles.type} />
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
    function handleIndexChanged(index) {
        setCurrentItemIndex(index);
        setCurrentTime(0); // Reset currentTime when Swiper item changes
        console.log("Index changed to:", index);
    };

    const renderItem = ({ item }) => {
        return <DisplayObject item={item} />;
    };

    return (
        <View style={styles.mainContainer}>
            <Text style={styles.breakingNews}>Breaking News</Text>
            <Carousel
                data={data}
                renderItem={renderItem}
                sliderHeight={300} // Adjust the height of the slider
                itemHeight={700} // Adjust the height of each item
                onIndexChanged={handleIndexChanged}
                vertical={true} // Set to true for vertical scrolling
                loop={false}
                autoplay={false}
                showsButtons={false}
                dot={<View style={styles.inactiveDot} />}
                inactiveDot={<View style={styles.inactiveDot} />}
                inactiveSlideScale={1} // Adjust the scale of the inactive slides
                activeDot={<View style={styles.activeDot} />}
                inactiveSlideOpacity={0.4}
                paginationStyle={styles.pag}
            />
            <Buttons/>
        </View>
    );
};

const styles = StyleSheet.create({
    mainContainer: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",
        backgroundColor:'black',
    },
    breakingNews: {
        flex: 0.19,
        top: "5%",
        left: "4%",
        fontSize: 26,
        fontWeight: 'bold',
        color: 'white',
    },
    id: {
        color: 'white',
        fontSize: 20,
    },
    container1: {
        flex: 0.9,
        left: "5%",
        //top: "3%",
        width: "90%",
        height: "90%",
        borderRadius: 10,
        backgroundColor: 'white',
        alignItems: 'center'
    },
    mainVideo: {
        position: 'absolute',
        left: "4%",
        top: "3%",
        right: "4%",
        bottom: "11%",
        borderRadius: 10,
    },
    mainTopicText: {
        position: 'absolute',
        bottom: '2%',
        left: '4%',
        width: "90%",
        color: "black",
        fontWeight: 'bold',
        fontSize: 22,
    },
    userText: {
        color: 'white',
        fontSize: 23,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    blurContainer: {
        position: "absolute",
        top: "60%",
        width: "80%",
        left: "10%",
        padding: "2%",
        overflow: "hidden",
        borderRadius: 10,
    },
    buttonContainer: {
        flex: 0.15,
        flexDirection: 'row',
        width: "100%",
        height: "20%",
        justifyContent: 'center',
        borderTopColor: "white",
        borderTopWidth: 1,
    },
    singularButton: {
        flex: 1,
        width: 45,
        height: 45, 
        marginLeft: "13.5%",
        marginTop: "1%",
        resizeMode: 'contain',
    },
    type: {
        width: 55,
        height: 55,
        resizeMode: 'contain'
    },

});

export default PerplexityDesign;