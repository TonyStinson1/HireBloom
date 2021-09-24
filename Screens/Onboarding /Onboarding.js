import React from 'react'
import {View , Text, Touchable, TouchableOpacity,StyleSheet, Image} from 'react-native'
import Swiper from 'react-native-swiper'

//components
import {Swipercomponet} from './components/Swiper'
import {SignIN} from './components/SignIN'

const Swiperdata = [
    {
     
        heading : "Start by creating a project",
        text : "Visit the website to create a project that defines your ideal candidate.",
        image : require("../../assets/Onboarding1.png")
    },
    {
       
        heading : "Begin your search",
        text : "Hirefly will send you a curated batch of candidates everyday where Hirefly’s AI learns from each approval and rejection to serve you the best candidates.",
        image : require("../../assets/Onboarding2.png")
    },
    {
  
        heading : "Schedule interviews and begin hiring",
        text : "Finding your perfect candidate is that easy",
        image : require("../../assets/Onboarding3.png")
    },


]

const Onboarding = ({navigation}) =>{
    return(
        <View style={{flex:1,backgroundColor:"white"}}>
        <Swiper 
            style={styles.wrapper} 
            activeDot={<View 
                style={{
                    backgroundColor:'#17A2F3',
                    width: 15, 
                    height: 15,
                    borderRadius: 10,
                    margin:8 }} />}
            dot={<View 
                style={{
                    backgroundColor:'#eee5ff',
                    width: 8, 
                    height: 8,
                    borderRadius: 4,
                margin:8 }} />}
            >
        {Swiperdata.map((item, i) =>{
            return(
                <Swipercomponet image = {item.image} 
                        heading = {item.heading}
                        text = {item.text} 
                        key = {i}/>
            );
        })}
  
       
      </Swiper>
      <View style={{height:"18%",alignItems:"center",justifyContent:"space-evenly",marginBottom:53}}>
          <SignIN image={require("../../assets/google.png")}
                  text="Sign in with Google"
                  nav = "Dashboard"/>
          <SignIN image={require("../../assets/microsoft.png")}
                  text="Sign in with Microsoft"/>
      </View>
      </View>
    );
}

export default Onboarding;

 
const styles = StyleSheet.create({
    wrapper: {
        height:"100%",
        backgroundColor:"white",
    },
   
    
  })