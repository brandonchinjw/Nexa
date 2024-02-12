import { StyleSheet, Text, View, ScrollView, SafeAreaView, TextInput, Pressable, Image, FlatList } from 'react-native';
import SuggestionData from '../data/SuggestionData';

export function Suggestions() {
    return (
        <Text style={styles.Suggestion}> What happened to the 49ers? </Text>
    )
}

const styles = StyleSheet.create({
    Suggestion: {
        position: 'absolute',
        top: 700,
        width: "60%",
        right: 3,
        textAlign: 'right',
        fontSize: 30,
        fontWeight: 'bold',
        color: 'whitesmoke',
    }
})
