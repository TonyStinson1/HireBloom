import React from 'react'
import {View , Text, Touchable, TouchableOpacity,StyleSheet, Image} from 'react-native'
import Swiper from 'react-native-swiper' 

export const Swipercomponet = (props) =>{
    return(
        <View style={styles.slide}>
            <Image source={props.image}
                    style={styles.image}/>
            <Text style={styles.headingtext}>{props.heading}</Text>
            <Text style={styles.text}>{props.text}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    wrapper: {
        height:"100%",
        backgroundColor:"white",


    },
    slide: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginBottom:"10%"
        
     
    },
    image:{
        width:"80%",
        resizeMode:"contain",
        height:"60%"

    },
    headingtext: {
        marginTop:8,
      color: '#212325',
      fontSize: 32,
      fontWeight: 'bold',
      width:"70%",
      textAlign:"center",
      lineHeight:39
    },
    text:{
        marginTop:10,
        fontSize:16,
        color:"#91919F",
        fontWeight:"500",
        textAlign:"center",
        width:"70%",
        lineHeight:22
    },    
  })