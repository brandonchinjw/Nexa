import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image, FlatList, ImageBackground } from 'react-native';
import SuggestionData from '../data/SuggestionData';
import { SideSuggestion } from './SideSuggestion';

export function Suggestions() {
    currentSuggestion = SuggestionData.data.suggestions[0]
    return (
        <View style = {styles.container}> 
            <Text style={styles.mainSuggestion}> {currentSuggestion.mainSuggestion} </Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        display: "flex",
        width: "100%",
        height: "9%",
        marginBottom: "2%"
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
})
