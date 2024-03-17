import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, ScrollView, Image, Pressable } from 'react-native';
import axios from 'axios';
import AllData from '../data/AllData';


const FirstPage = ({ navigation }) => {
  const [jewelery, setJewelery] = useState([]);

  //useEffect(() => {
  //  axios.get("https://fakestoreapi.com/products/category/jewelery")
  //    .then((response) => {
  //      setJewelery(response.data);
  //    })
  //    .catch((error) => {
  //      console.error("Error fetching data:", error);
  //    });
  //}, []);

  const handleSendData = (value) => {
    print(value)
    navigation.navigate("TrialSecondPage", {object:value});
  };

  function HeadlineWidget(prop) {
    object = prop.object
    imageLink = object.image
    title = object.title

    return (
      <Pressable onPress = {() => handleSendData(object)}>
      <View style = {styles.headlineWidget}>
        <Image source={{uri: imageLink}} style={styles.mainImage}/>
        <Text style = {styles.headlineText}>{title}</Text>
      </View>
      </Pressable>
    )
  }

  function SingleSmallWidget(prop) {
    object = prop.object
    imageLink = object.image
    title = object.title

    return (
      <Pressable style = {styles.singleSmallWidget} onPress = {() => handleSendData(object)}>
      <View style = {styles.singleSmallWidget}>
        <Image source={{uri: imageLink}} style={styles.smallImage}/>
        <Text style = {styles.smallText}>{title}</Text>
      </View>
      </Pressable>
    )
  }

  
  function DoubleMainWidget(prop) {
    object1 = prop.object1
    object2 = prop.object2
    return (
      <View style = {styles.doubleMainWidget}>
        <SingleSmallWidget object = {object1}/>
        <SingleSmallWidget object = {object2}/>
      </View>
    )
  }

  function SingleMainWidget(prop) {
    object = prop.object
    imageLink = object.image
    title = object.title

    return (
      <Pressable onPress = {() => handleSendData(object)}>
      <View style = {styles.singleMainWidget}>
        <Image source={{uri: imageLink}} style={styles.singleImage}/>
        <Text style = {styles.singleText}>{title}</Text>
      </View>
      </Pressable>
    )
  }

  // Headline
  // Double
  // Single
  // Single
  // Single
  // Single
  function Layout1() {
    const data = AllData.data.TopHeadlines
    print(data.topText)
    return (
      <View style = {styles.Layout}>
        <Text style = {styles.topicText}>{data.topText}</Text>
        <HeadlineWidget object = {data.headline1}/>
        <DoubleMainWidget object1 = {data.headline2} object2 = {data.headline3}/>
        <SingleMainWidget object = {data.headline4}/>
        <SingleMainWidget object = {data.headline5}/>
        <SingleMainWidget object = {data.headline6}/>
        <SingleMainWidget object = {data.headline7}/>
      </View>
    )
  }

  // Headline
  // Double
  // Double
  // Single
  // Single
  function Layout2() {
    const data = AllData.data.TopHeadlines
    return (
      <View style = {styles.Layout}>
        <Text style = {styles.topicText}>{data.topText}</Text>
        <HeadlineWidget object = {data.headline1}/>
        <DoubleMainWidget object1 = {data.headline2} object2 = {data.headline3}/>
        <DoubleMainWidget object1 = {data.headline4} object2 = {data.headline5}/>
        <SingleMainWidget object = {data.headline6}/>
        <SingleMainWidget object = {data.headline7}/>
      </View>
    )
  }

  // Headline
  // Double
  // Double
  // Double
  // Double
  function Layout3() {
    const data = AllData.data.TopHeadlines
    return (
      <View style = {styles.Layout}>
        <Text style = {styles.topicText}>{data.topText}</Text>
        <HeadlineWidget object = {data.headline1}/>
        <DoubleMainWidget object1 = {data.headline2} object2 = {data.headline3}/>
        <DoubleMainWidget object1 = {data.headline4} object2 = {data.headline5}/>
        <DoubleMainWidget object1 = {data.headline6} object2 = {data.headline7}/>
        <DoubleMainWidget object1 = {data.headline8} object2 = {data.headline9}/>
      </View>
    )
  }

  // Headline
  // Double
  // Single
  // Double
  // Single
  function Layout4() {
    const data = AllData.data.TopHeadlines
    return (
      <View style = {styles.Layout}>
        <Text style = {styles.topicText}>{data.topText}</Text>
        <HeadlineWidget object = {data.headline1}/>
        <DoubleMainWidget object1 = {data.headline2} object2 = {data.headline3}/>
        <SingleMainWidget object = {data.headline4}/>
        <DoubleMainWidget object1 = {data.headline5} object2 = {data.headline6}/>
        <SingleMainWidget object = {data.headline7}/>
      </View>
    )
  }

  function returnRandomLayout() {
    const random = Math.floor(Math.random() * 4)
    if (random == 0) {
      return <Layout1/>
    }
    else if (random == 1) {
      return <Layout2/>
    }
    else if (random == 2) {
      return <Layout3/>
    }
    else if (random == 3) {
      return <Layout4/>
    }
  }
  function FiveCategoriesLoaded() {
    return (
      <View style = {styles.headlineContainer}>
        {returnRandomLayout()}
        {returnRandomLayout()}
        {returnRandomLayout()}
        {returnRandomLayout()}
        {returnRandomLayout()}
      </View>
    )
  }

  return(
    <View style={styles.mainContainer}>
        <ScrollView style = {styles.scrollView}>
            {FiveCategoriesLoaded()}
        </ScrollView>
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
    scrollView: {
        display: 'flex',
        flex: 1,
        flexDirection: "column",
        backgroundColor: 'black',
        marginTop: "9%",
        marginLeft: "3%",
        marginRight: "3%",
    },
    headlineContainer: {
        display: 'flex',
        flexDirection: "column",
        backgroundColor: 'black',
        marginTop: "1%",
        marginBottom: "1%",
    },
    headlineText: {
        color: "white",
        fontSize: 25,
        fontWeight: "bold",
        marginLeft: "3%",
        marginTop: "1.5%",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: "1%"
    },
    mainImage: {
        width: "100%",
        height: 300,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    singleMainWidget: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "100%",
        borderRadius: 20,
        backgroundColor: "#101111",
        marginBottom: "1%",
        marginTop: "1%",
        //marginRight: "3%",
    },
    topicText: {
        color: "white",
        fontSize: 33,
        fontWeight: "bold",
        marginBottom: "1%",
        marginLeft: "1%"
    },
    smallImage: {
        width: "100%",
        height: 200,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    singleSmallWidget: {
        display: "flex",
        flex: 1,
        flexDirection: "column",
        width: "100%",
        backgroundColor: "#101111",
        borderRadius: 20,
        marginTop: "1%",
        marginBottom: "1%",
        marginRight: "1%",
        marginLeft: "1%"
    },
    smallText: {
        color: "white",
        fontSize: 20,
        fontWeight: "bold",
        paddingLeft: "3%",
        paddingTop: "3%",
        textAlign: "left",
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
        marginBottom: "4%",
        marginLeft: "1.5%"
    },
    Layout: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      width: "100%",
      backgroundColor: "black",
      marginBottom: "4%",
    },
    doubleMainWidget: {
      display: "flex",
      flexDirection: "row",
      width: "100%",
      backgroundColor: "black",
      marginBottom: "1%",
      marginTop: "1%"
    },
    singleMainWidget: {
      display: "flex",
      flex: 1,
      flexDirection: "row",
      width: "100%",
      borderRadius: 20,
      backgroundColor: "#101111",
      marginBottom: "1%",
      marginTop: "1%",
      marginRight: "3%",
      justifyContent: "center"
    },
    singleImage: {
      width: "30%",
      height: 130,
      borderRadius: 20,
      margin: "2%",
    },
    singleText: {
      color: "white",
      fontSize: 20,
      fontWeight: "bold",
      marginRight: "5%",
      marginTop: "3%",
      textAlign: "right",
      width: "60%",
      backgroundColor: "#101111",
      borderBottomLeftRadius: 20,
      borderBottomRightRadius: 20,
      marginBottom: "3%"
    },
    headlineWidget: {
      display: "flex",
      flex: 1,
      flexDirection: "column",
      width: "100%",
      backgroundColor: "#101111",
      marginBottom: "1%",
      marginTop: "1%",
      borderRadius: 20,
    },
});

export default FirstPage;