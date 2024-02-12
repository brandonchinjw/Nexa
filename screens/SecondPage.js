import React from 'react';
import { StyleSheet, Text, View, Image, Pressable } from 'react-native';

import { useFonts } from 'expo-font';

const SecondPage = ({ navigation,route }) => {

  const handleGoToFirstPage = () => {
    navigation.navigate('FirstPage');
  };

  /*const [isLoaded] = useFonts({
    "titleFont": require('../assets/fonts/Lobster.ttf'),
  });

  if(!isLoaded){
    return null;
  };*/

  return (
    <View style={styles.productContainer}>
      <Image resizeMode='contain' style={styles.imageContainer} source={{ uri: route.params.productInfo.image }} />

      <View style={styles.descriptionContainer}>
        <Text style={styles.titleContainer}>{route.params.productInfo.title}</Text>
        <Text style={styles.priceContainer}>{route.params.productInfo.price}</Text>
        <Text style={styles.priceContainer}>{route.params.productInfo.description}</Text>

        <Pressable style={styles.button}>
          <Text style={styles.buttonText}>Buy Now</Text>
        </Pressable>

        <Pressable onPress={handleGoToFirstPage} style={styles.button}>
          <Text style={styles.buttonText}>Go To Products</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  productContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
  },
  descriptionContainer: {
    backgroundColor: 'black',
    alignItems: 'center',
    flex: 1,
    borderRadius: 233,
    width: 382,
    height: 322,
  },
  button: {
    width: 180,
    height: 42,
    backgroundColor: 'white',
    borderRadius: 44,
    marginTop: 11,
  },
  buttonText: {
    color: 'black',
    fontFamily: 'titleFont',
    fontSize: 24,
    textAlign: 'center',
    paddingVertical: 6,
  },
  imageContainer: {
    marginTop: 82,
    width: 260,
    height: 200,
    backgroundColor: 'white',
    borderRadius: 233,
    marginBottom: 24,
  },
  titleContainer: {
    fontWeight: 'bold',
    fontSize: 32,
    fontFamily: 'titleFont',
    color: 'white',
    textAlign: 'center',
    marginTop: 122,
    textAlign: 'center',
    padding: 22,
  },
  priceContainer: {
    fontSize: 18,
    textAlign: 'center',
    color: 'white',
    fontFamily: 'titleFont',
  },
});

export default SecondPage;