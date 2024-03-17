import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image, FlatList, ImageBackground } from 'react-native';
import SuggestionData from '../data/SuggestionData';
import React, { useState } from 'react';

export function SideSuggestion({ onDataSend }) {
    const [dataToSend, setDataToSend] = React.useState('')
    const handleSendData = (suggestionToSend) => {
        onDataSend(suggestionToSend)
    }

    currentSuggestion = SuggestionData.data.suggestions[0]
    return (
        <View style = {styles.mainContainer}> 
        <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                data = {currentSuggestion.sideSuggestions}
                style = {styles.flatList}   
                keyExtractor={item => item.id}
                renderItem={({item: suggestion, index, separators}) => {
                    return (
                        <Pressable style={styles.container1} onPress = {() => handleSendData(suggestion)}>
                        <View style = {styles.container}>
                            <Text style={styles.sideSuggestions} key = {suggestion.id}>{suggestion.sideSug}</Text>
                        </View>
                        </Pressable>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    mainContainer: {
        width: "100%",
        marginBottom: "2%",
        marginTop: "2%"
    },
    container: {
        flex: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#2C2C2E',
    },
    sideSuggestions: {
        fontSize: 15,
        fontWeight: 'bold',
        color: 'white',
        alignContent: 'center',
        backgroundColor: '#2C2C2E',
    },
    flatList: {
        width: "100%",
    },
    container1: {
        flex: 1,
        borderRadius: 10,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#2C2C2E',
        padding: 12,
        marginLeft: 5,
        marginRight: 5,
    }
})
