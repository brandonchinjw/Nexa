import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import axios from 'axios';
import { useFonts } from 'expo-font';

import {Topic} from '../components/MainTopic'
import Swiper from 'react-native-swiper'
import {MainCarousel} from "../components/MainCarousel"
import { SecondaryCarousel } from '../components/SecondaryCarousel';
import { Suggestions } from '../components/Suggestions';

const FirstPage = ({ navigation }) => {
  const [jewelery, setJewelery] = useState([]);

  useEffect(() => {
    axios.get("https://fakestoreapi.com/products/category/jewelery")
      .then((response) => {
        setJewelery(response.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleSendData = (value) => {
    navigation.navigate("SecondPage", {productInfo:value});
  };

  return(
    <View style={styles.mainContainer}>
      <MainCarousel/> 
      <SecondaryCarousel/>
      <Suggestions />
      {/*<Text style={styles.firstPageTitle}> PRODUCTS </Text>
      <FlatList
        data={jewelery}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle= {styles.flatlistContainer}
        handlePressItem= {()=> handleSendData(value.item)}
        /*renderItem={(value)=> 
                      <ProductBox 
                          title={value.item.title}
                          price={value.item.price}
                          image={value.item.image}
                          handlePressProduct={()=> handleSendData(value.item)}
        />}*/}

    

    </View>
  );
   
  
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    flexDirection: "column",
    backgroundColor:'black',
  },
  firstPageTitle:{
    marginTop:82,
    color:'white',
    fontSize:33,

  },
  buttonContainer: {
    backgroundColor: 'white',
    width:220,
    height:200,
    padding: 10,
    borderRadius: 5,

  },
  buttonText: {
    fontWeight: 'bold',

    width: 120,
    height: 30,
  },
  flatlistContainer: {
  marginTop:70,
    padding: 5,
    marginTop:23,
  },
  mainTopic: {
  flex: 1,
  height: "80%",
  width: "100%"
  }
});

export default FirstPage;