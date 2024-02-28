import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image, FlatList, ImageBackground } from 'react-native';
import SuggestionData from '../data/SuggestionData';

export function SideSuggestion(prop) {
    return (
        <View style = {styles.container}>
            <Text style={styles.sideSuggestions} key = {prop.id}>{prop.text}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignContent: 'center',
        backgroundColor: '#2C2C2E',
        padding: 10,
        marginLeft: 5,
        marginRight: 5,
        borderRadius: 10,
    },
    sideSuggestions: {
        fontSize: 14,
        fontWeight: 'bold',
        color: 'white',
        alignContent: 'center',
        backgroundColor: '#2C2C2E',
    }
})
