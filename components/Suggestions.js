import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image, FlatList, ImageBackground } from 'react-native';
import SuggestionData from '../data/SuggestionData';
import { SideSuggestion } from './SideSuggestion';

export function Suggestions() {
    currentSuggestion = SuggestionData.data.suggestions[0]
    return (
        <View style = {styles.container}> 
            <Text style={styles.mainSuggestion}> {currentSuggestion.mainSuggestion} </Text>
            <FlatList 
                horizontal
                showsHorizontalScrollIndicator={false}
                data = {currentSuggestion.sideSuggestions}
                style = {styles.flatList}   
                keyExtractor={item => item.id}
                renderItem={({item: suggestion, index, separators}) => {
                    return (
                        <SideSuggestion text = {suggestion.sideSug} id = {suggestion.id}/>
                    )
                }}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        height: "16%",
        marginBottom: "5.5%"
    },
    mainSuggestion: {
        flex: 1,
        flexShrink: 1,
        right: 3,
        textAlign: 'right',
        fontSize: 18,
        width: "100%",
        fontWeight: 'bold',
        color: '#86868B',
        paddingTop: "10%",
        paddingBottom: "15%"
    },
    flatList: {
        width: "100%",
    },
})
