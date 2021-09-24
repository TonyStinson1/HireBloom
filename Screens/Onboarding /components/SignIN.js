import React from 'react'
import { StyleSheet, Text, Image, TouchableOpacity } from 'react-native'
import { useDispatch } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const SignIN = (props) => {
    
    const dispatch = useDispatch();

    const signIn = async () => {
        let value = 'defgaiowfvoaibvcfoawbef'
        await AsyncStorage.setItem('accessToken', value)
        dispatch({
            type: 'SET_TOKEN',
            payload: value
        });
    }

    return (
        <TouchableOpacity style={{
            width: "90%",
            height: 56,
            backgroundColor: "#F4F4F4",
            borderRadius: 16,
            alignItems: "center",
            justifyContent: "center",
            flexDirection: "row"
        }}
            onPress={() => signIn()}
        >
            <Image source={props.image}
                style={styles.imgStyle} />
            <Text style={styles.textStyle}>{props.text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    imgStyle: {
        width: 36,
        height: 36
    },
    textStyle: {
        fontSize: 18,
        fontWeight: "600",
        color: "#17A2F3",
        marginLeft: 10
    }
})